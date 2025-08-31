import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../../contexts/ProductContext';
import { useAuth } from '../../../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { getAllProducts, getAvailableProducts } = useProducts();
  const navigate = useNavigate();

  const allProducts = getAllProducts();
  const availableProducts = getAvailableProducts();
  const outOfStockProducts = allProducts.filter(p => p.stockStatus === 'out_of_stock');
  const unavailableProducts = allProducts.filter(p => !p.isAvailable);

  return (
    <div>
      <div className="dashboard-header">
        <h1>🛡️ Super Admin Dashboard</h1>
        <p>Full system access and control - Welcome {currentUser?.name}!</p>
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
        
        <div className="dashboard-card" onClick={() => navigate('/settings')}>
          <h3>🔧 System Settings</h3>
          <p>Configure system-wide settings</p>
          <div className="stats">
            <span>Server Status: Online</span>
            <span>Uptime: 99.9%</span>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => navigate('/products')}>
          <h3>🏪 Product Management</h3>
          <p>Control product availability and pricing</p>
          <div className="stats">
            <span>Total Products: {allProducts.length}</span>
            <span>Available: {availableProducts.length}</span>
          </div>
        </div>
        
        <div className="dashboard-card" onClick={() => navigate('/analytics')}>
          <h3>📊 Analytics Dashboard</h3>
          <p>Product performance and statistics</p>
          <div className="stats">
            <span>Out of Stock: {outOfStockProducts.length}</span>
            <span>Unavailable: {unavailableProducts.length}</span>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h3>💰 Revenue Analytics</h3>
          <p>Sales performance and revenue</p>
          <div className="stats">
            <span>Daily Revenue: ₹12,435</span>
            <span>Monthly: ₹3,45,678</span>
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
    </div>
  );
};

export default Dashboard;
