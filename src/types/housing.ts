export type CountyId =
  | 'taipei'
  | 'new-taipei'
  | 'taoyuan'
  | 'taichung'
  | 'tainan'
  | 'kaohsiung'
  | 'keelung'
  | 'hsinchu-city'
  | 'hsinchu-county'
  | 'miaoli'
  | 'changhua'
  | 'nantou'
  | 'yunlin'
  | 'chiayi-city'
  | 'chiayi-county'
  | 'pingtung'
  | 'yilan'
  | 'hualien'
  | 'taitung'
  | 'penghu'
  | 'kinmen'
  | 'lienchiang';

export type HousingRecord = {
  countyId: CountyId;
  countyName: string;
  year: number;
  averagePrice: number;
  unit: '萬/坪' | '萬/平方公尺';
};

export type CountyShape = {
  id: CountyId;
  name: string;
  d: string;
  label: {x: number; y: number};
  island?: true;
};

export type YearFrame = {
  year: number;
  records: HousingRecord[];
};

export type DashboardProps = {
  dataPath: string;
  records?: HousingRecord[];
};
