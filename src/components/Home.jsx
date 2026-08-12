import React, { useState, useEffect } from 'react';
import { soundFX } from '../utils/sound';
import {
  LogoMonogram,
  IconSound,
  IconArrow,
  IconExport,
  IconSquad,
  IconTheme,
  IconLotus,
  GoaScript,
} from './icons/HomeIcons';

const FEATURES = [
  {
    icon: IconExport,
    label: '4K Export',
    desc: '2400×1500 PNG passes, print-ready or share on X.',
  },
  {
    icon: IconSquad,
    label: 'Solo & Squad',
    desc: 'One builder or a full team batch in a single ZIP.',
  },
  {
    icon: IconTheme,
    label: 'Theme Studio',
    desc: 'Goa frames, stickers, and custom passport themes.',
  },
];

const Home = ({ navigateTo }) => {
  const [audioMuted, setAudioMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-10-28T09:00:00+05:30').getTime();
    const tick = () => {
      const diff = Math.max(0, targetDate - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    soundFX.playFanfare();
    navigateTo('choose');
  };

  const toggleSound = () => {
    setAudioMuted(soundFX.toggleMute());
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="hero-shell">
      {/* Top meta strip — matches hhgoa.com rhythm */}
      <div className="hero-meta">
        <span>GOA, INDIA</span>
        <span className="hero-meta-dot" aria-hidden="true" />
        <span>28 – 31 OCT 2026</span>
      </div>

      {/* Navigation */}
      <header className="hero-nav">
        <div className="hero-nav-brand">
          <img
            src="/assets/studio-logo.png"
            alt="2:47 PM Studio"
            className="hero-studio-logo"
            draggable={false}
          />
          <div className="hero-nav-copy">
            <span className="hero-nav-product">Builder Passport Generator</span>
          </div>
        </div>

        <div className="hero-nav-actions">
          <button
            type="button"
            onClick={toggleSound}
            className="hero-icon-btn"
            title={audioMuted ? 'Unmute sound' : 'Mute sound'}
            aria-label={audioMuted ? 'Unmute sound effects' : 'Mute sound effects'}
          >
            <IconSound muted={audioMuted} />
          </button>
          <button type="button" className="hero-nav-cta" onClick={handleStart}>
            Start building
            <IconArrow />
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="hero-main">
        <div className="hero-grid">
          {/* Left — identity & headline */}
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <IconLotus />
              <span>Open Trials · Task #1</span>
            </div>

            <h1 className="hero-headline">
              <span className="hero-line">BEACH</span>
              <span className="hero-line hero-line-accent">
                <span className="hero-times">×</span>
                BYTES
              </span>
            </h1>

            <p className="hero-tagline">SUN · CODE · SURF</p>

            <p className="hero-lede">
              Create your official Hacker House Goa 2026 builder passport — solo or with your squad.
              Download, share with <span className="hero-hashtag">#FrameInGoa</span>, and join the radar.
            </p>

            <div className="hero-actions">
              <button type="button" className="hero-primary-btn" onClick={handleStart}>
                Build your passport
                <IconArrow />
              </button>
              <div className="hero-countdown" aria-live="polite">
                <span className="hero-countdown-label">Opens in</span>
                <span className="hero-countdown-value">
                  {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.mins)}m {pad(timeLeft.secs)}s
                </span>
              </div>
            </div>
          </div>

          {/* Right — event card */}
          <aside className="hero-card">
            <div className="hero-card-top">
              <LogoMonogram />
              <div>
                <p className="hero-card-kicker">Hacker House Goa</p>
                <p className="hero-card-title">
                  2026 <GoaScript />
                </p>
              </div>
            </div>

            <div className="hero-card-divider" />

            <dl className="hero-card-stats">
              <div>
                <dt>Duration</dt>
                <dd>4 days</dd>
              </div>
              <div>
                <dt>Builders</dt>
                <dd>247 selected</dd>
              </div>
              <div>
                <dt>Format</dt>
                <dd>AI × Crypto</dd>
              </div>
            </dl>

            <p className="hero-card-note">
              Less noise. More signal. One passport that looks as sharp as your build.
            </p>

            <button type="button" className="hero-card-link" onClick={handleStart}>
              Choose solo or squad
              <IconArrow />
            </button>
          </aside>
        </div>

        {/* Feature strip */}
        <div className="hero-features">
          {FEATURES.map(({ icon: Icon, label, desc }) => (
            <article key={label} className="hero-feature">
              <div className="hero-feature-icon">
                <Icon />
              </div>
              <div>
                <h3 className="hero-feature-label">{label}</h3>
                <p className="hero-feature-desc">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="hero-footer">
        <span>#FrameInGoa</span>
        <span className="hero-footer-dot" aria-hidden="true" />
        <span>Hacker House Goa 2026</span>
        <span className="hero-footer-dot" aria-hidden="true" />
        <span>1,420+ passports issued</span>
      </footer>
    </div>
  );
};

export default Home;
