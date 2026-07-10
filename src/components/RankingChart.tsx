import {interpolate, useCurrentFrame} from 'remotion';
import {theme, timelineConfig} from '../config/videoConfig';
import type {HousingRecord} from '../types/housing';
import {formatPrice} from '../lib/math';
import {getRankedRecords} from '../lib/housingStats';
import {GlassPanel} from './GlassPanel';

export const RankingChart = ({records}: {records: HousingRecord[]}) => {
  const frame = useCurrentFrame();
  const ranked = getRankedRecords(records).slice(0, 6);
  const max = ranked[0]?.averagePrice ?? 1;

  return (
    <GlassPanel style={{padding: 24, height: 282}}>
      <div style={{fontSize: 27, color: theme.text, fontWeight: 850, marginBottom: 16}}>房價排行榜</div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 9}}>
        {ranked.map((record, index) => {
          const progress = interpolate(frame, [timelineConfig.mapIn + index * 5, timelineConfig.mapIn + 50 + index * 5], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <div key={record.countyId} style={{display: 'grid', gridTemplateColumns: '108px 1fr 94px', alignItems: 'center', gap: 12}}>
              <div style={{fontSize: 19, color: index < 3 ? theme.text : theme.muted, fontWeight: 750, whiteSpace: 'nowrap'}}>
                {String(index + 1).padStart(2, '0')} {record.countyName}
              </div>
              <div style={{height: 12, background: 'rgba(148,163,184,0.14)', borderRadius: 999, overflow: 'hidden'}}>
                <div
                  style={{
                    width: `${(record.averagePrice / max) * 100 * progress}%`,
                    height: '100%',
                    borderRadius: 999,
                    background: `linear-gradient(90deg, ${theme.blue}, ${theme.red})`,
                    boxShadow: `0 0 18px ${theme.glowRed}`,
                  }}
                />
              </div>
              <div style={{fontSize: 18, color: theme.text, textAlign: 'right', fontWeight: 800}}>
                {formatPrice(record.averagePrice)}
              </div>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
};
