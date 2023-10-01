import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { BookCarsController } from './book-cars.controller';
import { BookCarsService } from './book-cars.service';
import { BookCar } from './entities/book-car.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([BookCar])],
  controllers: [BookCarsController],
  providers: [BookCarsService, BaseService, BaseController],
  exports: [BookCarsService],
})
export class BookCarsModule {}
