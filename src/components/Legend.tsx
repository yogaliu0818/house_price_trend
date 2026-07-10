import {heatmapConfig, theme} from '../config/videoConfig';
import {formatPrice} from '../lib/math';

export const Legend = ({min, max}: {min: number; max: number}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
    <div
      style={{
        width: 16,
        height: 260,
        borderRadius: 999,
        background: `linear-gradient(0deg, ${heatmapConfig.lowColor}, ${heatmapConfig.midColor}, ${heatmapConfig.highColor})`,
        boxShadow: '0 0 28px rgba(56,189,248,0.26)',
      }}
    />
    <div style={{height: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <span style={{fontSize: 26, color: theme.text, fontWeight: 800}}>{formatPrice(max)}</span>
      <span style={{fontSize: 24, color: theme.muted}}>中位區間</span>
      <span style={{fontSize: 26, color: theme.text, fontWeight: 800}}>{formatPrice(min)}</span>
    </div>
  </div>
);
