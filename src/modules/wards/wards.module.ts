import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { Ward } from './entities/ward.entity';
import { WardsController } from './wards.controller';
import { WardsService } from './wards.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Ward])],
  exports: [WardsService],
  controllers: [WardsController],
  providers: [WardsService, BaseService, BaseController],
})
export class WardsModule {}
