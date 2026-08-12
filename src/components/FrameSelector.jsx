import React, { useState, useEffect, useRef } from 'react';
import { drawCanvasQRCode } from '../utils/qrCode';
import { soundFX } from '../utils/sound';

export const THEMES = [
  {
    id: 'goa-estate',
    name: 'Goa Tropical Estate',
    tagline: 'Image 1 & 2 replica with emerald forest, lotus & gold accents',
    bg: '#07301c',
    cardBg: '#FAF6E9',
    headerBg: '#ffe600',
    headerText: '#07301c',
    accent: '#ff2a85',
    textColor: '#000000',
    borderColor: '#041E12'
  },
  {
    id: 'anjuna-sunset',
    name: 'Anjuna Cyber Sunset',
    tagline: 'Vibrant dusk purple with neon pink & cyan glow',
    bg: '#1a0b2e',
    cardBg: '#2d124d',
    headerBg: '#ff2a85',
    headerText: '#ffffff',
    accent: '#00e5ff',
    textColor: '#ffffff',
    borderColor: '#00e5ff'
  },
  {
    id: 'retro-arcade',
    name: '80s Beach Arcade',
    tagline: 'Retro grid with neon lime & pixel palm aesthetics',
    bg: '#0d1117',
    cardBg: '#161b22',
    headerBg: '#ccff00',
    headerText: '#000000',
    accent: '#00e5ff',
    textColor: '#ffffff',
    borderColor: '#ccff00'
  },
  {
    id: 'vip-gold',
    name: 'Palolem VIP Obsidian Gold',
    tagline: 'Sleek dark obsidian with metallic gold foil typography',
    bg: '#0f0f0f',
    cardBg: '#1c1c1c',
    headerBg: '#E5A93C',
    headerText: '#000000',
    accent: '#f3e5ab',
    textColor: '#ffffff',
    borderColor: '#E5A93C'
  },
  {
    id: 'palolem-matrix',
    name: 'Palolem Night Matrix',
    tagline: 'Deep dark obsidian & matrix neon emerald green',
    bg: '#041e12',
    cardBg: '#0b3c26',
    headerBg: '#10b981',
    headerText: '#000000',
    accent: '#ffe600',
    textColor: '#ffffff',
    borderColor: '#10b981'
  }
];

export const STICKERS = [
  { id: 'goa2026', label: '🌴 GOA 2026' },
  { id: 'vip', label: '👑 VIP BUILDER' },
  { id: 'ship', label: '🚀 SHIP IT' },
  { id: 'solana', label: '⚡ SOLANA' },
  { id: 'ai', label: '🧠 AI AGENT' },
  { id: 'rust', label: '🦀 RUST DEV' },
  { id: 'verified', label: '✅ VERIFIED PASS' }
];

