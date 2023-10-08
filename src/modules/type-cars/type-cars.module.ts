import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { TypeCar } from './entities/type-car.entity';
import { TypeCarsController } from './type-cars.controller';
import { TypeCarsService } from './type-cars.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([TypeCar])],
  exports: [TypeCarsService],
  controllers: [TypeCarsController],
  providers: [TypeCarsService, BaseService, BaseController],
})
export class TypeCarsModule {}
