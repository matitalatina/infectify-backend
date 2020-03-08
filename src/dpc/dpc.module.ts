import { REGION_INJECT, RegionSchema } from './models/region.schema';
import { Module } from '@nestjs/common';
import { RegionCsvParser } from './parser/region-csv-parser';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionRepo } from './repo/region-repo';
import { DpcClient } from './client/dpc.client';
import { RegionService } from './service/region.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: REGION_INJECT, schema: RegionSchema }]),
  ],
  providers: [RegionCsvParser, RegionRepo, DpcClient, RegionService]
})
export class DpcModule { }
