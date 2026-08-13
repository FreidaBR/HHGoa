import { getBadgeSize } from '../data/frameThemes';
import { BRAND_ASSETS } from '../data/brandAssets';
import { drawCanvasQRCode } from './qrCode';
import { computePhotoDimensions, drawImageCover } from './photoCrop';

/** Skate-poster palette — blue → green */
const C = {
  green: '#07301c',
  greenMid: '#0a4528',
  greenDot: '#0a4528',
  greenLight: '#1a6b45',
  cream: '#F5F2E7',
  white: '#ffffff',
  ink: '#041912',
};

const FONT = {
  bubble: '"Titan One", "Bungee", "Anton", sans-serif',
  label: '"Plus Jakarta Sans", "Helvetica Neue", sans-serif',
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (src && !src.startsWith('data:') && !src.startsWith('blob:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawGrain(ctx, w, h, s) {
  ctx.save();
  ctx.globalAlpha = 0.04;
  for (let i = 0; i < 6000; i++) {
    ctx.fillStyle = i % 2 ? C.ink : C.green;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.1 * s, 1.1 * s);
  }
  ctx.restore();
}

function bubble(ctx, text, x, y, size, s, trackEm = -0.06, align = 'left') {
  ctx.fillStyle = C.green;
  ctx.font = `400 ${size * s}px ${FONT.bubble}`;
  ctx.letterSpacing = `${trackEm}em`;
  ctx.textAlign = align;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(text, x, y);
}

function labelCaps(ctx, text, x, y, size, s, trackEm = 0.14, color = C.green, align = 'left') {
  ctx.fillStyle = color;
  ctx.font = `600 ${size * s}px ${FONT.label}`;
  ctx.letterSpacing = `${trackEm}em`;
  ctx.textAlign = align;
  ctx.fillText(text.toUpperCase(), x, y);
}

function drawHalftone(ctx, x, y, w, h, s, dotColor = C.greenDot) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.fillStyle = C.cream;
  ctx.fillRect(x, y, w, h);
  const step = 9 * s;
  const r = 2.4 * s;
  for (let py = y + step / 2; py < y + h; py += step) {
    for (let px = x + step / 2; px < x + w; px += step) {
      ctx.fillStyle = dotColor;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
  ctx.strokeStyle = C.green;
  ctx.lineWidth = 3 * s;
  ctx.strokeRect(x, y, w, h);
}

function drawHalftoneField(ctx, x, y, w, h, s) {
  if (h <= 4 * s) return;
  const split = y + h * 0.55;
  drawHalftone(ctx, x, y, w, Math.max(4 * s, split - y), s, C.greenLight);
  drawHalftone(ctx, x, split, w, Math.max(4 * s, y + h - split), s, C.greenMid);
}

function drawChecker(ctx, x, y, w, h, s) {
  const cell = 18 * s;
  const cols = Math.ceil(w / cell);
  const rows = Math.max(2, Math.ceil(h / cell));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? C.green : C.cream;
      ctx.fillRect(x + c * cell, y + r * cell, cell, cell);
    }
  }
}

function drawCornerFrame(ctx, x, y, w, h, s) {
  const cs = 10 * s;
  ctx.strokeStyle = C.green;
  ctx.lineWidth = 2.5 * s;
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = C.green;
  [[x, y], [x + w - cs, y], [x, y + h - cs], [x + w - cs, y + h - cs]].forEach(([cx, cy]) => {
    ctx.fillRect(cx, cy, cs, cs);
  });
}

function drawTopBars(ctx, x, y, s) {
  ctx.fillStyle = C.green;
  const bw = 5 * s;
  const gap = 9 * s;
  const heights = [28, 38, 48, 58];
  heights.forEach((ht, i) => {
    ctx.fillRect(x + i * (bw + gap), y + (58 - ht) * s, bw, ht * s);
  });
}

function drawSparkle(ctx, x, y, s) {
  ctx.strokeStyle = C.green;
  ctx.lineWidth = 3 * s;
  ctx.lineCap = 'round';
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(a) * 16 * s, y + Math.sin(a) * 16 * s);
    ctx.stroke();
  }
}

function drawTag(ctx, text, x, y, s) {
  ctx.font = `600 ${8 * s}px ${FONT.label}`;
  ctx.letterSpacing = '0.12em';
  const pw = ctx.measureText(text.toUpperCase()).width + 24 * s;
  const ph = 26 * s;
  ctx.fillStyle = 'rgba(4,25,18,0.08)';
  ctx.fillRect(x + 4 * s, y + 4 * s, pw, ph);
  ctx.fillStyle = C.white;
  ctx.fillRect(x, y, pw, ph);
  ctx.strokeStyle = C.green;
  ctx.lineWidth = 2 * s;
  ctx.strokeRect(x, y, pw, ph);
  labelCaps(ctx, text, x + 12 * s, y + 18 * s, 8, s, 0.12);
}

