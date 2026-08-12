import { drawCanvasQRCode } from './qrCode';

/** Single HH Goa palette — not user-configurable */
export const BRAND = {
  forest: '#07301c',
  forestDeep: '#041912',
  cream: '#FAF6E9',
  yellow: '#ffe600',
  pink: '#ff2a85',
  cyan: '#00e5ff',
  white: '#ffffff',
  ink: '#041E12',
  muted: 'rgba(4, 25, 18, 0.55)',
  gold: '#C9A227',
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawDotGrid(ctx, w, h, s, alpha = 0.06) {
  ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
  const step = 18 * s;
  for (let x = step; x < w; x += step) {
    for (let y = step; y < h; y += step) {
      ctx.beginPath();
      ctx.arc(x, y, 1.2 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawArchPath(ctx, x, y, w, h) {
  ctx.moveTo(x, y + h);
  ctx.lineTo(x, y + h * 0.22);
  ctx.quadraticCurveTo(x, y, x + w / 2, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + h * 0.22);
  ctx.lineTo(x + w, y + h);
  ctx.closePath();
}

async function drawPhoto(ctx, member, x, y, w, h, s, { rounded = 8, label = 'Add photo' } = {}) {
  ctx.save();
  if (rounded) {
    roundRect(ctx, x, y, w, h, rounded * s);
    ctx.clip();
  } else {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
  }

  if (member?.photo) {
    try {
      const img = await loadImage(member.photo);
      const zoom = member.zoom || 1;
      const sw = img.width / zoom;
      const sh = img.height / zoom;
      const sx = (img.width - sw) / 2;
      const sy = (img.height - sh) / 2;
      ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
      ctx.restore();
      return;
    } catch {
      /* placeholder */
    }
  }

  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, 'rgba(255,255,255,0.12)');
  grad.addColorStop(1, 'rgba(255,255,255,0.04)');
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h);
  ctx.restore();

  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1.5 * s;
  roundRect(ctx, x + 10 * s, y + 10 * s, w - 20 * s, h - 20 * s, 6 * s);
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.font = `600 ${10 * s}px "Space Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.fillText(label.toUpperCase(), x + w / 2, y + h / 2 + 3 * s);
  ctx.textAlign = 'left';
}

function drawEventHeader(ctx, x, y, w, s, { compact = false, onDark = false } = {}) {
  const mark = compact ? 36 * s : 44 * s;
  roundRect(ctx, x, y, mark, mark, 6 * s);
  ctx.fillStyle = BRAND.yellow;
  ctx.fill();
  ctx.strokeStyle = BRAND.forestDeep;
  ctx.lineWidth = 2 * s;
  ctx.stroke();

  ctx.fillStyle = BRAND.forestDeep;
  ctx.font = `900 ${(compact ? 14 : 16) * s}px "Space Mono", monospace`;
  ctx.fillText('HH', x + (compact ? 9 : 11) * s, y + (compact ? 24 : 28) * s);

  ctx.fillStyle = onDark ? BRAND.cream : BRAND.forestDeep;
  ctx.font = `900 ${(compact ? 18 : 22) * s}px "Anton", "Bebas Neue", sans-serif`;
  ctx.fillText('HACKER HOUSE GOA', x + mark + 12 * s, y + (compact ? 18 : 22) * s);
  ctx.font = `700 ${(compact ? 9 : 10) * s}px "Space Mono", monospace`;
  ctx.fillStyle = onDark ? BRAND.yellow : BRAND.pink;
  ctx.fillText('BUILDER PASSPORT · 2026', x + mark + 12 * s, y + (compact ? 32 : 38) * s);
}

function drawRolePill(ctx, text, x, y, s, variant = 'default') {
  const label = (text || 'Builder').toUpperCase();
  ctx.font = `700 ${9 * s}px "Space Mono", monospace`;
  const pw = ctx.measureText(label).width + 20 * s;
  const ph = 22 * s;
  roundRect(ctx, x, y, pw, ph, 11 * s);
  ctx.fillStyle = variant === 'accent' ? BRAND.pink : BRAND.forest;
  ctx.fill();
  ctx.fillStyle = variant === 'accent' ? BRAND.white : BRAND.yellow;
  ctx.fillText(label, x + 10 * s, y + 15 * s);
  return pw;
}

function drawFooterStrip(ctx, x, y, w, s) {
  roundRect(ctx, x, y, w, 40 * s, 8 * s);
  ctx.fillStyle = BRAND.yellow;
  ctx.fill();
  ctx.strokeStyle = BRAND.forestDeep;
  ctx.lineWidth = 2 * s;
  ctx.stroke();
  ctx.fillStyle = BRAND.forestDeep;
  ctx.font = `900 ${11 * s}px "Space Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('GOA 2026 · VERIFIED BUILDER', x + w / 2, y + 26 * s);
  ctx.textAlign = 'left';
}

function drawMetaLines(ctx, member, teamName, x, y, s, color = BRAND.ink) {
  ctx.fillStyle = color;
  ctx.font = `700 ${9 * s}px "Space Mono", monospace`;
  ctx.fillText(`ID  ${member?.assignedId || 'HH-26-1065'}`, x, y);
  const squad = teamName || member?.teamName;
  if (squad) {
    ctx.fillStyle = color === BRAND.cream ? 'rgba(250,246,233,0.7)' : BRAND.muted;
    ctx.fillText(`SQUAD  ${squad.toUpperCase()}`, x, y + 18 * s);
  }
  if (member?.title) {
    ctx.fillStyle = BRAND.pink;
    ctx.fillText(member.title.toUpperCase(), x, y + (squad ? 36 : 18) * s);
  }
}

function drawWaveAccent(ctx, x, y, w, s) {
  const colors = [BRAND.pink, BRAND.cyan, BRAND.yellow];
  colors.forEach((color, i) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5 * s;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    for (let px = 0; px <= w; px += 6 * s) {
      const py = y + i * 8 * s + Math.sin(px / (28 * s) + i * 0.8) * 5 * s;
      if (px === 0) ctx.moveTo(x + px, py);
      else ctx.lineTo(x + px, py);
    }
    ctx.stroke();
  });
  ctx.globalAlpha = 1;
}

async function drawArchBadge(ctx, w, h, s, member, teamName) {
  ctx.fillStyle = BRAND.forestDeep;
  ctx.fillRect(0, 0, w, h);
  drawDotGrid(ctx, w, h, s, 0.05);

  const pad = 28 * s;
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, 16 * s);
  ctx.fillStyle = BRAND.cream;
  ctx.fill();
  ctx.strokeStyle = BRAND.forest;
  ctx.lineWidth = 3 * s;
  ctx.stroke();

  const innerPad = pad + 24 * s;
  const innerW = w - innerPad * 2;
  roundRect(ctx, innerPad, innerPad + 8 * s, innerW, h - innerPad * 2 - 8 * s, 12 * s);
  ctx.fillStyle = BRAND.forest;
  ctx.fill();

  drawEventHeader(ctx, innerPad + 20 * s, innerPad + 28 * s, innerW - 40 * s, s, { compact: true, onDark: true });

  const archW = innerW * 0.68;
  const archH = h * 0.34;
  const ax = (w - archW) / 2;
  const ay = innerPad + 100 * s;
  ctx.save();
  ctx.beginPath();
  drawArchPath(ctx, ax, ay, archW, archH);
  ctx.clip();
  await drawPhoto(ctx, member, ax, ay, archW, archH, s, { rounded: 0, label: 'Photo' });
  ctx.restore();
  ctx.strokeStyle = BRAND.cream;
  ctx.lineWidth = 3 * s;
  ctx.beginPath();
  drawArchPath(ctx, ax, ay, archW, archH);
  ctx.stroke();

  const name = (member?.name || 'Builder').toUpperCase();
  ctx.fillStyle = BRAND.cream;
  ctx.font = `900 ${26 * s}px "Anton", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(name.length > 18 ? `${name.slice(0, 18)}…` : name, w / 2, ay + archH + 52 * s);

  const roleLabel = (member?.role || 'Builder').toUpperCase();
  ctx.font = `700 ${9 * s}px "Space Mono", monospace`;
  const roleW = ctx.measureText(roleLabel).width + 20 * s;
  drawRolePill(ctx, member?.role, w / 2 - roleW / 2, ay + archH + 64 * s, s, 'accent');
  ctx.textAlign = 'left';

  drawFooterStrip(ctx, innerPad + 16 * s, h - pad - 56 * s, innerW - 32 * s, s);

  const qrData = `HHGOA2026:${member?.assignedId}:${member?.name}`;
  drawCanvasQRCode(ctx, qrData, innerPad + 20 * s, h - pad - 130 * s, 72 * s, BRAND.cream, BRAND.forest);
  drawMetaLines(ctx, member, teamName, innerPad + 108 * s, h - pad - 118 * s, s, BRAND.cream);
}

async function drawPortraitFrame(ctx, w, h, s, member, teamName) {
  ctx.fillStyle = BRAND.forest;
  ctx.fillRect(0, 0, w, h);
  drawDotGrid(ctx, w, h, s);

  const pad = 24 * s;
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, 14 * s);
  ctx.fillStyle = BRAND.cream;
  ctx.fill();
  ctx.strokeStyle = BRAND.forestDeep;
  ctx.lineWidth = 2 * s;
  ctx.stroke();

  drawEventHeader(ctx, pad + 28 * s, pad + 28 * s, w - pad * 2 - 56 * s, s);

  ctx.fillStyle = BRAND.yellow;
  ctx.fillRect(pad + 28 * s, pad + 88 * s, w - (pad + 28 * s) * 2, 3 * s);

  const px = pad + 48 * s;
  const pw = w - (pad + 48 * s) * 2;
  const py = pad + 108 * s;
  const ph = h * 0.44;
  await drawPhoto(ctx, member, px, py, pw, ph, s, { rounded: 10, label: 'Portrait' });
  ctx.strokeStyle = BRAND.forest;
  ctx.lineWidth = 2 * s;
  roundRect(ctx, px, py, pw, ph, 10 * s);
  ctx.stroke();

  const name = (member?.name || 'Builder').toUpperCase();
  ctx.fillStyle = BRAND.ink;
  ctx.font = `900 ${28 * s}px "Anton", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(name.length > 20 ? `${name.slice(0, 20)}…` : name, w / 2, py + ph + 48 * s);

  const roleLabel = (member?.role || 'Builder').toUpperCase();
  ctx.font = `700 ${9 * s}px "Space Mono", monospace`;
  const roleW = ctx.measureText(roleLabel).width + 20 * s;
  drawRolePill(ctx, member?.role, w / 2 - roleW / 2, py + ph + 58 * s, s);
  ctx.textAlign = 'left';

  drawMetaLines(ctx, member, teamName, pad + 48 * s, py + ph + 100 * s, s);
  drawFooterStrip(ctx, pad + 28 * s, h - pad - 52 * s, w - (pad + 28 * s) * 2, s);

  const qrData = `HHGOA2026:${member?.assignedId}:${member?.name}`;
  drawCanvasQRCode(ctx, qrData, w - pad - 120 * s, py + ph + 82 * s, 88 * s, BRAND.forest, BRAND.cream);
}

async function drawOrnateBadge(ctx, w, h, s, member, teamName) {
  ctx.fillStyle = BRAND.forestDeep;
  ctx.fillRect(0, 0, w, h);

  const pad = 32 * s;
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, 4 * s);
  ctx.fillStyle = BRAND.cream;
  ctx.fill();
  ctx.strokeStyle = BRAND.gold;
  ctx.lineWidth = 4 * s;
  ctx.stroke();
  ctx.strokeStyle = BRAND.forest;
  ctx.lineWidth = 1.5 * s;
  roundRect(ctx, pad + 10 * s, pad + 10 * s, w - pad * 2 - 20 * s, h - pad * 2 - 20 * s, 2 * s);
  ctx.stroke();

  const cx = w / 2;
  const archW = w * 0.52;
  const archH = h * 0.3;
  const ax = cx - archW / 2;
  const ay = pad + 48 * s;
  ctx.save();
  ctx.beginPath();
  drawArchPath(ctx, ax, ay, archW, archH);
  ctx.clip();
  await drawPhoto(ctx, member, ax, ay, archW, archH, s, { rounded: 0, label: 'Photo' });
  ctx.restore();
  ctx.strokeStyle = BRAND.forest;
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  drawArchPath(ctx, ax, ay, archW, archH);
  ctx.stroke();

  ctx.fillStyle = BRAND.forest;
  ctx.font = `900 ${10 * s}px "Space Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('◆  HACKER HOUSE GOA  ◆', cx, ay + archH + 36 * s);

  const name = (member?.name || 'Builder').toUpperCase();
  ctx.font = `900 ${24 * s}px "Anton", sans-serif`;
  ctx.fillText(name.length > 16 ? `${name.slice(0, 16)}…` : name, cx, ay + archH + 68 * s);
  ctx.font = `700 ${10 * s}px "Space Mono", monospace`;
  ctx.fillStyle = BRAND.pink;
  ctx.fillText((member?.role || 'BUILDER').toUpperCase(), cx, ay + archH + 92 * s);
  ctx.textAlign = 'left';

  drawFooterStrip(ctx, pad + 24 * s, h - pad - 54 * s, w - (pad + 24 * s) * 2, s);
  drawMetaLines(ctx, member, teamName, pad + 32 * s, h - pad - 100 * s, s);
}

async function drawSlimBadge(ctx, w, h, s, member, teamName) {
  ctx.fillStyle = BRAND.forestDeep;
  ctx.fillRect(0, 0, w, h);
  drawDotGrid(ctx, w, h, s, 0.04);

  const pad = 20 * s;
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, 12 * s);
  ctx.fillStyle = BRAND.cream;
  ctx.fill();
  ctx.strokeStyle = BRAND.forest;
  ctx.lineWidth = 2 * s;
  ctx.stroke();

  roundRect(ctx, pad, pad, w - pad * 2, 52 * s, 12 * s);
  ctx.fillStyle = BRAND.forest;
  ctx.fill();
  ctx.fillStyle = BRAND.yellow;
  ctx.font = `900 ${12 * s}px "Space Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('HH · GOA 2026', w / 2, pad + 34 * s);
  ctx.textAlign = 'left';

  const pw = w - pad * 2 - 48 * s;
  const ph = h * 0.32;
  const px = (w - pw) / 2;
  const py = pad + 72 * s;
  await drawPhoto(ctx, member, px, py, pw, ph, s, { rounded: 8, label: 'Photo' });
  roundRect(ctx, px, py, pw, ph, 8 * s);
  ctx.strokeStyle = BRAND.forest;
  ctx.lineWidth = 2 * s;
  ctx.stroke();

  const name = (member?.name || 'Builder').toUpperCase();
  ctx.fillStyle = BRAND.ink;
  ctx.font = `900 ${20 * s}px "Anton", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(name.length > 14 ? `${name.slice(0, 14)}…` : name, w / 2, py + ph + 40 * s);
  ctx.font = `700 ${9 * s}px "Space Mono", monospace`;
  ctx.fillStyle = BRAND.forest;
  ctx.fillText((member?.role || 'BUILDER').toUpperCase(), w / 2, py + ph + 60 * s);
  ctx.fillStyle = BRAND.muted;
  ctx.fillText(member?.assignedId || 'HH-26-1065', w / 2, py + ph + 78 * s);
  ctx.textAlign = 'left';

  const qrData = `HHGOA2026:${member?.assignedId}:${member?.name}`;
  drawCanvasQRCode(ctx, qrData, (w - 100 * s) / 2, h - pad - 118 * s, 88 * s, BRAND.forest, BRAND.cream);
  ctx.fillStyle = BRAND.muted;
  ctx.font = `600 ${8 * s}px "Space Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('#FRAMEINGOA', w / 2, h - pad - 18 * s);
  ctx.textAlign = 'left';
}

