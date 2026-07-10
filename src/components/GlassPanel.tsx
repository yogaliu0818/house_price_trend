import type {ReactNode} from 'react';
import {theme} from '../config/videoConfig';

export const GlassPanel = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: theme.panel,
      border: `1px solid ${theme.stroke}`,
      boxShadow: `0 24px 80px rgba(0, 0, 0, 0.32), inset 0 1px 0 rgba(255,255,255,0.08)`,
      backdropFilter: 'blur(22px)',
      borderRadius: 8,
      ...style,
    }}
  >
    {children}
  </div>
);
