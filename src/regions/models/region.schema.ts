import { Schema } from "mongoose";

export const REGION_INJECT = 'Region';
export const RegionSchema = new Schema({
  date: Date,
  state: String,
  code: { type: Number, required: true, index: true, unique: true },
  name: String,
  hospitalizedWithSymptomsCount: Number,
  intensiveCareCount: Number,
  hospitalizedCount: Number,
  quarantineAtHomeCount: Number,
  positiveCount: Number,
  newPositiveCount: Number,
  healedCount: Number,
  deathCount: Number,
  caseCount: Number,
  testCount: Number,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: [Number],
  },
}, { timestamps: true });