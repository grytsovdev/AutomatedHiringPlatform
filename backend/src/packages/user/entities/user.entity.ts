import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { Booking } from 'packages/booking/entities/booking.entity';
import { Roles } from 'packages/roles/entities/roles.entity';

import { Permissions } from 'packages/permissions/entities/permissions.entity';

import { UserProfile } from 'packages/user-profile/entities/user-profile.entity';

@Table({ tableName: 'Users' })
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
  })
  first_name: string;

  @Column({
    type: DataType.TEXT,
  })
  last_name: string;

  @Column({
    type: DataType.TEXT,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  phone_number: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  city: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  birthdate: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_confirmed: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  document_number: string;

  @BelongsTo(() => Roles)
  role: Roles;

  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id: number;

  @BelongsToMany(() => Booking, 'user_bookings', 'user_id', 'booking_id')
  bookings: Booking[];

  @HasOne(() => Permissions)
  permissions: Permissions;

  // Define the association to UserProfile using @HasOne
  @HasOne(() => UserProfile)
  profile: UserProfile;
}
