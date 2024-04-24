import {
  Column,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  DataType,
  CreatedAt,
  AllowNull,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { User } from 'packages/user/entities/user.entity';

@Table
class Booking extends Model<InferAttributes<Booking>, InferCreationAttributes<Booking>> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.ENUM('pending', 'accepted', 'rejected', 'canceled', 'completed'))
  status: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @Column
  @ForeignKey(() => User)
  createdBy: number;

  @BelongsTo(() => User, 'createdBy')
  creator: User;

  @Column(DataType.TEXT)
  education: string;

  @Column(DataType.FLOAT)
  salary: number;

  @AllowNull
  @Column(DataType.TEXT)
  notes: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  languages: string[];

  @BelongsToMany(() => User, 'user_bookings', 'booking_id', 'user_id')
  users: User[];

  @Column
  experience: number;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  skills: string[];

  @Column
  englishLevel: string;

  @Column
  position: string;

  @Column
  companyName: string;
}

export { Booking };
