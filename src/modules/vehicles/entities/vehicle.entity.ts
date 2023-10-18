import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique('uq_company_vehicle', ['company', 'code'])
@Entity('vehicle')
export class Vehicle extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_vehicle_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'admin',
    example: 'admin',
  })
  @Index('pk_vehicle_code', ['code'])
  @Column({ type: 'varchar', nullable: false, length: 50 })
  code: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @OneToMany(() => Car, (car) => car.vehicle)
  cars: Car[];

  @ApiProperty({
    type: String,
    required: true,
    description: 'Company Id',
    example: '1',
  })
  @ManyToOne(() => Company, (company) => company.vehicles, {
    nullable: false,
  })
  @JoinColumn({ name: 'company' })
  company: Company;

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
