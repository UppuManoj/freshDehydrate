import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-column about">
          <h3 className="footer-logo"><span>Fresh</span> Dehydrate</h3>
          <p>Premium dehydrated foods that preserve nature's goodness. Quality nutrition for healthy living.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>

        <div className="footer-links-container">
          <div className="footer-column links quick-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column links categories">
            <h4>Categories</h4>
            <ul>
              <li><Link to="/products">Dehydrated Fruits</Link></li>
              <li><Link to="/products">Dehydrated Vegetables</Link></li>
              <li><Link to="/products">Powder</Link></li>
              <li><Link to="/products">Organic products</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-column contact">
          <h4>Contact</h4>
          <p><FiMapPin className="contact-icon" /> Lucky homes, jubilee hills, Hyderabad</p>
          <p><FiPhone className="contact-icon" /> +91 6303060469</p>
          <p><FiMail className="contact-icon" /> hello@freshdehydrate.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Fresh Dehydrate. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
