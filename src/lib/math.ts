import {Easing, interpolate, spring} from 'remotion';

export const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const formatPrice = (value: number) =>
  `${Math.round(value).toLocaleString('zh-TW')} 萬/坪`;

export const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const fade = (
  frame: number,
  input: [number, number],
  output: [number, number] = [0, 1],
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: ease,
  });

export const springProgress = (
  frame: number,
  fps: number,
  delay: number,
  config = {damping: 18, stiffness: 95, mass: 0.75},
) =>
  spring({
    frame: Math.max(0, frame - delay),
    fps,
    config,
    durationInFrames: 34,
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const hexToRgb = (hex: string) => {
  const value = hex.replace('#', '');
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
};

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')}`;

export const mixColor = (from: string, to: string, t: number) => {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  return rgbToHex(lerp(a.r, b.r, t), lerp(a.g, b.g, t), lerp(a.b, b.b, t));
};

export const heatColor = (
  value: number,
  min: number,
  max: number,
  low: string,
  mid: string,
  high: string,
) => {
  const t = max === min ? 0.5 : clamp((value - min) / (max - min), 0, 1);
  return t < 0.5
    ? mixColor(low, mid, t * 2)
    : mixColor(mid, high, (t - 0.5) * 2);
};
