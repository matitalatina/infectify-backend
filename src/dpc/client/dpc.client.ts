import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/common/http';
import { format } from 'date-fns';
import { RegionCsvParser } from '../parser/region-csv-parser';
import { RegionDto } from '../models/region.interface';
import { AxiosError } from 'axios';

export function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError;
}
@Injectable()
export class DpcClient {
  constructor(
    private readonly http: HttpService,
    private readonly regionCsvParser: RegionCsvParser,
  ) { }
  async fetchRegionsCsvRaw(date: Date): Promise<RegionDto[] | null> {
    const dateStr = format(date, 'yyyyMMdd');
    let response;

    try {
      response = await this.http
        .get<string>(`https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-${dateStr}.csv`)
        .toPromise();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response.status === 404) {
          return null;
        }
      }
      throw error;
    }


    return await this.regionCsvParser.parse(response.data);
  }
}
