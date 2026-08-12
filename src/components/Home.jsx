import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/sound';

const LeftPalmTree = () => (
  <svg viewBox="0 0 280 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full pointer-events-none">
    <path d="M40 600 C80 400 60 200 160 80" stroke="#041E12" strokeWidth="18" strokeLinecap="round" />
    <path d="M40 600 C80 400 60 200 160 80" stroke="#E5A93C" strokeWidth="4" strokeDasharray="12 12" strokeLinecap="round" />
    <path d="M160 80 C110 30 20 50 0 100 C40 90 100 85 160 80 Z" fill="#145A32" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M160 80 C210 20 270 40 280 90 C240 80 190 80 160 80 Z" fill="#1E8449" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M160 80 C100 -10 180 -30 240 0 C190 20 170 50 160 80 Z" fill="#27AE60" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M160 80 C60 80 10 150 20 220 C60 170 120 120 160 80 Z" fill="#114B29" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M160 80 C230 110 260 190 250 250 C220 190 180 130 160 80 Z" fill="#145A32" stroke="#E5A93C" strokeWidth="2"/>
  </svg>
);

const RightPalmTree = () => (
  <svg viewBox="0 0 280 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full pointer-events-none">
    <path d="M240 600 C200 400 220 200 120 80" stroke="#041E12" strokeWidth="18" strokeLinecap="round" />
    <path d="M240 600 C200 400 220 200 120 80" stroke="#E5A93C" strokeWidth="4" strokeDasharray="12 12" strokeLinecap="round" />
    <path d="M120 80 C170 30 260 50 280 100 C240 90 180 85 120 80 Z" fill="#145A32" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M120 80 C70 20 10 40 0 90 C40 80 90 80 120 80 Z" fill="#1E8449" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M120 80 C180 -10 100 -30 40 0 C90 20 110 50 120 80 Z" fill="#27AE60" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M120 80 C220 80 270 150 260 220 C220 170 160 120 120 80 Z" fill="#114B29" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M120 80 C50 110 20 190 30 250 C60 190 100 130 120 80 Z" fill="#145A32" stroke="#E5A93C" strokeWidth="2"/>
  </svg>
);

const LotusIcon = () => (
  <svg width="34" height="26" viewBox="0 0 50 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M25 2C20 12 12 18 2 22C12 28 20 30 25 36C30 30 38 28 48 22C38 18 30 12 25 2Z" fill="#ff2a85" stroke="#ffe600" strokeWidth="2"/>
    <path d="M25 8C22 16 16 20 8 23C16 27 22 28 25 33C28 28 34 27 42 23C34 20 28 16 25 8Z" fill="#a01250"/>
    <path d="M25 14C23 18 19 21 13 23C19 25 23 26 25 30C27 26 31 25 37 23C31 21 27 18 25 14Z" fill="#ffe600"/>
  </svg>
);

const CountdownUnit = ({ value, label, accent = false }) => (
  <div className="rounded border border-white/10 bg-white/10 p-2 text-center">
    <div className={`font-mono text-xl font-black sm:text-2xl ${accent ? 'text-goa-pink' : 'text-goa-yellow'}`}>
      {String(value).padStart(2, '0')}
    </div>
    <div className="font-mono text-[9px] uppercase text-white/70">{label}</div>
  </div>
);

