import React from 'react';

const Header = ({ navigateTo, currentView, generationMode }) => {
  let backLabel = "Back to Choose Mode";
  let backTarget = "choose";
  
  if (currentView === 'choose') {
    backLabel = "Back to Home";
    backTarget = "home";
  } else if (currentView === 'solo-details' || currentView === 'squad-details') {
    backLabel = "Back to Choose Mode";
    backTarget = "choose";
  } else if (currentView === 'frame') {
    backLabel = "Back to Edit Details";
    backTarget = generationMode === 'solo' ? 'solo-details' : 'squad-details';
  } else if (currentView === 'generate') {
    backLabel = "Back to Frame Customizer";
    backTarget = "frame";
  }

  return (
    <header className="flex justify-between items-center w-full py-4 border-b border-white/10 mb-2">
      <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigateTo('home')}>
        {/* Logo */}
        <div 
          className="neo-border neo-shadow-sm flex items-center justify-center font-display text-black transition-transform group-hover:scale-105"
          style={{
            backgroundColor: 'var(--accent-yellow)',
            width: '44px',
            height: '44px',
            fontSize: '1.4rem',
            borderRadius: '10px'
          }}
        >
          HH
        </div>
        
        {/* Brand Label */}
        <div className="flex flex-col uppercase text-xs font-bold leading-snug">
          <span className="tracking-wider text-white">Hacker House</span>
          <span className="text-yellow" style={{ color: 'var(--accent-yellow)' }}>Goa 2026</span>
        </div>
      </div>
      
      {/* Back Button */}
      {currentView !== 'home' && (
        <button 
          className="btn-secondary flex items-center gap-2" 
          onClick={() => navigateTo(backTarget)}
        >
          <span>&larr;</span>
          <span className="hidden sm:inline">{backLabel}</span>
          <span className="sm:hidden">Back</span>
        </button>
      )}
    </header>
  );
};

export default Header;
