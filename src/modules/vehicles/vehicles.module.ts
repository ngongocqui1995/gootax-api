import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { Vehicle } from './entities/vehicle.entity';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Vehicle])],
  exports: [VehiclesService],
  controllers: [VehiclesController],
  providers: [VehiclesService, BaseService, BaseController],
})
export class VehiclesModule {}
