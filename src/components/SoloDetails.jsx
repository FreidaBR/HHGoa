import React from 'react';
import { soundFX } from '../utils/sound';
import { IconLotus } from './icons/HomeIcons';
import { IconArrow } from './icons/DetailsIcons';
import DetailsPhotoPicker from './DetailsPhotoPicker';

const ROLES = [
  'Builder', 'Hacker', 'Designer', 'Solana Dev', 'AI Engineer', 'Rustacean',
  'Smart Contract Dev', 'Founder', 'Organiser', 'Mentor', 'Staff',
];

const SoloDetails = ({ member, updateSoloMember, navigateTo }) => {
  const handleProceed = () => {
    if (!member.name?.trim()) return;
    soundFX.playClick();
    navigateTo('frame');
  };

  const canProceed = Boolean(member.name?.trim());

  return (
    <div className="details-shell">
      <div className="details-meta">
        <span>Step 02</span>
        <span className="details-meta-dot" aria-hidden="true" />
        <span>Builder details</span>
        <span className="details-meta-dot" aria-hidden="true" />
        <span>Solo track</span>
      </div>

      <div className="details-inner details-inner-solo">
        <header className="details-head">
          <div className="details-eyebrow">
            <IconLotus />
            <span>Solo mode</span>
          </div>
          <h1 className="details-title">Your builder identity</h1>
          <p className="details-lede">
            Add your photo, name, and stack — everything that lands on your Hacker House Goa passport.
          </p>
        </header>

        <div className="details-card">
          <DetailsPhotoPicker
            photo={member.photo}
            zoom={member.zoom}
            onPhotoChange={(v) => updateSoloMember('photo', v)}
            onZoomChange={(v) => updateSoloMember('zoom', v)}
          />

          <div className="details-fields">
            <div className="details-field">
              <label className="details-label" htmlFor="solo-name">
                Full name <span className="details-required">*</span>
              </label>
              <input
                id="solo-name"
                type="text"
                className="details-input"
                value={member.name}
                onChange={(e) => updateSoloMember('name', e.target.value)}
                placeholder="e.g. Aarav Fernandes"
                autoComplete="name"
              />
            </div>

            <div className="details-field-row">
              <div className="details-field">
                <label className="details-label" htmlFor="solo-role">Role / stack</label>
                <select
                  id="solo-role"
                  className="details-input details-select"
                  value={member.role}
                  onChange={(e) => updateSoloMember('role', e.target.value)}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div className="details-field">
                <label className="details-label" htmlFor="solo-team">
                  Squad name <span className="details-optional">optional</span>
                </label>
                <input
                  id="solo-team"
                  type="text"
                  className="details-input"
                  value={member.teamName || ''}
                  onChange={(e) => updateSoloMember('teamName', e.target.value)}
                  placeholder="e.g. Code Pirates"
                />
              </div>
            </div>

            <div className="details-field">
              <label className="details-label" htmlFor="solo-title">
                Builder title <span className="details-optional">optional</span>
              </label>
              <input
                id="solo-title"
                type="text"
                className="details-input"
                value={member.title || ''}
                onChange={(e) => updateSoloMember('title', e.target.value)}
                placeholder="e.g. Pixel Pilot"
              />
            </div>
          </div>

          <div className="details-actions">
            <button
              type="button"
              className="details-submit"
              onClick={handleProceed}
              disabled={!canProceed}
            >
              Choose frame & styling
              <IconArrow />
            </button>
            {!canProceed && (
              <p className="details-hint">Enter your name to continue</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoloDetails;