function drawDateBox(ctx, x, y, s) {
  const w = 130 * s;
  const h = 130 * s;
  ctx.fillStyle = C.white;
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = C.green;
  ctx.lineWidth = 4 * s;
  ctx.strokeRect(x, y, w, h);
  ctx.fillStyle = C.green;
  ctx.fillRect(x, y, w, 36 * s);
  labelCaps(ctx, '28 OCT', x + 14 * s, y + 24 * s, 9, s, 0.1, C.white);
  bubble(ctx, '2026', x + 16 * s, y + 88 * s, 38, s, -0.04);
}

function drawListRow(ctx, text, x, y, s) {
  labelCaps(ctx, '×', x, y, 13, s, 0);
  bubble(ctx, text, x + 20 * s, y, 14, s, -0.03);
}

function drawFrontImage(ctx, img, x, y, w, h) {
  if (!img || w <= 0 || h <= 0) return;
  try {
    const off = document.createElement('canvas');
    off.width = Math.max(1, Math.ceil(w));
    off.height = Math.max(1, Math.ceil(h));
    const octx = off.getContext('2d');
    octx.drawImage(img, 0, 0, w, h);
    const imageData = octx.getImageData(0, 0, off.width, off.height);
    const px = imageData.data;
    for (let i = 0; i < px.length; i += 4) {
      if (px[i] < 32 && px[i + 1] < 32 && px[i + 2] < 32) px[i + 3] = 0;
    }
    octx.putImageData(imageData, 0, 0);
    ctx.drawImage(off, x, y);
  } catch {
    ctx.drawImage(img, x, y, w, h);
  }
}

function roundRectPath(ctx, x, y, w, h, r) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  ctx.lineTo(x + rad, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
  ctx.lineTo(x, y + rad);
  ctx.quadraticCurveTo(x, y, x + rad, y);
  ctx.closePath();
}

