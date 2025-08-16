import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import ProfileDropdown from './ProfileDropdown';

const Navbar = ({ isLoggedIn, onLoginClick, onLogout, username, cartCount, favoritesCount }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleProfileClick = () => {
    setShowProfileDropdown(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="menu-icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className="navbar-brand">
          <NavLink to="/"><span className="logo-fresh">Fresh</span> Dehydrate</NavLink>
        </div>
      </div>
      
      <div className="navbar-center">
        <ul className="navbar-links">
          <li><NavLink to="/" exact activeClassName="active-link">Home</NavLink></li>
          <li><NavLink to="/about" activeClassName="active-link">About</NavLink></li>
          <li><NavLink to="/products" activeClassName="active-link">Products</NavLink></li>
          <li><NavLink to="/contact" activeClassName="active-link">Contact</NavLink></li>
        </ul>
      </div>

      <div className="navbar-right">
        <div className="navbar-icons">
          <NavLink to="/favorites" className="icon-link favorites-icon-container">
            <FaHeart />
            {typeof favoritesCount === 'number' && <span className="favorites-count">{favoritesCount}</span>}
          </NavLink>
          <NavLink to="/cart" className="icon-link cart-icon-container">
            <FaShoppingCart />
            {typeof cartCount === 'number' && <span className="cart-count">{cartCount}</span>}
          </NavLink>
          {isLoggedIn ? (
            <div className="profile-icon-container">
              <button onClick={handleProfileClick} className="icon-link profile-icon-button">
                <FaUserCircle />
              </button>
              {showProfileDropdown && <ProfileDropdown username={username} onLogout={onLogout} />}
            </div>
          ) : (
            <button className="login-button-navbar" onClick={onLoginClick}>Login</button>
          )}
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-header">
          <h3>Menu</h3>
          <FaTimes className="close-icon" onClick={toggleMobileMenu} />
        </div>
        <ul className="navbar-links">
          <li><NavLink to="/" exact activeClassName="active-link" onClick={closeMobileMenu}>Home</NavLink></li>
          <li><NavLink to="/about" activeClassName="active-link" onClick={closeMobileMenu}>About</NavLink></li>
          <li><NavLink to="/products" activeClassName="active-link" onClick={closeMobileMenu}>Products</NavLink></li>
          <li><NavLink to="/contact" activeClassName="active-link" onClick={closeMobileMenu}>Contact</NavLink></li>
        </ul>
      </div>
      {isMobileMenuOpen && <div className="menu-overlay" onClick={toggleMobileMenu}></div>}
    </nav>
  );
};

export default Navbar;
