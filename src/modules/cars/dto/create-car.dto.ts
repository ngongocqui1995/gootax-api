import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { CarStyle } from 'src/modules/car-style/entities/car-style.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import { TypeCar } from 'src/modules/type-cars/entities/type-car.entity';
import { Vehicle } from 'src/modules/vehicles/entities/vehicle.entity';

export class CreateCarDto {
  @IsString({ message: 'errors.NAME_STRING' })
  @IsNotEmpty({ message: 'errors.NAME_NOT_EMPTY' })
  @Length(3, 50, { message: 'errors.NAME_LENGTH_3_50' })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  name: string;

  @IsOptional()
  @IsString({ message: 'errors.AVATAR_STRING' })
  @IsNotEmpty({ message: 'errors.AVATAR_NOT_EMPTY' })
  @ApiProperty({
    type: String,
    description: 'Avatar',
    example: 'avatar',
    required: false,
  })
  avatar: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  year: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  seat: Number;

  @IsString({ message: 'errors.NAME_STRING' })
  @IsNotEmpty({ message: 'errors.NAME_NOT_EMPTY' })
  @Length(3, 50, { message: 'errors.NAME_LENGTH_3_50' })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  company: Company;

  @IsString({ message: 'errors.NAME_STRING' })
  @IsNotEmpty({ message: 'errors.NAME_NOT_EMPTY' })
  @Length(3, 50, { message: 'errors.NAME_LENGTH_3_50' })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  car_style: CarStyle;

  @IsString({ message: 'errors.NAME_STRING' })
  @IsNotEmpty({ message: 'errors.NAME_NOT_EMPTY' })
  @Length(3, 50, { message: 'errors.NAME_LENGTH_3_50' })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  vehicle: Vehicle;

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
  @IsString({ message: 'errors.STATUS_STRING' })
  @IsNotEmpty({ message: 'errors.STATUS_NOT_EMPTY' })
  @IsIn(['ACTIVE', 'INACTIVE'], { message: 'errors.STATUS_NOT_VALID' })
  @ApiProperty({
    type: String,
    description: 'ACTIVE, INACTIVE',
    example: 'ACTIVE',
  })
  status: string;
}
