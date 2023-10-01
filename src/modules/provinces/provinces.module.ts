import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { Province } from './entities/province.entity';
import { ProvincesController } from './provinces.controller';
import { ProvincesService } from './provinces.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Province])],
  exports: [ProvincesService],
  controllers: [ProvincesController],
  providers: [ProvincesService, BaseService, BaseController],
})
export class ProvincesModule {}
