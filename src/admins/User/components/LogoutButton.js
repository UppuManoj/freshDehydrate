import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const LogoutButton = ({ className = "logout-btn" }) => {
  const { logout, currentUser } = useAuth();

  if (!currentUser) return null;

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Logout button clicked');
    logout();
  };

  return (
    <button 
      className={className} 
      onClick={handleLogout}
      type="button"
      style={{
        background: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '500'
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
