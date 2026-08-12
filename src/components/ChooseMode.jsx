import React, { useState } from 'react';
import { soundFX } from '../utils/sound';

const LotusIconSmall = () => (
  <svg width="28" height="22" viewBox="0 0 50 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M25 2C20 12 12 18 2 22C12 28 20 30 25 36C30 30 38 28 48 22C38 18 30 12 25 2Z" fill="#ff2a85" stroke="#ffe600" strokeWidth="2"/>
    <path d="M25 8C22 16 16 20 8 23C16 27 22 28 25 33C28 28 34 27 42 23C34 20 28 16 25 8Z" fill="#a01250"/>
    <path d="M25 14C23 18 19 21 13 23C19 25 23 26 25 30C27 26 31 25 37 23C31 21 27 18 25 14Z" fill="#ffe600"/>
  </svg>
);

const ChooseMode = ({ navigateTo }) => {
  const [soloTilt, setSoloTilt] = useState({ x: 0, y: 0 });
  const [squadTilt, setSquadTilt] = useState({ x: 0, y: 0 });

  const handleSelect = (mode) => {
    soundFX.playClick();
    navigateTo(mode);
  };

  const handleMouseMove = (e, setTilt) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = (setTilt) => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-6xl mx-auto px-4 py-4 fade-in relative select-none">
      
      {/* 1. HEADER BANNER MATCHING IMAGE 3 ("TEAM UP OR GO SOLO?") */}
      <div 
        className="w-full neo-border neo-shadow py-3 px-6 rounded-xl flex items-center justify-between my-4 border-2 border-black"
        style={{ backgroundColor: '#042214' }}
      >
        <div className="flex items-center gap-3">
          <LotusIconSmall />
          <LotusIconSmall />
        </div>

        {/* Image 3 Exact Title Banner */}
        <h1 
          className="font-display uppercase tracking-wider text-center text-white"
          style={{ 
            fontSize: 'clamp(1.8rem, 5vw, 3.8rem)',
            textShadow: '3px 3px 0px #000',
            lineHeight: '1'
          }}
        >
          <span style={{ color: '#ffe600' }}>TEAM UP</span> OR <span style={{ color: '#ffffff' }}>GO SOLO?</span>
        </h1>

        <div className="flex items-center gap-3">
          <LotusIconSmall />
          <LotusIconSmall />
        </div>
      </div>

      <p className="font-mono text-xs sm:text-sm text-center max-w-lg mx-auto text-white/90 leading-relaxed mb-6">
        Select your passport track below. Build your individual builder pass or press a full squad pass set together in one go!
      </p>

      {/* 2. CARDS SECTION (3D Tilt Responsive Cards matching Image 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full my-4 items-stretch">
        
        {/* Solo Card (Image 3 Replica) */}
        <div 
          className="neo-border flex flex-col cursor-pointer transition-transform duration-200 ease-out group relative overflow-hidden"
          style={{ 
            backgroundColor: '#FAF6E9',
            boxShadow: '8px 8px 0px 0px #ffe600, 12px 12px 0px 0px #0a2418',
            borderRadius: '24px',
            padding: '32px',
            borderWidth: '4px',
            borderColor: '#0a2418',
            transform: `perspective(1000px) rotateX(${soloTilt.y}deg) rotateY(${soloTilt.x}deg)`
          }}
          onMouseMove={(e) => handleMouseMove(e, setSoloTilt)}
          onMouseLeave={() => handleMouseLeave(setSoloTilt)}
          onClick={() => handleSelect('solo-details')}
        >
          {/* Badge Top */}
          <div 
            className="text-white font-mono text-xs font-black uppercase px-4 py-1.5 self-start mb-6 rounded-full neo-border-sm"
            style={{ backgroundColor: '#ff2a85', boxShadow: '2px 2px 0px 0px #0a2418' }}
          >
            SOLO BUILDER PASS
          </div>
          
          {/* Graphic Mockup Box matching Image 3 Solo Card */}
          <div 
            className="neo-border-sm mb-6 flex flex-col justify-between p-5 relative overflow-hidden shrink-0 shadow-inner" 
            style={{ 
              backgroundColor: '#074828', 
              height: '220px', 
              borderRadius: '20px',
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1.5px, transparent 1.5px)',
              backgroundSize: '18px 18px'
            }}
          >
            {/* Top row elements */}
            <div className="flex justify-between items-center z-10">
              <span 
                className="font-mono text-[10px] font-extrabold uppercase px-2.5 py-1 rounded neo-border-sm shadow-sm"
                style={{ backgroundColor: '#ffe600', color: '#000' }}
              >
                BUILD SOLO
              </span>
              <span className="text-2xl animate-spin" style={{ animationDuration: '10s' }}>☀️</span>
            </div>

            {/* Avatar graphic center */}
            <div className="flex flex-col items-center justify-center relative z-10 my-auto">
              <div 
                className="rounded-full neo-border bg-[#FAF6E9] relative flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform"
                style={{ width: '80px', height: '80px', border: '3px solid #000' }}
              >
                {/* Sunglasses */}
                <div 
                  className="bg-black rounded-full absolute top-6 flex items-center justify-around px-1 shadow-md"
                  style={{ width: '48px', height: '16px' }}
                >
                  <div className="w-3.5 h-2 bg-white/30 rounded-full" />
                  <div className="w-3.5 h-2 bg-white/30 rounded-full" />
                </div>
                {/* Smile */}
                <div className="w-4 h-2 border-b-3 border-black rounded-full absolute bottom-4" style={{ borderWidth: '0 0 3px 0' }} />
              </div>
            </div>

            {/* Wavy ocean bottom matching Image 3 */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0 opacity-90">
              <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '75px', width: '100%' }}>
                <path d="M0.00,49.98 C150.00,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" fill="#ff2a85"></path>
                <path d="M0.00,70.00 C200.00,20.00 300.00,120.00 500.00,70.00 L500.00,150.00 L0.00,150.00 Z" fill="#ffe600"></path>
              </svg>
            </div>
          </div>
          
          {/* Card Info */}
          <h2 className="font-display uppercase mb-1" style={{ fontSize: '3rem', color: '#074828', lineHeight: '0.95' }}>
            BUILD SOLO
          </h2>
          <div className="font-mono text-xs font-black uppercase mb-4" style={{ color: '#ff2a85' }}>
            ONE BUILDER &bull; ONE IDENTITY PASS
          </div>
          
          <p className="font-mono text-xs text-black/85 mb-6 leading-relaxed flex-1">
            Create your personal Hacker House Goa Builder ID — pick custom frame themes, fit your photo or avatar, add sticker badges & generate your 4K pass.
          </p>
          
          {/* Feature Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="neo-border-sm bg-[#ffe600] text-black font-mono text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
              • 1 PHOTO / AVATAR
            </span>
            <span className="neo-border-sm bg-[#ffe600] text-black font-mono text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
              • 1 BUILDER ID
            </span>
            <span className="neo-border-sm bg-[#ff2a85] text-white font-mono text-[11px] font-black px-3 py-1 rounded-full shadow-sm">
              • 4K PNG EXPORT
            </span>
          </div>
          
          {/* CTA Button */}
          <button 
            className="btn-primary neo-border neo-shadow w-full sm:w-auto self-start mt-auto font-mono text-sm py-3.5 px-8 rounded-full"
            style={{ backgroundColor: '#ffe600', color: '#074828' }}
          >
            Build My ID &rarr;
          </button>
        </div>

        {/* Squad Card (Image 3 Replica with Stacked Cards) */}
        <div 
          className="neo-border flex flex-col cursor-pointer transition-transform duration-200 ease-out group relative overflow-hidden"
          style={{ 
            backgroundColor: '#042e1d',
            boxShadow: '8px 8px 0px 0px #ffe600, 12px 12px 0px 0px #0a2418',
            borderRadius: '24px',
            padding: '32px',
            borderWidth: '4px',
            borderColor: '#ffe600',
            transform: `perspective(1000px) rotateX(${squadTilt.y}deg) rotateY(${squadTilt.x}deg)`
          }}
          onMouseMove={(e) => handleMouseMove(e, setSquadTilt)}
          onMouseLeave={() => handleMouseLeave(setSquadTilt)}
          onClick={() => handleSelect('squad-details')}
        >
          {/* Badge Area Top */}
          <div className="flex flex-wrap gap-2 mb-6">
            <div 
              className="text-white font-mono text-xs font-black uppercase px-4 py-1.5 rounded-full neo-border-sm"
              style={{ backgroundColor: '#ff2a85', boxShadow: '2px 2px 0px 0px #000' }}
            >
              TEAM MODE
            </div>
            <div className="text-white font-mono text-xs font-black uppercase px-3 py-1.5 rounded-full border-2 border-white/40 bg-black/40">
              GENERATE ALL IDS AT ONCE
            </div>
          </div>
          
          {/* Graphic Mockup Box with Stacked Cards (Image 3 replica) */}
          <div className="mb-6 flex justify-center items-center relative shrink-0" style={{ height: '220px' }}>
            
            {/* Card Stack 1 (Back left) */}
            <div 
              className="neo-border-sm absolute shadow-xl border-2 border-black" 
              style={{ 
                backgroundColor: '#FAF6E9', 
                width: '170px', 
                height: '110px', 
                borderRadius: '14px', 
                transform: 'rotate(-14deg) translateX(-45px)' 
              }} 
            />
            {/* Card Stack 2 (Middle) */}
            <div 
              className="neo-border-sm absolute shadow-xl border-2 border-black" 
              style={{ 
                backgroundColor: '#FAF6E9', 
                width: '170px', 
                height: '110px', 
                borderRadius: '14px', 
                transform: 'rotate(-5deg) translateX(-10px)' 
              }} 
            />
            {/* Card Stack 3 (Front right) */}
            <div 
              className="neo-border-sm absolute shadow-2xl z-10 flex flex-col justify-between p-3 border-2 border-black group-hover:scale-105 transition-transform" 
              style={{ 
                backgroundColor: '#FAF6E9', 
                width: '180px', 
                height: '115px', 
                borderRadius: '14px', 
                transform: 'rotate(7deg) translateX(35px)' 
              }}
            >
              <div className="flex justify-between items-center">
                <div className="w-10 h-4 bg-[#ffe600] neo-border-sm rounded-sm" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#ff2a85]" />
              </div>
              <div className="w-3/4 h-2.5 bg-black/80 rounded-sm" />
              <div className="w-1/2 h-2 bg-[#ff2a85] rounded-sm" />
            </div>
            
            {/* Badge sticker */}
            <div 
              className="absolute top-2 right-4 font-mono text-[11px] font-black px-3.5 py-1 rounded-full z-20 neo-border-sm shadow-lg animate-bounce" 
              style={{ backgroundColor: '#ffe600', color: '#000', transform: 'rotate(12deg)' }}
            >
              FULL SQUAD PACKAGE
            </div>
          </div>
          
          {/* Card Info */}
          <h2 className="font-display uppercase mb-1" style={{ fontSize: '3rem', color: '#ffe600', lineHeight: '0.95' }}>
            TEAM UP
          </h2>
          <div className="font-mono text-xs font-black uppercase mb-4" style={{ color: '#ff2a85' }}>
            ONE SQUAD &bull; EVERY BUILDER PASS
          </div>
          
          <p className="font-mono text-xs text-white/90 mb-6 leading-relaxed flex-1">
            Create IDs for your entire hackathon team in one go. Add everyone, choose one frame theme, press & download the full package ZIP together.
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="border-2 border-white/30 text-white font-mono text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1">
              <span style={{ color: '#ff2a85' }}>•</span> SQUAD ROSTER
            </span>
            <span className="border-2 border-white/30 text-white font-mono text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1">
              <span style={{ color: '#ff2a85' }}>•</span> BATCH GENERATOR
            </span>
            <span className="border-2 border-white/30 text-white font-mono text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1">
              <span style={{ color: '#ff2a85' }}>•</span> BUNDLED ZIP EXPORT
            </span>
          </div>
          
          {/* CTA Button */}
          <button 
            className="btn-primary neo-border neo-shadow w-full sm:w-auto self-start mt-auto font-mono text-sm py-3.5 px-8 rounded-full"
            style={{ backgroundColor: '#ffe600', color: '#074828' }}
          >
            Build My Squad &rarr;
          </button>
        </div>

      </div>

      {/* 3. CHECKERBOARD WAVE BANNER MATCHING IMAGE 3 BOTTOM */}
      <div className="mt-8 mb-4 text-center flex flex-col items-center border-t border-white/10 pt-8 relative">
        
        {/* Checkered Wave Banner Vector (Image 3 bottom replica) */}
        <div className="w-full overflow-hidden leading-none my-4">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-[#ffe600]">
            <path d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,50 L1200,120 L0,120 Z" fill="currentColor" opacity="0.85"></path>
            <path d="M0,30 C200,-10 400,80 600,20 C800,-40 1000,70 1200,30 L1200,120 L0,120 Z" fill="#ff2a85" opacity="0.6"></path>
          </svg>
        </div>

        <div className="font-mono text-xs font-black uppercase tracking-widest text-white/80 mb-2">
          SOLO OR SQUAD &bull; YOUR GOA ID STARTS HERE
        </div>
        
        <div 
          className="font-display text-4xl sm:text-6xl font-black uppercase mb-2 tracking-wider" 
          style={{ color: '#ff2a85', textShadow: '3px 3px 0px #000' }}
        >
          #FRAMEINGOA
        </div>
        
        <div className="font-mono text-xs text-white/70 tracking-wider font-bold">
          HH GOA 2026 &bull; GOA, INDIA &bull; 28-31 OCT 2026
        </div>
      </div>

    </div>
  );
};

export default ChooseMode;