async function drawStickerPhoto(ctx, member, cx, cy, w, h, s, shape) {
  const stroke = 14 * s;
  const px = cx - w / 2;
  const py = cy - h / 2;

  ctx.fillStyle = 'rgba(4,25,18,0.1)';
  ctx.fillRect(px + 6 * s, py + 8 * s, w + stroke, h + stroke);

  ctx.save();
  if (shape === 'round') {
    ctx.beginPath();
    ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.clip();
  } else {
    roundRectPath(ctx, px, py, w, h, 10 * s);
    ctx.clip();
  }

  if (member?.photo) {
    try {
      const img = await loadImage(member.photo);
      drawImageCover(ctx, img, px, py, w, h, member.zoom || 1);
    } catch {
      ctx.fillStyle = '#ddd8ce';
      ctx.fillRect(px, py, w, h);
    }
  } else {
    ctx.fillStyle = '#ddd8ce';
    ctx.fillRect(px, py, w, h);
  }
  ctx.restore();

  ctx.strokeStyle = C.white;
  ctx.lineWidth = stroke;
  if (shape === 'round') {
    ctx.beginPath();
    ctx.ellipse(cx, cy, w / 2 + stroke / 2 - 1, h / 2 + stroke / 2 - 1, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    roundRectPath(ctx, px - stroke / 2, py - stroke / 2, w + stroke, h + stroke, 10 * s + stroke / 2);
    ctx.stroke();
  }

  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 2.5 * s;
  if (shape === 'round') {
    ctx.beginPath();
    ctx.ellipse(cx, cy, w / 2 + stroke / 2, h / 2 + stroke / 2, 0, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    roundRectPath(ctx, px - stroke / 2 - 1, py - stroke / 2 - 1, w + stroke + 2, h + stroke + 2, 10 * s + stroke / 2);
    ctx.stroke();
  }

  if (!member?.photo) {
    labelCaps(ctx, 'ADD PHOTO', cx, cy + 4 * s, 9, s, 0.12, C.green, 'center');
  }
}

export async function drawBadge(canvas, {
  member,
  teamName,
  photoShape = 'square',
  width,
  height,
}) {
  const spec = getBadgeSize();
  const designW = spec.designW;
  const w = width || spec.exportW;
  const h = height || spec.exportH;
  const s = w / designW;
  const shape = photoShape === 'round' ? 'round' : 'square';

  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = C.cream;
  ctx.fillRect(0, 0, w, h);

  let goaImg = null;
  try {
    await document.fonts.ready;
    await Promise.all([
      document.fonts.load('400 80px "Titan One"').catch(() => {}),
      document.fonts.load('600 12px "Plus Jakarta Sans"').catch(() => {}),
    ]);
    goaImg = await loadImage(BRAND_ASSETS.goaScript);
  } catch (err) {
    console.warn('Badge asset load warning:', err);
  }

  drawGrain(ctx, w, h, s);

  const pad = 36 * s;
  const ix = pad;
  const iy = pad;
  const iw = w - pad * 2;
  const ih = h - pad * 2;
  const innerBottom = iy + ih;

  // ── Top bar: YOUR SPECIAL PRESENTS ──
  const barH = 34 * s;
  const barY = iy + 12 * s;
  ctx.fillStyle = C.green;
  ctx.fillRect(ix, barY, iw * 0.62, barH);
  labelCaps(ctx, 'HACKER HOUSE GOA · BUILDER PASS', ix + 16 * s, barY + 22 * s, 8, s, 0.16, C.white);
  drawTopBars(ctx, ix + iw * 0.64, barY + 4 * s, s);
  drawSparkle(ctx, ix + iw - 36 * s, barY + barH / 2, s);

  // ── Main title: HACKER / HOUSE (+ गोवा) ──
  const titleY = barY + barH + 52 * s;
  bubble(ctx, 'HACKER', ix + 8 * s, titleY, 72, s, -0.07);
  bubble(ctx, 'HOUSE', ix + 8 * s, titleY + 78 * s, 72, s, -0.07);
  if (goaImg) {
    const goaW = 88 * s;
    const goaH = goaW * (goaImg.height / goaImg.width);
    drawFrontImage(ctx, goaImg, ix + iw - goaW - 12 * s, titleY + 8 * s, goaW, goaH);
  }

  // ── Halftone + centred photo (poster hero) ──
  const htX = ix + 8 * s;
  const htY = titleY + 100 * s;
  const htW = iw - 16 * s;
  const htH = 420 * s;
  drawHalftoneField(ctx, htX, htY, htW, htH, s);

  const photoCx = ix + iw / 2;
  const { w: photoW, h: photoH, cyRatio } = computePhotoDimensions(htW, htH, s, shape);
  const photoCy = htY + htH * cyRatio;
  await drawStickerPhoto(ctx, member, photoCx, photoCy, photoW, photoH, s, shape);

  // Float tags on halftone
  drawTag(ctx, 'GOA 2026', htX + 12 * s, htY + 20 * s, s);
  drawTag(ctx, 'BUILDER PASS', htX + htW - 118 * s, htY + htH - 38 * s, s);

  // ── Lower band: date + list (left) | COMPETITION frame (right) ──
  const lowerY = htY + htH + 28 * s;
  const leftX = ix + 8 * s;
  drawDateBox(ctx, leftX, lowerY, s);

  const listY = lowerY + 148 * s;
  drawListRow(ctx, (member?.role || 'BUILDER').toUpperCase(), leftX, listY, s);
  drawListRow(ctx, (member?.title || 'HH GOA').toUpperCase().slice(0, 12), leftX, listY + 32 * s, s);
  drawListRow(ctx, 'VERIFIED', leftX, listY + 64 * s, s);

  const compText = 'GOA 2026';
  ctx.font = `400 ${24 * s}px ${FONT.bubble}`;
  ctx.letterSpacing = '-0.04em';
  const compW = ctx.measureText(compText).width + 36 * s;
  const compH = 48 * s;
  const compX = ix + iw - compW - 8 * s;
  drawCornerFrame(ctx, compX, lowerY + 8 * s, compW, compH, s);
  bubble(ctx, compText, compX + 18 * s, lowerY + 8 * s + 36 * s, 24, s, -0.04);

  labelCaps(ctx, 'COMPETITION', compX, lowerY + compH + 28 * s, 8, s, 0.14, C.green);

  const squad = teamName || member?.teamName;
  if (squad) {
    drawTag(ctx, squad.slice(0, 12).toUpperCase(), compX, lowerY + compH + 44 * s, s);
  }

  // ── Name bubble ──
  const displayName = (member?.name?.trim() || 'YOUR NAME').toUpperCase();
  const nameStr = displayName.length > 16 ? `${displayName.slice(0, 16)}…` : displayName;
  const nameY = lowerY + 248 * s;
  bubble(ctx, nameStr, ix + iw / 2, nameY, 36, s, -0.05, 'center');
  ctx.textAlign = 'left';

  // ── Checker strip + footer ──
  const idStr = member?.assignedId || 'HH-26-1065';
  const checkH = 32 * s;
  const checkY = innerBottom - 88 * s;
  drawChecker(ctx, ix, checkY, iw, checkH, s);

  labelCaps(ctx, `PASS · ${idStr}`, ix + 10 * s, checkY + checkH + 22 * s, 8, s, 0.12);
  labelCaps(ctx, 'OCT 28–31 · GOA, INDIA', ix + 10 * s, checkY + checkH + 40 * s, 7, s, 0.1);

  ctx.textAlign = 'right';
  labelCaps(ctx, '#FRAMEINGOA', ix + iw - 10 * s, checkY + checkH + 22 * s, 8, s, 0.12);
  labelCaps(ctx, 'HHGOA.COM', ix + iw - 10 * s, checkY + checkH + 40 * s, 7, s, 0.1);
  ctx.textAlign = 'left';

  drawCanvasQRCode(ctx, `HHGOA2026:${idStr}`, ix + iw - 72 * s, checkY - 64 * s, 56 * s, C.green, C.cream);
}

export { getBadgeSize };
