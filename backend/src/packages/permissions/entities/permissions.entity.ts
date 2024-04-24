import { AllowNull, Column, Default, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'packages/user/entities/user.entity';

@Table({ timestamps: false })
export class Permissions extends Model {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Default(false)
  @Column
  manageTimecards: boolean;

  @Default(false)
  @Column
  manageBookings: boolean;

  @Default(false)
  @Column
  manageUsers: boolean;
}
