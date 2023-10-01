import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordHasherService } from 'src/auth/password-hasher/password-hasher.service';
import { BaseController } from 'src/common/base.controller';
import { BaseService } from 'src/common/base.service';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';
import { Driver } from './entities/driver.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Driver])],
  controllers: [DriversController],
  providers: [
    DriversService,
    BaseService,
    PasswordHasherService,
    BaseController,
  ],
  exports: [DriversService],
})
export class DriversModule {}
