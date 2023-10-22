import { Controller, Get, Query } from '@nestjs/common';
import { MapService } from './map.service';
import { TypeCarsService } from '../type-cars/type-cars.service';

@Controller('map')
export class MapController {
  constructor(
    private readonly mapService: MapService,
    private typeCarService: TypeCarsService
  ) {}

  @Get()
  findAll(@Query() query) {
    return this.mapService.findAll(query);
  }

  @Get('check-price')
  async checkPrice(@Query() query) {
    const route = await this.mapService.getRoute(
      query.from_lat,
      query.from_lng,
      query.to_lat,
      query.to_lng,
    );
    const distance = route.routes[0].legs[0].distance.value;
    const car = await this.typeCarService.findOne({
      where: { id: query.type_car_id },
    });
    const res = {
      amount: 0,
      distance,
    };
    console.log(car);
    switch (car.code) {
      case 'XE-4-CHO':
        res.amount = Math.ceil((distance * 14) / 1000) * 1000;
      case 'XE-4-VIP':
        res.amount = Math.ceil((distance * 16) / 1000) * 1000;
      case 'XE-7-CHO':
        res.amount = Math.ceil((distance * 17) / 1000) * 1000;
      default:
        res.amount = Math.ceil((distance * 19) / 1000) * 1000;
    }

    return res;
  }

  // getRoute(@Query() query) {
  //   return this.mapService.getRoute(
  //     query.from_lat,
  //     query.from_lng,
  //     query.to_lat,
  //     query.to_lng,
  //   );
  // }
}
