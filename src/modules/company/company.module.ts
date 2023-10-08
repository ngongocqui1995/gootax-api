import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Company])],
  exports: [CompanyService],
  controllers: [CompanyController],
  providers: [CompanyService, BaseService, BaseController],
})
export class CompanyModule {}
