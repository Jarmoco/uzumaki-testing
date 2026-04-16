export const C = {
  bg:          '#08080f',
  surface:     '#0f0f1a',
  surface2:    '#15151f',
  surface3:    '#1e1e2e',
  surface4:    '#262636',
  border:      '#252535',
  borderHi:    '#353555',
  accent:      '#7c3aed',
  accentHi:    '#a78bfa',
  accentDim:   '#3b1f7a',
  accentDark:  '#1e1040',
  blue:        '#3b82f6',
  blueHi:      '#93c5fd',
  blueDim:     '#1e3a5f',
  blueDark:    '#1e3a8f',
  green:       '#22c55e',
  greenHi:     '#86efac',
  greenDim:    '#14532d',
  red:         '#ef4444',
  redHi:       '#fca5a5',
  redDim:      '#7f1d1d',
  orange:      '#f97316',
  orangeHi:    '#fdba74',
  yellow:      '#eab308',
  yellowHi:    '#fde047',
  text:        '#e4e4f0',
  textSub:     '#b4b4c8',
  textMuted:   '#6b6b80',
  textDim:     '#9090a8',
};

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function indexColor(i: number, tick: number): string {
  const palette = [
    '#7c3aed', '#3b82f6', '#22c55e', '#f97316',
    '#ef4444', '#eab308', '#ec4899', '#06b6d4',
    '#84cc16', '#a855f7', '#14b8a6', '#f43f5e',
  ];
  return palette[(i + Math.floor(tick / 3)) % palette.length];
}
