import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { District } from 'src/modules/districts/entities/district.entity';
import { Driver } from 'src/modules/drivers/entities/driver.entity';
import { Province } from 'src/modules/provinces/entities/province.entity';
import { Road } from 'src/modules/roads/entities/road.entity';
import { TypeCar } from 'src/modules/type-cars/entities/type-car.entity';
import { Ward } from 'src/modules/wards/entities/ward.entity';

export class CreateBookCarDto {
  @IsOptional()
  @IsString({ message: 'errors.NAME_STRING' })
  @IsNotEmpty({ message: 'errors.NAME_NOT_EMPTY' })
  @Length(3, 50, { message: 'errors.NAME_LENGTH_3_50' })
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
    description: 'Name',
    example: 'abc',
  })
  name: string;

  @IsOptional()
  @IsString({ message: 'errors.PHONE_STRING' })
  @IsNotEmpty({ message: 'errors.PHONE_NOT_EMPTY' })
  @Length(10, 10, { message: 'errors.PHONE_LENGTH_5_50' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    minLength: 10,
    maxLength: 10,
    description: 'Phone',
    example: '0858585858',
    required: true,
  })
  phone: string;

  @IsString({ message: 'errors.NAME_STRING' })
  @IsNotEmpty({ message: 'errors.NAME_NOT_EMPTY' })
  @Length(3, 50, { message: 'errors.NAME_LENGTH_3_50' })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  type_car: TypeCar;

  @IsOptional()
  @IsString({ message: 'errors.NAME_STRING' })
  @IsNotEmpty({ message: 'errors.NAME_NOT_EMPTY' })
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
    description: 'Name',
    example: 'abc',
  })
  from_address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  from_address_lat: Number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  from_address_lng: Number;

  @IsOptional()
  @IsString({ message: 'errors.PHONE_STRING' })
  @IsNotEmpty({ message: 'errors.PHONE_NOT_EMPTY' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    minLength: 10,
    maxLength: 10,
    description: 'Phone',
    example: '0858585858',
    required: true,
  })
  from_address_province: Province;

  @IsOptional()
  @IsString({ message: 'errors.PHONE_STRING' })
  @IsNotEmpty({ message: 'errors.PHONE_NOT_EMPTY' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    minLength: 10,
    maxLength: 10,
    description: 'Phone',
    example: '0858585858',
    required: true,
  })
  from_address_district: District;

  @IsOptional()
  @IsString({ message: 'errors.PHONE_STRING' })
  @IsNotEmpty({ message: 'errors.PHONE_NOT_EMPTY' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    minLength: 10,
    maxLength: 10,
    description: 'Phone',
    example: '0858585858',
    required: true,
  })
  from_address_ward: Ward;

  @IsOptional()
  @IsString({ message: 'errors.PHONE_STRING' })
  @IsNotEmpty({ message: 'errors.PHONE_NOT_EMPTY' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    minLength: 10,
    maxLength: 10,
    description: 'Phone',
    example: '0858585858',
    required: true,
  })
  from_address_road: Road;

  @IsString({ message: 'errors.NAME_STRING' })
  @IsNotEmpty({ message: 'errors.NAME_NOT_EMPTY' })
  @ApiProperty({
    type: String,
    minLength: 3,
    maxLength: 50,
    required: true,
    description: 'Name',
    example: 'abc',
  })
  to_address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  to_address_lat: Number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  to_address_lng: Number;

  @IsOptional()
  @IsString({ message: 'errors.PHONE_STRING' })
  @IsNotEmpty({ message: 'errors.PHONE_NOT_EMPTY' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    minLength: 10,
    maxLength: 10,
    description: 'Phone',
    example: '0858585858',
    required: true,
  })
  to_address_province: Province;

  @IsOptional()
  @IsString({ message: 'errors.PHONE_STRING' })
  @IsNotEmpty({ message: 'errors.PHONE_NOT_EMPTY' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    minLength: 10,
    maxLength: 10,
    description: 'Phone',
    example: '0858585858',
    required: true,
  })
  to_address_district: District;

  @IsOptional()
  @IsString({ message: 'errors.PHONE_STRING' })
  @IsNotEmpty({ message: 'errors.PHONE_NOT_EMPTY' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    minLength: 10,
    maxLength: 10,
    description: 'Phone',
    example: '0858585858',
    required: true,
  })
  to_address_ward: Ward;

  @IsOptional()
  @IsString({ message: 'errors.PHONE_STRING' })
  @IsNotEmpty({ message: 'errors.PHONE_NOT_EMPTY' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    minLength: 10,
    maxLength: 10,
    description: 'Phone',
    example: '0858585858',
    required: true,
  })
  to_address_road: Road;

  @IsOptional()
  @IsString({ message: 'errors.PHONE_STRING' })
  @IsNotEmpty({ message: 'errors.PHONE_NOT_EMPTY' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    minLength: 10,
    maxLength: 10,
    description: 'Phone',
    example: '0858585858',
    required: true,
  })
  customer: Customer;

  @IsOptional()
  @IsString({ message: 'errors.PHONE_STRING' })
  @IsNotEmpty({ message: 'errors.PHONE_NOT_EMPTY' })
  @Length(10, 10, { message: 'errors.PHONE_LENGTH_5_50' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    minLength: 10,
    maxLength: 10,
    description: 'Phone',
    example: '0858585858',
    required: true,
  })
  driver: Driver;

  @IsOptional()
  @IsString({ message: 'errors.STATUS_STRING' })
  @IsNotEmpty({ message: 'errors.STATUS_NOT_EMPTY' })
  @IsIn(['ACTIVE', 'INACTIVE'], { message: 'errors.STATUS_NOT_VALID' })
  @ApiProperty({
    type: String,
    description: 'ACTIVE, INACTIVE',
    example: 'ACTIVE',
    required: false,
  })
  status: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Số tiền không được trống' })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Amount',
    example: 120000,
  })
  amount: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Khoảng cách không được rỗng' })
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Distance',
    example: 12000,
  })
  distance: number;

  @IsOptional()
  @IsNotEmpty({ message: 'errors.NAME_NOT_EMPTY' })
  @Length(3, 150, { message: 'Ghi chú ngắn thôi...' })
  @ApiProperty({
    type: String,
    required: false,
    description: 'Note',
    example: '',
  })
  note: string;
}
