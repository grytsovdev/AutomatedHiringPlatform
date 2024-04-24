import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Roles } from 'packages/roles/entities/roles.entity';
import { Permissions } from 'packages/permissions/entities/permissions.entity';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Type(() => Roles)
  @IsOptional()
  role?: Roles;

  @IsOptional()
  permissions?: Permissions;
}
