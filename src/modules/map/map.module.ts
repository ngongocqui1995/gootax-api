import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { TypeCarsModule } from '../type-cars/type-cars.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, TypeCarsModule],
  controllers: [MapController],
  providers: [MapService,],
  exports: [MapService],
})
export class MapModule {}
