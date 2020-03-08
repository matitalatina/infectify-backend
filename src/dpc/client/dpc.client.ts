import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';
import { format } from 'date-fns';
import { RegionCsvParser } from '../parser/region-csv-parser';
import { RegionDto } from '../models/region.interface';

@Injectable()
export class DpcClient {
  constructor(
    private readonly http: HttpService,
    private readonly regionCsvParser: RegionCsvParser,
  ) { }
  async fetchRegionsCsvRaw(date: Date): Promise<RegionDto[] | null> {
    const dateStr = format(date, 'yyyyMMdd');
    const response = await this.http
      .get<string>(`https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-${dateStr}.csv`)
      .toPromise();

    if (response.status === 404) {
      return null;
    }

    return await this.regionCsvParser.parse(response.data);
  }
}
