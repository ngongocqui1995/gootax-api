import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Company } from 'src/modules/company/entities/company.entity';

export class CreateVehicleDto {
  @IsString({ message: 'errors.CODE_STRING' })
  @IsNotEmpty({ message: 'errors.CODE_NOT_EMPTY' })
  @Transform((params) => String(params.value).trim())
  @ApiProperty({
    type: String,
    required: true,
    description: 'admin',
    example: 'admin',
  })
  code: string;

  @IsString({ message: 'errors.NAME_STRING' })
  @IsNotEmpty({ message: 'errors.NAME_NOT_EMPTY' })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  name: string;

  @IsString({ message: 'errors.NAME_STRING' })
  @IsNotEmpty({ message: 'errors.NAME_NOT_EMPTY' })
  @ApiProperty({
    type: String,
    required: true,
    description: 'Admin',
    example: 'Admin',
  })
  company: Company;

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
