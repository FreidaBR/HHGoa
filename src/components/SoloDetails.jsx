import React, { useRef, useState } from 'react';
import { PRESET_AVATARS } from '../utils/avatars';
import { soundFX } from '../utils/sound';

const SoloDetails = ({ member, updateSoloMember, navigateTo }) => {
  const fileInputRef = useRef(null);
  const [photoFilter, setPhotoFilter] = useState({ brightness: 100, contrast: 100 });

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      soundFX.playClick();
      const url = URL.createObjectURL(file);
      updateSoloMember('photo', url);
    }
  };

  const selectPresetAvatar = (avatarSvg) => {
    soundFX.playClick();
    updateSoloMember('photo', avatarSvg);
  };

  const handleZoomChange = (delta) => {
    soundFX.playClick();
    const currentZoom = member.zoom || 1.0;
    const newZoom = Math.min(Math.max(0.5, currentZoom + delta), 3.0);
    updateSoloMember('zoom', parseFloat(newZoom.toFixed(1)));
  };

  const handleProceed = () => {
    if (!member.name?.trim()) return;
    soundFX.playClick();
    navigateTo('frame');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto py-4 fade-in select-none">
      <div 
        className="neo-border flex flex-col gap-6"
        style={{
          backgroundColor: '#FAF6E9',
          borderRadius: '24px',
          boxShadow: '10px 10px 0px 0px #0a2418',
          padding: '32px',
          borderWidth: '4px',
          borderColor: '#0a2418'
        }}
      >
        
        {/* Card Top Title */}
        <div className="border-b-2 border-black/15 pb-4">
          <div className="font-mono text-xs font-black uppercase mb-2 tracking-widest flex items-center justify-between" style={{ color: '#ff2a85' }}>
            <span>HACKERHOUSEGOA &bull; SOLO MODE</span>
            <span className="bg-black text-[#ffe600] px-2 py-0.5 rounded text-[10px]">HH-26 BUILDER</span>
          </div>
          <h1 className="font-display uppercase text-black leading-none mb-3" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.8rem)', color: '#074828' }}>
            BUILDER DETAILS
          </h1>
          <p className="font-mono text-xs sm:text-sm text-black/80 leading-relaxed">
            Upload your photo or choose a preset Goa hacker avatar, then fill in your builder identity details!
          </p>
        </div>
        
        {/* Photo Upload & Avatar Studio Box */}
        <div className="flex flex-col gap-4 bg-black/5 p-5 rounded-2xl border-2 border-black/20">
          
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handlePhotoUpload} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
            
            {/* Live Photo Preview Box */}
            <div 
              className="flex flex-col justify-center items-center overflow-hidden relative group bg-white hover:bg-yellow-50 transition-colors shrink-0 shadow-lg" 
              onClick={() => fileInputRef.current?.click()}
              style={{ 
                width: '130px', 
                height: '130px', 
                borderRadius: '18px',
                border: '3px dashed #0a2418',
                cursor: 'pointer'
              }}
            >
              {member.photo ? (
                <img 
                  src={member.photo} 
                  alt="Preview" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transform: `scale(${member.zoom || 1.0})`,
                    filter: `brightness(${photoFilter.brightness}%) contrast(${photoFilter.contrast}%)`,
                    transition: 'transform 0.1s ease'
                  }} 
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-3xl mb-1">🖼️</span>
                  <span className="font-mono text-[10px] font-black uppercase text-black/80">UPLOAD PHOTO</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs font-bold uppercase">
                Change Photo
              </div>
            </div>

            {/* Controls: Zoom & Filters */}
            <div className="flex flex-col justify-center gap-3 flex-1 w-full">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black uppercase text-black">Photo Zoom:</span>
                <span className="font-mono text-xs font-black bg-black text-[#ffe600] px-3 py-0.5 rounded-full">
                  x{(member.zoom || 1.0).toFixed(1)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className="btn-secondary neo-border-sm bg-black text-white text-xs px-3 py-1.5 font-bold rounded-lg cursor-pointer hover:bg-yellow-400 hover:text-black"
                  onClick={() => handleZoomChange(-0.1)}
                  type="button"
                >
                  - Zoom Out
                </button>
                <button 
                  className="btn-secondary neo-border-sm bg-black text-white text-xs px-3 py-1.5 font-bold rounded-lg cursor-pointer hover:bg-yellow-400 hover:text-black"
                  onClick={() => handleZoomChange(0.1)}
                  type="button"
                >
                  + Zoom In
                </button>
                {member.photo && (
                  <button 
                    className="neo-border-sm bg-red-500 text-white hover:bg-red-600 text-xs px-3 py-1.5 font-bold rounded-lg ml-auto cursor-pointer"
                    onClick={() => {
                      soundFX.playClick();
                      updateSoloMember('photo', null);
                    }}
                    type="button"
                  >
                    Clear Photo
                  </button>
                )}
              </div>
              <p className="font-mono text-[10px] text-black/70 font-bold">Square or portrait photos work best. All processing occurs strictly on device.</p>
            </div>
          </div>

          {/* Preset Avatars Selector Grid */}
          <div className="mt-2 pt-3 border-t border-black/10">
            <div className="font-mono text-[11px] font-black uppercase text-black/80 mb-2.5 flex items-center justify-between">
              <span>OR CHOOSE PRESET HACKER AVATAR:</span>
              <span className="text-[#ff2a85] font-bold">CLICK TO SELECT</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESET_AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => selectPresetAvatar(av.svg)}
                  className="flex flex-col items-center justify-center p-2 rounded-xl border-2 border-black/20 hover:border-black bg-white hover:bg-yellow-200 transition-all cursor-pointer group shadow-sm"
                  title={av.name}
                >
                  <span className="text-2xl group-hover:scale-125 transition-transform">{av.emoji}</span>
                  <span className="font-mono text-[9px] font-black uppercase text-black mt-1 truncate w-full text-center">{av.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-mono text-xs font-black uppercase block mb-1.5 text-black">
              FULL NAME <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              className="neo-input" 
              style={{
                backgroundColor: '#FAF6E9',
                borderColor: '#0a2418',
                borderRadius: '12px',
                padding: '14px 18px',
                boxShadow: '3px 3px 0px 0px #0a2418'
              }}
              value={member.name}
              onChange={(e) => updateSoloMember('name', e.target.value)}
              placeholder="e.g. Aarav Fernandes"
            />
          </div>
          
          <div className="input-row">
            <div>
              <label className="font-mono text-xs font-black uppercase block mb-1.5 text-black">ROLE / STACK</label>
              <select 
                className="neo-input" 
                style={{
                  backgroundColor: '#FAF6E9',
                  borderColor: '#0a2418',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  boxShadow: '3px 3px 0px 0px #0a2418',
                  cursor: 'pointer'
                }}
                value={member.role}
                onChange={(e) => updateSoloMember('role', e.target.value)}
              >
                <option value="Builder">Builder</option>
                <option value="Hacker">Hacker</option>
                <option value="Designer">Designer</option>
                <option value="Solana Dev">Solana Dev</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Rustacean">Rustacean</option>
                <option value="Smart Contract Dev">Smart Contract Dev</option>
                <option value="Founder">Founder</option>
                <option value="Organiser">Organiser</option>
                <option value="Mentor">Mentor</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            
            <div>
              <label className="font-mono text-xs font-black uppercase block mb-1.5 text-black">
                SQUAD NAME <span className="lowercase font-normal text-black/50">(optional)</span>
              </label>
              <input 
                type="text" 
                className="neo-input" 
                style={{
                  backgroundColor: '#FAF6E9',
                  borderColor: '#0a2418',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  boxShadow: '3px 3px 0px 0px #0a2418'
                }}
                value={member.teamName || ''}
                onChange={(e) => updateSoloMember('teamName', e.target.value)}
                placeholder="e.g. Code Pirates"
              />
            </div>
          </div>
          
          <div>
            <label className="font-mono text-xs font-black uppercase block mb-1.5 text-black">
              BUILDER TITLE / TAGLINE <span className="lowercase font-normal text-black/50">(optional)</span>
            </label>
            <input 
              type="text" 
              className="neo-input" 
              style={{
                backgroundColor: '#FAF6E9',
                borderColor: '#0a2418',
                borderRadius: '12px',
                padding: '14px 18px',
                boxShadow: '3px 3px 0px 0px #0a2418'
              }}
              value={member.title || ''}
              onChange={(e) => updateSoloMember('title', e.target.value)}
              placeholder="e.g. Pixel Pilot / Rust Whisperer"
            />
          </div>
        </div>
        
        {/* Proceed Button */}
        <div style={{ position: 'relative', marginTop: '12px' }}>
          <div className="btn-striped neo-shadow-sm" style={{ borderRadius: '50px' }}>
            <button 
              className="btn-inner uppercase font-mono font-black flex items-center justify-center gap-3" 
              style={{ 
                border: 'none', 
                cursor: member.name?.trim() ? 'pointer' : 'not-allowed', 
                opacity: member.name?.trim() ? 1 : 0.6,
                backgroundColor: '#ffe600',
                color: '#074828',
                borderRadius: '50px',
                padding: '16px 32px',
                fontSize: '1.15rem'
              }}
              onClick={handleProceed}
              disabled={!member.name?.trim()}
            >
              <span>Choose Frame & Styling</span>
              <span>&rarr;</span>
            </button>
          </div>
          {!member.name?.trim() && (
            <p className="text-center font-mono text-[11px] font-extrabold uppercase mt-2 text-[#ff2a85] tracking-wider">
              ⚠️ PLEASE ENTER YOUR NAME TO CONTINUE
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoloDetails;
