import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Driver } from 'src/modules/drivers/entities/driver.entity';

export class CreateBookCarDto {
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
  from_address: string;

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
  to_address: string;

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
  customer_phone: Customer;

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
  driver_phone: Driver;

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
}
