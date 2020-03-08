import { ConfigModule } from './../../config/config.module';
import { Test, TestingModule } from '@nestjs/testing';
import { RegionRepo } from './region-repo';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { RegionSchema, REGION_INJECT } from '../models/region.schema';
import { getValidRegionDto } from './repo.fixture';
import { Region } from '../models/region.interface';
import { Model } from 'mongoose';
import { MongooseConfig } from '../../config/mongoose-config';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { cloneDeep } from 'lodash';

describe('RegionRepo', () => {
  let provider: RegionRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        NestConfigModule.forRoot(),
        ConfigModule,
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useExisting: MongooseConfig,
        }),
        MongooseModule.forFeature([{ name: REGION_INJECT, schema: RegionSchema }]),
      ],
      providers: [RegionRepo],
    }).compile();

    const regionModel = module.get<Model<Region>>(getModelToken(REGION_INJECT));
    await regionModel.deleteMany({}).exec();
    provider = module.get<RegionRepo>(RegionRepo);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should save, update and retrieve region', async () => {
    const regionDto = getValidRegionDto();
    // If I don't create a new object, mongoose sets its properties on it
    await provider.upsert(cloneDeep(regionDto));
    await provider.upsert(cloneDeep(regionDto));
    expect(await provider.findAll()).toEqual([regionDto]);
  });

  it('should bulkUpsert', async () => {
    const regionDto1 = getValidRegionDto();
    const regionDto2 = getValidRegionDto({ code: 3 });
    // If I don't create a new object, mongoose sets its properties on it
    await provider.upsertBulk([cloneDeep(regionDto1), cloneDeep(regionDto2)]);
    const savedRegions = await provider.findAll();
    expect(savedRegions).toEqual([regionDto1, regionDto2]);
  });
});


