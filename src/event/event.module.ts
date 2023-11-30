import { Module } from '@nestjs/common';
import { EventsGateway } from './event.gateway';

@Module({
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventModule {}
