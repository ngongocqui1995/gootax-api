import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BookCar } from 'src/modules/book-cars/entities/book-car.entity';

export class EventChatDTO {
  @IsNotEmpty()
  room_id: string;

  @IsNotEmpty()
  @IsString()
  cmd_type: string;

  @IsOptional()
  @Type(() => BookCar)
  message: BookCar;

  @IsOptional()
  @Type(() => BookCar)
  messages: BookCar[];
}

export enum TicketEventType {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  MESSAGE = 'MESSAGE',
  ALL_MESSAGES = 'ALL_MESSAGES',
}
