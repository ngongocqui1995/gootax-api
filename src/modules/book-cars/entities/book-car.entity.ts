import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Driver } from 'src/modules/drivers/entities/driver.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
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
    minLength: 3,
    maxLength: 100,
    required: true,
    description: 'Name',
    example: 'abc',
  })
  @Column({ type: 'varchar', nullable: false, length: 100 })
  from_address: string;

  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true,
    description: 'Name',
    example: 'abc',
  })
  @Column({ type: 'varchar', nullable: false, length: 100 })
  to_address: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Phone',
    example: '1',
  })
  @ManyToOne(() => Customer)
  @JoinColumn({
    name: 'phone',
    referencedColumnName: 'phone',
    foreignKeyConstraintName: 'fk_customer_phone',
  })
  customer_phone: Customer;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Phone',
    example: '1',
  })
  @ManyToOne(() => Driver)
  @JoinColumn({
    name: 'phone',
    referencedColumnName: 'phone',
    foreignKeyConstraintName: 'fk_driver_phone',
  })
  driver_phone: Driver;

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
