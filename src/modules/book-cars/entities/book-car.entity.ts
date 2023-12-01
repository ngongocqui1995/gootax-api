import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { ENUM_STATUS_BOOK } from 'src/common';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { District } from 'src/modules/districts/entities/district.entity';
import { DriverCancel } from 'src/modules/driver-cancel/entities/driver-cancel.entity';
import { Driver } from 'src/modules/drivers/entities/driver.entity';
import { Province } from 'src/modules/provinces/entities/province.entity';
import { Road } from 'src/modules/roads/entities/road.entity';
import { TypeCar } from 'src/modules/type-cars/entities/type-car.entity';
import { Ward } from 'src/modules/wards/entities/ward.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('book-cars')
export class BookCar extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_book_car_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 50,
    required: false,
    description: 'Name',
    example: 'abc',
  })
  @Column({ type: 'varchar', nullable: true, length: 50 })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Phone',
    example: '0858585858',
  })
  @Column({ type: 'varchar', nullable: true, length: 20 })
  phone: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Type Car Id',
    example: '1',
  })
  @ManyToOne(() => TypeCar, (type_car) => type_car.book_cars, {
    nullable: false,
  })
  @JoinColumn({ name: 'type_car_id' })
  type_car: TypeCar;

  @OneToMany(() => DriverCancel, (driver) => driver.bookCarId)
  driver_cancel: DriverCancel[];

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 1000,
    required: true,
    description: 'Name',
    example: 'abc',
  })
  @Column({ type: 'varchar', nullable: true, length: 1000 })
  from_address: string;

  @ApiProperty({
    type: Number,
  })
  @Column({ type: 'float', nullable: true })
  from_address_lat: number;

  @ApiProperty({
    type: Number,
  })
  @Column({ type: 'float', nullable: true })
  from_address_lng: number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Province Id',
    example: '1',
  })
  @ManyToOne(() => Province, (province) => province.from_address_book_cars, {
    nullable: true,
  })
  @JoinColumn({ name: 'from_address_province_id' })
  from_address_province: Province;

  @ApiProperty({
    type: String,
    required: true,
    description: 'District Id',
    example: '1',
  })
  @ManyToOne(() => District, (district) => district.from_address_book_cars, {
    nullable: true,
  })
  @JoinColumn({ name: 'from_address_district_id' })
  from_address_district: Province;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Ward Id',
    example: '1',
  })
  @ManyToOne(() => Ward, (ward) => ward.from_address_book_cars, {
    nullable: true,
  })
  @JoinColumn({ name: 'from_address_ward_id' })
  from_address_ward: Ward;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Road Id',
    example: '1',
  })
  @ManyToOne(() => Road, (road) => road.from_address_book_cars, {
    nullable: true,
  })
  @JoinColumn({ name: 'from_address_road_id' })
  from_address_road: Road;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 1000,
    required: true,
    description: 'Name',
    example: 'abc',
  })
  @Column({ type: 'varchar', nullable: true, length: 1000 })
  to_address: string;

  @ApiProperty({
    type: Number,
  })
  @Column({ type: 'float', nullable: true })
  to_address_lat: Number;

  @ApiProperty({
    type: Number,
  })
  @Column({ type: 'float', nullable: true })
  to_address_lng: Number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Province Id',
    example: '1',
  })
  @ManyToOne(() => Province, (province) => province.to_address_book_cars, {
    nullable: true,
  })
  @JoinColumn({ name: 'to_address_province_id' })
  to_address_province: Province;

  @ApiProperty({
    type: String,
    required: true,
    description: 'District Id',
    example: '1',
  })
  @ManyToOne(() => District, (district) => district.to_address_book_cars, {
    nullable: true,
  })
  @JoinColumn({ name: 'to_address_district_id' })
  to_address_district: District;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Ward Id',
    example: '1',
  })
  @ManyToOne(() => Ward, (ward) => ward.to_address_book_cars, {
    nullable: true,
  })
  @JoinColumn({ name: 'to_address_ward_id' })
  to_address_ward: Ward;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Road Id',
    example: '1',
  })
  @ManyToOne(() => Road, (road) => road.to_address_book_cars, {
    nullable: true,
  })
  @JoinColumn({ name: 'to_address_road_id' })
  to_address_road: Road;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Customer',
    example: '1',
  })
  @ManyToOne(() => Customer, (customer) => customer.book_cars)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Driver',
    example: '1',
  })
  @ManyToOne(() => Driver, (driver) => driver.book_cars)
  @JoinColumn({ name: 'driver_id' })
  driver: Driver;

  @ApiProperty({
    type: String,
    enum: ENUM_STATUS_BOOK,
    description: 'FINDING',
    example: 'FINDING',
  })
  @Column({
    type: 'varchar',
    nullable: false,
    default: 'FINDING',
    enum: ENUM_STATUS_BOOK,
  })
  status: string;

  @ApiProperty({
    type: Date,
    description: 'Start Time',
    example: '',
  })
  @Column({ type: 'timestamp', nullable: true })
  startTime: Date;

  @ApiProperty({
    type: Date,
    description: 'End Time',
    example: '',
  })
  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @ApiProperty({
    type: Number,
    description: 'Amount',
    example: '330000',
  })
  @Column({ type: 'float', nullable: false, default: 0 })
  amount: number;

  @ApiProperty({
    type: Number,
    description: 'Distance',
    example: '2800',
  })
  @Column({ type: 'float', nullable: false, default: 0 })
  distance: number;

  @ApiProperty({
    type: String,
    description: 'Note',
    example: 'Có trẻ em',
  })
  @Column({ type: 'varchar', nullable: true })
  note: string;

  @ApiProperty({
    type: String,
    description: 'Payment method',
    enum: ['CASH', 'CARD'],
  })
  @Column({ type: 'varchar', nullable: false, default: 'CASH' })
  paymentMethod: number;
}
