import type {CalculateMetadataFunction} from 'remotion';
import {Composition, staticFile} from 'remotion';
import {dataConfig, videoConfig} from './config/videoConfig';
import {parseHousingData} from './data/parseHousingData';
import {TaiwanHousingDashboard} from './TaiwanHousingDashboard';
import type {DashboardProps} from './types/housing';

const calculateMetadata: CalculateMetadataFunction<DashboardProps> = async ({props}) => {
  const raw = await fetch(staticFile(props.dataPath)).then((response) => {
    if (!response.ok) {
      throw new Error(`Unable to load housing data from ${props.dataPath}`);
    }

    return response.text();
  });
  const records = parseHousingData(raw, props.dataPath);

  return {
    props: {
      ...props,
      records,
    },
  };
};

export const RemotionRoot = () => (
  <Composition
    id={videoConfig.id}
    component={TaiwanHousingDashboard}
    width={videoConfig.width}
    height={videoConfig.height}
    fps={videoConfig.fps}
    durationInFrames={videoConfig.durationInFrames}
    defaultProps={{
      dataPath: dataConfig.defaultPath,
    }}
    calculateMetadata={calculateMetadata}
  />
);
