import { PartialType } from '@nestjs/swagger';
import { CreateDriverCancelDto } from './create-driver-cancel.dto';

export class UpdateDriverCancelDto extends PartialType(CreateDriverCancelDto) {}
