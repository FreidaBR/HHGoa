import React from 'react';
import MainHeaderCard from './MainHeaderCard';
import TeammateList from './TeammateList';

const SquadBuilder = ({ teamName, setTeamName, members, updateMember, addMember, removeMember, moveMember, navigateTo }) => {
  return (
    <div className="w-full fade-in">
      <MainHeaderCard 
        teamName={teamName} 
        setTeamName={setTeamName} 
        memberCount={members.length} 
        onNext={() => navigateTo('frame')}
      />
      <TeammateList 
        members={members} 
        updateMember={updateMember}
        addMember={addMember}
        removeMember={removeMember}
        moveMember={moveMember}
      />
    </div>
  );
};

export default SquadBuilder;
