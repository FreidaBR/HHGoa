import React, { useRef } from 'react';

const TeammateCard = ({ member, index, totalMembers, updateMember, removeMember, moveMember }) => {
  const fileInputRef = useRef(null);

  const handleChange = (field, value) => {
    updateMember(member.id, field, value);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      handleChange('photo', url);
    }
  };

  const handleZoomChange = (delta) => {
    const currentZoom = member.zoom || 1.0;
    const newZoom = Math.min(Math.max(0.5, currentZoom + delta), 2.5);
    handleChange('zoom', parseFloat(newZoom.toFixed(1)));
  };

  return (
    <div 
      className="neo-border mb-4 p-5 relative transition-all" 
      style={{ 
        backgroundColor: '#faf3d2', 
        borderRadius: '16px',
        borderColor: '#0a2418',
        borderWidth: '3px',
        boxShadow: '4px 4px 0px 0px #0a2418'
      }}
    >
      {/* Card Header & Action Buttons */}
      <div className="flex justify-between items-center border-b border-black/15 pb-3 mb-4">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="font-extrabold uppercase" style={{ color: '#ff2a85' }}>
            MEMBER 0{index + 1}
          </span>
          <span className="font-bold text-black/60 tracking-wider">
            {member.assignedId}
          </span>
        </div>

        {/* Member Action Controls matching Image 1 */}
        <div className="flex items-center gap-1.5">
          <button 
            type="button"
            onClick={() => moveMember(index, -1)}
            disabled={index === 0}
            className={`w-7 h-7 neo-border-sm flex items-center justify-center font-mono text-xs font-bold rounded-full transition-all ${
              index === 0 ? 'opacity-30 bg-black/10 cursor-not-allowed' : 'bg-white hover:bg-[#ffe600] cursor-pointer'
            }`}
            title="Move Up"
          >
            ↑
          </button>
          <button 
            type="button"
            onClick={() => moveMember(index, 1)}
            disabled={index === totalMembers - 1}
            className={`w-7 h-7 neo-border-sm flex items-center justify-center font-mono text-xs font-bold rounded-full transition-all ${
              index === totalMembers - 1 ? 'opacity-30 bg-black/10 cursor-not-allowed' : 'bg-white hover:bg-[#ffe600] cursor-pointer'
            }`}
            title="Move Down"
          >
            ↓
          </button>
          {totalMembers > 1 && (
            <button 
              type="button"
              onClick={() => removeMember(member.id)}
              className="w-7 h-7 neo-border-sm bg-white hover:bg-red-200 text-black flex items-center justify-center font-mono text-xs font-bold rounded-full cursor-pointer transition-all"
              title="Remove Teammate"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
      
      {/* Photo & Form Grid */}
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        
        {/* Photo Upload Box & Zoom Pill matching Image 1 */}
        <div className="flex flex-col items-center gap-2 w-full sm:w-auto shrink-0">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handlePhotoUpload} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
          
          <div 
            className="flex flex-col justify-center items-center overflow-hidden relative group bg-white/60 hover:bg-white transition-all" 
            onClick={() => fileInputRef.current?.click()}
            style={{ 
              width: '105px', 
              height: '105px', 
              borderRadius: '14px',
              border: '2px dashed #0a2418',
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
                  transition: 'transform 0.1s ease'
                }} 
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-1 text-center">
                <span className="text-xl mb-1">🖼️</span>
                <span className="font-mono text-[10px] font-bold uppercase text-black/70">PHOTO</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] font-bold uppercase">
              Change
            </div>
          </div>

          {/* Zoom Controls Pill matching Image 1 */}
          <div 
            className="flex items-center justify-between w-full neo-border-sm p-1 rounded-lg text-xs"
            style={{ backgroundColor: '#FAF3D2', borderColor: '#0a2418' }}
          >
            <button 
              type="button"
              onClick={() => handleZoomChange(-0.1)} 
              className="w-6 h-6 flex items-center justify-center font-bold hover:bg-black/10 rounded transition-colors text-black"
            >
              -
            </button>
            <span className="font-mono text-[10px] font-bold text-black">x{(member.zoom || 1.0).toFixed(1)}</span>
            <button 
              type="button"
              onClick={() => handleZoomChange(0.1)} 
              className="w-6 h-6 flex items-center justify-center font-bold hover:bg-black/10 rounded transition-colors text-black"
            >
              +
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col gap-3 flex-1 w-full">
          <div>
            <label className="font-mono text-[11px] font-bold uppercase block mb-1 text-black">
              NAME
            </label>
            <input 
              type="text" 
              className="neo-input" 
              style={{ 
                padding: '10px 14px', 
                fontSize: '0.95rem',
                backgroundColor: '#FAF3D2',
                borderColor: '#0a2418',
                borderRadius: '10px',
                boxShadow: '2px 2px 0px 0px #0a2418'
              }}
              value={member.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Sanskriti Maheshwari"
            />
          </div>
          
          <div className="input-row">
            <div>
              <label className="font-mono text-[11px] font-bold uppercase block mb-1 text-black">ROLE / STACK</label>
              <select 
                className="neo-input" 
                style={{ 
                  padding: '10px 14px', 
                  fontSize: '0.85rem', 
                  cursor: 'pointer',
                  backgroundColor: '#FAF3D2',
                  borderColor: '#0a2418',
                  borderRadius: '10px',
                  boxShadow: '2px 2px 0px 0px #0a2418'
                }}
                value={member.role}
                onChange={(e) => handleChange('role', e.target.value)}
              >
                <option value="Builder">Builder</option>
                <option value="Hacker">Hacker</option>
                <option value="Designer">Designer</option>
                <option value="Solana Dev">Solana Dev</option>
                <option value="AI Engineer">AI Engineer</option>
                <option value="Rustacean">Rustacean</option>
                <option value="Organiser">Organiser</option>
                <option value="Mentor">Mentor</option>
                <option value="Staff">Staff</option>
                <option value="Photographer">Photographer</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>
            
            <div>
              <label className="font-mono text-[11px] font-bold uppercase block mb-1 text-black">
                BUILDER TITLE <span className="text-black/50 font-normal">(optional)</span>
              </label>
              <input 
                type="text" 
                className="neo-input" 
                style={{ 
                  padding: '10px 14px', 
                  fontSize: '0.85rem',
                  backgroundColor: '#FAF3D2',
                  borderColor: '#0a2418',
                  borderRadius: '10px',
                  boxShadow: '2px 2px 0px 0px #0a2418'
                }}
                value={member.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. Pixel Pilot"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TeammateCard;
