// Draws a high-tech custom QR code matrix on HTML Canvas
export function drawCanvasQRCode(ctx, text, x, y, size, darkColor = '#000000', lightColor = '#ffffff') {
  ctx.save();
  // Background box
  ctx.fillStyle = lightColor;
  ctx.fillRect(x, y, size, size);
  ctx.strokeStyle = darkColor;
  ctx.lineWidth = Math.max(2, size / 25);
  ctx.strokeRect(x, y, size, size);

  // Generate pseudo-deterministic matrix based on string input
  const grid = 12;
  const cellSize = size / grid;

  // Simple hashing function
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }

  // Draw 3 standard QR position detection markers (top-left, top-right, bottom-left)
  const drawMarker = (mx, my) => {
    ctx.fillStyle = darkColor;
    ctx.fillRect(x + mx * cellSize, y + my * cellSize, 3 * cellSize, 3 * cellSize);
    ctx.fillStyle = lightColor;
    ctx.fillRect(x + (mx + 0.5) * cellSize, y + (my + 0.5) * cellSize, 2 * cellSize, 2 * cellSize);
    ctx.fillStyle = darkColor;
    ctx.fillRect(x + (mx + 1) * cellSize, y + (my + 1) * cellSize, 1 * cellSize, 1 * cellSize);
  };

  drawMarker(1, 1);
  drawMarker(8, 1);
  drawMarker(1, 8);

  // Fill in data cells based on hash bits
  ctx.fillStyle = darkColor;
  let bitIndex = 0;
  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      // Skip position detection areas
      if ((r <= 4 && c <= 4) || (r <= 4 && c >= 7) || (r >= 7 && c <= 4)) continue;

      const bit = ((hash >> (bitIndex % 31)) & 1) === 1 || (r * c + bitIndex) % 3 === 0;
      if (bit) {
        ctx.fillRect(x + c * cellSize, y + r * cellSize, cellSize - 0.5, cellSize - 0.5);
      }
      bitIndex++;
    }
  }

  ctx.restore();
}
