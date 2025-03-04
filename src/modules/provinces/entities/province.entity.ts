import { ApiProperty } from '@nestjs/swagger';
import { BookCar } from 'src/modules/book-cars/entities/book-car.entity';
import { District } from 'src/modules/districts/entities/district.entity';
import { Road } from 'src/modules/roads/entities/road.entity';
import { Ward } from 'src/modules/wards/entities/ward.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('provinces')
export class Province extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_province_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
    description: 'Name',
    example: 'abc',
  })
  @Column({ type: 'varchar', nullable: false, length: 50 })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Code',
    example: '1',
  })
  @Index('pk_province_code', ['code'], { unique: true })
  @Column({ type: 'varchar', nullable: true, length: 50 })
  code: string;

  @OneToMany(() => District, (district) => district.province)
  districts: District[];

  @OneToMany(() => BookCar, (book_car) => book_car.from_address_province)
  from_address_book_cars: BookCar[];

  @OneToMany(() => BookCar, (book_car) => book_car.to_address_province)
  to_address_book_cars: BookCar[];

  @OneToMany(() => Ward, (ward) => ward.province)
  wards: Ward[];

  @OneToMany(() => Road, (road) => road.province)
  roads: Road[];

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
