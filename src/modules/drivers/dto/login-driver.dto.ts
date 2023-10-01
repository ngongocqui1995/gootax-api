import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDriverDto {
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

  @IsString({ message: 'errors.PASSWORD_STRING' })
  @IsNotEmpty({ message: 'errors.PASSWORD_NOT_EMPTY' })
  @ApiProperty({
    type: String,
    required: true,
    example: 'Duc1@',
  })
  password: string;
}
