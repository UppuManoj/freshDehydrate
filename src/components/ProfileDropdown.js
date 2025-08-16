import React from 'react';
import './ProfileDropdown.css';

const ProfileDropdown = ({ username, onLogout }) => {
  return (
    <div className="profile-dropdown">
      <div className="dropdown-item">
        <strong>{username}</strong>
      </div>
      <div className="dropdown-divider"></div>
      <button onClick={onLogout} className="dropdown-item logout-btn">
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;
