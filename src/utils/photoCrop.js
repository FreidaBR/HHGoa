/** Cover-crop image into dest rect — no stretch, respects zoom (shared by badge + upload preview) */
export function drawImageCover(ctx, img, dx, dy, dw, dh, zoom = 1) {
  const destAspect = dw / dh;
  const visW = img.width / zoom;
  const visH = img.height / zoom;
  const visX = (img.width - visW) / 2;
  const visY = (img.height - visH) / 2;
  const srcAspect = visW / visH;

  let sx;
  let sy;
  let sw;
  let sh;
  if (srcAspect > destAspect) {
    sh = visH;
    sw = visH * destAspect;
    sx = visX + (visW - sw) / 2;
    sy = visY;
  } else {
    sw = visW;
    sh = visW / destAspect;
    sx = visX;
    sy = visY + (visH - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

/** Photo sticker dimensions that fit inside the halftone hero field */
export function computePhotoDimensions(htW, htH, s, shape) {
  const stroke = 14 * s;
  const inset = 28 * s;
  const innerW = htW - inset * 2;
  const innerH = htH - inset * 2;

  if (shape === 'square') {
    const side = Math.min(innerW, innerH) - stroke * 2;
    return { w: side, h: side, cyRatio: 0.5 };
  }

  const diameter = Math.min(innerW, innerH) - stroke * 2;
  return { w: diameter, h: diameter, cyRatio: 0.5 };
}
