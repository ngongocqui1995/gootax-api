import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { DriverCancelController } from './driver-cancel.controller';
import { DriverCancelService } from './driver-cancel.service';
import { DriverCancel } from './entities/driver-cancel.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([DriverCancel])],
  controllers: [DriverCancelController],
  providers: [DriverCancelService, BaseService],
  exports: [DriverCancelService],
})
export class DriverCancelModule {}
