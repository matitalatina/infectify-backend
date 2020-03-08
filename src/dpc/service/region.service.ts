import { DpcClient } from './../client/dpc.client';
import { Injectable } from '@nestjs/common';
import { subDays, startOfDay } from 'date-fns';
import { RegionRepo } from '../repo/region-repo';
import { RegionDto } from '../models/region.interface';

const MAXIMUM_OLD_DAYS = 7;
@Injectable()
export class RegionService {
  constructor(
    private readonly dpcClient: DpcClient,
    private readonly regionRepo: RegionRepo
  ) { }

  async syncLatestRegions(): Promise<void> {
    const regions = await this.fetchLatestRegions();
    await this.regionRepo.upsertBulk(regions);
  }

  async getAll(): Promise<RegionDto[]> {
    return await this.regionRepo.findAll();
  }

  private async fetchLatestRegions(): Promise<RegionDto[]> {
    const today = startOfDay(new Date());
    for (let i = 0; i < MAXIMUM_OLD_DAYS; i++) {
      const date = subDays(today, i);
      const response = await this.dpcClient.fetchRegionsCsvRaw(date);
      if (response != null) {
        return response;
      }
    }
    throw new Error('No new region data');
  }
}
