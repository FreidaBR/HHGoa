import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BADGE, PHOTO_SHAPES, getPhotoShape, getPreviewSize } from '../data/frameThemes';
import { drawBadge } from '../utils/badgeDraw';
import { soundFX } from '../utils/sound';
import { IconArrow } from './icons/DetailsIcons';

const PREVIEW = getPreviewSize(BADGE.previewW);

const FrameSelector = ({ members, teamName, generationMode, frameConfig, setFrameConfig, navigateTo }) => {
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(0);
  const [previewState, setPreviewState] = useState('loading');
  const previewCanvasRef = useRef(null);

  const activeMember = members[selectedMemberIndex] || members[0] || { name: 'Builder' };
  const photoShape = getPhotoShape(frameConfig.photoShape);

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      const canvas = previewCanvasRef.current;
      if (!canvas || cancelled) return;
      setPreviewState('loading');
      try {
        await drawBadge(canvas, {
          member: activeMember,
          teamName,
          photoShape,
          width: PREVIEW.width,
          height: PREVIEW.height,
        });
        if (!cancelled) setPreviewState('ready');
      } catch (err) {
        console.error('Badge preview failed:', err);
        if (!cancelled) setPreviewState('error');
      }
    };
    render();
    return () => { cancelled = true; };
  }, [activeMember, teamName, photoShape]);

  const setShape = (shape) => {
    soundFX.playClick();
    setFrameConfig((prev) => ({ ...prev, photoShape: shape }));
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
          <span>Builder pass</span>
        </p>
        <h1 className="frame-hero-title">
          <span className="frame-hero-title-accent">Photo</span>
          <span className="frame-hero-title-main">Shape</span>
        </h1>
        <p className="frame-hero-lede">
          Skate-poster builder pass · {BADGE.label} · pick square or round photo crop.
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

      <div className="id-card-stage id-card-stage--portrait">
        <div className="id-card-preview-wrap">
          {previewState === 'loading' && (
            <p className="id-card-preview-status" aria-live="polite">Rendering badge…</p>
          )}
          {previewState === 'error' && (
            <p className="id-card-preview-status id-card-preview-status--error" aria-live="polite">
              Preview failed — hard refresh and try again.
            </p>
          )}
          <canvas
            ref={previewCanvasRef}
            className="id-card-preview-canvas"
            width={PREVIEW.width}
            height={PREVIEW.height}
            style={{ aspectRatio: PREVIEW.aspect }}
            aria-label="Event badge preview"
          />
        </div>

        <div className="id-card-shape-picker">
          <p className="id-card-shape-label">Photo shape</p>
          <div className="id-card-shape-btns" role="group" aria-label="Photo shape">
            {PHOTO_SHAPES.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className={`id-card-shape-btn ${photoShape === opt.id ? 'active' : ''}`}
                onClick={() => setShape(opt.id)}
                aria-pressed={photoShape === opt.id}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="id-card-size-note">
            Export: {BADGE.exportW}×{BADGE.exportH} px · {BADGE.label}
          </p>
        </div>
      </div>

      <div className="frame-foot">
        <button type="button" className="details-submit frame-foot-cta" onClick={handleProceed}>
          Generate passport
          <IconArrow />
        </button>
      </div>
    </div>
  );
};

export default FrameSelector;
