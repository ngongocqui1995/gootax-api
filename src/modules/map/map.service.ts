import { HttpService } from '@nestjs/axios';
import { Injectable, Query } from '@nestjs/common';

@Injectable()
export class MapService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(@Query() query) {
    this.interceptor();
    if (!query.address) return { results: [] };

    const res = await this.httpService.axiosRef.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`,
      {
        params: {
          key: process.env.GOOGLE_MAPS_API_KEY,
          input: query.address,
          inputtype: 'textquery',
          fields: 'formatted_address,geometry',
          // bias locations in 20km from center of HCMC
          locationbias: 'circle:20000@10.773100,106.684394',
        },
      },
    );
    return res.data;
  }

  async getRoute(from_lat: number, from_lng: number, to_lat: number, to_lng: number) {
    const res = await this.httpService.axiosRef.get(
      `https://maps.googleapis.com/maps/api/directions/json`,
      {
        params: {
          key: process.env.GOOGLE_MAPS_API_KEY,
          origin: `${from_lat},${from_lng}`,
          destination: `${to_lat},${to_lng}`,
          mode: 'driving',
        },
      },
    );
    return res.data;
  };

  interceptor() {
    this.httpService.axiosRef.interceptors.request.use(request => {
      console.log('Starting Request', JSON.stringify(request, null, 2));
      return request;
    })
    
  }
}
