import { Test, TestingModule } from '@nestjs/testing';
import { startOfDay, subDays } from 'date-fns';
import { deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { DpcClient } from '../client/dpc.client';
import { RegionRepo } from '../repo/region-repo';
import { getValidRegionDto } from '../repo/repo.fixture';
import { RegionService } from './region.service';

describe('RegionService', () => {
  let provider: RegionService;
  let dpcClient: DpcClient;
  let regionRepo: RegionRepo;

  beforeEach(async () => {
    dpcClient = mock(DpcClient);
    regionRepo = mock(RegionRepo);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionService,
        {
          provide: DpcClient,
          useValue: instance(dpcClient),
        },
        {
          provide: RegionRepo,
          useValue: instance(regionRepo),
        },
      ],
    }).compile();

    provider = module.get<RegionService>(RegionService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should fetch latest regions', async () => {
    const today = startOfDay(new Date());
    const yesterday = startOfDay(subDays(new Date(), 1));
    const regionDtos = [getValidRegionDto()];
    when(dpcClient.fetchRegionsCsvRaw(deepEqual(today))).thenResolve(null);
    when(dpcClient.fetchRegionsCsvRaw(deepEqual(yesterday))).thenResolve(regionDtos);

    await provider.syncLatestRegions();

    verify(regionRepo.upsertBulk(regionDtos)).called();
  });

  it('should get all', async () => {
    const regionDtos = [getValidRegionDto()];
    when(regionRepo.findAll()).thenResolve(regionDtos);

    expect(await provider.getAll()).toEqual(regionDtos);
  })
});
