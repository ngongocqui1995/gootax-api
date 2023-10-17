import { Controller, Get, Query } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get()
  findAll(@Query() query) {
    return this.mapService.findAll(query);
  }
}
