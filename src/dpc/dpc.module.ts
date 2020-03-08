import { REGION_INJECT, RegionSchema } from './models/region.schema';
import { Module, HttpModule } from '@nestjs/common';
import { RegionCsvParser } from './parser/region-csv-parser';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionRepo } from './repo/region-repo';
import { DpcClient } from './client/dpc.client';
import { RegionService } from './service/region.service';
import { RegionsController } from './controller/regions.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: REGION_INJECT, schema: RegionSchema }]),
  ],
  providers: [RegionCsvParser, RegionRepo, DpcClient, RegionService],
  controllers: [RegionsController]
})
export class DpcModule { }
