import React from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {dataConfig, videoConfig} from '../config/videoConfig';
import {parseHousingData} from '../data/parseHousingData';
import {TaiwanHousingDashboard} from '../TaiwanHousingDashboard';
import type {HousingRecord} from '../types/housing';
import './site.css';

const useHousingRecords = () => {
  const [records, setRecords] = React.useState<HousingRecord[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}${dataConfig.defaultPath}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`資料載入失敗：${response.status}`);
        }

        return response.text();
      })
      .then((raw) => setRecords(parseHousingData(raw, dataConfig.defaultPath)))
      .catch((reason: unknown) => {
        setError(reason instanceof Error ? reason.message : '資料載入失敗');
      });
  }, []);

  return {records, error};
};

const App = () => {
  const {records, error} = useHousingRecords();
  const isReady = records.length > 0;

  return (
    <main className="site-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Taiwan Housing Intelligence</p>
          <h1>台灣房價熱力圖 Dashboard</h1>
          <p className="summary">
            可互動預覽的 Remotion 動態資料視覺化，使用外部 JSON/CSV 資料、縣市熱力圖、KPI、排行榜與歷年趨勢。
          </p>
        </div>
        <div className="meta-grid">
          <div>
            <span>Composition</span>
            <strong>{videoConfig.id}</strong>
          </div>
          <div>
            <span>Format</span>
            <strong>
              {videoConfig.width}x{videoConfig.height}
            </strong>
          </div>
          <div>
            <span>Data</span>
            <strong>{dataConfig.defaultPath}</strong>
          </div>
        </div>
      </section>

      <section className="player-frame">
        {error ? <div className="state">{error}</div> : null}
        {!error && !isReady ? <div className="state">載入房價資料中...</div> : null}
        {isReady ? (
          <Player
            component={TaiwanHousingDashboard}
            compositionWidth={videoConfig.width}
            compositionHeight={videoConfig.height}
            durationInFrames={videoConfig.durationInFrames}
            fps={videoConfig.fps}
            controls
            loop
            autoPlay
            inputProps={{
              dataPath: dataConfig.defaultPath,
              records,
            }}
            style={{
              width: '100%',
              aspectRatio: `${videoConfig.width} / ${videoConfig.height}`,
              borderRadius: 8,
              overflow: 'hidden',
            }}
          />
        ) : null}
      </section>
    </main>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
