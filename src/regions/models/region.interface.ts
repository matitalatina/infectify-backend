export type GeoPoint = {
  type: 'Point',
  coordinates: number[],
}

export interface Region {
  date: Date;
  state: string;
  code: number;
  name: string;
  hospitalizedWithSymptomsCount: number;
  intensiveCareCount: number;
  hospitalizedCount: number;
  quarantineAtHomeCount: number;
  positiveCount: number;
  newPositiveCount: number;
  healedCount: number;
  deathCount: number;
  caseCount: number;
  testCount: number;
  location: GeoPoint;
}
