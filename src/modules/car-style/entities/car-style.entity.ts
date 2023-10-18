import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('car-style')
export class CarStyle extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_car_style_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'admin',
    example: 'admin',
  })
  @Index('pk_car_style_code', ['code'], { unique: true })
  @Column({ type: 'varchar', unique: true, nullable: false, length: 50 })
  code: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @OneToMany(() => Car, (car) => car.car_style)
  cars: Car[];

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
