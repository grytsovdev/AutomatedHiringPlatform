import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { development } from 'config';

import {
  EmailConfirmationModule,
  UserModule,
  BookingModule,
  RolesModule,
  AuthModule,
  RedisModule,
  ResetPasswordModule,
  UserProfileModule,
  BucketModule,
  PermissionsModule,
} from './packages';
@Module({
  imports: [
    SequelizeModule.forRoot(development),
    RolesModule,
    UserModule,
    EmailConfirmationModule,
    AuthModule,
    RedisModule,
    ResetPasswordModule,
    BookingModule,
    UserProfileModule,
    BucketModule,
    PermissionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
