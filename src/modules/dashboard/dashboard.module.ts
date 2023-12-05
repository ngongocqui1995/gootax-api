import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BaseService } from 'src/common/base.service';
import { BookCarsModule } from '../book-cars/book-cars.module';
import { DriversModule } from '../drivers/drivers.module';
import { UsersModule } from '../users/users.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => DriversModule),
    forwardRef(() => BookCarsModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [DashboardController],
  providers: [DashboardService, BaseService],
})
export class DashboardModule {}
