import { Test, TestingModule } from '@nestjs/testing';
import { RegionService } from './region.service';
import { DpcClient } from '../client/dpc.client';
import { mock, instance, when } from 'ts-mockito';
import { RegionRepo } from '../repo/region-repo';
import { startOfDay, addDays, subDays } from 'date-fns';
import { getValidRegionDto } from '../repo/repo.fixture';

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
    when(dpcClient.fetchRegionsCsvRaw(today)).thenResolve(null);
    when(dpcClient.fetchRegionsCsvRaw(yesterday)).thenResolve(regionDtos);

    // await provider.syncLatestRegions();
  });
});
