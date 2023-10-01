import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { DistrictsController } from './districts.controller';
import { DistrictsService } from './districts.service';
import { District } from './entities/district.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([District])],
  exports: [DistrictsService],
  controllers: [DistrictsController],
  providers: [DistrictsService, BaseService, BaseController],
})
export class DistrictsModule {}
