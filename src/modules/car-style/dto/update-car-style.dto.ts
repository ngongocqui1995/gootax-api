import { PartialType } from '@nestjs/swagger';
import { CreateCarStyleDto } from './create-car-style.dto';

export class UpdateCarStyleDto extends PartialType(CreateCarStyleDto) {}
