import { Test, TestingModule } from '@nestjs/testing';
import { RegionCsvParser } from './region-csv-parser';
import { promises as fs } from "fs";
import { zonedTimeToUtc } from 'date-fns-tz';
import { RegionDto } from '../models/region.interface';
import path from 'path';

describe('RegionCsvParser', () => {
  let provider: RegionCsvParser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegionCsvParser],
    }).compile();

    provider = module.get<RegionCsvParser>(RegionCsvParser);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should parse it', async () => {
    const csvRaw: string = (await fs.readFile(path.resolve(__dirname, '../../../test/resources/dpc-covid19-ita-regioni-20200306.csv'))).toString();

    const expectedRegions: RegionDto[] = [
      {
        date: zonedTimeToUtc('2020-03-06 17:00:00', 'Europe/Rome'),
        state: 'ITA',
        code: 13,
        name: 'Abruzzo',
        hospitalizedWithSymptomsCount: 9,
        intensiveCareCount: 0,
        hospitalizedCount: 9,
        quarantineAtHomeCount: 0,
        positiveCount: 9,
        newPositiveCount: 1,
        healedCount: 0,
        deathCount: 0,
        caseCount: 9,
        testCount: 96,
        location: {
          type: 'Point',
          coordinates: [13.39843823, 42.35122196]
        },
      },
      {
        date: zonedTimeToUtc('2020-03-06 17:00:00', 'Europe/Rome'),
        state: 'ITA',
        code: 17,
        name: 'Basilicata',
        hospitalizedWithSymptomsCount: 1,
        intensiveCareCount: 0,
        hospitalizedCount: 1,
        quarantineAtHomeCount: 2,
        positiveCount: 3,
        newPositiveCount: 2,
        healedCount: 0,
        deathCount: 0,
        caseCount: 3,
        testCount: 63,
        location: {
          type: 'Point',
          coordinates: [15.80514834, 40.63947052]
        },
      }
    ];

    expect(expectedRegions).toEqual(provider.parse(csvRaw));
  });
});
