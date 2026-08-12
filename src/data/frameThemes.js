/** Frame layouts — shape & export size only; colours live in badgeDraw */

export const FRAME_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'badge', label: 'Badge' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'pfp', label: 'PFP' },
  { id: 'landscape', label: 'Landscape' },
];

export const FRAMES = [
  {
    id: 'arch-badge',
    name: 'Arch Badge',
    desc: 'Cream collectible with arched photo window — the signature HH Goa pass.',
    category: 'badge',
    previewAspect: '3 / 4',
    exportW: 1200,
    exportH: 1600,
  },
  {
    id: 'portrait-frame',
    name: 'Portrait Frame',
    desc: 'Editorial portrait card with event header and clean metadata stack.',
    category: 'portrait',
    previewAspect: '3 / 4',
    exportW: 1200,
    exportH: 1600,
  },
  {
    id: 'ornate-badge',
    name: 'Ornate Badge',
    desc: 'Double-border collectible with gold accent line and arch crop.',
    category: 'badge',
    previewAspect: '3 / 4',
    exportW: 1200,
    exportH: 1600,
  },
  {
    id: 'slim-badge',
    name: 'Slim Badge',
    desc: 'Vertical lanyard format — photo, name, and scannable ID.',
    category: 'badge',
    previewAspect: '7 / 12',
    exportW: 840,
    exportH: 1440,
  },
  {
    id: 'landscape-frame',
    name: 'Landscape Frame',
    desc: 'Wide banner layout for social headers and cover photos.',
    category: 'landscape',
    previewAspect: '16 / 9',
    exportW: 2400,
    exportH: 1350,
  },
  {
    id: 'circle-pfp',
    name: 'Circle PFP',
    desc: 'Square avatar export with circular crop and wave accent.',
    category: 'pfp',
    previewAspect: '1 / 1',
    exportW: 1500,
    exportH: 1500,
  },
];

export function getFrame(frameId) {
  return FRAMES.find((f) => f.id === frameId) || FRAMES[0];
}

/** @deprecated */
export function getTheme(themeId) {
  return getFrame(themeId);
}

/** @deprecated */
export const THEMES = FRAMES;