async function drawLandscapeFrame(ctx, w, h, s, member, teamName) {
  const pad = 20 * s;
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, 14 * s);
  const grad = ctx.createLinearGradient(pad, pad, w - pad, h - pad);
  grad.addColorStop(0, BRAND.forest);
  grad.addColorStop(0.55, '#0b4a30');
  grad.addColorStop(1, BRAND.forestDeep);
  ctx.fillStyle = grad;
  ctx.fill();
  drawDotGrid(ctx, w, h, s, 0.08);

  ctx.fillStyle = BRAND.yellow;
  ctx.globalAlpha = 0.12;
  ctx.beginPath();
  ctx.arc(pad + 120 * s, pad + 100 * s, 80 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  drawEventHeader(ctx, pad + 36 * s, pad + 36 * s, w * 0.5, s, { compact: true, onDark: true });

  const name = (member?.name || 'Builder').toUpperCase();
  ctx.fillStyle = BRAND.cream;
  ctx.font = `900 ${38 * s}px "Anton", sans-serif`;
  ctx.fillText(name.length > 18 ? `${name.slice(0, 18)}…` : name, pad + 36 * s, h / 2 + 10 * s);

  drawRolePill(ctx, member?.role, pad + 36 * s, h / 2 + 28 * s, s, 'accent');
  drawMetaLines(ctx, member, teamName, pad + 36 * s, h / 2 + 68 * s, s, BRAND.cream);

  const pw = w * 0.28;
  const ph = h - pad * 2 - 72 * s;
  const px = w - pw - pad - 36 * s;
  const py = pad + 36 * s;
  await drawPhoto(ctx, member, px, py, pw, ph, s, { rounded: 10, label: 'Photo' });
  ctx.strokeStyle = BRAND.cream;
  ctx.lineWidth = 2 * s;
  roundRect(ctx, px, py, pw, ph, 10 * s);
  ctx.stroke();

  drawWaveAccent(ctx, pad + 24 * s, h - pad - 48 * s, w - (pad + 48) * s, s);
  drawFooterStrip(ctx, pad + 24 * s, h - pad - 36 * s, w - (pad + 48) * s, s);
}

