import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Car])],
  exports: [CarsService],
  controllers: [CarsController],
  providers: [CarsService, BaseService, BaseController],
})
export class CarsModule {}
