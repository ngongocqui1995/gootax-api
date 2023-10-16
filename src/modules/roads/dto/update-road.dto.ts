import { PartialType } from '@nestjs/swagger';
import { CreateRoadDto } from './create-road.dto';

export class UpdateRoadDto extends PartialType(CreateRoadDto) {}
