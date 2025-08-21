import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import './AdminNavbar.css';

const AdminNavbar = ({ title = "Admin Dashboard" }) => {
  const { currentUser, logout } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleProfileClick = () => {
    setShowProfileDropdown(prev => !prev);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Admin navbar logout clicked');
    logout();
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        <div className="admin-navbar-brand">
          <span className="admin-logo-fresh">Fresh</span> Dehydrate
        </div>
        <div className="admin-navbar-title">
          {title}
        </div>
      </div>

      <div className="admin-navbar-right">
        <div className="admin-profile-container">
          <button onClick={handleProfileClick} className="admin-profile-button">
            <FaUserCircle className="admin-profile-icon" />
            <span className="admin-username">{currentUser?.name}</span>
          </button>
          {showProfileDropdown && (
            <div className="admin-profile-dropdown">
              <div className="admin-dropdown-item">
                <strong>{currentUser?.name}</strong>
                <small>{currentUser?.role}</small>
              </div>
              <div className="admin-dropdown-divider"></div>
              <div className="admin-dropdown-item">
                <button 
                  onClick={handleLogout}
                  className="admin-dropdown-logout-btn"
                  type="button"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
