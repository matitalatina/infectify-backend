/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { Region } from '../models/region.interface';
import parse from 'csv-parse/lib/sync';
import { zonedTimeToUtc } from 'date-fns-tz';

@Injectable()
export class RegionCsvParser {
  parse(csvRaw: string): Region[] {
    return parse(csvRaw, {
      columns: true,
      skip_empty_lines: true,
    }).map(({ data, stato, codice_regione, denominazione_regione, lat, long, ricoverati_con_sintomi, terapia_intensiva, totale_ospedalizzati, isolamento_domiciliare, totale_attualmente_positivi, nuovi_attualmente_positivi, dimessi_guariti, deceduti, totale_casi, tamponi }) => {
      return {
        date: zonedTimeToUtc(data, 'Europe/Rome'),
        state: stato,
        code: +codice_regione,
        name: denominazione_regione,
        hospitalizedWithSymptomsCount: +ricoverati_con_sintomi,
        intensiveCareCount: +terapia_intensiva,
        hospitalizedCount: +totale_ospedalizzati,
        quarantineAtHomeCount: +isolamento_domiciliare,
        positiveCount: +totale_attualmente_positivi,
        newPositiveCount: +nuovi_attualmente_positivi,
        healedCount: +dimessi_guariti,
        deathCount: +deceduti,
        caseCount: +totale_casi,
        testCount: +tamponi,
        location: {
          type: 'Point',
          coordinates: [+long, +lat]
        },
      }
    });
  }
}
