import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookCarsModule } from 'src/modules/book-cars/book-cars.module';
import { DriversModule } from 'src/modules/drivers/drivers.module';
import { TaskService } from './task.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => DriversModule),
    forwardRef(() => BookCarsModule),
  ],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
