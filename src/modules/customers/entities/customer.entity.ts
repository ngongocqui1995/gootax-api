import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entities/base.entity';
import { BookCar } from 'src/modules/book-cars/entities/book-car.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('customers')
export class Customer extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryGeneratedColumn('uuid')
  @Index('pk_customer_id', ['id'], { unique: true })
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
    description: 'Avatar',
    example: 'avatar',
  })
  @Column({ type: 'varchar', nullable: true })
  avatar: string;

  @ApiProperty({
    enum: ['MALE', 'FEMALE', 'OTHER'],
    description: 'Gender',
    example: 'MALE',
  })
  @Column({
    type: 'varchar',
    nullable: false,
    default: 'OTHER',
    enum: ['MALE', 'FEMALE', 'OTHER'],
  })
  gender: string;

  @ApiProperty({
    type: String,
    description: 'Phone',
    example: '0858585858',
    required: true,
  })
  @Column({ type: 'varchar', unique: true, nullable: false, length: 20 })
  phone: string;

  @ApiProperty({
    type: String,
    required: true,
    description:
      'Mật khẩu phải 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 kí tự đặc biệt!',
    example: '123456',
  })
  @Column({ type: 'varchar', nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

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

  @OneToMany(() => BookCar, (book) => book.customer)
  book_cars: BookCar[];
}
