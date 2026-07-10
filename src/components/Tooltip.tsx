import {interpolate, useCurrentFrame} from 'remotion';
import {theme, timelineConfig} from '../config/videoConfig';
import type {HousingRecord} from '../types/housing';
import {formatPrice} from '../lib/math';
import {GlassPanel} from './GlassPanel';

export const Tooltip = ({
  record,
  rank,
}: {
  record?: HousingRecord;
  rank: number;
}) => {
  const frame = useCurrentFrame();
  const pulse = frame % timelineConfig.highlightDuration;
  const opacity = interpolate(pulse, [0, 4, timelineConfig.highlightDuration - 3], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  if (!record) {
    return null;
  }

  return (
    <GlassPanel
      style={{
        padding: '22px 26px',
        width: 310,
        opacity,
        background: theme.panelStrong,
        boxShadow: `0 22px 70px rgba(0,0,0,0.42), 0 0 42px ${theme.glowBlue}`,
      }}
    >
      <div style={{fontSize: 26, color: theme.muted, fontWeight: 700}}>正在高亮</div>
      <div style={{fontSize: 46, color: theme.text, fontWeight: 900, marginTop: 5}}>{record.countyName}</div>
      <div style={{fontSize: 34, color: theme.cyan, fontWeight: 850, marginTop: 8}}>{formatPrice(record.averagePrice)}</div>
      <div style={{fontSize: 24, color: theme.text, marginTop: 14}}>全台排名 #{rank}</div>
    </GlassPanel>
  );
};