async function drawCirclePfp(ctx, w, h, s, member, teamName) {
  ctx.fillStyle = BRAND.forestDeep;
  ctx.fillRect(0, 0, w, h);
  drawDotGrid(ctx, w, h, s, 0.05);

  const pad = 32 * s;
  roundRect(ctx, pad, pad, w - pad * 2, h - pad * 2, 16 * s);
  ctx.fillStyle = BRAND.cream;
  ctx.fill();
  ctx.strokeStyle = BRAND.forest;
  ctx.lineWidth = 2 * s;
  ctx.stroke();

  const cx = w / 2;
  const cy = h * 0.4;
  const r = Math.min(w, h) * 0.26;

  ctx.strokeStyle = BRAND.yellow;
  ctx.lineWidth = 6 * s;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 8 * s, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = BRAND.forest;
  ctx.lineWidth = 2 * s;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 14 * s, 0, Math.PI * 2);
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  await drawPhoto(ctx, member, cx - r, cy - r, r * 2, r * 2, s, { rounded: 0, label: 'Photo' });
  ctx.restore();

  const name = (member?.name || 'Builder').toUpperCase();
  ctx.fillStyle = BRAND.ink;
  ctx.font = `900 ${22 * s}px "Anton", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(name.length > 16 ? `${name.slice(0, 16)}…` : name, cx, cy + r + 48 * s);
  ctx.font = `700 ${9 * s}px "Space Mono", monospace`;
  ctx.fillStyle = BRAND.pink;
  ctx.fillText((member?.role || 'BUILDER').toUpperCase(), cx, cy + r + 68 * s);
  ctx.textAlign = 'left';

  drawWaveAccent(ctx, pad + 40 * s, h - pad - 56 * s, w - (pad + 80) * s, s);
  ctx.fillStyle = BRAND.forest;
  ctx.font = `700 ${9 * s}px "Space Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('GOA 2026', cx, h - pad - 24 * s);
  ctx.textAlign = 'left';
}

const DRAWERS = {
  'arch-badge': drawArchBadge,
  'portrait-frame': drawPortraitFrame,
  'ornate-badge': drawOrnateBadge,
  'slim-badge': drawSlimBadge,
  'landscape-frame': drawLandscapeFrame,
  'circle-pfp': drawCirclePfp,
};

export async function drawBadge(canvas, { member, teamName, frame, theme, width, height }) {
  await document.fonts.ready;
  const resolvedFrame = frame || theme;
  if (!resolvedFrame) return;

  const exportW = width || resolvedFrame.exportW || 1200;
  const exportH = height || resolvedFrame.exportH || 1600;
  const s = exportW / (resolvedFrame.exportW || 1200);

  canvas.width = exportW;
  canvas.height = exportH;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, exportW, exportH);

  const drawer = DRAWERS[resolvedFrame.id];
  if (drawer) {
    await drawer(ctx, exportW, exportH, s, member, teamName);
    return;
  }

  ctx.fillStyle = BRAND.forest;
  ctx.fillRect(0, 0, exportW, exportH);
}
