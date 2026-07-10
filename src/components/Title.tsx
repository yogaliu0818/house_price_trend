import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme} from '../config/videoConfig';
import {fade, springProgress} from '../lib/math';

export const Title = ({year}: {year: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const intro = springProgress(frame, fps, 6, {damping: 16, stiffness: 80, mass: 0.9});
  const opacity = fade(frame, [0, 38]);
  const subtitleOpacity = fade(frame, [24, 64]);
  const yearSlide = interpolate(frame, [100, 180], [36, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
      <div style={{opacity, scale: intro, transformOrigin: 'left top'}}>
        <div style={{fontSize: 28, color: theme.cyan, fontWeight: 850, letterSpacing: 0}}>TAIWAN HOUSING INTELLIGENCE</div>
        <div style={{fontSize: 74, lineHeight: 1.04, color: theme.text, fontWeight: 950, marginTop: 12}}>
          台灣房價熱力圖
        </div>
        <div style={{fontSize: 34, color: theme.muted, marginTop: 14, opacity: subtitleOpacity}}>
          動態縣市分析、排行榜與歷年趨勢
        </div>
      </div>
      <div style={{textAlign: 'right', translate: `0 ${yearSlide}px`, opacity: fade(frame, [84, 130])}}>
        <div style={{fontSize: 28, color: theme.muted, fontWeight: 700}}>資料年度</div>
        <div style={{fontSize: 92, lineHeight: 1, color: theme.text, fontWeight: 950}}>{year}</div>
      </div>
    </div>
  );
};
