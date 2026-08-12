import React from 'react';
import DetailsPhotoPicker from './DetailsPhotoPicker';
import { IconTrash } from './icons/DetailsIcons';

const ROLES = [
  'Builder', 'Hacker', 'Designer', 'Solana Dev', 'AI Engineer', 'Rustacean',
  'Organiser', 'Mentor', 'Staff', 'Photographer', 'Volunteer',
];

const TeammateCard = ({ member, index, totalMembers, updateMember, removeMember, moveMember }) => {
  const handleChange = (field, value) => {
    updateMember(member.id, field, value);
  };

  return (
    <article className="details-member-card">
      <div className="details-member-head">
        <div className="details-member-id">
          <span className="details-member-num">0{index + 1}</span>
          <span className="details-member-code">{member.assignedId}</span>
        </div>

        <div className="details-member-tools">
          <button
            type="button"
            className="details-tool-btn"
            onClick={() => moveMember(index, -1)}
            disabled={index === 0}
            aria-label="Move up"
          >
            ↑
          </button>
          <button
            type="button"
            className="details-tool-btn"
            onClick={() => moveMember(index, 1)}
            disabled={index === totalMembers - 1}
            aria-label="Move down"
          >
            ↓
          </button>
          {totalMembers > 1 && (
            <button
              type="button"
              className="details-tool-btn details-tool-danger"
              onClick={() => removeMember(member.id)}
              aria-label="Remove teammate"
            >
              <IconTrash />
            </button>
          )}
        </div>
      </div>

      <div className="details-member-body">
        <DetailsPhotoPicker
          photo={member.photo}
          zoom={member.zoom}
          onPhotoChange={(v) => handleChange('photo', v)}
          onZoomChange={(v) => handleChange('zoom', v)}
          compact
        />

        <div className="details-member-fields">
          <div className="details-field">
            <label className="details-label" htmlFor={`name-${member.id}`}>Name</label>
            <input
              id={`name-${member.id}`}
              type="text"
              className="details-input"
              value={member.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Sanskriti Maheshwari"
            />
          </div>

          <div className="details-field-row">
            <div className="details-field">
              <label className="details-label" htmlFor={`role-${member.id}`}>Role / stack</label>
              <select
                id={`role-${member.id}`}
                className="details-input details-select"
                value={member.role}
                onChange={(e) => handleChange('role', e.target.value)}
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div className="details-field">
              <label className="details-label" htmlFor={`title-${member.id}`}>
                Builder title <span className="details-optional">optional</span>
              </label>
              <input
                id={`title-${member.id}`}
                type="text"
                className="details-input"
                value={member.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Pixel Pilot"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TeammateCard;
