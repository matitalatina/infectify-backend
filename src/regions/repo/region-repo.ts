import { RegionDto } from './../models/region.interface';
import { Injectable } from '@nestjs/common';
import { REGION_INJECT } from '../models/region.schema';
import { Model } from 'mongoose';
import { Region } from '../models/region.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RegionRepo {
  constructor(
    @InjectModel(REGION_INJECT) private readonly regionModel: Model<Region>,
  ) { }

  async upsert(region: RegionDto): Promise<RegionDto> {
    return this.regionModel.update({ code: region.code }, region, { upsert: true }).exec();
  }

  async findAll(): Promise<RegionDto[]> {
    return this.regionModel.find({}).exec();
  }

}
