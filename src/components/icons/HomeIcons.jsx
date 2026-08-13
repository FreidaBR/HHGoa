/** Custom hero icons — no emoji, matches HH Goa brand */

import { BRAND_ASSETS } from '../../data/brandAssets';

export const LogoMonogram = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <rect width="36" height="36" rx="3" fill="#FFE600" />
    <path d="M8 26V10h4.5l3.5 9.5L19.5 10H24v16h-3.5v-10l-3.8 10h-2.4l-3.8-10v10H8z" fill="#041E12" />
    <path d="M26 26V10h3.2v16H26z" fill="#FF2A85" />
  </svg>
);

export const IconSound = ({ muted }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 6.5v5h3l4 3.5V3L6 6.5H3z" fill="currentColor" />
    {!muted && (
      <>
        <path d="M12.5 5.5a5.5 5.5 0 010 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14.5 3.5a8.5 8.5 0 010 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    )}
    {muted && (
      <path d="M13 6l-5 6M8 6l5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    )}
  </svg>
);

export const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconExport = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="16" height="14" rx="2" stroke="#FFE600" strokeWidth="1.5" />
    <path d="M7 3h8v4H7V3z" stroke="#FFE600" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M11 10v5M8.5 12.5L11 15l2.5-2.5" stroke="#FF2A85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconSquad = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <circle cx="8" cy="7" r="3" stroke="#FFE600" strokeWidth="1.5" />
    <circle cx="14.5" cy="8" r="2.5" stroke="#FFE600" strokeWidth="1.5" />
    <path d="M3 18c0-3 2.5-5 5-5s5 2 5 5M12 18c0-2.5 1.8-4 3.5-4" stroke="#FF2A85" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconTheme = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" fill="#FFE600" />
    <rect x="12" y="3" width="7" height="7" rx="1" stroke="#FFE600" strokeWidth="1.5" />
    <rect x="3" y="12" width="7" height="7" rx="1" stroke="#FF2A85" strokeWidth="1.5" />
    <rect x="12" y="12" width="7" height="7" rx="1" fill="#FF2A85" opacity="0.85" />
  </svg>
);

export const IconLotus = () => (
  <svg width="28" height="20" viewBox="0 0 50 38" fill="none" aria-hidden="true">
    <path d="M25 2C20 12 12 18 2 22C12 28 20 30 25 36C30 30 38 28 48 22C38 18 30 12 25 2Z" fill="#ff2a85" stroke="#ffe600" strokeWidth="2" />
    <path d="M25 14C23 18 19 21 13 23C19 25 23 26 25 30C27 26 31 25 37 23C31 21 27 18 25 14Z" fill="#ffe600" />
  </svg>
);

export const BrandLockup = ({ className = '', float = true }) => (
  <span className={`hero-brand-lockup ${className}`.trim()}>
    <img
      src={BRAND_ASSETS.hackerHouse}
      alt=""
      aria-hidden="true"
      className="hero-brand-hacker-house"
      draggable={false}
    />
    <span className={`hero-brand-goa-wrap${float ? ' hero-brand-goa-wrap--float' : ''}`}>
      <img
        src={BRAND_ASSETS.goaScript}
        alt="Hacker House Goa"
        className="hero-brand-goa"
        draggable={false}
      />
    </span>
  </span>
);

export const GoaScript = ({ className = '' }) => (
  <img
    src={BRAND_ASSETS.goaScript}
    alt="Goa"
    className={`hero-brand-goa-inline ${className}`.trim()}
    draggable={false}
  />
);
