import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useProducts } from '../../../contexts/ProductContext';
import { FaCog, FaDatabase, FaShieldAlt, FaServer, FaCloudUploadAlt, FaExclamationTriangle, FaCheckCircle, FaEnvelope, FaCreditCard } from 'react-icons/fa';

const SystemSettings = () => {
  const { currentUser } = useAuth();
  const { resetProducts } = useProducts();
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    maxUsers: 1000,
    systemVersion: '2.1.0',
    backupFrequency: 'daily',
    enableNotifications: true,
    enableAnalytics: true,
    sessionTimeout: 30,
    maxFileSize: 10,
    enableSSL: true,
    enableTwoFactor: false,
    emailSettings: {
      smtpServer: 'smtp.gmail.com',
      smtpPort: 587,
      emailUsername: '',
      enableEmailAlerts: true
    },
    paymentSettings: {
      razorpayEnabled: true,
      paypalEnabled: false,
      codEnabled: true
    },
    securitySettings: {
      passwordMinLength: 8,
      forcePasswordChange: false,
      enableAuditLog: true,
      maxLoginAttempts: 5
    }
  });

  const [activeTab, setActiveTab] = useState('general');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSettingChange = (section, key, value) => {
    if (section) {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleSaveSettings = () => {
    // Simulate saving settings
    localStorage.setItem('superAdminSettings', JSON.stringify(settings));
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      setSettings({
        maintenanceMode: false,
        maxUsers: 1000,
        systemVersion: '2.1.0',
        backupFrequency: 'daily',
        enableNotifications: true,
        enableAnalytics: true,
        sessionTimeout: 30,
        maxFileSize: 10,
        enableSSL: true,
        enableTwoFactor: false,
        emailSettings: {
          smtpServer: 'smtp.gmail.com',
          smtpPort: 587,
          emailUsername: '',
          enableEmailAlerts: true
        },
        paymentSettings: {
          razorpayEnabled: true,
          paypalEnabled: false,
          codEnabled: true
        },
        securitySettings: {
          passwordMinLength: 8,
          forcePasswordChange: false,
          enableAuditLog: true,
          maxLoginAttempts: 5
        }
      });
    }
  };

  const handleFactoryReset = () => {
    if (window.confirm('WARNING: This will reset ALL data including products, users, and settings. This action cannot be undone. Are you absolutely sure?')) {
      if (window.confirm('FINAL WARNING: This will delete EVERYTHING. Type "RESET" to confirm:') && 
          prompt('Type RESET to confirm:') === 'RESET') {
        resetProducts();
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="settings-section">
            <h3><FaCog /> General Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <div className="setting-header">
                  <label className="setting-label">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => handleSettingChange(null, 'maintenanceMode', e.target.checked)}
                    />
                    Maintenance Mode
                  </label>
                  {settings.maintenanceMode && <FaExclamationTriangle className="warning-icon" />}
                </div>
                <p className="setting-description">
                  Enable to put the system in maintenance mode. Users will see a maintenance page.
                </p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  Maximum Concurrent Users
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={settings.maxUsers}
                    onChange={(e) => handleSettingChange(null, 'maxUsers', parseInt(e.target.value))}
                    className="setting-input"
                  />
                </label>
                <p className="setting-description">Set the maximum number of concurrent users allowed</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  Session Timeout (minutes)
                  <input
                    type="number"
                    min="5"
                    max="480"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange(null, 'sessionTimeout', parseInt(e.target.value))}
                    className="setting-input"
                  />
                </label>
                <p className="setting-description">User sessions will expire after this time</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  Maximum File Upload Size (MB)
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={settings.maxFileSize}
                    onChange={(e) => handleSettingChange(null, 'maxFileSize', parseInt(e.target.value))}
                    className="setting-input"
                  />
                </label>
                <p className="setting-description">Maximum size for uploaded product images</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={settings.enableNotifications}
                    onChange={(e) => handleSettingChange(null, 'enableNotifications', e.target.checked)}
                  />
                  Enable Notifications
                </label>
                <p className="setting-description">Enable system-wide notifications</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={settings.enableAnalytics}
                    onChange={(e) => handleSettingChange(null, 'enableAnalytics', e.target.checked)}
                  />
                  Enable Analytics
                </label>
                <p className="setting-description">Collect and analyze user behavior data</p>
              </div>
            </div>
          </div>
        );

      case 'database':
        return (
          <div className="settings-section">
            <h3><FaDatabase /> Database & Backup</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">
                  Backup Frequency
                  <select
                    value={settings.backupFrequency}
                    onChange={(e) => handleSettingChange(null, 'backupFrequency', e.target.value)}
                    className="setting-select"
                  >
                    <option value="hourly">Every Hour</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </label>
                <p className="setting-description">Set automatic backup frequency</p>
              </div>

              <div className="backup-actions">
                <button className="action-btn backup-btn">
                  <FaCloudUploadAlt /> Create Backup Now
                </button>
                <button className="action-btn restore-btn">
                  <FaDatabase /> Restore from Backup
                </button>
                <button className="action-btn danger-btn" onClick={handleFactoryReset}>
                  <FaExclamationTriangle /> Factory Reset
                </button>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="settings-section">
            <h3><FaShieldAlt /> Security Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={settings.enableSSL}
                    onChange={(e) => handleSettingChange(null, 'enableSSL', e.target.checked)}
                  />
                  Enable SSL/HTTPS
                </label>
                <p className="setting-description">Force secure connections</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={settings.enableTwoFactor}
                    onChange={(e) => handleSettingChange(null, 'enableTwoFactor', e.target.checked)}
                  />
                  Enable Two-Factor Authentication
                </label>
                <p className="setting-description">Require 2FA for admin accounts</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  Minimum Password Length
                  <input
                    type="number"
                    min="6"
                    max="20"
                    value={settings.securitySettings.passwordMinLength}
                    onChange={(e) => handleSettingChange('securitySettings', 'passwordMinLength', parseInt(e.target.value))}
                    className="setting-input"
                  />
                </label>
                <p className="setting-description">Minimum characters required for passwords</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  Maximum Login Attempts
                  <input
                    type="number"
                    min="3"
                    max="10"
                    value={settings.securitySettings.maxLoginAttempts}
                    onChange={(e) => handleSettingChange('securitySettings', 'maxLoginAttempts', parseInt(e.target.value))}
                    className="setting-input"
                  />
                </label>
                <p className="setting-description">Lock account after this many failed attempts</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={settings.securitySettings.enableAuditLog}
                    onChange={(e) => handleSettingChange('securitySettings', 'enableAuditLog', e.target.checked)}
                  />
                  Enable Audit Logging
                </label>
                <p className="setting-description">Log all admin actions for security</p>
              </div>
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="settings-section">
            <h3><FaEnvelope /> Email Configuration</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">
                  SMTP Server
                  <input
                    type="text"
                    value={settings.emailSettings.smtpServer}
                    onChange={(e) => handleSettingChange('emailSettings', 'smtpServer', e.target.value)}
                    className="setting-input"
                    placeholder="smtp.gmail.com"
                  />
                </label>
                <p className="setting-description">SMTP server for sending emails</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  SMTP Port
                  <input
                    type="number"
                    value={settings.emailSettings.smtpPort}
                    onChange={(e) => handleSettingChange('emailSettings', 'smtpPort', parseInt(e.target.value))}
                    className="setting-input"
                  />
                </label>
                <p className="setting-description">SMTP port (usually 587 for TLS)</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  Email Username
                  <input
                    type="email"
                    value={settings.emailSettings.emailUsername}
                    onChange={(e) => handleSettingChange('emailSettings', 'emailUsername', e.target.value)}
                    className="setting-input"
                    placeholder="your-email@domain.com"
                  />
                </label>
                <p className="setting-description">Email address for system notifications</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={settings.emailSettings.enableEmailAlerts}
                    onChange={(e) => handleSettingChange('emailSettings', 'enableEmailAlerts', e.target.checked)}
                  />
                  Enable Email Alerts
                </label>
                <p className="setting-description">Send email notifications for important events</p>
              </div>
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="settings-section">
            <h3><FaCreditCard /> Payment Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={settings.paymentSettings.razorpayEnabled}
                    onChange={(e) => handleSettingChange('paymentSettings', 'razorpayEnabled', e.target.checked)}
                  />
                  Enable Razorpay
                </label>
                <p className="setting-description">Accept payments via Razorpay</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={settings.paymentSettings.paypalEnabled}
                    onChange={(e) => handleSettingChange('paymentSettings', 'paypalEnabled', e.target.checked)}
                  />
                  Enable PayPal
                </label>
                <p className="setting-description">Accept payments via PayPal</p>
              </div>

              <div className="setting-item">
                <label className="setting-label">
                  <input
                    type="checkbox"
                    checked={settings.paymentSettings.codEnabled}
                    onChange={(e) => handleSettingChange('paymentSettings', 'codEnabled', e.target.checked)}
                  />
                  Enable Cash on Delivery
                </label>
                <p className="setting-description">Allow cash on delivery payments</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="system-settings">
      <div className="settings-header">
        <h2>🔧 System Settings</h2>
        <p>Comprehensive system configuration and management (Super Admin Only)</p>
        {showSuccessMessage && (
          <div className="success-message">
            <FaCheckCircle /> Settings saved successfully!
          </div>
        )}
      </div>

      <div className="settings-tabs">
        <button 
          className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <FaCog /> General
        </button>
        <button 
          className={`tab-btn ${activeTab === 'database' ? 'active' : ''}`}
          onClick={() => setActiveTab('database')}
        >
          <FaDatabase /> Database
        </button>
        <button 
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <FaShieldAlt /> Security
        </button>
        <button 
          className={`tab-btn ${activeTab === 'email' ? 'active' : ''}`}
          onClick={() => setActiveTab('email')}
        >
          <FaEnvelope /> Email
        </button>
        <button 
          className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveTab('payment')}
        >
          <FaCreditCard /> Payment
        </button>
      </div>

      <div className="settings-content">
        {renderTabContent()}
      </div>

      <div className="settings-actions">
        <button className="save-btn" onClick={handleSaveSettings}>
          <FaCheckCircle /> Save All Settings
        </button>
        <button className="reset-btn" onClick={handleResetSettings}>
          <FaExclamationTriangle /> Reset to Default
        </button>
      </div>

      <div className="system-info">
        <h3><FaServer /> System Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>Current User:</strong> {currentUser?.name} ({currentUser?.role})
          </div>
          <div className="info-item">
            <strong>System Version:</strong> {settings.systemVersion}
          </div>
          <div className="info-item">
            <strong>Server Status:</strong> <span className="status online">Online</span>
          </div>
          <div className="info-item">
            <strong>Database:</strong> <span className="status connected">Connected</span>
          </div>
          <div className="info-item">
            <strong>Last Backup:</strong> 2 hours ago
          </div>
          <div className="info-item">
            <strong>SSL Certificate:</strong> <span className="status valid">Valid</span>
          </div>
          <div className="info-item">
            <strong>Maintenance Mode:</strong> 
            <span className={`status ${settings.maintenanceMode ? 'maintenance' : 'active'}`}>
              {settings.maintenanceMode ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="info-item">
            <strong>Active Users:</strong> 847 / {settings.maxUsers}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
