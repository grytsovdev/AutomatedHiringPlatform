import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  Query,
  Res,
  InternalServerErrorException,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserFiltersDto } from './dto/user-filters.dto';
import { Response as ExpressResponse } from 'express';
import { Readable } from 'stream';
import { RoleGuard } from '../roles/guards/roles.guard';
import { PermissionsGuard } from '../permissions/guards/permissions.guard';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@ApiTags('User endpoints')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userInfo: CreateUserDto) {
    return await this.userService.create(userInfo);
  }

  @UseGuards(RoleGuard('PLATFORM_ADMIN'))
  @Post('/many')
  async createMany(@Body() userInfo: CreateUserDto[]) {
    return await this.userService.createMany(userInfo);
  }

  @UseGuards(RoleGuard('FACILITY_MANAGER'), PermissionsGuard(['manageUsers']))
  @Get('export-csv')
  async exportAllUsersToCSV(
    @Res() response: ExpressResponse,
    @Query() filters?: UserFiltersDto,
  ): Promise<void> {
    try {
      const usersData = await this.userService.getAllByParams({
        currentPage: 1,
        filters,
        isCSVExport: true,
      });

      const users = usersData.users;
      const csv = await this.userService.generateCSVFromUsers(users);
      const stream = new Readable();
      stream.push(csv);
      stream.push(null);

      response.set({
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=users.csv`,
      });

      stream.pipe(response);
    } catch (error) {
      throw new InternalServerErrorException('Failed to export users');
    }
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) userId: number) {
    Logger.log('getting user with id', userId);
    const user = await this.userService.findOne(userId);
    Logger.log('got the user', user);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Get()
  async getAllByParams(@Query() query: UserFiltersDto): Promise<{
    users: User[];
    totalCount: number;
  }> {
    return this.userService.getAllByParams({
      currentPage: Number(query.currentPage),
      filters: {
        birthdate: query.birthdate,
        city: query.city,
        email: query.email,
        first_name: query.first_name,
        is_confirmed: query.is_confirmed ? JSON.parse(query.is_confirmed) : query.is_confirmed,
        last_name: query.last_name,
      },
    });
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body()
    updateUserInfo: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(updateUserInfo, userId);
    if (!updatedUser) throw new NotFoundException();
    return this.userService.findOne(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('change-password/:id')
  async changePassword(
    @Param('id', ParseIntPipe) userId: number,
    @Body() passwords: { currentPassword: string; newPassword: string },
  ) {
    return this.userService.changePassword(
      userId,
      passwords.currentPassword,
      passwords.newPassword,
    );
  }

  @UseGuards(RoleGuard('FACILITY_MANAGER'), PermissionsGuard(['manageUsers']))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) userId: number) {
    const deleteStatus = await this.userService.delete(userId);
    return Boolean(deleteStatus);
  }
}
