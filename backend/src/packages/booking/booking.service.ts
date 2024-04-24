import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto, UpdateBookingDto } from './dto/dto';
import { UserService } from '../user/user.service';
import { FilterBookingDto } from './dto/filter-booking.dto';
import { User } from '../user/entities/user.entity';
import { Op } from 'sequelize';
import * as Papa from 'papaparse';
import { flatten } from 'flat';
import similarity from 'similarity';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking)
    @Inject(UserService)
    private readonly bookingRepository: typeof Booking,
    private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  async create(createdData: CreateBookingDto) {
    await this.validateUserExists(createdData.createdBy);

    const createdBooking = await this.bookingRepository.create(createdData);
    this.logger.log(`Created note with ID ${createdBooking.id}`, {
      createdBooking,
    });
    return createdBooking;
  }

  async findAll() {
    const bookings = await this.bookingRepository.findAll({ include: [User] });
    this.logger.log(`Retrieved ${bookings.length} bookings`, { bookings });
    return bookings;
  }

  async find(id: number) {
    const booking = await this.bookingRepository.findByPk(id, {
      include: [
        { model: User, as: 'users' },
        { model: User, as: 'creator' },
      ],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    this.logger.log(`Finding booking with ID ${id}`, { booking });
    return booking;
  }

  async getAllFiltered(filters?: FilterBookingDto) {
    const {
      limit = Number.MAX_SAFE_INTEGER,
      offset = 0,
      startDate,
      endDate,
      status,
      facilityId,
    } = filters;
    const where: any = {
      ...(startDate && { startDate: { [Op.gt]: startDate } }),
      ...(endDate && { endDate: { [Op.lt]: endDate } }),
      ...(status && { status: status }),
      ...(facilityId && { facilityId: facilityId }),
    };
    const bookings = await this.bookingRepository.findAll({
      order: [['id', 'DESC']],
      where: where,
      limit: limit,
      offset: offset,
      include: [
        { model: User, as: 'users' },
        { model: User, as: 'creator' },
      ],
    });
    const total = await this.bookingRepository.count({ where: where });
    return { bookings, total };
  }

  async generateCSVFromBookings(bookings: Booking[]): Promise<string> {
    if (bookings.length === 0) {
      throw new Error('No bookings available to generate CSV.');
    }

    const excludedKeys = [
      'creator_password',
      'creator_role_id',
      'creator_chatId',
      'creator_facility_id',
      'facility_logo',
    ];

    const excludedUserKeyParts = [
      'password',
      'is_confirmed',
      'createdAt',
      'chatId',
      'facility_id',
      'updatedAt',
    ];

    const cleanData = bookings.map(booking => flatten(booking.toJSON(), { delimiter: '_' }));

    const isValidFieldKey = (key: string, dynamicRegex: RegExp) => {
      return !excludedKeys.includes(key) && !dynamicRegex.test(key);
    };

    const dynamicRegex = new RegExp(`^users_\\d+_(${excludedUserKeyParts.join('|')})$`);

    const fieldKeys = Object.keys(cleanData[0]).filter(key => isValidFieldKey(key, dynamicRegex));
    const csv = Papa.unparse({
      fields: fieldKeys,
      data: cleanData,
    });

    return csv;
  }

  async update(id: number, updatedData: UpdateBookingDto) {
    const booking = await this.find(id);
    if (updatedData && updatedData.createdBy) {
      await this.validateUserExists(updatedData.createdBy);
    }

    await booking.update(updatedData);
    this.logger.log(`Updated booking with ID ${id}`, { booking });

    return booking;
  }

  async delete(id: number) {
    const booking = await this.find(id);
    await booking.destroy();
  }

  async addUserToBooking(bookingId: number, userId: number): Promise<any> {
    const booking = await this.find(bookingId);
    await this.validateUserExists(userId);

    if (booking.users && booking.users.some(user => user.id === userId)) {
      throw new BadRequestException('User already added to this booking');
    }

    await booking.$add('users', userId);
    const updatedBooking = await this.find(bookingId);
    this.logger.log(`Added user with ID ${userId} to booking with ID ${bookingId}`);

    return { message: 'User successfully added to booking!', booking: updatedBooking };
  }

  calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday;
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  calculateAgeCompatibility(ageA: number, ageB: number): number {
    const maxAgeDifference = 10;
    const ageDifference = Math.abs(ageA - ageB);
    const compatibility = 1 - ageDifference / maxAgeDifference;

    return Math.max(0, Math.min(1, compatibility));
  }

  calculateTextCompatibility(textA: string, textB: string): number {
    if (!textA || !textB) return 0;
    const compatibility = similarity(textA, textB);

    return compatibility;
  }

  private async validateUserExists(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
