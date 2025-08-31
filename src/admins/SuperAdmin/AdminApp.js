import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ProductProvider } from '../../contexts/ProductContext';
import SystemSettings from './pages/SystemSettings';
import ProductManagement from './pages/ProductManagement';
import Analytics from './pages/Analytics';
import Dashboard from './components/Dashboard';
import AdminNavbar from './components/AdminNavbar';
import Footer from '../User/components/Footer';
import './pages/SystemSettings.css';
import './pages/ProductManagement.css';
import './pages/Analytics.css';
import './components/AddProductModal.css';
import '../../styles/AdminDashboard.css';

function AdminApp() {
  const { currentUser } = useAuth();

  return (
    <ProductProvider>
      <Router>
        <div className="super-admin-app">
          <AdminNavbar title="🛡️ Super Admin Dashboard" />
          <div className="admin-dashboard" style={{ marginTop: '80px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<SystemSettings />} />
              <Route path="/products" element={<ProductManagement />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </ProductProvider>
  );
}

export default AdminApp;
