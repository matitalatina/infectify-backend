import { RegionDto } from './../models/region.interface';
import { Injectable } from '@nestjs/common';
import { REGION_INJECT } from '../models/region.schema';
import { Model } from 'mongoose';
import { Region } from '../models/region.interface';
import { InjectModel } from '@nestjs/mongoose';


function toDto(region: Region): RegionDto {
  const { date, state, code, name, hospitalizedWithSymptomsCount, intensiveCareCount, hospitalizedCount, quarantineAtHomeCount, positiveCount, newPositiveCount, healedCount, deathCount, caseCount, testCount, location, } = region.toObject();
  return { date, state, code, name, hospitalizedWithSymptomsCount, intensiveCareCount, hospitalizedCount, quarantineAtHomeCount, positiveCount, newPositiveCount, healedCount, deathCount, caseCount, testCount, location };
}

@Injectable()
export class RegionRepo {
  constructor(
    @InjectModel(REGION_INJECT) private readonly regionModel: Model<Region>,
  ) { }

  async upsert(region: RegionDto): Promise<RegionDto> {
    return this.regionModel.update({ code: region.code }, region, { upsert: true }).exec();
  }

  async upsertBulk(regions: RegionDto[]): Promise<void> {
    const regionsQuery = regions.map(r => ({
      updateOne: {
        filter: { code: r.code },
        update: r,
        upsert: true,
      }
    }))
    this.regionModel.bulkWrite(regionsQuery);
  }

  async findAll(): Promise<RegionDto[]> {
    return (await this.regionModel.find({}).exec()).map(toDto);
  }

}
