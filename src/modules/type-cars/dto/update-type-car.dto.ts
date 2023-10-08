import { PartialType } from '@nestjs/swagger';
import { CreateTypeCarDto } from './create-type-car.dto';

export class UpdateTypeCarDto extends PartialType(CreateTypeCarDto) {}
