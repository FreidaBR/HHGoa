import React from 'react';
import { IconArrow } from './icons/DetailsIcons';

const MainHeaderCard = ({ teamName, setTeamName, memberCount, onNext }) => {
  const canProceed = Boolean(teamName?.trim());

  return (
    <div className="details-card details-card-squad-head">
      <div className="details-card-kicker">Squad mode</div>
      <h2 className="details-card-title">Name your squad</h2>
      <p className="details-card-desc">
        This label appears across every builder pass in the batch — one frame, one generate, full crew.
      </p>

      <div className="details-field">
        <label className="details-label" htmlFor="team-name">Team name</label>
        <input
          id="team-name"
          type="text"
          className="details-input"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Code Pirates"
        />
      </div>

      <div className="details-squad-meta">
        <span className="details-roster-count">
          {memberCount} {memberCount === 1 ? 'member' : 'members'} on roster
        </span>
      </div>

      <div className="details-actions details-actions-inline">
        <button
          type="button"
          className="details-submit"
          onClick={canProceed ? onNext : undefined}
          disabled={!canProceed}
        >
          Choose frame & styling
          <IconArrow />
        </button>
        {!canProceed && (
          <p className="details-hint">Add a team name to unlock the next step</p>
        )}
      </div>
    </div>
  );
};

export default MainHeaderCard;
