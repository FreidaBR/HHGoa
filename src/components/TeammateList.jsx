import React from 'react';
import TeammateCard from './TeammateCard';

const TeammateList = ({ members, updateMember, addMember, removeMember, moveMember }) => {
  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest block mb-1" style={{ color: '#ff2a85' }}>
            THE CREW
          </span>
          <h2 className="font-display uppercase text-white select-none" style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: '0.95' }}>
            ADD YOUR <span style={{ color: '#ffe600' }}>TEAMMATES</span>
          </h2>
        </div>
        
        {/* Floating Top-Right Swag Badge matching Image 1 */}
        <div 
          className="font-mono text-[10px] font-bold uppercase px-3 py-1.5 rounded-full border-2 border-dashed border-white/40 text-white/90 bg-black/30 self-start sm:self-auto tracking-wider shadow-sm"
        >
          PHOTOS OPTIONAL, SWAG GUARANTEED
        </div>
      </div>
      
      {/* Teammate Entry Cards */}
      <div className="flex flex-col gap-4">
        {members.map((member, index) => (
          <TeammateCard 
            key={member.id} 
            member={member} 
            index={index} 
            totalMembers={members.length}
            updateMember={updateMember}
            removeMember={removeMember}
            moveMember={moveMember}
          />
        ))}
      </div>
      
      {/* Dashed Add Teammate Button matching Image 1 */}
      <button 
        type="button"
        onClick={addMember}
        className="w-full font-mono text-xs font-extrabold uppercase text-white bg-black/25 hover:bg-black/40 border-2 border-dashed border-white/50 hover:border-[#ffe600] hover:text-[#ffe600] py-4 px-6 rounded-2xl cursor-pointer transition-all flex items-center justify-center gap-2 mt-4 shadow-sm"
      >
        <span className="text-lg">+</span>
        <span>ADD TEAMMATE</span>
      </button>
    </div>
  );
};

export default TeammateList;
