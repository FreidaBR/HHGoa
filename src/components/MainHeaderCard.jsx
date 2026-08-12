import React from 'react';

const MainHeaderCard = ({ teamName, setTeamName, memberCount, onNext }) => {
  return (
    <div 
      className="neo-border mb-6"
      style={{
        backgroundColor: '#faf3d2',
        borderRadius: '20px',
        boxShadow: '6px 6px 0px 0px #0a2418',
        padding: '28px',
        borderWidth: '3px',
        borderColor: '#0a2418'
      }}
    >
      {/* Section Tag */}
      <div className="font-mono text-xs font-bold uppercase mb-2 tracking-widest" style={{ color: '#ff2a85' }}>
        HACKERHOUSEGOA &bull; TEAM MODE
      </div>
      
      {/* Main Heading */}
      <h1 
        className="font-display uppercase leading-none mb-3 select-none"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 3.8rem)', color: '#073c28' }}
      >
        BUILD YOUR SQUAD
      </h1>
      
      {/* Description */}
      <p className="font-mono text-xs sm:text-sm text-black/80 mb-6 max-w-xl leading-relaxed">
        Create every Builder ID in one go. Name the team, add the crew, and generate the full set together — no repeating yourself.
      </p>
      
      {/* Input Field */}
      <div className="mb-6">
        <label className="font-mono text-xs font-bold uppercase block mb-2 text-black">
          TEAM NAME
        </label>
        <input 
          type="text" 
          className="neo-input"
          style={{
            backgroundColor: '#FAF3D2',
            borderColor: '#0a2418',
            borderRadius: '10px',
            padding: '12px 16px',
            fontSize: '1rem',
            boxShadow: '2px 2px 0px 0px #0a2418'
          }}
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Code Pirates"
        />
        <p className="font-mono text-[11px] text-black/60 mt-1.5 font-medium">
          The name that will sit across every member's ID.
        </p>
      </div>
      
      {/* Roster Counter & Action Button */}
      <div className="flex flex-col gap-4 border-t border-black/15 pt-5">
        <div 
          className="neo-border-sm bg-white/80 px-3.5 py-2 rounded-xl inline-flex items-center gap-2 font-mono text-xs font-bold text-black self-start"
          style={{ boxShadow: '2px 2px 0px 0px #0a2418' }}
        >
          <span className="text-pink" style={{ color: '#ff2a85' }}>👥</span> {memberCount} {memberCount === 1 ? 'MEMBER ON THE ROSTER' : 'MEMBERS ON THE ROSTER'}
        </div>
        
        <div style={{ position: 'relative' }}>
          <div className="btn-striped neo-shadow-sm" style={{ borderRadius: '50px' }}>
            <button 
              className="btn-inner uppercase font-mono font-bold flex items-center justify-center gap-2" 
              style={{ 
                border: 'none', 
                cursor: teamName?.trim() ? 'pointer' : 'not-allowed', 
                opacity: teamName?.trim() ? 1 : 0.6,
                backgroundColor: '#ffe600',
                color: '#073c28',
                fontSize: '1.1rem',
                borderRadius: '50px',
                padding: '14px 28px'
              }}
              onClick={teamName?.trim() ? onNext : undefined}
              disabled={!teamName?.trim()}
            >
              <span>Generate team IDs</span>
              <span className="text-xl">✨</span>
            </button>
          </div>
          {!teamName?.trim() ? (
            <div className="text-center font-mono text-[11px] font-bold uppercase mt-2 text-black/60 tracking-wider">
              ADD A TEAM NAME TO UNLOCK
            </div>
          ) : (
            <div className="text-center font-mono text-[11px] font-bold uppercase mt-2 text-black/70 tracking-wider">
              READY &bull; CLICK TO CHOOSE FRAME & STYLE
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHeaderCard;
