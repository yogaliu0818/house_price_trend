import type {HousingRecord} from '../types/housing';

export const parseCsv = (raw: string): HousingRecord[] => {
  const [headerLine, ...lines] = raw.trim().split(/\r?\n/);
  const headers = headerLine.split(',').map((item) => item.trim());

  return lines
    .filter(Boolean)
    .map((line) => {
      const values = line.split(',').map((item) => item.trim());
      const row = Object.fromEntries(headers.map((header, index) => [header, values[index]]));
      return {
        countyId: row.countyId,
        countyName: row.countyName,
        year: Number(row.year),
        averagePrice: Number(row.averagePrice),
        unit: (row.unit || '萬/坪') as HousingRecord['unit'],
      } as HousingRecord;
    });
};

export const parseHousingData = (raw: string, dataPath: string): HousingRecord[] =>
  dataPath.endsWith('.csv') ? parseCsv(raw) : (JSON.parse(raw) as HousingRecord[]);
