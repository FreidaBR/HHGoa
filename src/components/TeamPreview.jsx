import React from 'react';

const TeamPreview = ({ members, teamName }) => {
  return (
    <div
      className="neo-border squad-preview-col flex flex-col gap-4"
      style={{
        backgroundColor: '#042e1d',
        borderColor: '#0a2418',
        borderWidth: '3px',
        borderRadius: '16px',
        boxShadow: '4px 4px 0px 0px #0a2418',
        padding: '24px',
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-3">
        <div 
          className="text-white font-mono text-[10px] font-bold uppercase px-2.5 py-1 rounded-md neo-border-sm" 
          style={{ backgroundColor: '#ff2a85', boxShadow: '2px 2px 0px 0px #000' }}
        >
          TEAM PREVIEW
        </div>
        
        <div className="font-mono text-[10px] font-extrabold text-white uppercase border border-white/30 px-2.5 py-1 rounded-full bg-black/30">
          {members.length} {members.length === 1 ? 'BUILDER' : 'BUILDERS'}
        </div>
      </div>
      
      {/* Team Title */}
      <div>
        <h3 
          className="font-display uppercase text-3xl leading-none select-none tracking-wide" 
          style={{ color: '#ffe600' }}
        >
          {teamName?.trim() ? teamName : 'THE SQUAD'}
        </h3>
      </div>
      
      {/* Member List */}
      <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
        {members.map((member, index) => (
          <div 
            key={member.id}
            className="flex items-center justify-between neo-border-sm px-3 py-2 rounded-full font-mono text-xs font-bold"
            style={{ backgroundColor: '#ffe600', color: '#000000', borderColor: '#000000' }}
          >
            <div className="flex items-center gap-2 truncate">
              <span className="bg-black text-[#ffe600] text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black shrink-0">
                0{index + 1}
              </span>
              <span className="truncate font-black tracking-wide text-xs">
                {member.name?.trim() ? member.name.toUpperCase() : `MEMBER 0${index + 1}`}
              </span>
            </div>
            <span className="text-[9px] bg-black/15 px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
              {member.role || 'BUILDER'}
            </span>
          </div>
        ))}
      </div>
      
      {/* Tagline matching Image 1 */}
      <div className="font-mono text-[10px] font-bold uppercase text-center text-white/70 border-t border-white/10 pt-3 tracking-wider">
        ONE FRAME, ONE GENERATE — EVERY ID IN A SINGLE GO.
      </div>
    </div>
  );
};

export default TeamPreview;
