export const videoConfig = {
  id: 'TaiwanHousingDashboard',
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 720,
};

export const dataConfig = {
  defaultPath: 'data/house-prices.json',
};

export const theme = {
  fontFamily:
    'Inter, Noto Sans TC, PingFang TC, Microsoft JhengHei, Arial, sans-serif',
  background: '#05070f',
  panel: 'rgba(15, 23, 42, 0.54)',
  panelStrong: 'rgba(18, 26, 46, 0.78)',
  stroke: 'rgba(148, 163, 184, 0.18)',
  text: '#f8fafc',
  muted: '#94a3b8',
  blue: '#38bdf8',
  cyan: '#67e8f9',
  red: '#fb7185',
  amber: '#fbbf24',
  green: '#34d399',
  glowBlue: 'rgba(56, 189, 248, 0.34)',
  glowRed: 'rgba(251, 113, 133, 0.32)',
};

export const heatmapConfig = {
  lowColor: '#2563eb',
  midColor: '#22d3ee',
  highColor: '#ef4444',
  emptyColor: '#172033',
};

export const timelineConfig = {
  titleIn: 0,
  mapIn: 75,
  countyFillStart: 105,
  countyFillStagger: 4,
  yearStart: 160,
  yearDuration: 82,
  highlightStart: 130,
  highlightDuration: 11,
};
