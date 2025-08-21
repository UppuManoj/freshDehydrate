import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

const SystemSettings = () => {
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    maxUsers: 1000,
    systemVersion: '2.1.0',
    backupFrequency: 'daily'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="system-settings">
      <div className="settings-header">
        <h2>🔧 System Settings</h2>
        <p>Configure system-wide settings (Super Admin Only)</p>
      </div>

      <div className="settings-grid">
        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
            />
            Maintenance Mode
          </label>
          <p>Enable to put the system in maintenance mode</p>
        </div>

        <div className="setting-item">
          <label>
            Maximum Users:
            <input
              type="number"
              value={settings.maxUsers}
              onChange={(e) => handleSettingChange('maxUsers', parseInt(e.target.value))}
            />
          </label>
          <p>Set the maximum number of concurrent users</p>
        </div>

        <div className="setting-item">
          <label>
            System Version:
            <input
              type="text"
              value={settings.systemVersion}
              onChange={(e) => handleSettingChange('systemVersion', e.target.value)}
            />
          </label>
          <p>Current system version</p>
        </div>

        <div className="setting-item">
          <label>
            Backup Frequency:
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </label>
          <p>Set automatic backup frequency</p>
        </div>
      </div>

      <div className="settings-actions">
        <button className="save-btn">Save Settings</button>
        <button className="reset-btn">Reset to Default</button>
      </div>

      <div className="settings-info">
        <h3>System Information</h3>
        <ul>
          <li>Current User: {currentUser?.name} ({currentUser?.role})</li>
          <li>Server Status: Online</li>
          <li>Database: Connected</li>
          <li>Last Backup: 2 hours ago</li>
        </ul>
      </div>
    </div>
  );
};

export default SystemSettings;
