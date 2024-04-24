import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Booking } from 'packages/booking/entities/booking.entity';
import { Roles } from 'packages/roles/entities/roles.entity';
import { User } from 'packages/user/entities/user.entity';
import { Permissions } from 'packages/permissions/entities/permissions.entity';
import { UserProfile } from 'packages/user-profile/entities/user-profile.entity';

export const development: SequelizeModuleOptions = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: 5432,
  host: 'db',
  dialect: 'postgres',
  autoLoadModels: true,
  models: [User, Roles, Booking, Permissions, UserProfile],
};
