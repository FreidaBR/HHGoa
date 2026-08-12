import React from 'react';
import TeammateCard from './TeammateCard';
import { IconPlus } from './icons/DetailsIcons';

const TeammateList = ({ members, updateMember, addMember, removeMember, moveMember }) => {
  return (
    <div className="details-squad-list">
      <div className="details-squad-list-head">
        <div>
          <p className="details-card-kicker">The crew</p>
          <h2 className="details-squad-list-title">Add your teammates</h2>
        </div>
        <span className="details-squad-badge">Photos optional</span>
      </div>

      <div className="details-member-stack">
        {members.map((member, index) => (
          <TeammateCard
            key={member.id}
            member={member}
            index={index}
            totalMembers={members.length}
            updateMember={updateMember}
            removeMember={removeMember}
            moveMember={moveMember}
          />
        ))}
      </div>

      <button type="button" className="details-add-member" onClick={addMember}>
        <IconPlus />
        Add teammate
      </button>
    </div>
  );
};

export default TeammateList;
