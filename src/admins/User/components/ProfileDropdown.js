import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { FaUser, FaShoppingCart, FaHeart, FaCreditCard, FaGift, FaBell, FaSignOutAlt } from 'react-icons/fa';
import './ProfileDropdown.css';

const ProfileDropdown = ({ username, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Profile dropdown logout clicked');
    logout();
    onClose();
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleProfileNavigation = (section) => {
    navigate('/profile', { state: { activeSection: section } });
    onClose();
  };

  const menuItems = [
    { icon: <FaUser />, label: 'My Profile', action: () => handleProfileNavigation('profile') },
    { icon: <FaShoppingCart />, label: 'Orders', action: () => handleProfileNavigation('orders') },
    { icon: <FaHeart />, label: 'Wishlist', count: 38, action: () => handleNavigation('/favorites') },
    { icon: <FaCreditCard />, label: 'Coupons', action: () => handleProfileNavigation('coupons') },
    { icon: <FaGift />, label: 'Gift Cards', action: () => handleProfileNavigation('giftcards') },
    { icon: <FaBell />, label: 'Notifications', action: () => handleProfileNavigation('notifications') },
  ];

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      {menuItems.map((item, index) => (
        <div key={index} className="dropdown-item" onClick={item.action}>
          <span className="item-icon">{item.icon}</span>
          <span className="item-label">{item.label}</span>
          {item.count && <span className="item-count">{item.count}</span>}
        </div>
      ))}
      <div className="dropdown-divider"></div>
      <div className="dropdown-item logout-item" onClick={handleLogout}>
        <span className="item-icon">
          <FaSignOutAlt />
        </span>
        <span className="item-label">Logout</span>
      </div>
    </div>
  );
};

export default ProfileDropdown;
