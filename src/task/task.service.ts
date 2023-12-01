import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { io } from 'socket.io-client';
import { TicketEventType } from 'src/event/dto/event-chat.dto';
import { BookCarsService } from 'src/modules/book-cars/book-cars.service';
import { DriversService } from 'src/modules/drivers/drivers.service';
import { Between } from 'typeorm';

let isBookCar = false;

@Injectable()
export class TaskService {
  constructor(
    @Inject(forwardRef(() => DriversService))
    private driverService: DriversService,
    @Inject(forwardRef(() => BookCarsService))
    private bookCarService: BookCarsService,
  ) {}

  private socket = io(`http://localhost:${process.env.APP_PORT}`);

  getDistance(
    p1: { lat: number; lng: number },
    p2: { lat: number; lng: number },
  ) {
    const R = 6378137;
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 100;
    const dLong = ((p2.lng - p1.lng) * Math.PI) / 100;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((p1.lat * Math.PI) / 100) *
        Math.cos((p2.lat * Math.PI) / 100) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    return d;
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleBookCar() {
    if (!isBookCar) {
      const socket = io(`${process.env.HOST}:${process.env.APP_PORT}`);
      const C = 0.04;
      const allow_distance = 5000;
      isBookCar = true;

      socket.on('connect', async () => {
        const bookCars = await this.bookCarService.find({
          where: { driver: null, status: 'FINDING' },
          relations: {
            driver_cancel: true,
          },
        });

        for await (const book of bookCars) {
          const drivers = await this.driverService.find({
            where: {
              current_lat: Between(
                book.from_address_lat - C,
                book.from_address_lat + C,
              ),
              current_lng: Between(
                book.from_address_lng - C,
                book.from_address_lng + C,
              ),
            },
          });

          for await (const driver of drivers) {
            const distance = this.getDistance(
              { lat: book.from_address_lat, lng: book.from_address_lng },
              { lat: driver.current_lat, lng: driver.current_lng },
            );
            if (distance > allow_distance) continue;

            await new Promise((resolve) => {
              socket.emit(
                'message',
                {
                  cmd_type: TicketEventType.MESSAGE,
                  room_id: driver.id,
                  message: book,
                },
                (value) => {
                  resolve(value);
                },
              );
            });
          }
        }

        socket.disconnect();
      });

      socket.on('disconnect', () => {
        isBookCar = false;
      });
    }
  }
}
