import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/sound';

// Detailed Palm Tree Vectors matching attached images
const LeftPalmTree = () => (
  <svg viewBox="0 0 280 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain pointer-events-none">
    {/* Trunk */}
    <path d="M40 600 C80 400 60 200 160 80" stroke="#041E12" strokeWidth="18" strokeLinecap="round" />
    <path d="M40 600 C80 400 60 200 160 80" stroke="#E5A93C" strokeWidth="4" strokeDasharray="12 12" strokeLinecap="round" />
    
    {/* Palm Fronds */}
    <path d="M160 80 C110 30 20 50 0 100 C40 90 100 85 160 80 Z" fill="#145A32" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M160 80 C210 20 270 40 280 90 C240 80 190 80 160 80 Z" fill="#1E8449" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M160 80 C100 -10 180 -30 240 0 C190 20 170 50 160 80 Z" fill="#27AE60" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M160 80 C60 80 10 150 20 220 C60 170 120 120 160 80 Z" fill="#114B29" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M160 80 C230 110 260 190 250 250 C220 190 180 130 160 80 Z" fill="#145A32" stroke="#E5A93C" strokeWidth="2"/>
  </svg>
);

const RightPalmTree = () => (
  <svg viewBox="0 0 280 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-contain pointer-events-none">
    {/* Trunk */}
    <path d="M240 600 C200 400 220 200 120 80" stroke="#041E12" strokeWidth="18" strokeLinecap="round" />
    <path d="M240 600 C200 400 220 200 120 80" stroke="#E5A93C" strokeWidth="4" strokeDasharray="12 12" strokeLinecap="round" />
    
    {/* Palm Fronds */}
    <path d="M120 80 C170 30 260 50 280 100 C240 90 180 85 120 80 Z" fill="#145A32" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M120 80 C70 20 10 40 0 90 C40 80 90 80 120 80 Z" fill="#1E8449" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M120 80 C180 -10 100 -30 40 0 C90 20 110 50 120 80 Z" fill="#27AE60" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M120 80 C220 80 270 150 260 220 C220 170 160 120 120 80 Z" fill="#114B29" stroke="#E5A93C" strokeWidth="2"/>
    <path d="M120 80 C50 110 20 190 30 250 C60 190 100 130 120 80 Z" fill="#145A32" stroke="#E5A93C" strokeWidth="2"/>
  </svg>
);

// Lotus Flower SVG Motif
const LotusIcon = () => (
  <svg width="34" height="26" viewBox="0 0 50 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M25 2C20 12 12 18 2 22C12 28 20 30 25 36C30 30 38 28 48 22C38 18 30 12 25 2Z" fill="#ff2a85" stroke="#ffe600" strokeWidth="2"/>
    <path d="M25 8C22 16 16 20 8 23C16 27 22 28 25 33C28 28 34 27 42 23C34 20 28 16 25 8Z" fill="#a01250"/>
    <path d="M25 14C23 18 19 21 13 23C19 25 23 26 25 30C27 26 31 25 37 23C31 21 27 18 25 14Z" fill="#ffe600"/>
  </svg>
);

