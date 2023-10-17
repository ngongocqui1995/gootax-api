import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MapController } from './map.controller';
import { MapService } from './map.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [MapController],
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}
