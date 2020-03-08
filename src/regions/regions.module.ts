import { REGION_INJECT, RegionSchema } from './models/region.schema';
import { Module } from '@nestjs/common';
import { RegionCsvParser } from './parser/region-csv-parser';
import { MongooseModule } from '@nestjs/mongoose';
import { RegionRepo } from './repo/region-repo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: REGION_INJECT, schema: RegionSchema }]),
  ],
  providers: [RegionCsvParser, RegionRepo]
})
export class RegionsModule { }