const FrameSelector = ({ members, teamName, generationMode, frameConfig, setFrameConfig, navigateTo }) => {
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
  const [showLanyard, setShowLanyard] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const previewCanvasRef = useRef(null);

  const activeMember = members[selectedMemberIndex] || members[0] || { name: 'BUILDER' };
  const currentTheme = THEMES.find(t => t.id === frameConfig.themeId) || THEMES[0];

  // Render live preview on canvas
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 500;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Frame Background Fill
    ctx.fillStyle = currentTheme.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Card Inner Fill
    const m = 20;
    ctx.fillStyle = currentTheme.cardBg;
    ctx.fillRect(m, m, canvas.width - (m * 2), canvas.height - (m * 2));

    // Outer Border
    ctx.strokeStyle = currentTheme.borderColor;
    ctx.lineWidth = 6;
    ctx.strokeRect(m, m, canvas.width - (m * 2), canvas.height - (m * 2));

    // 3. Top Banner Header (matching Image 2: HACKER ... Goa ... HOUSE)
    ctx.fillStyle = currentTheme.headerBg;
    ctx.fillRect(m, m, canvas.width - (m * 2), 75);
    ctx.beginPath();
    ctx.moveTo(m, m + 75);
    ctx.lineTo(canvas.width - m, m + 75);
    ctx.stroke();

    // Studio Icon Box on Top Left
    ctx.fillStyle = currentTheme.accent;
    ctx.fillRect(m + 16, m + 12, 54, 52);
    ctx.strokeRect(m + 16, m + 12, 54, 52);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 24px "Space Mono", monospace';
    ctx.fillText('HH', m + 26, m + 46);

    // Header Title Text
    ctx.fillStyle = currentTheme.headerText;
    ctx.font = '900 32px "Anton", "Bebas Neue", sans-serif';
    ctx.fillText('HACKER HOUSE GOA 2026', m + 85, m + 50);

    // 4. Member Name
    ctx.fillStyle = currentTheme.textColor;
    ctx.font = '900 40px "Space Mono", monospace';
    const nameText = (activeMember.name || 'ANONYMOUS BUILDER').toUpperCase();
    ctx.fillText(nameText.length > 17 ? nameText.substring(0, 17) + '...' : nameText, m + 30, m + 145);

    // 5. Role Badge & Title Badge
    ctx.fillStyle = currentTheme.headerBg;
    const roleStr = (activeMember.role || 'BUILDER').toUpperCase();
    ctx.font = '700 20px "Space Mono", monospace';
    const roleWidth = ctx.measureText(roleStr).width + 28;
    ctx.fillRect(m + 30, m + 175, roleWidth, 38);
    ctx.strokeRect(m + 30, m + 175, roleWidth, 38);

    ctx.fillStyle = currentTheme.headerText;
    ctx.fillText(roleStr, m + 44, m + 201);

    if (activeMember.title) {
      ctx.fillStyle = currentTheme.accent;
      const titleStr = activeMember.title.toUpperCase();
      const titleWidth = ctx.measureText(titleStr).width + 28;
      ctx.fillRect(m + 30 + roleWidth + 12, m + 175, titleWidth, 38);
      ctx.strokeRect(m + 30 + roleWidth + 12, m + 175, titleWidth, 38);

      ctx.fillStyle = '#ffffff';
      ctx.fillText(titleStr, m + 44 + roleWidth + 12, m + 201);
    }

    // 6. ID & Squad info
    ctx.fillStyle = currentTheme.textColor;
    ctx.font = '700 20px "Space Mono", monospace';
    ctx.fillText(`ID: ${activeMember.assignedId || 'HH-26-1065'}`, m + 30, m + 270);

    const displaySquad = teamName || activeMember.teamName;
    if (displaySquad) {
      ctx.fillText(`SQUAD: ${displaySquad.toUpperCase()}`, m + 30, m + 305);
    }

    // 7. Photo Box (Right side)
    const px = canvas.width - 280;
    const py = m + 95;
    const pw = 220;
    const ph = 260;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px, py, pw, ph);
    ctx.strokeRect(px, py, pw, ph);

    if (activeMember.photo) {
      const img = new Image();
      img.src = activeMember.photo;
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(px + 6, py + 6, pw - 12, ph - 12);
        ctx.clip();

        const zoom = activeMember.zoom || 1.0;
        const sw = img.width / zoom;
        const sh = img.height / zoom;
        const sx = (img.width - sw) / 2;
        const sy = (img.height - sh) / 2;

        ctx.drawImage(img, sx, sy, sw, sh, px + 6, py + 6, pw - 12, ph - 12);
        ctx.restore();
      };
    } else {
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(px + 6, py + 6, pw - 12, ph - 12);
      ctx.fillStyle = '#6b7280';
      ctx.font = '700 48px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👤', px + pw / 2, py + ph / 2 + 15);
      ctx.textAlign = 'left';
    }

    // 8. Draw QR Code in bottom left
    const qrData = `HHGOA2026:${activeMember.assignedId}:${activeMember.name}:${activeMember.role}`;
    drawCanvasQRCode(ctx, qrData, m + 30, m + 335, 105, currentTheme.borderColor, currentTheme.cardBg);

    // 9. Draw Stickers Overlay
    if (frameConfig.stickers && frameConfig.stickers.length > 0) {
      let stickerX = m + 150;
      const stickerY = m + 360;

      frameConfig.stickers.forEach((stId) => {
        const st = STICKERS.find((s) => s.id === stId);
        if (st) {
          ctx.fillStyle = currentTheme.accent;
          ctx.font = '700 14px "Space Mono", monospace';
          const stW = ctx.measureText(st.label).width + 16;

          if (stickerX + stW < px - 10) {
            ctx.fillRect(stickerX, stickerY, stW, 28);
            ctx.strokeRect(stickerX, stickerY, stW, 28);

            ctx.fillStyle = '#ffffff';
            ctx.fillText(st.label, stickerX + 8, stickerY + 19);
            stickerX += stW + 8;
          }
        }
      });
    }

    // Watermark / Hash Code at bottom right
    ctx.fillStyle = currentTheme.textColor;
    ctx.font = '700 12px "Space Mono", monospace';
    ctx.fillText('VERIFIED PASSPORT • #FRAMEINGOA', canvas.width - 280, m + 440);

  }, [activeMember, currentTheme, frameConfig, teamName]);

  const toggleSticker = (stickerId) => {
    soundFX.playClick();
    const current = frameConfig.stickers || [];
    if (current.includes(stickerId)) {
      setFrameConfig({ ...frameConfig, stickers: current.filter(id => id !== stickerId) });
    } else {
      setFrameConfig({ ...frameConfig, stickers: [...current, stickerId] });
    }
  };

  const selectTheme = (themeId) => {
    soundFX.playClick();
    setFrameConfig({ ...frameConfig, themeId });
  };

  const handleProceed = () => {
    soundFX.playFanfare();
    navigateTo('generate');
  };

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto py-4 fade-in select-none">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-pink font-mono text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent-pink)' }}>
          Step 03 &bull; Visual Customization Studio
        </div>
        <h1 
          className="font-display uppercase text-yellow mb-2"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)', color: 'var(--accent-yellow)', WebkitTextStroke: '2px #000' }}
        >
          Select Frame & Theme
        </h1>
        <p className="font-mono text-xs sm:text-sm max-w-lg mx-auto opacity-90">
          Customize your passport theme, add retro sticker badges, toggle lanyard preview, and inspect your live badge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Controls (Theme Presets & Stickers) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Theme Presets Box */}
          <div className="cream-card neo-shadow p-6" style={{ borderRadius: '20px' }}>
            <h3 className="font-display uppercase text-2xl mb-4 text-black border-b border-black/15 pb-2">
              1. Choose Passport Theme
            </h3>
            
            <div className="flex flex-col gap-3">
              {THEMES.map((t) => {
                const isSelected = frameConfig.themeId === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => selectTheme(t.id)}
                    className={`theme-card-option p-4 flex items-center justify-between ${
                      isSelected ? 'selected' : ''
                    }`}
                    style={{ backgroundColor: t.cardBg, color: t.textColor }}
                  >
                    <div>
                      <div className="font-mono text-sm font-black uppercase flex items-center gap-2">
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-black inline-block shadow-sm" 
                          style={{ backgroundColor: t.headerBg }} 
                        />
                        <span>{t.name}</span>
                      </div>
                      <p className="font-mono text-[11px] opacity-80 mt-1">{t.tagline}</p>
                    </div>
                    {isSelected && (
                      <span className="bg-yellow-300 text-black neo-border-sm px-2.5 py-0.5 font-mono text-xs font-black rounded">
                        ACTIVE
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stickers & Badges Box */}
          <div className="cream-card neo-shadow p-6" style={{ borderRadius: '20px' }}>
            <h3 className="font-display uppercase text-2xl mb-3 text-black border-b border-black/15 pb-2">
              2. Add Sticker Badges
            </h3>
            <p className="font-mono text-xs text-gray-800 mb-4">
              Click stickers to toggle them on your badge:
            </p>
            
            <div className="flex flex-wrap gap-2">
              {STICKERS.map((st) => {
                const active = (frameConfig.stickers || []).includes(st.id);
                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => toggleSticker(st.id)}
                    className={`sticker-pill ${active ? 'active' : ''}`}
                  >
                    <span>{st.label}</span>
                    <span>{active ? '✓' : '+'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls Bar: Lanyard & Flip Pass */}
          <div className="dark-card neo-shadow p-4 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderRadius: '16px' }}>
            <span className="font-mono text-xs font-black uppercase text-white">
              Display Modes:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setShowLanyard(!showLanyard);
                }}
                className={`btn-secondary text-xs px-3.5 py-1.5 font-bold ${
                  showLanyard ? 'bg-yellow-300 text-black border-black' : ''
                }`}
              >
                {showLanyard ? 'Lanyard ON 🎫' : 'Card Only 💳'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Badge Canvas Preview */}
        <div className="lg:col-span-7 flex flex-col gap-6 sticky top-6">
          <div className="dark-card neo-shadow-lg p-6 flex flex-col items-center" style={{ borderRadius: '24px' }}>
            
            {/* Squad Teammate Selector (if squad mode and members > 1) */}
            {generationMode === 'squad' && members.length > 1 && (
              <div className="w-full mb-6 border-b border-white/10 pb-4">
                <div className="font-mono text-xs text-yellow-300 font-black uppercase mb-2 flex items-center justify-between">
                  <span>PREVIEW TEAMMATE BADGE:</span>
                  <span>{selectedMemberIndex + 1} OF {members.length}</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {members.map((m, idx) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setSelectedMemberIndex(idx);
                      }}
                      className={`font-mono text-xs font-black px-3.5 py-1.5 rounded-xl border-2 border-black transition-all ${
                        selectedMemberIndex === idx
                          ? 'bg-yellow-300 text-black shadow-[3px_3px_0px_0px_#000]'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      0{idx + 1}. {m.name?.split(' ')[0] || `Member ${idx + 1}`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lanyard Clip Overlay */}
            {showLanyard && (
              <div className="flex flex-col items-center -mb-3 z-10">
                <div className="w-5 h-12 bg-gradient-to-r from-yellow-400 via-pink-500 to-yellow-400 neo-border-sm rounded-t-sm" />
                <div className="w-12 h-4 bg-gray-900 border-2 border-black rounded-sm shadow-md flex items-center justify-center">
                  <div className="w-4 h-1 bg-white/40 rounded-full" />
                </div>
              </div>
            )}

            {/* Canvas Container */}
            <div className="w-full flex justify-center bg-black/50 p-3 rounded-2xl border-2 border-black shadow-inner">
              <canvas
                ref={previewCanvasRef}
                className="w-full neo-shadow rounded-xl border-2 border-black max-w-[660px]"
                style={{ aspectRatio: '8/5' }}
              />
            </div>

            {/* Canvas Notice */}
            <div className="font-mono text-[11px] text-white/80 mt-4 text-center flex items-center gap-2">
              <span>⚡</span>
              <span>High-Resolution 2400×1500px 4K Badge Canvas Ready</span>
            </div>
          </div>

          {/* Action Button: Proceed to Generate */}
          <div className="btn-striped neo-shadow-lg">
            <button
              className="btn-inner uppercase font-mono font-black text-lg"
              style={{ border: 'none', cursor: 'pointer' }}
              onClick={handleProceed}
            >
              Generate & Download Badges 💫 &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameSelector;
