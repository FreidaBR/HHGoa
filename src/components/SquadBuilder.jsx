import React from 'react';
import MainHeaderCard from './MainHeaderCard';
import TeamPreview from './TeamPreview';
import TeammateList from './TeammateList';
import { IconLotus } from './icons/HomeIcons';

const SquadBuilder = ({ teamName, setTeamName, members, updateMember, addMember, removeMember, moveMember, navigateTo }) => {
  return (
    <div className="details-shell details-shell-squad">
      <div className="details-meta">
        <span>Step 02</span>
        <span className="details-meta-dot" aria-hidden="true" />
        <span>Squad details</span>
        <span className="details-meta-dot" aria-hidden="true" />
        <span>Team track</span>
      </div>

      <div className="details-squad-layout">
        <div className="details-inner">
          <header className="details-head details-head-compact">
            <div className="details-eyebrow">
              <IconLotus />
              <span>Squad mode</span>
            </div>
            <h1 className="details-title">Build your squad</h1>
          </header>

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

        <TeamPreview members={members} teamName={teamName} />
      </div>
    </div>
  );
};

export default SquadBuilder;
