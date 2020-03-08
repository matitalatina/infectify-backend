import { Controller, Get, Post, HttpCode } from '@nestjs/common';
import { RegionDto } from '../models/region.interface';
import { RegionService } from '../service/region.service';

@Controller('api/v1/regions')
export class RegionsController {
  constructor(
    private readonly regionService: RegionService,
  ) { }
  @Get()
  async findAll(): Promise<RegionDto[]> {
    return await this.regionService.getAll();
  }

  @Post('sync')
  @HttpCode(200)
  async sync(): Promise<void> {
    return await this.regionService.syncLatestRegions();
  }

}
