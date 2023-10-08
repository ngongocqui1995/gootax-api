import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { CarStyleController } from './car-style.controller';
import { CarStyleService } from './car-style.service';
import { CarStyle } from './entities/car-style.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([CarStyle])],
  exports: [CarStyleService],
  controllers: [CarStyleController],
  providers: [CarStyleService, BaseService, BaseController],
})
export class CarStyleModule {}
