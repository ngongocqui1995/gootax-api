import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { District } from 'src/modules/districts/entities/district.entity';
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
  OneToOne,
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

  @OneToOne(() => TypeCar, {
    nullable: false,
  })
  @JoinColumn()
  type_car: TypeCar;

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
  from_address_lat: Number;

  @ApiProperty({
    type: Number,
  })
  @Column({ type: 'float', nullable: true })
  from_address_lng: Number;

  @OneToOne(() => Province, {
    nullable: true,
  })
  @JoinColumn()
  from_address_province: Province;

  @OneToOne(() => District, {
    nullable: true,
  })
  @JoinColumn()
  from_address_district: District;

  @OneToOne(() => Ward, {
    nullable: true,
  })
  @JoinColumn()
  from_address_ward: Ward;

  @OneToOne(() => Road, {
    nullable: true,
  })
  @JoinColumn()
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

  @OneToOne(() => Province, {
    nullable: true,
  })
  @JoinColumn()
  to_address_province: Province;

  @OneToOne(() => District, {
    nullable: true,
  })
  @JoinColumn()
  to_address_district: District;

  @OneToOne(() => Ward, {
    nullable: true,
  })
  @JoinColumn()
  to_address_ward: Ward;

  @OneToOne(() => Road, {
    nullable: true,
  })
  @JoinColumn()
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
  @JoinColumn({ name: 'driver' })
  driver: Driver;

  @ApiProperty({
    enum: ['ACTIVE', 'INACTIVE'],
    description: 'ACTIVE',
    example: 'ACTIVE',
  })
  @Column({
    type: 'varchar',
    nullable: false,
    default: 'ACTIVE',
    enum: ['ACTIVE', 'INACTIVE'],
  })
  status: string;
}
