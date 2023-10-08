import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { CarStyle } from 'src/modules/car-style/entities/car-style.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import { TypeCar } from 'src/modules/type-cars/entities/type-car.entity';
import { Vehicle } from 'src/modules/vehicles/entities/vehicle.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
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
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  @Column({ type: 'varchar', nullable: false, length: 50 })
  version: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  @Column({ type: 'timestamp', nullable: false })
  year: Date;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  @Column({ type: 'numeric', nullable: false })
  seat: Number;

  @OneToOne(() => Company, {
    nullable: false,
  })
  @JoinColumn()
  company: Company;

  @OneToOne(() => CarStyle, {
    nullable: false,
  })
  @JoinColumn()
  car_style: CarStyle;

  @OneToOne(() => Vehicle, {
    nullable: false,
  })
  @JoinColumn()
  vehicle: Vehicle;

  @OneToOne(() => TypeCar, {
    nullable: false,
  })
  @JoinColumn()
  type_car: TypeCar;

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
