import React from 'react';
import { soundFX } from '../utils/sound';
import { IconLotus, IconArrow } from './icons/HomeIcons';
import { SoloPassIllustration, SquadPassIllustration, IconArrowRight } from './icons/ChooseIcons';

const TRACKS = [
  {
    id: 'solo-details',
    kicker: 'Solo track',
    title: 'Build solo',
    subtitle: 'One builder · one identity pass',
    desc: 'Create your personal Hacker House Goa builder passport — custom frame, photo, stickers, and a 4K export ready to share.',
    features: ['Single photo or avatar', 'One builder ID', '4K PNG download'],
    cta: 'Build my ID',
    illustration: SoloPassIllustration,
    accent: 'choose-card-solo',
  },
  {
    id: 'squad-details',
    kicker: 'Squad track',
    title: 'Team up',
    subtitle: 'One squad · every builder pass',
    desc: 'Add your whole team, pick one frame theme, and press every passport together — bundled in a single ZIP for the crew.',
    features: ['Squad roster', 'Batch generator', 'ZIP export'],
    cta: 'Build my squad',
    illustration: SquadPassIllustration,
    accent: 'choose-card-squad',
  },
];

const ChooseMode = ({ navigateTo }) => {
  const handleSelect = (mode) => {
    soundFX.playClick();
    navigateTo(mode);
  };

  return (
    <div className="choose-shell">
      <div className="choose-meta">
        <span>Step 01</span>
        <span className="choose-meta-dot" aria-hidden="true" />
        <span>Choose your track</span>
        <span className="choose-meta-dot" aria-hidden="true" />
        <span>GOA, INDIA</span>
      </div>

      <div className="choose-inner">
        <header className="choose-head">
          <div className="choose-eyebrow">
            <IconLotus />
            <span>Passport generator</span>
          </div>
          <h1 className="choose-title">
            <span className="choose-title-line">Team up</span>
            <span className="choose-title-or">or</span>
            <span className="choose-title-line choose-title-accent">Go solo</span>
          </h1>
          <p className="choose-lede">
            Select how you want to press your builder passport — individual pass or a full squad batch in one flow.
          </p>
        </header>

        <div className="choose-grid">
          {TRACKS.map((track) => {
            const Illus = track.illustration;
            return (
              <button
                key={track.id}
                type="button"
                className={`choose-card ${track.accent}`}
                onClick={() => handleSelect(track.id)}
              >
                <div className="choose-card-top">
                  <span className="choose-card-kicker">{track.kicker}</span>
                  <span className="choose-card-arrow" aria-hidden="true">
                    <IconArrowRight />
                  </span>
                </div>

                <div className="choose-card-visual">
                  <Illus />
                </div>

                <div className="choose-card-body">
                  <h2 className="choose-card-title">{track.title}</h2>
                  <p className="choose-card-sub">{track.subtitle}</p>
                  <p className="choose-card-desc">{track.desc}</p>

                  <ul className="choose-card-features">
                    {track.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>

                <span className="choose-card-cta">
                  {track.cta}
                  <IconArrow />
                </span>
              </button>
            );
          })}
        </div>

        <footer className="choose-foot">
          <span className="choose-foot-tag">#FrameInGoa</span>
          <span className="choose-foot-dot" aria-hidden="true" />
          <span>Hacker House Goa 2026</span>
          <span className="choose-foot-dot" aria-hidden="true" />
          <span>28 – 31 Oct</span>
        </footer>
      </div>
    </div>
  );
};

export default ChooseMode;
