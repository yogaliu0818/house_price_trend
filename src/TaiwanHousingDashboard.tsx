import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {theme, timelineConfig} from './config/videoConfig';
import {countyOrder} from './data/taiwanCounties';
import {getGlobalRange, getInterpolatedRecords, getRankedRecords, getYears} from './lib/housingStats';
import {fade} from './lib/math';
import type {CountyId, DashboardProps} from './types/housing';
import {Heatmap} from './components/Heatmap';
import {KPICards} from './components/KPICards';
import {Legend} from './components/Legend';
import {RankingChart} from './components/RankingChart';
import {Timeline} from './components/Timeline';
import {Title} from './components/Title';
import {Tooltip} from './components/Tooltip';
import {TrendChart} from './components/TrendChart';

export const TaiwanHousingDashboard = ({records = []}: DashboardProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const years = getYears(records);
  const yearProgress = Math.max(0, frame - timelineConfig.yearStart) / timelineConfig.yearDuration;
  const fromIndex = Math.min(Math.floor(yearProgress), Math.max(0, years.length - 1));
  const toIndex = Math.min(fromIndex + 1, Math.max(0, years.length - 1));
  const progress = interpolate(yearProgress % 1, [0, 0.72, 1], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const currentYear = years[toIndex] ?? years[0] ?? 0;
  const currentRecords = getInterpolatedRecords(records, years[fromIndex] ?? currentYear, currentYear, progress);
  const {min, max} = getGlobalRange(records);
  const highlightIndex =
    Math.floor(Math.max(0, frame - timelineConfig.highlightStart) / timelineConfig.highlightDuration) %
    countyOrder.length;
  const highlightedCountyId = countyOrder[highlightIndex] as CountyId;
  const highlightedRecord = currentRecords.find((record) => record.countyId === highlightedCountyId);
  const rank =
    getRankedRecords(currentRecords).findIndex((record) => record.countyId === highlightedCountyId) + 1;
  const backgroundPulse = interpolate(frame % (fps * 4), [0, fps * 4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: theme.background,
        color: theme.text,
        fontFamily: theme.fontFamily,
        overflow: 'hidden',
      }}
    >
      <AbsoluteFill
        style={{
          background:
            `radial-gradient(circle at ${24 + backgroundPulse * 8}% 18%, rgba(56,189,248,0.22), transparent 28%), ` +
            `radial-gradient(circle at 84% ${30 + backgroundPulse * 18}%, rgba(251,113,133,0.18), transparent 30%), ` +
            'linear-gradient(135deg, #05070f 0%, #0b1020 45%, #05070f 100%)',
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)',
          backgroundSize: '54px 54px',
          opacity: 0.26,
        }}
      />
      <div style={{position: 'relative', padding: '72px 86px 66px', height: '100%', display: 'flex', flexDirection: 'column', gap: 32}}>
        <Title year={currentYear} />
        <div style={{display: 'grid', gridTemplateColumns: '770px 1fr', gap: 36, flex: 1, minHeight: 0}}>
          <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Heatmap records={currentRecords} min={min} max={max} highlightedCountyId={highlightedCountyId} />
            <div style={{position: 'absolute', right: 6, top: 86, opacity: fade(frame, [150, 190])}}>
              <Legend min={min} max={max} />
            </div>
            <div style={{position: 'absolute', left: 14, bottom: 120}}>
              <Tooltip record={highlightedRecord} rank={rank} />
            </div>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center'}}>
            <KPICards records={currentRecords} />
            <RankingChart records={currentRecords} />
            <TrendChart records={records} />
          </div>
        </div>
        <div style={{height: 76, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Timeline years={years} activeIndex={toIndex} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