const Home = ({ navigateTo }) => {
  const [audioMuted, setAudioMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 77, hours: 14, mins: 32, secs: 10 });

  // Countdown timer calculation to Oct 28 2026
  useEffect(() => {
    const targetDate = new Date('2026-10-28T09:00:00+05:30').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, mins, secs });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStart = (mode) => {
    soundFX.playFanfare();
    navigateTo(mode);
  };

  const toggleSound = () => {
    const isMuted = soundFX.toggleMute();
    setAudioMuted(isMuted);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between relative bg-[#07301c] text-white overflow-hidden selection:bg-[#ffe600] selection:text-black">
      
      {/* Background Palm Tree Graphics */}
      <div className="absolute top-12 left-0 w-48 sm:w-72 md:w-80 h-full opacity-35 z-0 pointer-events-none">
        <LeftPalmTree />
      </div>
      <div className="absolute top-12 right-0 w-48 sm:w-72 md:w-80 h-full opacity-35 z-0 pointer-events-none">
        <RightPalmTree />
      </div>

      {/* 1. TOP HEADER BAR matching Image 2 */}
      <header 
        className="w-full z-30 px-4 sm:px-8 py-3 flex items-center justify-between border-b-2 border-black shrink-0 relative" 
        style={{ backgroundColor: '#041d11' }}
      >
        {/* Left Studio Clock Logo */}
        <div className="flex items-center gap-3">
          <div 
            className="neo-border text-black px-3 py-1 flex flex-col items-center justify-center font-mono font-black shadow-md cursor-pointer hover:scale-105 transition-transform"
            style={{ backgroundColor: '#ffe600', borderRadius: '6px' }}
            onClick={() => soundFX.playClick()}
          >
            <span className="text-xs leading-none font-black" style={{ color: '#ff2a85' }}>2:41 PM</span>
            <span className="text-[9px] tracking-widest leading-none mt-0.5 font-bold">STUDIO</span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            className="font-mono text-xs px-2.5 py-1 rounded bg-black/40 border border-white/20 hover:bg-black/70 transition-colors flex items-center gap-1.5"
            title="Toggle Sound Effects"
          >
            <span>{audioMuted ? '🔇 Muted' : '🔊 Sound FX'}</span>
          </button>
        </div>

        {/* Center Header Title: HACKER ... गोवा ... HOUSE */}
        <div className="flex items-center justify-center gap-2 sm:gap-5 flex-1 px-2">
          <div className="hidden md:block"><LotusIcon /></div>
          
          <div className="flex items-center justify-center gap-2 sm:gap-4 font-display uppercase tracking-widest text-[#ffe600]" style={{ fontSize: 'clamp(1.2rem, 3.5vw, 2.5rem)', textShadow: '2px 2px 0px #000' }}>
            <span>HACKER</span>
            <span 
              className="px-2 py-0.5 rounded font-sans font-black rotate-[-4deg] inline-block shadow-lg"
              style={{
                backgroundColor: 'transparent',
                color: '#ff2a85',
                fontSize: 'clamp(1.3rem, 3.8vw, 2.7rem)',
                WebkitTextStroke: '1.5px #ffe600',
                textShadow: '3px 3px 0px #000'
              }}
            >
              गोवा
            </span>
            <span>HOUSE</span>
          </div>

          <div className="hidden md:block"><LotusIcon /></div>
        </div>

        {/* Right Action Button */}
        <div>
          <button 
            className="goa-pattern-btn text-xs sm:text-sm px-4 sm:px-6 py-2 shadow-xl"
            onClick={() => handleStart('choose')}
          >
            CLAIM PASSPORT ↗
          </button>
        </div>
      </header>

      {/* 2. MAIN HERO SECTION matching IMAGE 1 layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12 z-20 flex flex-col justify-center">
        
        {/* Top Tagline Pill */}
        <div className="mb-6 flex justify-start">
          <div 
            className="font-mono text-xs sm:text-sm font-black uppercase tracking-widest px-4 py-1.5 rounded-full neo-border-sm flex items-center gap-2 shadow-lg"
            style={{ backgroundColor: '#074828', color: '#ffe600', borderColor: '#ffe600' }}
          >
            <span>✨</span>
            <span>BUILDER CREDENTIAL GENERATOR</span>
          </div>
        </div>

        {/* Grid Layout matching Image 1: Big Headline on Left, Detailed Text & CTA on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Huge "BUILD YOUR ID HH GOA" text */}
          <div className="lg:col-span-7 flex flex-col items-start select-none">
            
            {/* Line 1: BUILD */}
            <h1 
              className="font-display uppercase text-left w-full"
              style={{
                fontSize: 'clamp(3.5rem, 11vw, 135px)',
                lineHeight: '0.85',
                color: '#FAF6E9',
                WebkitTextStroke: '2px #041E12',
                textShadow: '5px 5px 0px rgba(0,0,0,0.9)',
                letterSpacing: '0.02em'
              }}
            >
              BUILD
            </h1>

            {/* Line 2: YOUR + HOT PINK "ID" STICKER */}
            <div className="flex items-center gap-2 sm:gap-4 relative w-full flex-wrap my-1 sm:my-2">
              <h1 
                className="font-display uppercase"
                style={{
                  fontSize: 'clamp(3.5rem, 11vw, 135px)',
                  lineHeight: '0.85',
                  color: '#FAF6E9',
                  WebkitTextStroke: '2px #041E12',
                  textShadow: '5px 5px 0px rgba(0,0,0,0.9)',
                  letterSpacing: '0.02em'
                }}
              >
                YOUR
              </h1>

              {/* Hot Pink ID Sticker (Image 1 replica) */}
              <div 
                className="px-5 py-2 sm:px-8 sm:py-4 rounded-2xl neo-border font-display font-black uppercase text-white shadow-2xl rotate-[6deg] hover:rotate-0 transition-transform cursor-pointer"
                style={{
                  backgroundColor: '#ff2a85',
                  fontSize: 'clamp(2.5rem, 8vw, 100px)',
                  lineHeight: '0.8',
                  boxShadow: '6px 6px 0px 0px #000',
                  borderColor: '#000'
                }}
                onClick={() => handleStart('choose')}
              >
                ID
              </div>
            </div>

            {/* Line 3: HH GOA in Gold */}
            <h1 
              className="font-display uppercase text-left w-full"
              style={{
                fontSize: 'clamp(3.5rem, 11vw, 135px)',
                lineHeight: '0.85',
                color: '#E5A93C',
                WebkitTextStroke: '2px #041E12',
                textShadow: '5px 5px 0px rgba(0,0,0,0.9)',
                letterSpacing: '0.02em'
              }}
            >
              HH GOA
            </h1>
          </div>

          {/* Right Column: Event Details & Gold CTA Button (Image 1 replica) */}
          <div className="lg:col-span-5 flex flex-col justify-between border-l-0 lg:border-l-2 border-white/20 lg:pl-8 py-2">
            
            <div className="space-y-4">
              {/* Location & Dates */}
              <div>
                <div className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white/80">
                  GOA, INDIA &bull; गोवा
                </div>
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-wide mt-1">
                  28 &mdash; 31 OCT 2026
                </div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#ffe600] mt-1">
                  4 DAYS OF INTENSIVE BUILDING & CULTURE
                </div>
              </div>

              {/* Description Box */}
              <p className="font-mono text-xs sm:text-sm text-white/90 leading-relaxed pt-3 border-t border-white/15">
                Create your official Hacker House Goa 2026 Builder Passport. Share your identity pass across X with <span className="text-[#ffe600] font-bold">#FrameInGoa</span> to join the community build movement.
              </p>
            </div>

            {/* Live Countdown Ticker Box */}
            <div className="my-6 p-4 rounded-xl bg-black/60 border border-white/20 backdrop-blur-md">
              <div className="font-mono text-[11px] font-bold uppercase text-[#ff2a85] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ff2a85] animate-ping inline-block" />
                <span>EVENT COUNTDOWN TICKER</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center font-mono font-black">
                <div className="bg-white/10 p-2 rounded border border-white/10">
                  <div className="text-xl sm:text-2xl text-[#ffe600]">{timeLeft.days}</div>
                  <div className="text-[9px] text-white/70 uppercase">DAYS</div>
                </div>
                <div className="bg-white/10 p-2 rounded border border-white/10">
                  <div className="text-xl sm:text-2xl text-[#ffe600]">{timeLeft.hours}</div>
                  <div className="text-[9px] text-white/70 uppercase">HOURS</div>
                </div>
                <div className="bg-white/10 p-2 rounded border border-white/10">
                  <div className="text-xl sm:text-2xl text-[#ffe600]">{timeLeft.days > 0 ? timeLeft.mins : '0'}</div>
                  <div className="text-[9px] text-white/70 uppercase">MINS</div>
                </div>
                <div className="bg-white/10 p-2 rounded border border-white/10">
                  <div className="text-xl sm:text-2xl text-[#ff2a85]">{timeLeft.secs}</div>
                  <div className="text-[9px] text-white/70 uppercase">SECS</div>
                </div>
              </div>
            </div>

            {/* Main Gold Pill CTA Button matching Image 1 */}
            <div className="pt-2">
              <button
                onClick={() => handleStart('choose')}
                className="w-full font-mono font-black text-sm sm:text-base py-4 px-8 rounded-full uppercase tracking-wider flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-2xl cursor-pointer"
                style={{
                  backgroundColor: '#E5A93C',
                  color: '#000000',
                  border: '3px solid #000000',
                  boxShadow: '0 0 25px rgba(229, 169, 60, 0.6), 6px 6px 0px 0px #000'
                }}
              >
                <span className="text-xl">⚡</span>
                <span>CLAIM YOUR PASSPORT</span>
                <span className="text-lg">&rarr;</span>
              </button>
            </div>

          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/15">
          <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex items-start gap-3">
            <span className="text-2xl">🎫</span>
            <div>
              <div className="font-mono text-xs font-bold text-[#ffe600] uppercase">4K High-Res PNG & ZIP</div>
              <div className="font-mono text-[11px] text-white/70">Press 2400×1500px collectible passes ready for printing or socials.</div>
            </div>
          </div>

          <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex items-start gap-3">
            <span className="text-2xl">👥</span>
            <div>
              <div className="font-mono text-xs font-bold text-[#ff2a85] uppercase">Solo & Squad Generator</div>
              <div className="font-mono text-[11px] text-white/70">Build solo or press full team passes in one seamless batch.</div>
            </div>
          </div>

          <div className="bg-black/30 p-4 rounded-xl border border-white/10 flex items-start gap-3">
            <span className="text-2xl">🎨</span>
            <div>
              <div className="font-mono text-xs font-bold text-[#00e5ff] uppercase">Theme & Sticker Studio</div>
              <div className="font-mono text-[11px] text-white/70">Customize with Goa Lotus, Anjuna Sunset, stickers & Bitmojis.</div>
            </div>
          </div>
        </div>

      </main>

      {/* 3. TROPICAL FOOTER BAR */}
      <footer className="w-full z-30 shrink-0 border-t-2 border-black py-4 bg-[#041d11]">
        <div className="w-full max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-center font-mono text-xs text-white/90 font-bold uppercase tracking-widest gap-2">
          <div>🌴 GOA, INDIA &bull; 28 - 31 OCT 2026</div>
          <div style={{ color: '#ffe600' }}>#FRAMEINGOA &bull; HACKER HOUSE GOA 2026</div>
          <div className="text-white/60 text-[10px]">🔥 1,420+ PASSPORTS ISSUED</div>
        </div>
      </footer>

    </div>
  );
};

export default Home;
