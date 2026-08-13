import React, { useCallback, useEffect, useRef, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getBadgeSize, getPhotoShape } from '../data/frameThemes';
import { drawBadge } from '../utils/badgeDraw';
import { soundFX } from '../utils/sound';

const SingleBadgeCard = ({ member, teamName, frameConfig, onRendered }) => {
  const canvasRef = useRef(null);
  const onRenderedRef = useRef(onRendered);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [renderState, setRenderState] = useState('loading');
  const [copied, setCopied] = useState(false);
  const photoShape = getPhotoShape(frameConfig.photoShape);
  const spec = getBadgeSize();

  onRenderedRef.current = onRendered;

  useEffect(() => {
    let isMounted = true;
    const render = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      setRenderState('loading');
      try {
        await drawBadge(canvas, {
          member,
          teamName,
          photoShape,
          width: spec.exportW,
          height: spec.exportH,
        });
        if (!isMounted) return;
        const dataUrl = canvas.toDataURL('image/png');
        setDownloadUrl(dataUrl);
        setRenderState('ready');
        onRenderedRef.current?.(member.id, dataUrl);
      } catch (err) {
        console.error('Badge export failed:', err);
        if (isMounted) setRenderState('error');
      }
    };
    render();
    return () => { isMounted = false; };
  }, [member, teamName, photoShape, spec.exportW, spec.exportH]);

  const fileName = `${member.name ? member.name.replace(/\s+/g, '_') : 'ID'}_Goa2026.png`;

  const shareText = `Just created my official Hacker House Goa 2026 Builder Passport! 🌴\n\nName: ${member.name || 'Builder'}\nRole: ${member.role || 'Hacker'}\nPassport ID: ${member.assignedId}\n\nJoin the community build movement in Goa! ⚡ #FrameInGoa #HHGoa2026`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;

  const copyShareText = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="generate-badge-card">
      <div className="generate-badge-head">
        <div className="generate-badge-identity">
          <span>{member.name || 'Anonymous Builder'}</span>
          <span className="generate-badge-role">{member.role || 'Builder'}</span>
        </div>
        <span className="generate-badge-id">{member.assignedId}</span>
      </div>

      <div className="generate-badge-canvas-wrap">
        {renderState === 'loading' && (
          <p className="generate-badge-status" aria-live="polite">Pressing badge…</p>
        )}
        {renderState === 'error' && (
          <p className="generate-badge-status generate-badge-status--error" aria-live="polite">
            Badge failed to render — refresh and try again.
          </p>
        )}
        <canvas
          ref={canvasRef}
          className="generate-badge-canvas"
          width={spec.exportW}
          height={spec.exportH}
          style={{ aspectRatio: spec.previewAspect }}
          aria-label={`Badge for ${member.name || 'builder'}`}
        />
      </div>

      <div className="generate-badge-actions">
        {downloadUrl && (
          <a
            href={downloadUrl}
            download={fileName}
            onClick={() => soundFX.playStamp()}
            className="generate-badge-download"
          >
            Download PNG ({spec.exportW}×{spec.exportH} · {spec.label})
          </a>
        )}

        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFX.playClick()}
          className="generate-badge-share"
        >
          Share on X (#FrameInGoa)
        </a>

        <button type="button" onClick={copyShareText} className="generate-badge-copy">
          {copied ? '✓ Text Copied!' : 'Copy share text'}
        </button>
      </div>
    </div>
  );
};

const IDGenerator = ({ teamName, members, frameConfig, navigateTo }) => {
  const [renderedBadges, setRenderedBadges] = useState({});
  const [isZipping, setIsZipping] = useState(false);

  useEffect(() => {
    soundFX.playFanfare();
  }, []);

  const handleBadgeRendered = useCallback((id, dataUrl) => {
    setRenderedBadges((prev) => {
      if (prev[id] === dataUrl) return prev;
      return { ...prev, [id]: dataUrl };
    });
  }, []);

  const allRendered = members.length > 0 && members.every((m) => renderedBadges[m.id]);

  const handleDownloadAllZip = async () => {
    if (!allRendered) return;
    soundFX.playStamp();
    setIsZipping(true);
    try {
      const zip = new JSZip();
      const folderName = teamName ? `${teamName.replace(/\s+/g, '_')}_HHGoa2026` : 'HHGoa2026_Badges';
      const folder = zip.folder(folderName);

      members.forEach((m) => {
        const dataUrl = renderedBadges[m.id];
        if (dataUrl) {
          const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
          const safeName = m.name ? m.name.replace(/\s+/g, '_') : `Builder_${m.id}`;
          folder.file(`${safeName}_Goa2026.png`, base64Data, { base64: true });
        }
      });

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, `${folderName}.zip`);
    } catch (err) {
      console.error('Failed to create ZIP:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="generate-shell">
      <div className="generate-hero">
        <p className="generate-kicker">Step 04 · Complete</p>
        <h1 className="generate-title">Your badges are pressed</h1>
        <p className="generate-lede">
          High-resolution event badges for Hacker House Goa 2026
          {members.length > 1 ? ` — ${members.length} builders in this batch.` : '.'}
        </p>
      </div>

      {members.length > 1 && (
        <div className="generate-zip-bar">
          <div>
            <h2 className="generate-zip-title">Squad package</h2>
            <p className="generate-zip-desc">
              Download all {members.length} badges in one ZIP
              {!allRendered && ' — waiting for renders to finish…'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownloadAllZip}
            disabled={isZipping || !allRendered}
            className="generate-zip-btn"
          >
            {isZipping ? 'Creating ZIP…' : 'Download squad ZIP'}
          </button>
        </div>
      )}

      <div className="generate-badge-list">
        {members.map((member) => (
          <SingleBadgeCard
            key={member.id}
            member={member}
            teamName={teamName}
            frameConfig={frameConfig}
            onRendered={handleBadgeRendered}
          />
        ))}
      </div>

      <div className="generate-foot">
        <button
          type="button"
          className="generate-foot-btn"
          onClick={() => {
            soundFX.playClick();
            navigateTo('frame');
          }}
        >
          ← Change photo shape
        </button>
        <button
          type="button"
          className="generate-foot-btn generate-foot-btn--primary"
          onClick={() => {
            soundFX.playClick();
            navigateTo('home');
          }}
        >
          Start over
        </button>
      </div>
    </div>
  );
};

export default IDGenerator;
