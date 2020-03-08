import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { RegionsController } from './regions.controller';
import { mock, instance, when, verify } from 'ts-mockito';
import { RegionService } from '../service/region.service';
import { getValidRegionDto } from '../repo/repo.fixture';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let regionService: RegionService;

  beforeEach(async () => {
    regionService = mock(RegionService);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [
        RegionsController,
      ],
      providers: [
        {
          provide: RegionService,
          useValue: instance(regionService),
        }
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('find all', async () => {
    const regionDtos = [getValidRegionDto()];
    when(regionService.getAll()).thenResolve(regionDtos);

    return request(app.getHttpServer())
      .get('/api/v1/regions/')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(JSON.parse(JSON.stringify(regionDtos)));
      });
  });

  it('should sync', async () => {
    return request(app.getHttpServer())
      .post('/api/v1/regions/sync')
      .expect(200)
      .then(() => {
        verify(regionService.syncLatestRegions()).called();
      });
  });


});
