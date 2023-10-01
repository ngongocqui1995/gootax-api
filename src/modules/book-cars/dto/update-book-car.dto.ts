import { PartialType } from '@nestjs/swagger';
import { CreateBookCarDto } from './create-book-car.dto';

export class UpdateBookCarDto extends PartialType(CreateBookCarDto) {}
