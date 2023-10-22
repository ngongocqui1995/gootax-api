import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { CarStyle } from 'src/modules/car-style/entities/car-style.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import { Driver } from 'src/modules/drivers/entities/driver.entity';
import { TypeCar } from 'src/modules/type-cars/entities/type-car.entity';
import { Vehicle } from 'src/modules/vehicles/entities/vehicle.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cars')
export class Car extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_car_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Avatar',
    example: 'avatar',
  })
  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @ApiProperty({
    type: Date,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  @Column({ type: 'timestamp', nullable: false })
  year: Date;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  @Column({ type: 'int', nullable: true })
  seat: Number;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Company Id',
    example: '1',
  })
  @ManyToOne(() => Company, (company) => company.cars, {
    nullable: false,
  })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Car Style Id',
    example: '1',
  })
  @ManyToOne(() => CarStyle, (car_style) => car_style.cars, {
    nullable: false,
  })
  @JoinColumn({ name: 'car_style_id' })
  car_style: CarStyle;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Vehicle Id',
    example: '1',
  })
  @ManyToOne(() => Vehicle, (vehicle) => vehicle.cars, {
    nullable: false,
  })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Type Car Id',
    example: '1',
  })
  @ManyToOne(() => TypeCar, (type_car) => type_car.cars, {
    nullable: false,
  })
  @JoinColumn({ name: 'type_car_id' })
  type_car: TypeCar;

  @OneToMany(() => Driver, (driver) => driver.car)
  drivers: Driver[];

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

  @ApiProperty({
    type: String,
    required: true,
    description: 'License Plate',
    example: '51G-12345',
  })
  @Column({ type: 'varchar', nullable: false, default: '51X-XXXXX' })
  licensePlate: string;
}
