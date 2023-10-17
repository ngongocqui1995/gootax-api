import { HttpService } from '@nestjs/axios';
import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class MapService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(@Query() query) {
    if (!query.address) return { results: [] };

    const res = await this.httpService.axiosRef.get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json`,
      {
        params: {
          key: process.env.GOOGLE_MAPS_API_KEY,
          query: query.address,
          language: 'vi',
          radius: 100,
        },
      },
    );

    return res.data;
  }
}
