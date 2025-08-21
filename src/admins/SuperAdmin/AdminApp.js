import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import SystemSettings from './pages/SystemSettings';
import AdminNavbar from './components/AdminNavbar';
import Footer from '../User/components/Footer';
import './pages/SystemSettings.css';
import '../../styles/AdminDashboard.css';

function AdminApp() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="super-admin-app">
        <AdminNavbar title="🛡️ Super Admin Dashboard" />
        <div className="admin-dashboard" style={{ marginTop: '80px' }}>
          <div className="dashboard-header">
            <h1>🛡️ Super Admin Dashboard</h1>
            <p>Full system access and control - Isolated Environment</p>
          </div>
          
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>👥 User Management</h3>
              <p>Manage all users and administrators</p>
              <div className="stats">
                <span>Total Users: 1,247</span>
                <span>Active: 932</span>
              </div>
            </div>
            
            <div className="dashboard-card" onClick={() => window.location.hash = '#/settings'}>
              <h3>🏪 System Settings</h3>
              <p>Configure system-wide settings</p>
              <div className="stats">
                <span>Server Status: Online</span>
                <span>Uptime: 99.9%</span>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3>📊 Analytics</h3>
              <p>System performance and usage</p>
              <div className="stats">
                <span>Daily Active: 456</span>
                <span>Revenue: $12,435</span>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3>🔧 Admin Tools</h3>
              <p>Advanced administrative functions</p>
              <div className="stats">
                <span>Logs: 2,341 today</span>
                <span>Alerts: 3 pending</span>
              </div>
            </div>
          </div>
          
          <Routes>
            <Route path="/" element={<div className="welcome-message">Welcome to Super Admin Panel, {currentUser?.name}!</div>} />
            <Route path="/settings" element={<SystemSettings />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default AdminApp;
