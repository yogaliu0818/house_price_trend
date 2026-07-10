import {interpolate, useCurrentFrame} from 'remotion';
import {theme} from '../config/videoConfig';

export const Timeline = ({
  years,
  activeIndex,
}: {
  years: number[];
  activeIndex: number;
}) => {
  const frame = useCurrentFrame();
  const shimmer = interpolate(frame % 90, [0, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
      {years.map((year, index) => {
        const active = index <= activeIndex;
        return (
          <div key={year} style={{display: 'flex', alignItems: 'center', gap: 20}}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 999,
                display: 'grid',
                placeItems: 'center',
                color: active ? theme.text : theme.muted,
                fontSize: 22,
                fontWeight: 850,
                border: `1px solid ${active ? theme.cyan : theme.stroke}`,
                background: active ? 'rgba(103,232,249,0.14)' : 'rgba(15,23,42,0.6)',
                boxShadow: active ? `0 0 ${18 + shimmer * 18}px ${theme.glowBlue}` : 'none',
              }}
            >
              {year}
            </div>
            {index < years.length - 1 && (
              <div style={{width: 86, height: 3, background: index < activeIndex ? theme.cyan : 'rgba(148,163,184,0.18)'}} />
            )}
          </div>
        );
      })}
    </div>
  );
};
