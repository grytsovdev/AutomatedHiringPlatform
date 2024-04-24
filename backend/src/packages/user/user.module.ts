import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionsModule } from '../permissions/permissions.module';
import { RolesModule } from '../roles/roles.module';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BucketModule } from '../bucket/bucket.module';
import { Booking } from '../booking/entities/booking.entity';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [
    SequelizeModule.forFeature([User]),
    RolesModule,
    BucketModule,
    PermissionsModule,
    Booking,
  ],
})
export class UserModule {}
