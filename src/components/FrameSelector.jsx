import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FRAMES, FRAME_FILTERS, getFrame } from '../data/frameThemes';
import { drawBadge } from '../utils/badgeDraw';
import { soundFX } from '../utils/sound';
import { IconArrow } from './icons/DetailsIcons';

export { FRAMES as THEMES };

const FrameCard = ({ frame, selected, onSelect, previewMember, teamName }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;
      const previewW = frame.id === 'landscape-frame' ? 400 : frame.id === 'circle-pfp' ? 280 : frame.id === 'slim-badge' ? 210 : 280;
      const previewH = frame.id === 'landscape-frame' ? 225 : frame.id === 'circle-pfp' ? 280 : frame.id === 'slim-badge' ? 360 : 360;
      await drawBadge(canvas, {
        member: previewMember,
        teamName,
        frame,
        width: previewW,
        height: previewH,
      });
    };
    render();
    return () => { cancelled = true; };
  }, [frame, previewMember, teamName, selected]);

  return (
    <button
      type="button"
      className={`frame-pick-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(frame.id)}
      aria-pressed={selected}
    >
      {selected && (
        <span className="frame-pick-check" aria-hidden="true">
          ✓
        </span>
      )}
      <div className="frame-pick-preview" style={{ aspectRatio: frame.previewAspect }}>
        <canvas ref={canvasRef} className="frame-pick-canvas" />
      </div>
      {selected && <span className="frame-pick-selected-pill">Selected</span>}
      <div className="frame-pick-copy">
        <h3 className="frame-pick-name">{frame.name}</h3>
        <p className="frame-pick-desc">{frame.desc}</p>
      </div>
    </button>
  );
};

const FrameSelector = ({ members, teamName, generationMode, frameConfig, setFrameConfig, navigateTo }) => {
  const [filter, setFilter] = useState('all');
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);

  const activeMember = members[selectedMemberIndex] || members[0] || { name: 'Aarav' };
  const currentFrame = getFrame(frameConfig.frameId || frameConfig.themeId);

  const visibleFrames = useMemo(() => {
    if (filter === 'all') return FRAMES;
    return FRAMES.filter((f) => f.category === filter);
  }, [filter]);

  const selectFrame = (frameId) => {
    soundFX.playClick();
    setFrameConfig({ ...frameConfig, frameId, themeId: frameId });
  };

  const handleProceed = () => {
    soundFX.playFanfare();
    navigateTo('generate');
  };

  return (
    <div className="details-shell frame-shell">
      <div className="frame-hero">
        <p className="frame-hero-kicker">
          <span>Step 03</span>
          <span className="details-meta-dot" aria-hidden="true" />
          <span>One frame fits all</span>
        </p>
        <h1 className="frame-hero-title">
          <span className="frame-hero-title-accent">Choose your</span>
          <span className="frame-hero-title-main">Frame</span>
        </h1>
        <p className="frame-hero-lede">
          Every frame is a real collectible badge. Pick one, fit your photo, and watch it come alive.
        </p>
      </div>

      {generationMode === 'squad' && members.length > 1 && (
        <div className="frame-member-tabs frame-member-tabs-centered">
          <span className="frame-member-tabs-label">Preview member</span>
          <div className="frame-member-tabs-row">
            {members.map((m, idx) => (
              <button
                key={m.id}
                type="button"
                className={`frame-member-tab ${selectedMemberIndex === idx ? 'active' : ''}`}
                onClick={() => {
                  soundFX.playClick();
                  setSelectedMemberIndex(idx);
                }}
              >
                {m.name?.split(' ')[0] || `Member ${idx + 1}`}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="frame-filters" role="tablist" aria-label="Frame categories">
        {FRAME_FILTERS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={filter === item.id}
            className={`frame-filter ${filter === item.id ? 'active' : ''}`}
            onClick={() => {
              soundFX.playClick();
              setFilter(item.id);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="frame-pick-grid">
        {visibleFrames.map((frame) => (
          <FrameCard
            key={frame.id}
            frame={frame}
            selected={(frameConfig.frameId || frameConfig.themeId) === frame.id}
            onSelect={selectFrame}
            previewMember={activeMember}
            teamName={teamName}
          />
        ))}
      </div>

      <div className="frame-foot">
        <p className="frame-foot-selected">
          Current: <strong>{currentFrame.name}</strong>
        </p>
        <button type="button" className="details-submit frame-foot-cta" onClick={handleProceed}>
          Generate with {currentFrame.name}
          <IconArrow />
        </button>
      </div>
    </div>
  );
};

export default FrameSelector;
