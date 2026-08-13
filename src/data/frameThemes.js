/** Builder pass — portrait poster format (60 × 90 mm @ ~508 DPI) */

const DPI = 508;

function mmToPx(mm) {
  return Math.round((mm / 25.4) * DPI);
}

/** Single size — 2:3 portrait like skate poster reference */
export const BADGE = {
  id: 'poster',
  label: '60 × 90 mm',
  widthMm: 60,
  heightMm: 90,
  designW: 800,
  designH: 1200,
  exportW: mmToPx(60),
  exportH: mmToPx(90),
  previewW: 400,
  previewAspect: '2 / 3',
};

export function getBadgeSize() {
  return BADGE;
}

export function getPreviewSize(previewWidth = BADGE.previewW) {
  return {
    width: previewWidth,
    height: Math.round(previewWidth * (BADGE.designH / BADGE.designW)),
    aspect: BADGE.previewAspect,
    exportLabel: BADGE.label,
  };
}

/** @deprecated */
export const CARD = BADGE;
export const BADGE_SIZES = [BADGE];
export const DEFAULT_BADGE_SIZE = 'poster';

export const PHOTO_SHAPES = [
  { id: 'square', label: 'Square' },
  { id: 'round', label: 'Round' },
];

export function getPhotoShape(shapeId) {
  return PHOTO_SHAPES.some((s) => s.id === shapeId) ? shapeId : 'square';
}

/** @deprecated */
export const FRAMES = [{ id: 'builder-pass', ...BADGE }];
export const FRAME_FILTERS = [];
export function getFrame() {
  return FRAMES[0];
}
export function getTheme() {
  return FRAMES[0];
}
export const THEMES = FRAMES;
