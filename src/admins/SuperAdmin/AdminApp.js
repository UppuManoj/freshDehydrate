import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ProductProvider } from '../../contexts/ProductContext';
import { OrderProvider } from '../../contexts/OrderContext';
import SystemSettings from './pages/SystemSettings';
import ProductManagement from './pages/ProductManagement';
import Analytics from './pages/Analytics';
import SalesAnalytics from './pages/SalesAnalytics';
import Users from './pages/Users';
import Dashboard from './components/Dashboard';
import AdminNavbar from './components/AdminNavbar';
import Footer from '../User/components/Footer';
import './pages/SystemSettings.css';
import './pages/ProductManagement.css';
import './pages/Analytics.css';
import './pages/SalesAnalytics.css';
import './pages/Users.css';
import './components/AddProductModal.css';
import '../../styles/AdminDashboard.css';

function AdminApp() {
  const { currentUser } = useAuth();

  return (
    <ProductProvider>
      <OrderProvider>
        <Router>
          <div className="super-admin-app">
            <AdminNavbar title="🛡️ Super Admin Dashboard" />
            <div className="admin-dashboard" style={{ marginTop: '80px' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/settings" element={<SystemSettings />} />
                <Route path="/products" element={<ProductManagement />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/sales-analytics" element={<SalesAnalytics />} />
                <Route path="/users" element={<Users />} />
              </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      </OrderProvider>
    </ProductProvider>
  );
}

export default AdminApp;
