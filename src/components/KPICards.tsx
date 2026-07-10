import {interpolate, useCurrentFrame} from 'remotion';
import {theme, timelineConfig} from '../config/videoConfig';
import type {HousingRecord} from '../types/housing';
import {formatPrice} from '../lib/math';
import {getStats} from '../lib/housingStats';
import {GlassPanel} from './GlassPanel';

export const KPICards = ({records}: {records: HousingRecord[]}) => {
  const frame = useCurrentFrame();
  const stats = getStats(records);
  const countUp = interpolate(frame, [timelineConfig.mapIn, timelineConfig.mapIn + 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const items = [
    {label: '全台平均', value: stats.average * countUp, accent: theme.cyan},
    {label: `最高 ${stats.highest?.countyName ?? ''}`, value: (stats.highest?.averagePrice ?? 0) * countUp, accent: theme.red},
    {label: `最低 ${stats.lowest?.countyName ?? ''}`, value: (stats.lowest?.averagePrice ?? 0) * countUp, accent: theme.green},
  ];

  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18}}>
      {items.map((item) => (
        <GlassPanel key={item.label} style={{padding: '18px 22px'}}>
          <div style={{fontSize: 21, color: theme.muted, marginBottom: 8}}>{item.label}</div>
          <div style={{fontSize: 35, lineHeight: 1, fontWeight: 850, color: theme.text}}>
            {formatPrice(item.value)}
          </div>
          <div style={{height: 3, marginTop: 14, background: item.accent, boxShadow: `0 0 24px ${item.accent}`}} />
        </GlassPanel>
      ))}
    </div>
  );
};
