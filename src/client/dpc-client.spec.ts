import { Test, TestingModule } from '@nestjs/testing';
import { DpcClient } from './dpc-client';
import { HttpService, HttpModule } from '@nestjs/common/http';
import { mock, instance, verify, when, reset } from 'ts-mockito';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

describe('DpcClient', () => {
  let provider: DpcClient;
  let http: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        DpcClient,
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
    expect(await provider.fetchRegionsCsvRaw(new Date('2020-03-06T21:00:35.317Z'))).toEqual(content);
    expect(httpSpy).toHaveBeenCalledWith('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-20200306.csv')
  });
});
