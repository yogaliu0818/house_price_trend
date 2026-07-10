import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {heatmapConfig, theme, timelineConfig} from '../config/videoConfig';
import type {CountyShape, HousingRecord} from '../types/housing';
import {fade, heatColor, springProgress} from '../lib/math';

export const County = ({
  shape,
  index,
  record,
  min,
  max,
  highlighted,
}: {
  shape: CountyShape;
  index: number;
  record?: HousingRecord;
  min: number;
  max: number;
  highlighted: boolean;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = springProgress(
    frame,
    fps,
    timelineConfig.countyFillStart + index * timelineConfig.countyFillStagger,
  );
  const pathOpacity = fade(frame, [timelineConfig.mapIn, timelineConfig.mapIn + 48], [0, 1]);
  const baseColor = record
    ? heatColor(
        record.averagePrice,
        min,
        max,
        heatmapConfig.lowColor,
        heatmapConfig.midColor,
        heatmapConfig.highColor,
      )
    : heatmapConfig.emptyColor;
  const fillMix = interpolate(reveal, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <path
      d={shape.d}
      fill={fillMix > 0.02 ? baseColor : heatmapConfig.emptyColor}
      stroke={highlighted ? '#ffffff' : 'rgba(226,232,240,0.42)'}
      strokeWidth={highlighted ? 4.5 : 1.5}
      opacity={pathOpacity}
      style={{
        filter: highlighted
          ? `drop-shadow(0 0 18px ${theme.glowRed}) drop-shadow(0 0 30px rgba(255,255,255,0.28))`
          : `drop-shadow(0 0 ${10 * reveal}px rgba(56,189,248,0.16))`,
      }}
    />
  );
};
