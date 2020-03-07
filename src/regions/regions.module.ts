import { Module } from '@nestjs/common';
import { RegionCsvParser } from './parser/region-csv-parser';

@Module({
  providers: [RegionCsvParser]
})
export class RegionsModule {}
