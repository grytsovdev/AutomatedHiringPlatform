import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserProfile } from './entities/user-profile.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

import { BucketModule } from '../bucket/bucket.module';

@Module({
  providers: [UserProfileService],
  controllers: [UserProfileController],
  imports: [SequelizeModule.forFeature([UserProfile, User]), UserModule, BucketModule],
  exports: [UserProfileService],
})
export class UserProfileModule {}
