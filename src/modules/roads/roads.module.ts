import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { Road } from './entities/road.entity';
import { RoadsController } from './roads.controller';
import { RoadsService } from './roads.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Road])],
  exports: [RoadsService],
  controllers: [RoadsController],
  providers: [RoadsService, BaseService, BaseController],
})
export class RoadsModule {}
