import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';
import { format } from 'date-fns';

@Injectable()
export class RegionClient {
  constructor(
    private readonly http: HttpService,
  ) { }
  async fetchRegionsCsvRaw(date: Date): Promise<string> {
    const dateStr = format(date, 'yyyyMMdd');
    const response = await this.http
      .get<string>(`https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-${dateStr}.csv`)
      .toPromise();
    return response.data;
  }
}
