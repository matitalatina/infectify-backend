import { HttpModule, HttpService } from '@nestjs/common/http';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';
import { instance, mock, when } from 'ts-mockito';
import { RegionCsvParser } from '../parser/region-csv-parser';
import { getValidRegionDto } from '../repo/repo.fixture';
import { DpcClient } from './dpc.client';

describe('DpcClient', () => {
  let provider: DpcClient;
  let http: HttpService;
  let regionCsvParser: RegionCsvParser;

  beforeEach(async () => {
    regionCsvParser = mock(RegionCsvParser);
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        DpcClient,
        {
          provide: RegionCsvParser,
          useFactory: () => instance(regionCsvParser),
        }
      ],
    })
      .compile();

    provider = module.get<DpcClient>(DpcClient);
    http = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should fetch regions by date', async () => {
    const content = 'content';
    const axiosResponse: AxiosResponse = {
      data: content,
      status: 200,
      statusText: '',
      headers: {},
      config: {},
    };
    const httpSpy = jest.spyOn(http, 'get').mockReturnValue(of(axiosResponse));
    const expectedResponse = [getValidRegionDto()];
    when(regionCsvParser.parse(content)).thenReturn(expectedResponse)
    expect(await provider.fetchRegionsCsvRaw(new Date('2020-03-06T21:00:35.317Z'))).toEqual(expectedResponse);
    expect(httpSpy).toHaveBeenCalledWith('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-20200306.csv')
  });

  it('should handle not found file', async () => {
    const error = {
      isAxiosError: true,
      response: {
        data: null,
        status: 404,
        statusText: '',
        headers: {},
        config: {},
      },
    };
    const httpSpy = jest.spyOn(http, 'get').mockReturnValue(throwError(error));
    expect(await provider.fetchRegionsCsvRaw(new Date('2020-03-06T21:00:35.317Z'))).toEqual(null);
    expect(httpSpy).toHaveBeenCalledWith('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-20200306.csv')
  });
});
