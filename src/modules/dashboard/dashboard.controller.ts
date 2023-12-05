import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('situation')
  findSituation(
    @Query('from_date') from_date: string,
    @Query('to_date') to_date: string,
  ) {
    if (!from_date || !to_date)
      return { status: HttpStatus.BAD_REQUEST, message: 'ERROR', data: [] };
    return this.dashboardService.findSituation(from_date, to_date);
  }

  @Get('order')
  findOrder(
    @Query('from_date') from_date: string,
    @Query('to_date') to_date: string,
  ) {
    if (!from_date || !to_date)
      return { status: HttpStatus.BAD_REQUEST, message: 'ERROR', data: [] };
    return this.dashboardService.findOrder(from_date, to_date);
  }

  @Get('order/status')
  findOrderStatus(
    @Query('from_date') from_date: string,
    @Query('to_date') to_date: string,
  ) {
    if (!from_date || !to_date)
      return { status: HttpStatus.BAD_REQUEST, message: 'ERROR', data: [] };
    return this.dashboardService.findOrderStatus(from_date, to_date);
  }
}
