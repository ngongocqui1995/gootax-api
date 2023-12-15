import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { BaseEntity } from 'src/common/entities/base.entity';
import { BookCar } from 'src/modules/book-cars/entities/book-car.entity';
import { Driver } from 'src/modules/drivers/entities/driver.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('driver-cancel')
export class DriverCancel extends BaseEntity {
  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryColumn({ name: 'book_car_id' })
  @ManyToOne(() => BookCar, (book) => book.driver_cancel)
  @JoinColumn({ name: 'book_car_id' })
  bookCarId: string;

  @ApiProperty({
    type: String,
    description: 'Id',
  })
  @PrimaryColumn({ name: 'driver_id' })
  @ManyToOne(() => Driver, (driver) => driver.book_cars)
  @JoinColumn({ name: 'driver_id' })
  driverId: string;
}
