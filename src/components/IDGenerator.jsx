import React, { useEffect, useRef, useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getFrame } from '../data/frameThemes';
import { drawBadge } from '../utils/badgeDraw';
import BitmojiAvatarCard from './BitmojiAvatarCard';
import { soundFX } from '../utils/sound';

const SingleBadgeCard = ({ member, teamName, frameConfig, onRendered }) => {
  const canvasRef = useRef(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const currentFrame = getFrame(frameConfig.frameId || frameConfig.themeId);

  useEffect(() => {
    let isMounted = true;
    const render = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      await drawBadge(canvas, {
        member,
        teamName,
        frame: currentFrame,
        width: currentFrame.exportW,
        height: currentFrame.exportH,
      });
      if (isMounted) {
        const dataUrl = canvas.toDataURL('image/png');
        setDownloadUrl(dataUrl);
        if (onRendered) onRendered(member.id, dataUrl);
      }
    };
    render();
    return () => { isMounted = false; };
  }, [member, teamName, frameConfig, currentFrame, onRendered]);

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
    <div className="flex flex-col items-center bg-black/40 p-6 rounded-2xl neo-border w-full max-w-4xl mx-auto mb-8 border-2 border-black">
      <div className="flex justify-between items-center w-full mb-4">
        <div className="font-mono text-sm font-black uppercase text-yellow-300 flex items-center gap-2">
          <span>👤 {member.name || 'Anonymous Builder'}</span>
          <span className="bg-pink px-2 py-0.5 rounded text-white text-xs" style={{ backgroundColor: '#ff2a85' }}>{member.role || 'Builder'}</span>
        </div>
        <div className="font-mono text-xs bg-black text-[#ffe600] px-3 py-1 rounded font-black border border-white/20">
          {member.assignedId}
        </div>
      </div>

      {/* 4K Canvas Output Container */}
      <div className="w-full flex justify-center bg-black/60 p-3 rounded-xl border border-black mb-6">
        <canvas 
          ref={canvasRef} 
          className="w-full neo-shadow rounded-lg border-2 border-black max-w-[760px]"
          style={{ aspectRatio: `${currentFrame.exportW} / ${currentFrame.exportH}` }}
        />
      </div>

      {/* Action Buttons: Single PNG Download & X Share Intent */}
      <div className="flex flex-wrap justify-center items-center gap-4 w-full">
        {downloadUrl && (
          <a 
            href={downloadUrl} 
            download={fileName}
            onClick={() => soundFX.playStamp()}
            className="btn-primary neo-border text-sm py-3.5 px-8 font-mono font-black flex items-center gap-2"
            style={{ textDecoration: 'none' }}
          >
            <span>Download High-Res 4K PNG</span>
            <span>&darr;</span>
          </a>
        )}

        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFX.playClick()}
          className="btn-secondary neo-border-sm bg-[#1DA1F2] text-white hover:bg-[#0c85d0] text-sm py-3.5 px-6 font-mono font-black flex items-center gap-2"
          style={{ textDecoration: 'none' }}
        >
          <span>Share on X (#FrameInGoa)</span>
          <span>↗</span>
        </a>

        <button
          type="button"
          onClick={copyShareText}
          className="btn-secondary text-xs py-3 px-4 font-mono font-bold"
        >
          {copied ? '✓ Text Copied!' : '📋 Copy Share Copy'}
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

  const handleBadgeRendered = (id, dataUrl) => {
    setRenderedBadges((prev) => ({ ...prev, [id]: dataUrl }));
  };

  const handleDownloadAllZip = async () => {
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
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto py-6 fade-in select-none">
      
      {/* Title */}
      <div className="text-center mb-8">
        <div className="text-pink font-mono text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'var(--accent-pink)' }}>
          🎉 Passport Generation Complete
        </div>
        <h1 
          className="font-display uppercase text-yellow mb-2"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', color: 'var(--accent-yellow)', WebkitTextStroke: '2px #000' }}
        >
          Your Badges Are Pressed!
        </h1>
        <p className="font-mono text-xs sm:text-sm text-white/90 max-w-lg mx-auto">
          High-resolution collectible builder passports ready for Hacker House Goa 2026.
        </p>
      </div>

      {/* Batch Zip Button for Squads */}
      {members.length > 1 && (
        <div className="dark-card neo-shadow-lg w-full max-w-4xl p-6 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-2 border-yellow-300" style={{ borderRadius: '20px' }}>
          <div>
            <h3 className="font-display text-2xl uppercase text-yellow-300">
              Download Full Squad Package (.ZIP)
            </h3>
            <p className="font-mono text-xs text-white/80">
              Get all {members.length} builder passes in one high-res ZIP package.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadAllZip}
            disabled={isZipping}
            className="btn-primary bg-yellow-300 text-black py-3.5 px-8 text-sm font-mono font-black flex items-center gap-2 cursor-pointer"
          >
            {isZipping ? 'Creating ZIP...' : '📦 Download Squad ZIP'}
          </button>
        </div>
      )}

      {/* Badges List & Corresponding Bitmoji Avatar Cards */}
      <div className="w-full">
        {members.map((member) => (
          <React.Fragment key={member.id}>
            <SingleBadgeCard 
              member={member} 
              teamName={teamName}
              frameConfig={frameConfig}
              onRendered={handleBadgeRendered}
            />

            {/* Bitmoji Avatar Pass */}
            <BitmojiAvatarCard 
              member={member}
              teamName={teamName}
              frameConfig={frameConfig}
            />
          </React.Fragment>
        ))}
      </div>

      {/* Navigation Footer */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <button 
          className="btn-secondary neo-border bg-black text-white px-6 py-3.5 font-mono font-bold" 
          onClick={() => {
            soundFX.playClick();
            navigateTo('frame');
          }}
        >
          &larr; Change Frame Theme
        </button>

        <button 
          className="btn-primary neo-border bg-yellow-300 text-black px-8 py-3.5 font-mono font-black" 
          onClick={() => {
            soundFX.playClick();
            navigateTo('home');
          }}
        >
          Start Over 🚀
        </button>
      </div>
    </div>
  );
};

export default IDGenerator;
