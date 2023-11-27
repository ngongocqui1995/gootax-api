import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStatusDTO {
  @IsString({ message: 'errors.STATUS_STRING' })
  @IsNotEmpty({ message: 'errors.STATUS_NOT_EMPTY' })
  @ApiProperty({
    type: String,
    required: true,
    description: 'ACTIVE, INACTIVE',
    example: 'ACTIVE',
  })
  status: string;
}
