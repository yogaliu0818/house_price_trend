import {interpolate, useCurrentFrame} from 'remotion';
import {theme, timelineConfig} from '../config/videoConfig';
import {taiwanCounties} from '../data/taiwanCounties';
import type {CountyId, HousingRecord} from '../types/housing';
import {getRecordsByCounty, getYears} from '../lib/housingStats';
import {GlassPanel} from './GlassPanel';

const chartCountyIds: CountyId[] = ['taipei', 'new-taipei', 'taichung', 'kaohsiung'];
const colors = [theme.red, theme.cyan, theme.amber, theme.green];

export const TrendChart = ({records}: {records: HousingRecord[]}) => {
  const frame = useCurrentFrame();
  const years = getYears(records);
  const values = records.map((record) => record.averagePrice);
  const min = Math.min(...values) * 0.88;
  const max = Math.max(...values) * 1.05;
  const draw = interpolate(frame, [timelineConfig.mapIn + 30, timelineConfig.mapIn + 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const width = 510;
  const height = 160;

  const toPoint = (record: HousingRecord, index: number) => {
    const x = years.length <= 1 ? 0 : (index / (years.length - 1)) * width;
    const y = height - ((record.averagePrice - min) / (max - min)) * height;
    return `${x},${y}`;
  };

  return (
    <GlassPanel style={{padding: 24, height: 250}}>
      <div style={{fontSize: 27, color: theme.text, fontWeight: 850, marginBottom: 12}}>歷年房價趨勢</div>
      <svg viewBox={`0 0 ${width} ${height + 42}`} style={{width: '100%', height: 174, overflow: 'visible'}}>
        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1={0}
            x2={width}
            y1={(line / 3) * height}
            y2={(line / 3) * height}
            stroke="rgba(148,163,184,0.16)"
          />
        ))}
        {chartCountyIds.map((countyId, index) => {
          const countyRecords = getRecordsByCounty(records, countyId);
          const points = countyRecords.map(toPoint).join(' ');
          const county = taiwanCounties.find((item) => item.id === countyId);
          return (
            <g key={countyId}>
              <polyline
                points={points}
                fill="none"
                stroke={colors[index]}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - draw}
                style={{filter: `drop-shadow(0 0 12px ${colors[index]})`}}
              />
              <text x={width - 4} y={20 + index * 24} textAnchor="end" fill={colors[index]} fontSize={18} fontWeight={800}>
                {county?.name}
              </text>
            </g>
          );
        })}
        {years.map((year, index) => (
          <text
            key={year}
            x={years.length <= 1 ? 0 : (index / (years.length - 1)) * width}
            y={height + 32}
            textAnchor={index === 0 ? 'start' : index === years.length - 1 ? 'end' : 'middle'}
            fill={theme.muted}
            fontSize={18}
            fontWeight={700}
          >
            {year}
          </text>
        ))}
      </svg>
    </GlassPanel>
  );
};
