import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ChangeLocationDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    required: true,
  })
  current_lat: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    required: true,
  })
  current_lng: number;
}
