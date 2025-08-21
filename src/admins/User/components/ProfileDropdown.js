import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import './ProfileDropdown.css';

const ProfileDropdown = ({ username }) => {
  const { logout } = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Profile dropdown logout clicked');
    logout();
  };

  return (
    <div className="profile-dropdown">
      <div className="dropdown-item">
        <strong>{username}</strong>
      </div>
      <div className="dropdown-divider"></div>
      <div className="dropdown-item">
        <button 
          onClick={handleLogout}
          className="dropdown-logout-btn"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
