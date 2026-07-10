import {countyOrder} from '../data/taiwanCounties';
import type {CountyId, HousingRecord, YearFrame} from '../types/housing';
import {lerp} from './math';

export const getYears = (records: HousingRecord[]) =>
  [...new Set(records.map((record) => record.year))].sort((a, b) => a - b);

export const getYearFrames = (records: HousingRecord[]): YearFrame[] =>
  getYears(records).map((year) => ({
    year,
    records: records.filter((record) => record.year === year),
  }));

export const getRecordsByCounty = (records: HousingRecord[], countyId: CountyId) =>
  records
    .filter((record) => record.countyId === countyId)
    .sort((a, b) => a.year - b.year);

export const getCurrentYearData = (
  records: HousingRecord[],
  yearIndex: number,
) => {
  const frames = getYearFrames(records);
  return frames[Math.min(yearIndex, frames.length - 1)] ?? {year: 0, records: []};
};

export const getGlobalRange = (records: HousingRecord[]) => {
  const prices = records.map((record) => record.averagePrice);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

export const getRankedRecords = (records: HousingRecord[]) =>
  [...records].sort((a, b) => b.averagePrice - a.averagePrice);

export const getStats = (records: HousingRecord[]) => {
  const ranked = getRankedRecords(records);
  const total = records.reduce((sum, record) => sum + record.averagePrice, 0);
  return {
    average: records.length ? total / records.length : 0,
    highest: ranked[0],
    lowest: ranked.at(-1),
  };
};

export const getInterpolatedRecords = (
  records: HousingRecord[],
  fromYear: number,
  toYear: number,
  progress: number,
) => {
  const fromRecords = records.filter((record) => record.year === fromYear);
  const toRecords = records.filter((record) => record.year === toYear);

  return countyOrder
    .map((countyId) => {
      const from = fromRecords.find((record) => record.countyId === countyId);
      const to = toRecords.find((record) => record.countyId === countyId) ?? from;

      if (!from || !to) {
        return null;
      }

      return {
        ...to,
        averagePrice: lerp(from.averagePrice, to.averagePrice, progress),
      };
    })
    .filter((record): record is HousingRecord => Boolean(record));
};
