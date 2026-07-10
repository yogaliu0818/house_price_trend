import type {HousingRecord} from '../types/housing';

const parseCsv = (raw: string): HousingRecord[] => {
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

export const loadHousingRecords = async (dataPath: string): Promise<HousingRecord[]> => {
  const [{readFile}, path] = await Promise.all([
    import('node:fs/promises'),
    import('node:path'),
  ]);
  const absolutePath = path.join(process.cwd(), 'public', dataPath);
  const raw = await readFile(absolutePath, 'utf8');

  if (dataPath.endsWith('.csv')) {
    return parseCsv(raw);
  }

  return JSON.parse(raw) as HousingRecord[];
};
