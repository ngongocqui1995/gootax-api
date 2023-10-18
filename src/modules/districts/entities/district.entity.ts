import { ApiProperty } from '@nestjs/swagger';
import { BookCar } from 'src/modules/book-cars/entities/book-car.entity';
import { Province } from 'src/modules/provinces/entities/province.entity';
import { Road } from 'src/modules/roads/entities/road.entity';
import { Ward } from 'src/modules/wards/entities/ward.entity';
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
import { BaseEntity } from '../../../common/entities/base.entity';

@Unique('uq_province_district', ['province', 'code'])
@Entity('districts')
export class District extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_district_id', ['id'], { unique: true })
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Province Id',
    example: '1',
  })
  @ManyToOne(() => Province, (province) => province.districts, {
    nullable: false,
  })
  @JoinColumn({ name: 'province' })
  province: Province;

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
  @Index('pk_district_code', ['code'])
  @Column({ type: 'varchar', nullable: true, length: 50 })
  code: string;

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

  @OneToMany(() => Ward, (ward) => ward.district)
  wards: Ward[];

  @OneToMany(() => BookCar, (book_car) => book_car.from_address_district)
  from_address_book_cars: BookCar[];

  @OneToMany(() => BookCar, (book_car) => book_car.to_address_district)
  to_address_book_cars: BookCar[];

  @OneToMany(() => Road, (road) => road.district)
  roads: Road[];
}
