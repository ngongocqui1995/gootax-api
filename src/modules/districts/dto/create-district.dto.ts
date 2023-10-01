import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Province } from 'src/modules/provinces/entities/province.entity';

export class CreateDistrictDto {
  @IsString({ message: 'errors.CODE_STRING' })
  @IsNotEmpty({ message: 'errors.CODE_NOT_EMPTY' })
  @Length(3, 50, { message: 'errors.CODE_LENGTH_3_50' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    required: true,
    description: 'admin',
    example: 'admin',
  })
  code: string;

  @Length(3, 50, { message: 'errors.CODE_LENGTH_3_50' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    required: true,
    description: 'admin',
    example: 'admin',
  })
  province: Province;

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
