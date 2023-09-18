import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordCustomerDTO {
  @IsString({ message: 'errors.NEW_PASSWORD_STRING' })
  @IsNotEmpty({ message: 'errors.NEW_PASSWOR_NOT_EMPTY' })
  @ApiProperty({
    type: String,
    required: true,
  })
  new_password: string;

  @IsString({ message: 'errors.CONFIRM_PASSWORD_STRING' })
  @IsNotEmpty({ message: 'errors.CONFIRM_PASSWOR_NOT_EMPTY' })
  @ApiProperty({
    type: String,
    required: true,
  })
  confirm_password: string;

  @IsString({ message: 'errors.USER_STRING' })
  @IsNotEmpty({ message: 'errors.USER_NOT_EMPTY' })
  @ApiProperty({
    type: String,
    required: false,
    description: 'User Id',
    example: '1',
  })
  user: string;
}
