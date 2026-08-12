import React, { useState } from 'react';

export default function BuildYourSquadUI() {
  const [teamName, setTeamName] = useState('Code Pirates');
  const [members, setMembers] = useState([
    {
      id: 'HH-26-1065',
      name: 'Sanskriti Maheshwari',
      role: 'Builder',
      title: 'e.g. Pixel Pilot',
      photo: null,
      zoom: 1.0,
    },
  ]);

  const addMember = () => {
    const nextId = `HH-26-${1065 + members.length}`;
    setMembers([
      ...members,
      {
        id: nextId,
        name: '',
        role: 'Builder',
        title: '',
        photo: null,
        zoom: 1.0,
      },
    ]);
  };

  const updateMember = (index, field, value) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const removeMember = (index) => {
    if (members.length === 1) return;
    setMembers(members.filter((_, i) => i !== index));
  };

  const handlePhotoUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateMember(index, 'photo', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#115a36] text-black font-mono p-4 md:p-8 relative selection:bg-yellow-300">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1.5px, transparent 1.5px)`,
          backgroundSize: '16px 16px',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-white text-xs border-b border-white/20 pb-4 gap-2">
          <div className="flex items-center gap-2 font-bold tracking-widest">
            <span className="bg-white text-black px-1.5 py-0.5 font-black text-sm">HH</span>
            <span>HACKER HOUSE GOA 2026</span>
          </div>
          <button className="hover:underline tracking-wider text-white/80 uppercase text-[11px]">
            &larr; BACK TO CHOOSE YOUR BUILD
          </button>
        </header>

        <div className="flex items-center justify-between text-white/70 text-xs font-bold uppercase tracking-wider bg-[#0a3e24] p-3 rounded-lg border border-white/10">
          <div className="flex items-center gap-1.5 opacity-50">
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">01</span>
            <span>CHOOSE</span>
          </div>
          <span className="opacity-30">&gt;</span>
          <div className="flex items-center gap-1.5 text-yellow-300">
            <span className="w-5 h-5 rounded-full bg-yellow-300 text-black flex items-center justify-center text-[10px] font-black">02</span>
            <span>DETAILS</span>
          </div>
          <span className="opacity-30">&gt;</span>
          <div className="flex items-center gap-1.5 opacity-50">
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">03</span>
            <span>FRAME</span>
          </div>
          <span className="opacity-30">&gt;</span>
          <div className="flex items-center gap-1.5 opacity-50">
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">04</span>
            <span>GENERATE</span>
          </div>
        </div>

        <div className="bg-[#f2e7c9] border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-[11px] font-bold tracking-widest text-emerald-800 uppercase mb-1">
            HACKERHOUSEGOA · TEAM MODE
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
            BUILD YOUR SQUAD
          </h1>
          <p className="text-xs sm:text-sm text-gray-700 mb-6 max-w-2xl leading-relaxed">
            Create every Builder ID in one go. Name the team, add the crew, and generate the full set together — no repeating yourself.
          </p>

          <div className="space-y-1">
            <label className="block text-[11px] font-bold tracking-wider text-gray-700 uppercase">
              TEAM NAME
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full border-2 border-black rounded-xl p-3 bg-white/80 text-black font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Code Pirates"
            />
            <p className="text-[11px] text-gray-500 mt-1">
              The name that will sit across every member's ID.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-black/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
              {members.length} {members.length === 1 ? 'MEMBER' : 'MEMBERS'} ON THE ROSTER
            </span>
            <button
              disabled={!teamName.trim()}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${
                teamName.trim()
                  ? 'bg-[#d2fb52] hover:bg-[#c3f03e] text-black cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Generate team IDs
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-end text-white">
            <div>
              <span className="text-[10px] tracking-widest uppercase opacity-70 block">THE CREW</span>
              <h2 className="text-2xl font-black tracking-tight">ADD YOUR TEAMMATES</h2>
            </div>
            <span className="text-[11px] tracking-wider uppercase opacity-80 font-bold hidden sm:block">
              PHOTOS OPTIONAL, SWAG GUARANTEED
            </span>
          </div>

          {members.map((member, index) => (
            <div
              key={index}
              className="bg-[#f2e7c9] border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4 relative"
            >
              <div className="flex justify-between items-center text-xs font-bold border-b border-black/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-amber-800">MEMBER {index < 9 ? `0${index + 1}` : index + 1}</span>
                  <span className="text-gray-500">{member.id}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 hover:bg-black/5 rounded text-gray-600">↑</button>
                  <button className="p-1 hover:bg-black/5 rounded text-gray-600">↓</button>
                  <button
                    onClick={() => removeMember(index)}
                    className="p-1 hover:bg-red-100 rounded text-red-600 ml-1"
                    title="Delete member"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-3 flex flex-col items-center">
                  <div className="w-full aspect-square border-2 border-dashed border-black/40 rounded-xl relative bg-black/5 flex flex-col items-center justify-center overflow-hidden hover:bg-black/10 transition-colors cursor-pointer">
                    {member.photo ? (
                      <img src={member.photo} alt="Upload preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-2">
                        <span className="text-2xl block mb-1">🖼️</span>
                        <span className="text-[10px] font-bold text-gray-600 uppercase">PHOTO</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(index, e)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between w-full mt-2 bg-black/5 rounded-lg border border-black/20 p-1 text-xs">
                    <button
                      onClick={() => updateMember(index, 'zoom', Math.max(0.5, member.zoom - 0.1))}
                      className="px-2 font-bold hover:bg-black/10 rounded"
                    >
                      -
                    </button>
                    <span className="text-[10px] font-bold">×{member.zoom.toFixed(1)}</span>
                    <button
                      onClick={() => updateMember(index, 'zoom', member.zoom + 0.1)}
                      className="px-2 font-bold hover:bg-black/10 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="md:col-span-9 space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-gray-700 uppercase mb-1">
                      NAME
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateMember(index, 'name', e.target.value)}
                      placeholder="Sanskriti Maheshwari"
                      className="w-full border-2 border-black rounded-xl p-2.5 bg-white/90 text-sm font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold tracking-wider text-gray-700 uppercase mb-1">
                        ROLE / STACK
                      </label>
                      <select
                        value={member.role}
                        onChange={(e) => updateMember(index, 'role', e.target.value)}
                        className="w-full border-2 border-black rounded-xl p-2.5 bg-white/90 text-sm font-semibold focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="Builder">Builder</option>
                        <option value="Hacker">Hacker</option>
                        <option value="Designer">Designer</option>
                        <option value="Organiser">Organiser</option>
                        <option value="Mentor">Mentor</option>
                        <option value="Staff">Staff</option>
                        <option value="Photographer">Photographer</option>
                        <option value="Volunteer">Volunteer</option>
                        <option value="Custom">Custom</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold tracking-wider text-gray-700 uppercase mb-1">
                        BUILDER TITLE <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={member.title}
                        onChange={(e) => updateMember(index, 'title', e.target.value)}
                        placeholder="e.g. Pixel Pilot"
                        className="w-full border-2 border-black rounded-xl p-2.5 bg-white/90 text-sm font-semibold focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addMember}
            className="w-full border-2 border-dashed border-white/60 hover:border-white text-white rounded-2xl p-4 font-bold text-xs uppercase tracking-wider hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            + ADD TEAMMATE
          </button>
        </div>

        <div className="bg-[#0a3e24] border-2 border-black rounded-2xl p-5 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-pink-400 font-bold uppercase tracking-widest text-[10px]">TEAM PREVIEW</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold">
              {members.length} {members.length === 1 ? 'BUILDER' : 'BUILDERS'}
            </span>
          </div>

          <h3 className="text-2xl font-black tracking-tight text-yellow-300">
            THE SQUAD
          </h3>

          <div className="flex flex-wrap gap-2 pt-2">
            {members.map((m, idx) => (
              <div
                key={idx}
                className="bg-yellow-300 text-black font-bold text-xs px-2.5 py-1 rounded-md border border-black flex items-center gap-1.5"
              >
                <span className="bg-black text-white text-[9px] px-1 rounded">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                </span>
                <span>{m.name.trim() || `MEMBER ${idx < 9 ? `0${idx + 1}` : idx + 1}`}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-white/60 pt-2 border-t border-white/10 tracking-wider uppercase">
            ONE FRAME, ONE GENERATE — EVERY ID IN A SINGLE GO.
          </p>
        </div>

        <footer className="text-center text-[10px] text-white/50 tracking-widest uppercase py-4">
          INTERNAL TOOL FOR THE HACKERHOUSEGOA CREW • GOA, INDIA • #FRAMEINGOA
        </footer>
      </div>
    </div>
  );
}