const Home = ({ navigateTo }) => {
  const [audioMuted, setAudioMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-10-28T09:00:00+05:30').getTime();
    const tick = () => {
      const diff = Math.max(0, targetDate - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = (mode) => {
    soundFX.playFanfare();
    navigateTo(mode);
  };

  const toggleSound = () => {
    setAudioMuted(soundFX.toggleMute());
  };

  return (
    <div className="home-shell retro-scanlines">
      {/* Palm tree decorations */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-16 z-0 w-36 opacity-30 sm:w-56 md:w-72 lg:w-80">
        <LeftPalmTree />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 top-16 z-0 w-36 opacity-30 sm:w-56 md:w-72 lg:w-80">
        <RightPalmTree />
      </div>

      {/* Header */}
      <header className="home-header">
        <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          <div
            className="neo-border flex cursor-pointer flex-col items-center justify-center px-3 py-1 font-mono font-black shadow-md transition-transform hover:scale-105"
            style={{ backgroundColor: '#ffe600', borderRadius: '6px' }}
            onClick={() => soundFX.playClick()}
          >
            <span className="text-xs font-black leading-none text-goa-pink">2:41 PM</span>
            <span className="mt-0.5 text-[9px] font-bold leading-none tracking-widest">STUDIO</span>
          </div>
          <button
            onClick={toggleSound}
            className="hidden items-center gap-1.5 rounded border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-xs transition-colors hover:bg-black/70 sm:flex"
            title="Toggle Sound Effects"
          >
            {audioMuted ? '🔇 Muted' : '🔊 Sound FX'}
          </button>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-center gap-2 px-2 sm:gap-4">
          <div className="hidden md:block"><LotusIcon /></div>
          <div
            className="font-display flex items-center justify-center gap-1.5 uppercase tracking-widest text-goa-yellow retro-text-shadow-sm sm:gap-3"
            style={{ fontSize: 'clamp(1rem, 3vw, 2.5rem)' }}
          >
            <span>HACKER</span>
            <span
              className="font-sans inline-block rotate-[-4deg] rounded px-1.5 py-0.5 font-black shadow-lg sm:px-2"
              style={{
                color: '#ff2a85',
                fontSize: 'clamp(1.1rem, 3.2vw, 2.7rem)',
                WebkitTextStroke: '1.5px #ffe600',
                textShadow: '3px 3px 0px #000',
              }}
            >
              गोवा
            </span>
            <span>HOUSE</span>
          </div>
          <div className="hidden md:block"><LotusIcon /></div>
        </div>

        <div className="shrink-0">
          <button
            className="goa-pattern-btn whitespace-nowrap px-4 py-2 text-xs sm:px-6 sm:text-sm"
            onClick={() => handleStart('choose')}
          >
            CLAIM PASSPORT ↗
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="home-main">
        <div className="mb-5 flex justify-start sm:mb-6">
          <div
            className="retro-pill neo-border-sm shadow-lg"
            style={{ backgroundColor: '#074828', color: '#ffe600', borderColor: '#ffe600' }}
          >
            <span>✨</span>
            <span>BUILDER CREDENTIAL GENERATOR</span>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left: headline */}
          <div className="select-none lg:col-span-7">
            <h1
              className="font-display w-full text-left uppercase leading-[0.85] text-[#FAF6E9] retro-text-shadow text-stroke-dark"
              style={{ fontSize: 'clamp(3rem, 10vw, 130px)', letterSpacing: '0.02em' }}
            >
              BUILD
            </h1>

            <div className="relative my-1 flex w-full flex-wrap items-center gap-2 sm:my-2 sm:gap-4">
              <h1
                className="font-display uppercase leading-[0.85] text-[#FAF6E9] retro-text-shadow text-stroke-dark"
                style={{ fontSize: 'clamp(3rem, 10vw, 130px)', letterSpacing: '0.02em' }}
              >
                YOUR
              </h1>
              <div
                className="neo-border font-display cursor-pointer rounded-2xl px-5 py-2 font-black uppercase text-white shadow-2xl transition-transform hover:rotate-0 sm:px-8 sm:py-4"
                style={{
                  backgroundColor: '#ff2a85',
                  fontSize: 'clamp(2.2rem, 7vw, 96px)',
                  lineHeight: '0.8',
                  boxShadow: '6px 6px 0px 0px #000',
                  transform: 'rotate(6deg)',
                }}
                onClick={() => handleStart('choose')}
              >
                ID
              </div>
            </div>

            <h1
              className="font-display w-full text-left uppercase leading-[0.85] text-goa-gold retro-text-shadow text-stroke-dark"
              style={{ fontSize: 'clamp(3rem, 10vw, 130px)', letterSpacing: '0.02em' }}
            >
              HH GOA
            </h1>
          </div>

          {/* Right: details panel */}
          <div className="flex flex-col justify-between border-t border-white/20 py-2 lg:col-span-5 lg:border-l-2 lg:border-t-0 lg:pl-8">
            <div className="space-y-4">
              <div>
                <div className="font-mono text-xs font-extrabold uppercase tracking-widest text-white/80 sm:text-sm">
                  GOA, INDIA &bull; गोवा
                </div>
                <div className="font-display mt-1 text-3xl font-black uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
                  28 &mdash; 31 OCT 2026
                </div>
                <div className="font-mono mt-1 text-xs font-bold uppercase tracking-wider text-goa-yellow">
                  4 DAYS OF INTENSIVE BUILDING & CULTURE
                </div>
              </div>

              <p className="font-mono border-t border-white/15 pt-3 text-xs leading-relaxed text-white/90 sm:text-sm">
                Create your official Hacker House Goa 2026 Builder Passport. Share your identity pass across X with{' '}
                <span className="font-bold text-goa-yellow">#FrameInGoa</span> to join the community build movement.
              </p>
            </div>

            <div className="my-6 rounded-xl border border-white/20 bg-black/60 p-4 backdrop-blur-md">
              <div className="mb-2 flex items-center gap-2 font-mono text-[11px] font-bold uppercase text-goa-pink">
                <span className="inline-block h-2 w-2 animate-ping rounded-full bg-goa-pink" />
                <span>EVENT COUNTDOWN</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <CountdownUnit value={timeLeft.days} label="Days" />
                <CountdownUnit value={timeLeft.hours} label="Hours" />
                <CountdownUnit value={timeLeft.mins} label="Mins" />
                <CountdownUnit value={timeLeft.secs} label="Secs" accent />
              </div>
            </div>

            <button
              onClick={() => handleStart('choose')}
              className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border-[3px] border-black px-8 py-4 font-mono text-sm font-black uppercase tracking-wider shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] sm:text-base"
              style={{
                backgroundColor: '#E5A93C',
                color: '#000',
                boxShadow: '0 0 25px rgba(229, 169, 60, 0.6), 6px 6px 0px 0px #000',
              }}
            >
              <span className="text-xl">⚡</span>
              <span>CLAIM YOUR PASSPORT</span>
              <span className="text-lg">&rarr;</span>
            </button>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 border-t border-white/15 pt-8 sm:grid-cols-3 sm:mt-12">
          {[
            { icon: '🎫', color: 'text-goa-yellow', title: '4K High-Res PNG & ZIP', desc: 'Press 2400×1500px collectible passes ready for printing or socials.' },
            { icon: '👥', color: 'text-goa-pink', title: 'Solo & Squad Generator', desc: 'Build solo or press full team passes in one seamless batch.' },
            { icon: '🎨', color: 'text-goa-cyan', title: 'Theme & Sticker Studio', desc: 'Customize with Goa Lotus, Anjuna Sunset, stickers & Bitmojis.' },
          ].map(({ icon, color, title, desc }) => (
            <div key={title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/30 p-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <div className={`font-mono text-xs font-bold uppercase ${color}`}>{title}</div>
                <div className="font-mono text-[11px] text-white/70">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="home-footer">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 text-center font-mono text-xs font-bold uppercase tracking-widest text-white/90 sm:flex-row">
          <div>🌴 GOA, INDIA &bull; 28 - 31 OCT 2026</div>
          <div className="text-goa-yellow">#FRAMEINGOA &bull; HACKER HOUSE GOA 2026</div>
          <div className="text-[10px] text-white/60">🔥 1,420+ PASSPORTS ISSUED</div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
