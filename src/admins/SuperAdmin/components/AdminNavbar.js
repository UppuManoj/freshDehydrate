import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaHome, FaTachometerAlt, FaClipboardList, FaBoxes, FaUsers, FaChartLine, FaBars, FaTimes } from 'react-icons/fa';
import './AdminNavbar.css';

const AdminNavbar = ({ title = "Admin Dashboard" }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleProfileClick = () => {
    setShowProfileDropdown(prev => !prev);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Admin navbar logout clicked');
    logout();
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowProfileDropdown(false);
    setShowMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(prev => !prev);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile dropdown when clicking anywhere except the profile container
      if (!event.target.closest('.admin-profile-container')) {
        setShowProfileDropdown(false);
      }
      // Close mobile menu when clicking anywhere except the mobile menu or toggle button
      if (!event.target.closest('.mobile-nav-menu') && !event.target.closest('.mobile-menu-toggle')) {
        setShowMobileMenu(false);
      }
    };

    // Add event listener to document for clicking anywhere
    if (showProfileDropdown || showMobileMenu) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside); // For mobile touch events
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showProfileDropdown, showMobileMenu]);

  return (
    <div className="admin-navbar-container">
      <div className="admin-navbar">
        <div className="admin-navbar-content">
          <div className="admin-navbar-left">
            <button 
              className="mobile-menu-toggle" 
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? <FaTimes /> : <FaBars />}
            </button>
            <a href="/" className="admin-navbar-brand">
              <span className="admin-logo-fresh">Fresh</span> Dehydrate
            </a>

            <ul className="admin-nav-menu">
              <li>
                <button 
                  onClick={() => handleNavigation('/')} 
                  className={`admin-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  <FaTachometerAlt className="admin-nav-icon" />
                  Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/products')} 
                  className={`admin-nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                >
                  <FaBoxes className="admin-nav-icon" />
                  Product Management
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/analytics')} 
                  className={`admin-nav-link ${location.pathname === '/analytics' ? 'active' : ''}`}
                >
                  <FaChartLine className="admin-nav-icon" />
                  Analytics
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/settings')} 
                  className={`admin-nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
                >
                  <FaClipboardList className="admin-nav-icon" />
                  Settings
                </button>
              </li>
              <li>
                <button className="admin-nav-link" disabled>
                  <FaUsers className="admin-nav-icon" />
                  Users
                </button>
              </li>
            </ul>
          </div>

          <div className="admin-navbar-right">
            <div className="admin-profile-container">
              <button onClick={handleProfileClick} className="admin-profile-button">
                <FaUserCircle className="admin-profile-icon" />
                <span className="admin-username">{currentUser?.name}</span>
              </button>
              {showProfileDropdown && (
                <div className="admin-profile-dropdown">
                  <div className="admin-dropdown-item admin-profile-info">
                    <strong>{currentUser?.name}</strong>
                    <small className="admin-user-email">{currentUser?.email}</small>
                    <small className="admin-user-role">{currentUser?.role}</small>
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
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="mobile-nav-overlay active" onClick={closeMobileMenu}></div>
      )}

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav-menu ${showMobileMenu ? 'active' : ''}`}>
        <div className="mobile-nav-header">
          <a href="/" className="mobile-nav-brand">
            <span className="admin-logo-fresh">Fresh</span> Dehydrate
          </a>
          <button 
            className="mobile-nav-close" 
            onClick={closeMobileMenu}
            aria-label="Close mobile menu"
          >
            <FaTimes />
          </button>
        </div>
        
        <ul className="mobile-nav-links">
          <li>
            <button 
              onClick={() => handleNavigation('/')} 
              className={`admin-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              <FaTachometerAlt className="admin-nav-icon" />
              Dashboard
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigation('/products')} 
              className={`admin-nav-link ${location.pathname === '/products' ? 'active' : ''}`}
            >
              <FaBoxes className="admin-nav-icon" />
              Product Management
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigation('/analytics')} 
              className={`admin-nav-link ${location.pathname === '/analytics' ? 'active' : ''}`}
            >
              <FaChartLine className="admin-nav-icon" />
              Analytics
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigation('/settings')} 
              className={`admin-nav-link ${location.pathname === '/settings' ? 'active' : ''}`}
            >
              <FaClipboardList className="admin-nav-icon" />
              Settings
            </button>
          </li>
          <li>
            <button className="admin-nav-link" disabled>
              <FaUsers className="admin-nav-icon" />
              Users
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNavbar;
