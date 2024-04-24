import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  ParseIntPipe,
  Query,
  InternalServerErrorException,
  Res,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterBookingDto } from './dto/filter-booking.dto';
import { Readable } from 'stream';
import { Response } from 'express';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { RoleGuard } from '../roles/guards/roles.guard';
import { PermissionsGuard } from '../permissions/guards/permissions.guard';

@ApiTags('Booking endpoints')
@UseGuards(AccessTokenGuard)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(RoleGuard('FACILITY_MANAGER'), PermissionsGuard(['manageBookings']))
  @Post()
  async createBooking(@Body() createdData: CreateBookingDto) {
    return this.bookingService.create(createdData);
  }

  @Get()
  async getAllBookings() {
    return this.bookingService.findAll();
  }

  @Post(':id/addUser/:userId')
  async addUserToBooking(
    @Param('id', ParseIntPipe) bookingId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.bookingService.addUserToBooking(bookingId, userId);
  }

  @Get('get-by')
  async getAllFiltered(@Query() filters?: FilterBookingDto) {
    try {
      return this.bookingService.getAllFiltered(filters);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch bookings');
    }
  }

  @UseGuards(RoleGuard('FACILITY_MANAGER'), PermissionsGuard(['manageBookings']))
  @Get('export-csv')
  async exportAllBookingsToCSV(
    @Res() response: Response,
    @Query() filters?: Omit<FilterBookingDto, 'limit'>,
  ): Promise<void> {
    try {
      const { bookings } = await this.bookingService.getAllFiltered({
        ...filters,
      });

      const csv = await this.bookingService.generateCSVFromBookings(bookings);
      const stream = new Readable();
      stream.push(csv);
      stream.push(null);

      response.set({
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=bookings.csv',
      });

      stream.pipe(response);
    } catch (error) {
      throw new InternalServerErrorException('Failed to export bookings');
    }
  }

  @Get(':id')
  async getOneBooking(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.find(id);
  }

  @UseGuards(RoleGuard('FACILITY_MANAGER'), PermissionsGuard(['manageBookings']))
  @Patch(':id')
  async updateBooking(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedData: UpdateBookingDto,
  ) {
    return this.bookingService.update(id, updatedData);
  }

  @UseGuards(RoleGuard('FACILITY_MANAGER'), PermissionsGuard(['manageBookings']))
  @Delete(':id')
  async deleteBooking(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.delete(id);
  }
}
