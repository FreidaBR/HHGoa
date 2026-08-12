import React from 'react';

const TeamPreview = ({ members, teamName }) => (
  <aside className="details-preview">
    <div className="details-preview-head">
      <span className="details-preview-kicker">Live preview</span>
      <span className="details-preview-count">
        {members.length} {members.length === 1 ? 'builder' : 'builders'}
      </span>
    </div>

    <h3 className="details-preview-team">
      {teamName?.trim() ? teamName : 'Your squad'}
    </h3>

    <ul className="details-preview-list">
      {members.map((member, index) => (
        <li key={member.id} className="details-preview-item">
          <span className="details-preview-index">0{index + 1}</span>
          <span className="details-preview-name">
            {member.name?.trim() ? member.name : `Member 0${index + 1}`}
          </span>
          <span className="details-preview-role">{member.role || 'Builder'}</span>
        </li>
      ))}
    </ul>

    <p className="details-preview-note">
      One frame theme · batch generate · ZIP export for the full crew.
    </p>
  </aside>
);

export default TeamPreview;
