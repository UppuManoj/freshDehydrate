import React from 'react';
import { useProducts } from '../../../contexts/ProductContext';
import { FaChartLine, FaBoxes, FaRupeeSign, FaUsers, FaArrowUp, FaArrowDown, FaEye, FaShoppingCart } from 'react-icons/fa';
import './Analytics.css';

const Analytics = () => {
  const { getAllProducts, getAvailableProducts } = useProducts();
  
  const allProducts = getAllProducts();
  const availableProducts = getAvailableProducts();
  const outOfStockProducts = allProducts.filter(p => p.stockStatus === 'out_of_stock');
  const unavailableProducts = allProducts.filter(p => !p.isAvailable);
  
  // Calculate some analytics data
  const totalRevenue = allProducts.reduce((sum, product) => sum + (product.price * (product.stockQuantity || 0) * 0.1), 0);
  const averagePrice = allProducts.reduce((sum, product) => sum + product.price, 0) / allProducts.length;
  const totalStock = allProducts.reduce((sum, product) => sum + (product.stockQuantity || 0), 0);
  
  // Category breakdown
  const categoryStats = allProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  // Price range analysis
  const priceRanges = {
    'Under ₹100': allProducts.filter(p => p.price < 100).length,
    '₹100-500': allProducts.filter(p => p.price >= 100 && p.price < 500).length,
    '₹500-1000': allProducts.filter(p => p.price >= 500 && p.price < 1000).length,
    'Above ₹1000': allProducts.filter(p => p.price >= 1000).length,
  };

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      icon: <FaRupeeSign />,
      trend: '+12.5%',
      trendUp: true,
      color: 'gradient-green'
    },
    {
      title: 'Active Products',
      value: availableProducts.length,
      icon: <FaBoxes />,
      trend: `${allProducts.length} total`,
      trendUp: true,
      color: 'gradient-blue'
    },
    {
      title: 'Average Price',
      value: `₹${averagePrice.toFixed(0)}`,
      icon: <FaChartLine />,
      trend: '+5.2%',
      trendUp: true,
      color: 'gradient-purple'
    },
    {
      title: 'Total Stock',
      value: totalStock.toLocaleString(),
      icon: <FaBoxes />,
      trend: `${outOfStockProducts.length} out of stock`,
      trendUp: false,
      color: 'gradient-orange'
    }
  ];

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h2>📊 Analytics Dashboard</h2>
        <p>Comprehensive insights into your product performance and business metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpiCards.map((kpi, index) => (
          <div key={index} className={`kpi-card ${kpi.color}`}>
            <div className="kpi-header">
              <div className="kpi-icon">{kpi.icon}</div>
              <div className="kpi-trend">
                {kpi.trendUp ? <FaArrowUp className="trend-up" /> : <FaArrowDown className="trend-down" />}
                <span className={kpi.trendUp ? 'trend-up' : 'trend-down'}>{kpi.trend}</span>
              </div>
            </div>
            <div className="kpi-content">
              <h3>{kpi.value}</h3>
              <p>{kpi.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="analytics-grid">
        {/* Category Distribution */}
        <div className="analytics-card">
          <div className="card-header">
            <h3><FaBoxes /> Product Categories</h3>
            <p>Distribution by category</p>
          </div>
          <div className="category-stats">
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="category-item">
                <div className="category-info">
                  <span className="category-name">{category}</span>
                  <span className="category-count">{count} products</span>
                </div>
                <div className="category-bar">
                  <div 
                    className="category-progress" 
                    style={{ width: `${(count / allProducts.length) * 100}%` }}
                  ></div>
                </div>
                <span className="category-percentage">
                  {((count / allProducts.length) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Analysis */}
        <div className="analytics-card">
          <div className="card-header">
            <h3><FaRupeeSign /> Price Distribution</h3>
            <p>Products by price range</p>
          </div>
          <div className="price-stats">
            {Object.entries(priceRanges).map(([range, count]) => (
              <div key={range} className="price-item">
                <div className="price-info">
                  <span className="price-range">{range}</span>
                  <span className="price-count">{count} products</span>
                </div>
                <div className="price-bar">
                  <div 
                    className="price-progress" 
                    style={{ width: `${(count / allProducts.length) * 100}%` }}
                  ></div>
                </div>
                <span className="price-percentage">
                  {((count / allProducts.length) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Status */}
        <div className="analytics-card">
          <div className="card-header">
            <h3><FaBoxes /> Inventory Status</h3>
            <p>Current stock overview</p>
          </div>
          <div className="stock-overview">
            <div className="stock-item in-stock">
              <div className="stock-icon">✅</div>
              <div className="stock-info">
                <h4>{availableProducts.length}</h4>
                <p>In Stock</p>
              </div>
            </div>
            <div className="stock-item out-of-stock">
              <div className="stock-icon">❌</div>
              <div className="stock-info">
                <h4>{outOfStockProducts.length}</h4>
                <p>Out of Stock</p>
              </div>
            </div>
            <div className="stock-item unavailable">
              <div className="stock-icon">🚫</div>
              <div className="stock-info">
                <h4>{unavailableProducts.length}</h4>
                <p>Unavailable</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="analytics-card">
          <div className="card-header">
            <h3><FaChartLine /> Performance Metrics</h3>
            <p>Key business indicators</p>
          </div>
          <div className="performance-metrics">
            <div className="metric-item">
              <div className="metric-icon"><FaEye /></div>
              <div className="metric-info">
                <h4>2,847</h4>
                <p>Total Views</p>
                <small className="metric-trend positive">+15.3% this week</small>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon"><FaShoppingCart /></div>
              <div className="metric-info">
                <h4>156</h4>
                <p>Total Orders</p>
                <small className="metric-trend positive">+8.7% this week</small>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon"><FaUsers /></div>
              <div className="metric-info">
                <h4>432</h4>
                <p>Active Users</p>
                <small className="metric-trend positive">+12.1% this week</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="analytics-card full-width">
        <div className="card-header">
          <h3><FaChartLine /> Recent Activity</h3>
          <p>Latest product and system updates</p>
        </div>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon new">➕</div>
            <div className="activity-content">
              <p><strong>New product added:</strong> Premium Mango Slices</p>
              <small>2 hours ago</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon update">📝</div>
            <div className="activity-content">
              <p><strong>Price updated:</strong> Banana Chips - ₹120 to ₹115</p>
              <small>4 hours ago</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon stock">📦</div>
            <div className="activity-content">
              <p><strong>Stock updated:</strong> Lemon Slices - 45 units added</p>
              <small>6 hours ago</small>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon delete">🗑️</div>
            <div className="activity-content">
              <p><strong>Product removed:</strong> Old Ginger Flakes variant</p>
              <small>1 day ago</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
