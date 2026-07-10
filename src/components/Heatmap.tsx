import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {heatmapConfig, theme, timelineConfig} from '../config/videoConfig';
import {taiwanCounties} from '../data/taiwanCounties';
import type {CountyId, HousingRecord} from '../types/housing';
import {fade, heatColor, springProgress} from '../lib/math';
import {County} from './County';

export const Heatmap = ({
  records,
  min,
  max,
  highlightedCountyId,
}: {
  records: HousingRecord[];
  min: number;
  max: number;
  highlightedCountyId?: CountyId;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = springProgress(frame, fps, timelineConfig.mapIn);
  const opacity = fade(frame, [timelineConfig.mapIn, timelineConfig.mapIn + 42]);
  const cameraScale = interpolate(frame, [80, 480], [0.92, 1.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraX = interpolate(frame, [80, 480], [26, -18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cameraY = interpolate(frame, [80, 480], [20, -10], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <svg
      viewBox="-20 35 500 1015"
      style={{
        width: 690,
        height: 760,
        overflow: 'visible',
        opacity,
        scale: reveal,
        translate: `${cameraX}px ${cameraY}px`,
      }}
    >
      <defs>
        <radialGradient id="mapGlow" cx="48%" cy="48%" r="62%">
          <stop offset="0%" stopColor="rgba(103,232,249,0.22)" />
          <stop offset="100%" stopColor="rgba(103,232,249,0)" />
        </radialGradient>
        <linearGradient id="legendGradient" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={heatmapConfig.lowColor} />
          <stop offset="50%" stopColor={heatmapConfig.midColor} />
          <stop offset="100%" stopColor={heatmapConfig.highColor} />
        </linearGradient>
      </defs>
      <g style={{scale: cameraScale, transformOrigin: '230px 540px'}}>
        <ellipse cx="245" cy="560" rx="260" ry="555" fill="url(#mapGlow)" />
        {taiwanCounties.map((shape, index) => {
          const record = records.find((item) => item.countyId === shape.id);
          return (
            <County
              key={shape.id}
              shape={shape}
              index={index}
              record={record}
              min={min}
              max={max}
              highlighted={shape.id === highlightedCountyId}
            />
          );
        })}
        {taiwanCounties.map((shape) => {
          const record = records.find((item) => item.countyId === shape.id);
          const labelVisible = shape.id === highlightedCountyId || shape.island;
          return (
            <text
              key={`${shape.id}-label`}
              x={shape.label.x}
              y={shape.label.y}
              textAnchor="middle"
              fill={labelVisible ? theme.text : 'rgba(248,250,252,0.28)'}
              fontSize={shape.island ? 18 : 15}
              fontWeight={700}
              opacity={record ? 1 : 0.5}
            >
              {shape.name.replace(/[縣市]/g, '')}
            </text>
          );
        })}
      </g>
    </svg>
  );
};
