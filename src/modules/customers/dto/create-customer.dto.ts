import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

const { UPDATE, CREATE } = CrudValidationGroups;

export class CreateCustomerDto {
  @IsOptional({ groups: [UPDATE] })
  @IsString({ message: 'errors.PASSWORD_STRING' })
  @IsNotEmpty({ message: 'errors.PASSWORD_NOT_EMPTY' })
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/,
    { message: 'errors.MATCHES_PASSWORD' },
  )
  @Length(5, 100, { message: 'errors.PASSWORD_LENGTH_5_100' })
  @ApiProperty({
    type: String,
    required: true,
    description:
      'Mật khẩu phải 1 chữ hoa, 1 chữ thường, 1 chữ số, 1 kí tự đặc biệt!',
    example: 'Duc1@',
  })
  password: string;

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
  @IsString({ message: 'errors.AVATAR_STRING' })
  @IsNotEmpty({ message: 'errors.AVATAR_NOT_EMPTY' })
  @ApiProperty({
    type: String,
    description: 'Avatar',
    example: 'avatar',
    required: false,
  })
  avatar: string;

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

  @IsOptional()
  @IsString({ message: 'errors.GENDER_STRING' })
  @IsNotEmpty({ message: 'errors.GENDER_NOT_EMPTY' })
  @IsIn(['MALE', 'FEMALE', 'OTHER'], { message: 'errors.GENDER_NOT_VALID' })
  @ApiProperty({
    type: String,
    description: 'MALE, FEMALE, OTHER',
    example: 'MALE',
    required: false,
  })
  gender: string;

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
