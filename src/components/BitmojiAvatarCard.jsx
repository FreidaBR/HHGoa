import React, { useEffect, useRef, useState } from 'react';

const HOODIE_COLORS = [
  { id: 'green', name: 'Goa Emerald', fill: '#0c4226', stroke: '#ffe600' },
  { id: 'pink', name: 'Sunset Pink', fill: '#ff2a85', stroke: '#ffe600' },
  { id: 'cyan', name: 'Cyber Cyan', fill: '#00e5ff', stroke: '#000000' },
  { id: 'purple', name: 'Solana Purple', fill: '#7c3aed', stroke: '#ffe600' },
  { id: 'yellow', name: 'Sunflower Yellow', fill: '#ffe600', stroke: '#0c4226' }
];

const BitmojiAvatarCard = ({ member, teamName, frameConfig }) => {
  const canvasRef = useRef(null);
  const [hoodieColor, setHoodieColor] = useState(HOODIE_COLORS[0]);
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    let isMounted = true;

    const drawBitmoji = async () => {
      await document.fonts.ready;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      // Canvas dimensions (800 x 950)
      canvas.width = 800;
      canvas.height = 950;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Background Box (Neo-brutalist card)
      ctx.fillStyle = '#0c4226';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Inner Cream Box
      const m = 24;
      ctx.fillStyle = '#f2e7c9';
      ctx.fillRect(m, m, canvas.width - m * 2, canvas.height - m * 2);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 6;
      ctx.strokeRect(m, m, canvas.width - m * 2, canvas.height - m * 2);

      // Header Tag
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(m, m, canvas.width - m * 2, 60);
      ctx.strokeRect(m, m, canvas.width - m * 2, 60);

      ctx.fillStyle = '#000000';
      ctx.font = '900 24px "Space Mono", monospace';
      ctx.fillText('🤖 HACKER HOUSE GOA 2026 • BITMOJI AVATAR PASS', m + 20, m + 38);

      // 2. Speech Bubble ("HI! 👋 I'M READY FOR GOA!")
      const bubbleX = 140;
      const bubbleY = 110;
      const bubbleW = 520;
      const bubbleH = 90;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(bubbleX, bubbleY, bubbleW, bubbleH);
      ctx.strokeRect(bubbleX, bubbleY, bubbleW, bubbleH);

      // Pointer triangle on bubble
      ctx.beginPath();
      ctx.moveTo(380, bubbleY + bubbleH);
      ctx.lineTo(400, bubbleY + bubbleH + 20);
      ctx.lineTo(420, bubbleY + bubbleH);
      ctx.closePath();
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.stroke();

      const memberFirstName = (member.name?.split(' ')[0] || 'BUILDER').toUpperCase();
      ctx.fillStyle = '#ff2a85';
      ctx.font = '900 32px "Space Mono", monospace';
      ctx.fillText(`HI! 👋 I'M ${memberFirstName}!`, bubbleX + 30, bubbleY + 42);

      ctx.fillStyle = '#000000';
      ctx.font = '700 18px "Space Mono", monospace';
      ctx.fillText('SEE YOU AT HACKER HOUSE GOA 2026 🌴', bubbleX + 30, bubbleY + 72);

      // 3. Draw Cartoon Bitmoji Avatar Character
      const centerX = 400;
      const avatarY = 380;

      // Body / Hoodie Shoulders
      ctx.fillStyle = hoodieColor.fill;
      ctx.beginPath();
      ctx.ellipse(centerX, avatarY + 220, 240, 160, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Hoodie Neck Collar
      ctx.fillStyle = hoodieColor.fill;
      ctx.beginPath();
      ctx.arc(centerX, avatarY + 80, 75, 0, Math.PI);
      ctx.fill();
      ctx.stroke();

      // Waving Right Arm & Hand
      ctx.save();
      ctx.fillStyle = hoodieColor.fill;
      ctx.beginPath();
      ctx.ellipse(centerX + 180, avatarY + 60, 45, 120, -0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Waving Hand Glove (White cartoon glove waving HI!)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(centerX + 210, avatarY - 50, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Fingers
      ctx.beginPath();
      ctx.arc(centerX + 195, avatarY - 80, 12, 0, Math.PI * 2);
      ctx.arc(centerX + 215, avatarY - 85, 12, 0, Math.PI * 2);
      ctx.arc(centerX + 235, avatarY - 75, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Head / Face
      ctx.fillStyle = '#ffdbac'; // Warm skin tone
      ctx.beginPath();
      ctx.ellipse(centerX, avatarY - 40, 95, 110, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Ears
      ctx.fillStyle = '#ffdbac';
      ctx.beginPath();
      ctx.arc(centerX - 95, avatarY - 40, 22, 0, Math.PI * 2);
      ctx.arc(centerX + 95, avatarY - 40, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Stylish Hacker Hair
      ctx.fillStyle = '#2c1609';
      ctx.beginPath();
      ctx.arc(centerX, avatarY - 100, 100, Math.PI * 0.9, Math.PI * 2.1);
      ctx.fill();
      ctx.stroke();

      // Cool Sunglasses
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.roundRect(centerX - 80, avatarY - 65, 70, 45, 12);
      ctx.roundRect(centerX + 10, avatarY - 65, 70, 45, 12);
      ctx.fill();
      ctx.stroke();

      // Sunglasses Bridge
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(centerX - 10, avatarY - 50);
      ctx.lineTo(centerX + 10, avatarY - 50);
      ctx.stroke();

      // Sunglasses Lens Reflection
      ctx.fillStyle = '#ffe600';
      ctx.beginPath();
      ctx.moveTo(centerX - 70, avatarY - 60);
      ctx.lineTo(centerX - 40, avatarY - 30);
      ctx.lineTo(centerX - 55, avatarY - 30);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(centerX + 20, avatarY - 60);
      ctx.lineTo(centerX + 50, avatarY - 30);
      ctx.lineTo(centerX + 35, avatarY - 30);
      ctx.closePath();
      ctx.fill();

      // Smiling Mouth
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(centerX, avatarY, 35, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();

      // 4. LANYARD STRAPS AROUND NECK
      ctx.strokeStyle = '#ff2a85';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(centerX - 50, avatarY + 70);
      ctx.lineTo(centerX - 25, avatarY + 230);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX + 50, avatarY + 70);
      ctx.lineTo(centerX + 25, avatarY + 230);
      ctx.stroke();

      // Lanyard Printed Text
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 10px "Space Mono", monospace';
      ctx.fillText('#HHGOA', centerX - 42, avatarY + 140);
      ctx.fillText('#HHGOA', centerX + 20, avatarY + 140);

      // Lanyard Clip / Ring
      ctx.fillStyle = '#333333';
      ctx.fillRect(centerX - 15, avatarY + 225, 30, 20);
      ctx.strokeRect(centerX - 15, avatarY + 225, 30, 20);

      // 5. MINI WEARING ID BADGE CARD (Hanging on neck!)
      const badgeX = centerX - 140;
      const badgeY = avatarY + 245;
      const badgeW = 280;
      const badgeH = 175;

      // Badge Card Outer
      ctx.fillStyle = '#115a36';
      ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 4;
      ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);

      // Inner Cream
      ctx.fillStyle = '#f2e7c9';
      ctx.fillRect(badgeX + 8, badgeY + 8, badgeW - 16, badgeH - 16);
      ctx.strokeRect(badgeX + 8, badgeY + 8, badgeW - 16, badgeH - 16);

      // Top Yellow Bar
      ctx.fillStyle = '#ffe600';
      ctx.fillRect(badgeX + 8, badgeY + 8, badgeW - 16, 32);
      ctx.strokeRect(badgeX + 8, badgeY + 8, badgeW - 16, 32);

      ctx.fillStyle = '#000000';
      ctx.font = '900 13px "Space Mono", monospace';
      ctx.fillText('HACKER HOUSE GOA 2026', badgeX + 16, badgeY + 30);

      // Member Name on Mini Badge
      ctx.font = '900 18px "Space Mono", monospace';
      const mName = (member.name || 'BUILDER').toUpperCase();
      ctx.fillText(mName.length > 14 ? mName.substring(0, 14) + '..' : mName, badgeX + 16, badgeY + 68);

      // Role Pill on Mini Badge
      ctx.fillStyle = '#ff2a85';
      ctx.fillRect(badgeX + 16, badgeY + 80, 100, 22);
      ctx.strokeRect(badgeX + 16, badgeY + 80, 100, 22);
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 11px "Space Mono", monospace';
      ctx.fillText((member.role || 'BUILDER').toUpperCase(), badgeX + 22, badgeY + 95);

      // ID & Squad
      ctx.fillStyle = '#000000';
      ctx.font = '700 11px "Space Mono", monospace';
      ctx.fillText(`ID: ${member.assignedId || 'HH-26-1065'}`, badgeX + 16, badgeY + 125);
      if (teamName || member.teamName) {
        ctx.fillText(`TEAM: ${teamName || member.teamName}`, badgeX + 16, badgeY + 142);
      }

      // Member Photo in Mini Badge (Right Side of Mini Card)
      const miniPx = badgeX + 185;
      const miniPy = badgeY + 48;
      const miniPw = 75;
      const miniPh = 95;

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(miniPx, miniPy, miniPw, miniPh);
      ctx.strokeRect(miniPx, miniPy, miniPw, miniPh);

      const finishBitmoji = () => {
        // Watermark at bottom of avatar card
        ctx.fillStyle = '#000000';
        ctx.font = '700 14px "Space Mono", monospace';
        ctx.fillText('VERIFIED BITMOJI PASS • #FRAMEINGOA', m + 20, canvas.height - m - 15);

        if (isMounted) {
          const url = canvas.toDataURL('image/png');
          setDownloadUrl(url);
        }
      };

      if (member.photo) {
        const img = new Image();
        img.src = member.photo;
        img.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.rect(miniPx + 3, miniPy + 3, miniPw - 6, miniPh - 6);
          ctx.clip();

          const zoom = member.zoom || 1.0;
          const sw = img.width / zoom;
          const sh = img.height / zoom;
          const sx = (img.width - sw) / 2;
          const sy = (img.height - sh) / 2;

          ctx.drawImage(img, sx, sy, sw, sh, miniPx + 3, miniPy + 3, miniPw - 6, miniPh - 6);
          ctx.restore();
          finishBitmoji();
        };
        img.onerror = () => finishBitmoji();
      } else {
        ctx.fillStyle = '#d1d5db';
        ctx.fillRect(miniPx + 3, miniPy + 3, miniPw - 6, miniPh - 6);
        ctx.fillStyle = '#4b5563';
        ctx.font = '700 36px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('👤', miniPx + miniPw / 2, miniPy + miniPh / 2 + 10);
        ctx.textAlign = 'left';
        finishBitmoji();
      }
    };

    drawBitmoji();
    return () => { isMounted = false; };
  }, [member, teamName, frameConfig, hoodieColor]);

  const fileName = `${member.name ? member.name.replace(/\s+/g, '_') : 'Builder'}_Bitmoji_Goa2026.png`;

  return (
    <div className="dark-card neo-shadow-lg w-full max-w-4xl mx-auto p-6 rounded-2xl mb-10 flex flex-col items-center border-2 border-yellow-300" style={{ backgroundColor: '#09331e' }}>
      
      {/* Top Title Tag */}
      <div className="text-center mb-6">
        <div className="bg-pink text-white font-mono text-xs font-bold uppercase px-3 py-1 rounded neo-border-sm inline-block mb-2" style={{ backgroundColor: 'var(--accent-pink)' }}>
          🤖 BONUS: YOUR BITMOJI AVATAR PASS
        </div>
        <h2 className="font-display uppercase text-yellow text-3xl sm:text-4xl text-yellow-300">
          Bitmoji Waving "HI!" Wearing Your ID
        </h2>
        <p className="font-mono text-xs text-white/80 max-w-lg mx-auto mt-1">
          Your custom cartoon builder character wearing your printed badge around their neck!
        </p>
      </div>

      {/* Hoodie Color Selector */}
      <div className="flex items-center gap-3 mb-6 bg-black/40 p-3 rounded-xl neo-border-sm">
        <span className="font-mono text-xs font-bold uppercase text-white">Outfit Color:</span>
        <div className="flex gap-2">
          {HOODIE_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setHoodieColor(c)}
              className={`w-7 h-7 rounded-full neo-border-sm transition-transform ${
                hoodieColor.id === c.id ? 'scale-125 outline outline-2 outline-white' : 'hover:scale-110'
              }`}
              style={{ backgroundColor: c.fill }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Bitmoji Canvas Container */}
      <div className="w-full flex justify-center bg-black/50 p-3 rounded-2xl border-2 border-black mb-6">
        <canvas
          ref={canvasRef}
          className="w-full max-w-[550px] neo-shadow rounded-xl border-2 border-black"
          style={{ aspectRatio: '800/950' }}
        />
      </div>

      {/* Download Bitmoji Avatar Button */}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download={fileName}
          className="btn-primary bg-yellow-300 text-black py-3.5 px-8 text-base neo-shadow font-mono font-extrabold flex items-center gap-2"
          style={{ textDecoration: 'none' }}
        >
          <span>🤖 Download Bitmoji Sticker (PNG)</span>
          <span>&darr;</span>
        </a>
      )}
    </div>
  );
};

export default BitmojiAvatarCard;
