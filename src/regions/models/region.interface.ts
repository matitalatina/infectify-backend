import { Document } from 'mongoose';

export interface GeoPoint {
  type: 'Point',
  coordinates: number[],
}

export interface RegionDto {
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

export interface Region extends RegionDto, Document {

}
