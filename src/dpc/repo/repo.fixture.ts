import { RegionDto } from '../models/region.interface';
import { zonedTimeToUtc } from 'date-fns-tz';
export function getValidRegionDto({ code = 13 }: { code?: number } = {}): RegionDto {
  return {
    date: zonedTimeToUtc('2020-03-06 17:00:00', 'Europe/Rome'),
    state: 'ITA',
    code: code,
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
  };
}
