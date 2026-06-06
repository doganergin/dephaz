export interface DarkPalette {
  id: string;
  name: string;
  background: string;
  cardBg: string;
  border: string;
  muted: string;
  foreground: string;
}

export const DARK_PALETTES: DarkPalette[] = [
  { id: 'zinc',      name: 'Zinc',        background: '#18181b', cardBg: '#27272a', border: '#3f3f46', muted: '#a1a1aa', foreground: '#fafafa'  },
  { id: 'slate',     name: 'Slate',       background: '#0f172a', cardBg: '#1e293b', border: '#334155', muted: '#94a3b8', foreground: '#f8fafc'  },
  { id: 'github',    name: 'GitHub Dark', background: '#0d1117', cardBg: '#161b22', border: '#30363d', muted: '#8b949e', foreground: '#e6edf3'  },
  { id: 'stone',     name: 'Stone',       background: '#1c1917', cardBg: '#292524', border: '#44403c', muted: '#a8a29e', foreground: '#fafaf9'  },
  { id: 'black',     name: 'Pure Black',  background: '#000000', cardBg: '#0f0f0f', border: '#1c1c1c', muted: '#737373', foreground: '#fafafa'  },
  { id: 'neutral',   name: 'Neutral',     background: '#171717', cardBg: '#262626', border: '#404040', muted: '#a3a3a3', foreground: '#fafafa'  },
  { id: 'navy',      name: 'Navy',        background: '#0a0f1e', cardBg: '#0f1729', border: '#1e3050', muted: '#7da2cc', foreground: '#e8f0ff'  },
  { id: 'midnight',  name: 'Midnight',    background: '#09090b', cardBg: '#111113', border: '#222226', muted: '#71717a', foreground: '#fafafa'  },
  { id: 'charcoal',  name: 'Charcoal',    background: '#1a1a1a', cardBg: '#242424', border: '#333333', muted: '#999999', foreground: '#f5f5f5'  },
  { id: 'teal',      name: 'Deep Teal',   background: '#0d1f1f', cardBg: '#132929', border: '#1f3d3d', muted: '#4db6ac', foreground: '#e0f7f5'  },
];

export function applyPalette(palette: DarkPalette) {
  const r = document.documentElement;
  r.style.setProperty('--background', palette.background);
  r.style.setProperty('--card-bg',    palette.cardBg);
  r.style.setProperty('--border',     palette.border);
  r.style.setProperty('--muted',      palette.muted);
  r.style.setProperty('--foreground', palette.foreground);
}

export function clearPalette() {
  const r = document.documentElement;
  r.style.removeProperty('--background');
  r.style.removeProperty('--card-bg');
  r.style.removeProperty('--border');
  r.style.removeProperty('--muted');
  r.style.removeProperty('--foreground');
}

export const PALETTE_KEY = 'dh_dark_palette';
