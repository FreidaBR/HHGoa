import React from 'react';

const Header = ({ navigateTo, currentView, generationMode }) => {
  const isPosterHeader = ['choose', 'solo-details', 'squad-details', 'frame', 'generate'].includes(currentView);

  let backLabel = 'Back to Choose Mode';
  let backTarget = 'choose';

  if (currentView === 'choose') {
    backLabel = 'Back to Home';
    backTarget = 'home';
  } else if (currentView === 'solo-details' || currentView === 'squad-details') {
    backLabel = 'Back to Choose Mode';
    backTarget = 'choose';
  } else if (currentView === 'frame') {
    backLabel = 'Back to Edit Details';
    backTarget = generationMode === 'solo' ? 'solo-details' : 'squad-details';
  } else if (currentView === 'generate') {
    backLabel = 'Back to Frame Customizer';
    backTarget = 'frame';
  }

  return (
    <header className={`site-header ${isPosterHeader ? 'site-header-poster' : ''}`}>
      <div className="group flex min-w-0 cursor-pointer items-center gap-3" onClick={() => navigateTo('home')}>
        {isPosterHeader ? (
          <img
            src="/assets/studio-logo.png"
            alt="2:47 PM Studio"
            className="hero-studio-logo"
            draggable={false}
          />
        ) : (
          <div
            className="neo-border neo-shadow-sm flex shrink-0 items-center justify-center font-display text-black transition-transform group-hover:scale-105"
            style={{
              backgroundColor: 'var(--accent-yellow)',
              width: '44px',
              height: '44px',
              fontSize: '1.4rem',
              borderRadius: '10px',
            }}
          >
            HH
          </div>
        )}
        <div className="flex min-w-0 flex-col uppercase leading-snug">
          <span className="truncate text-xs font-bold tracking-wider text-white">Hacker House</span>
          <span className="text-xs font-bold text-goa-yellow">Goa 2026</span>
        </div>
      </div>

      {currentView !== 'home' && (
        <button className={`site-back-btn ${isPosterHeader ? 'site-back-btn-poster' : 'btn-secondary'}`} onClick={() => navigateTo(backTarget)}>
          <span>&larr;</span>
          <span className="hidden sm:inline">{backLabel}</span>
          <span className="sm:hidden">Back</span>
        </button>
      )}
    </header>
  );
};

export default Header;
