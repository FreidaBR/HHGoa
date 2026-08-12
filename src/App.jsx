import React, { useState } from 'react';
import Header from './components/Header';
import StepTracker from './components/StepTracker';
import SquadBuilder from './components/SquadBuilder';
import TeamPreview from './components/TeamPreview';
import Footer from './components/Footer';
import Home from './components/Home';
import ChooseMode from './components/ChooseMode';
import SoloDetails from './components/SoloDetails';
import FrameSelector from './components/FrameSelector';
import IDGenerator from './components/IDGenerator';

function App() {
  // Current view: home, choose, solo-details, squad-details, frame, generate
  const [currentView, setCurrentView] = useState('home');
  const [generationMode, setGenerationMode] = useState('squad'); // 'solo' or 'squad'
  
  // Squad State
  const [teamName, setTeamName] = useState('Code Pirates');
  const [squadMembers, setSquadMembers] = useState([
    {
      id: 1,
      assignedId: 'HH-26-1065',
      name: 'Sanskriti Maheshwari',
      role: 'Builder',
      title: 'Pixel Pilot',
      photo: null,
      zoom: 1.0
    }
  ]);

  // Solo State
  const [soloMember, setSoloMember] = useState({
    id: 1,
    assignedId: `HH-26-${1000 + Math.floor(Math.random() * 9000)}`,
    name: '',
    role: 'Builder',
    teamName: '',
    title: '',
    photo: null,
    zoom: 1.0
  });

  // Frame Customization State
  const [frameConfig, setFrameConfig] = useState({
    themeId: 'goa-estate',
    stickers: ['goa2026']
  });

  const navigateTo = (view) => {
    // Intercept mode setting when navigating from details or choose
    if (view === 'solo-details') {
      setGenerationMode('solo');
    } else if (view === 'squad-details') {
      setGenerationMode('squad');
    }
    
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addSquadMember = () => {
    const newId = squadMembers.length > 0 ? Math.max(...squadMembers.map(m => m.id)) + 1 : 1;
    const randomAssignedId = `HH-26-${1000 + Math.floor(Math.random() * 9000)}`;
    setSquadMembers([
      ...squadMembers,
      {
        id: newId,
        assignedId: randomAssignedId,
        name: '',
        role: 'Builder',
        title: '',
        photo: null,
        zoom: 1.0
      }
    ]);
  };

  const updateSquadMember = (id, field, value) => {
    setSquadMembers(squadMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const removeSquadMember = (id) => {
    if (squadMembers.length <= 1) return;
    setSquadMembers(squadMembers.filter(m => m.id !== id));
  };

  const moveSquadMember = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= squadMembers.length) return;
    const updated = [...squadMembers];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, movedItem);
    setSquadMembers(updated);
  };

  const updateSoloMember = (field, value) => {
    setSoloMember({ ...soloMember, [field]: value });
  };

  // Determine active list of members to pass to FrameSelector & IDGenerator
  const activeMembers = generationMode === 'squad' ? squadMembers : [soloMember];
  const activeTeamName = generationMode === 'squad' ? teamName : soloMember.teamName;

  // Render full screen Home poster if currentView is 'home'
  if (currentView === 'home') {
    return <Home navigateTo={navigateTo} />;
  }

  return (
    <div className="app-container">
      <Header navigateTo={navigateTo} currentView={currentView} generationMode={generationMode} />
      
      {currentView !== 'choose' && (
        <StepTracker 
          currentView={currentView} 
          generationMode={generationMode} 
          navigateTo={navigateTo} 
        />
      )}
      
      <main key={currentView} className="page-main fade-in">
        {currentView === 'choose' && (
          <ChooseMode navigateTo={navigateTo} />
        )}
        
        {currentView === 'squad-details' && (
          <div className="squad-layout">
            <div className="squad-form-col">
              <SquadBuilder 
                teamName={teamName}
                setTeamName={setTeamName}
                members={squadMembers}
                updateMember={updateSquadMember}
                addMember={addSquadMember}
                removeMember={removeSquadMember}
                moveMember={moveSquadMember}
                navigateTo={navigateTo}
              />
            </div>
            <div className="squad-preview-col">
              <TeamPreview members={squadMembers} teamName={teamName} />
            </div>
          </div>
        )}
        
        {currentView === 'solo-details' && (
          <SoloDetails 
            member={soloMember} 
            updateSoloMember={updateSoloMember} 
            navigateTo={navigateTo} 
          />
        )}

        {currentView === 'frame' && (
          <FrameSelector 
            members={activeMembers}
            teamName={activeTeamName}
            generationMode={generationMode}
            frameConfig={frameConfig}
            setFrameConfig={setFrameConfig}
            navigateTo={navigateTo}
          />
        )}
        
        {currentView === 'generate' && (
          <IDGenerator 
            teamName={activeTeamName}
            members={activeMembers}
            frameConfig={frameConfig}
            navigateTo={navigateTo}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
