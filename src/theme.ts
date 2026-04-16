export const C = {
  bg:          '#0a0a0a',
  surface:     '#0f0f14',
  surface2:    '#141418',
  surface3:    '#1a1a1f',
  surface4:    '#222228',
  border:      '#282828',
  borderHi:    '#3f3f3f',
  accent:      '#e2a52e',
  accentHi:    '#f0c04a',
  accentDim:   '#7a5518',
  accentDark:  '#3d2a0c',
  blue:        '#3b82f6',
  blueHi:      '#93c5fd',
  blueDim:     '#1e3a5f',
  blueDark:    '#1e3a8a',
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
  text:        '#e4e4e7',
  textSub:     '#a1a1aa',
  textMuted:   '#84848e',
  textDim:     '#66666f',
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
