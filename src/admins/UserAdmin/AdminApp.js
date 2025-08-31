import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CustomerReports from './pages/CustomerReports';
import AdminNavbar from './components/AdminNavbar';
import Footer from '../User/components/Footer';
import './pages/CustomerReports.css';
import '../../styles/AdminDashboard.css';

function AdminApp() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="user-admin-app">
        <AdminNavbar title="👨‍💼 User Admin Dashboard" />
        <div className="admin-dashboard" style={{ marginTop: '80px' }}>
        <Routes>
            <Route path="/" element={<div className="welcome-message">Welcome to User Admin Panel, {currentUser?.name}!</div>} />
            <Route path="/reports" element={<CustomerReports />} />
          </Routes>
          <div className="dashboard-header">
            <h1>👨‍💼 User Admin Dashboard</h1>
            <p>Customer and order management - Isolated Environment</p>
          </div>
          
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>👥 Customer Management</h3>
              <p>View and manage customer accounts</p>
              <div className="stats">
                <span>Total Customers: 834</span>
                <span>New Today: 12</span>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3>📦 Order Management</h3>
              <p>Process and track orders</p>
              <div className="stats">
                <span>Orders Today: 45</span>
                <span>Pending: 8</span>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3>🛍️ Product Reviews</h3>
              <p>Moderate customer reviews</p>
              <div className="stats">
                <span>Reviews: 234</span>
                <span>Pending: 5</span>
              </div>
            </div>
            
            <div className="dashboard-card" onClick={() => window.location.hash = '#/reports'}>
              <h3>📊 Customer Reports</h3>
              <p>Generate detailed customer reports</p>
              <div className="stats">
                <span>Reports Generated: 45</span>
                <span>Last Report: Today</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default AdminApp;
