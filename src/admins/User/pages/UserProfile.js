import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import './UserProfile.css';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({
    name: currentUser?.name || 'User',
    email: currentUser?.email || 'user@admin.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345',
    preferences: {
      notifications: true,
      newsletter: false,
      theme: 'light'
    }
  });

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (pref, value) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [pref]: value
      }
    }));
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>👤 My Profile</h2>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleProfileChange('name', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileChange('email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleProfileChange('phone', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea
              value={profile.address}
              onChange={(e) => handleProfileChange('address', e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="profile-section">
          <h3>Preferences</h3>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={profile.preferences.notifications}
                onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
              />
              Email Notifications
            </label>
            <p>Receive notifications about orders and promotions</p>
          </div>
          <div className="preference-item">
            <label>
              <input
                type="checkbox"
                checked={profile.preferences.newsletter}
                onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
              />
              Newsletter Subscription
            </label>
            <p>Get the latest news and product updates</p>
          </div>
          <div className="preference-item">
            <label>
              Theme:
              <select
                value={profile.preferences.theme}
                onChange={(e) => handlePreferenceChange('theme', e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </label>
          </div>
        </div>

        <div className="profile-section">
          <h3>Account Status</h3>
          <div className="status-info">
            <p><strong>Account Type:</strong> {currentUser?.role || 'Regular User'}</p>
            <p><strong>Member Since:</strong> January 2024</p>
            <p><strong>Total Orders:</strong> 15</p>
            <p><strong>Loyalty Points:</strong> 450</p>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="save-btn">💾 Save Changes</button>
        <button className="reset-btn">🔄 Reset</button>
        <button className="delete-btn">🗑️ Delete Account</button>
      </div>
    </div>
  );
};

export default UserProfile;
