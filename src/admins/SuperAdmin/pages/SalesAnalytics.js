import React, { useState, useEffect } from 'react';
import { salesData } from '../data/salesData';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  FaChartLine, 
  FaUsers, 
  FaShoppingCart, 
  FaRupeeSign,
  FaArrowUp,
  FaArrowDown,
  FaFileExcel,
  FaFilePdf,
  FaChartBar,
  FaMapMarkerAlt
} from 'react-icons/fa';
import './SalesAnalytics.css';

const SalesAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('9months');
  const [selectedChart, setSelectedChart] = useState('revenue');
  const [isExporting, setIsExporting] = useState(false);

  // Data processing based on selected period
  const getFilteredData = () => {
    switch (selectedPeriod) {
      case '3months':
        return salesData.monthlySales.slice(-3);
      case '6months':
        return salesData.monthlySales.slice(-6);
      case '9months':
      default:
        return salesData.monthlySales;
    }
  };

  const filteredData = getFilteredData();

  // Calculate summary statistics for filtered period
  const periodSummary = {
    totalRevenue: filteredData.reduce((sum, month) => sum + month.revenue, 0),
    totalOrders: filteredData.reduce((sum, month) => sum + month.orders, 0),
    totalCustomers: filteredData.reduce((sum, month) => sum + month.customers, 0),
    avgOrderValue: Math.round(
      filteredData.reduce((sum, month) => sum + month.avgOrderValue, 0) / filteredData.length
    )
  };

  // Export to Excel functionality
  const exportToExcel = async () => {
    setIsExporting(true);
    try {
      // Create workbook with multiple sheets
      const workbook = XLSX.utils.book_new();
      
      // Monthly Sales Sheet
      const monthlyData = filteredData.map(month => ({
        Month: month.month,
        Year: month.year,
        Revenue: month.revenue,
        Orders: month.orders,
        Customers: month.customers,
        'Avg Order Value': month.avgOrderValue
      }));
      
      const monthlySheet = XLSX.utils.json_to_sheet(monthlyData);
      XLSX.utils.book_append_sheet(workbook, monthlySheet, 'Monthly Sales');
      
      // Product Performance Sheet
      const productData = salesData.productPerformance.map(product => ({
        'Product Name': product.name,
        Category: product.category,
        'Total Sales': product.totalSales,
        'Total Revenue': product.totalRevenue,
        Rating: product.avgRating,
        'Monthly Growth %': product.monthlyGrowth,
        Status: product.stockStatus
      }));
      
      const productSheet = XLSX.utils.json_to_sheet(productData);
      XLSX.utils.book_append_sheet(workbook, productSheet, 'Product Performance');
      
      // Regional Sales Sheet
      const regionalData = salesData.regionalSales.map(region => ({
        Region: region.region,
        Revenue: region.revenue,
        Orders: region.orders,
        Customers: region.customers,
        'Growth %': region.growth
      }));
      
      const regionalSheet = XLSX.utils.json_to_sheet(regionalData);
      XLSX.utils.book_append_sheet(workbook, regionalSheet, 'Regional Sales');
      
      // Customer Analytics Sheet
      const customerData = [
        { Metric: 'Total Customers', Value: salesData.customerAnalytics.totalCustomers },
        { Metric: 'Active Customers', Value: salesData.customerAnalytics.activeCustomers },
        { Metric: 'New Customers This Month', Value: salesData.customerAnalytics.newCustomersThisMonth },
        { Metric: 'Returning Customers', Value: salesData.customerAnalytics.returningCustomers },
        { Metric: 'Customer Retention Rate (%)', Value: salesData.customerAnalytics.customerRetentionRate },
        { Metric: 'Average Customer Lifetime Value', Value: salesData.customerAnalytics.averageCustomerLifetimeValue }
      ];
      
      const customerSheet = XLSX.utils.json_to_sheet(customerData);
      XLSX.utils.book_append_sheet(workbook, customerSheet, 'Customer Analytics');
      
      // Write and download the file
      XLSX.writeFile(workbook, `sales-analytics-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.xlsx`);
      
      alert('Excel export completed successfully!');
    } catch (error) {
      console.error('Excel export error:', error);
      alert('Excel export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Export to PDF functionality
  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Add title
      pdf.setFontSize(20);
      pdf.setTextColor(45, 55, 72);
      pdf.text('Sales Analytics Report', pageWidth / 2, 20, { align: 'center' });
      
      // Add period info
      pdf.setFontSize(12);
      pdf.setTextColor(113, 128, 150);
      pdf.text(`Period: ${selectedPeriod.replace('months', ' Months')}`, pageWidth / 2, 30, { align: 'center' });
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, 37, { align: 'center' });
      
      let yPosition = 50;
      
      // Summary Statistics
      pdf.setFontSize(16);
      pdf.setTextColor(45, 55, 72);
      pdf.text('Summary Statistics', 20, yPosition);
      yPosition += 10;
      
      pdf.setFontSize(12);
      pdf.setTextColor(74, 85, 104);
      pdf.text(`Total Revenue: ₹${periodSummary.totalRevenue.toLocaleString()}`, 20, yPosition);
      pdf.text(`Total Orders: ${periodSummary.totalOrders.toLocaleString()}`, 110, yPosition);
      yPosition += 7;
      pdf.text(`Total Customers: ${periodSummary.totalCustomers.toLocaleString()}`, 20, yPosition);
      pdf.text(`Avg Order Value: ₹${periodSummary.avgOrderValue}`, 110, yPosition);
      yPosition += 15;
      
      // Monthly Sales Table
      pdf.setFontSize(14);
      pdf.setTextColor(45, 55, 72);
      pdf.text('Monthly Sales Performance', 20, yPosition);
      yPosition += 10;
      
      // Table headers
      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      pdf.setFillColor(102, 126, 234);
      pdf.rect(20, yPosition - 5, 170, 7, 'F');
      pdf.text('Month', 25, yPosition);
      pdf.text('Revenue', 55, yPosition);
      pdf.text('Orders', 85, yPosition);
      pdf.text('Customers', 115, yPosition);
      pdf.text('AOV', 155, yPosition);
      yPosition += 10;
      
      // Table data
      pdf.setTextColor(45, 55, 72);
      filteredData.forEach((month, index) => {
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }
        
        if (index % 2 === 0) {
          pdf.setFillColor(247, 250, 252);
          pdf.rect(20, yPosition - 5, 170, 7, 'F');
        }
        
        pdf.text(`${month.month} ${month.year}`, 25, yPosition);
        pdf.text(`₹${(month.revenue / 1000).toFixed(0)}K`, 55, yPosition);
        pdf.text(month.orders.toString(), 85, yPosition);
        pdf.text(month.customers.toString(), 115, yPosition);
        pdf.text(`₹${month.avgOrderValue}`, 155, yPosition);
        yPosition += 7;
      });
      
      yPosition += 10;
      
      // Top Products
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 20;
      }
      
      pdf.setFontSize(14);
      pdf.setTextColor(45, 55, 72);
      pdf.text('Top Performing Products', 20, yPosition);
      yPosition += 10;
      
      // Product table headers
      pdf.setFontSize(10);
      pdf.setTextColor(255, 255, 255);
      pdf.setFillColor(102, 126, 234);
      pdf.rect(20, yPosition - 5, 170, 7, 'F');
      pdf.text('Product', 25, yPosition);
      pdf.text('Category', 75, yPosition);
      pdf.text('Sales', 115, yPosition);
      pdf.text('Revenue', 145, yPosition);
      yPosition += 10;
      
      // Product data
      pdf.setTextColor(45, 55, 72);
      salesData.productPerformance.slice(0, 5).forEach((product, index) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = 20;
        }
        
        if (index % 2 === 0) {
          pdf.setFillColor(247, 250, 252);
          pdf.rect(20, yPosition - 5, 170, 7, 'F');
        }
        
        pdf.text(product.name, 25, yPosition);
        pdf.text(product.category, 75, yPosition);
        pdf.text(product.totalSales.toString(), 115, yPosition);
        pdf.text(`₹${(product.totalRevenue / 1000).toFixed(0)}K`, 145, yPosition);
        yPosition += 7;
      });
      
      // Save the PDF
      pdf.save(`sales-analytics-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      alert('PDF export completed successfully!');
    } catch (error) {
      console.error('PDF export error:', error);
      alert('PDF export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };


  return (
    <div className="sales-analytics">
      <div className="sales-analytics-header">
        <div className="header-content">
          <h1>📊 Sales Analytics Dashboard</h1>
          <p>Comprehensive sales data and insights for the last 9 months</p>
        </div>
        
        <div className="header-controls">
          <div className="period-selector">
            <label>Period:</label>
            <select 
              value={selectedPeriod} 
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="period-select"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="9months">Last 9 Months</option>
            </select>
          </div>
          
          <div className="export-buttons">
            <button 
              onClick={exportToExcel} 
              disabled={isExporting}
              className="export-btn excel-btn"
            >
              <FaFileExcel />
              {isExporting ? 'Exporting...' : 'Export Excel'}
            </button>
            <button 
              onClick={exportToPDF} 
              disabled={isExporting}
              className="export-btn pdf-btn"
            >
              <FaFilePdf />
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card revenue-card">
          <div className="card-icon">
            <FaRupeeSign />
          </div>
          <div className="card-content">
            <h3>Total Revenue</h3>
            <p className="card-value">₹{periodSummary.totalRevenue.toLocaleString()}</p>
            <span className="card-trend positive">
              <FaArrowUp /> +12.8%
            </span>
          </div>
        </div>

        <div className="summary-card orders-card">
          <div className="card-icon">
            <FaShoppingCart />
          </div>
          <div className="card-content">
            <h3>Total Orders</h3>
            <p className="card-value">{periodSummary.totalOrders.toLocaleString()}</p>
            <span className="card-trend positive">
              <FaArrowUp /> +8.5%
            </span>
          </div>
        </div>

        <div className="summary-card customers-card">
          <div className="card-icon">
            <FaUsers />
          </div>
          <div className="card-content">
            <h3>Total Customers</h3>
            <p className="card-value">{periodSummary.totalCustomers.toLocaleString()}</p>
            <span className="card-trend positive">
              <FaArrowUp /> +15.2%
            </span>
          </div>
        </div>

        <div className="summary-card aov-card">
          <div className="card-icon">
            <FaChartBar />
          </div>
          <div className="card-content">
            <h3>Avg Order Value</h3>
            <p className="card-value">₹{periodSummary.avgOrderValue}</p>
            <span className="card-trend positive">
              <FaArrowUp /> +3.7%
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container">
          <div className="chart-header">
            <h3>Monthly Sales Trend</h3>
            <div className="chart-controls">
              <button 
                className={selectedChart === 'revenue' ? 'active' : ''}
                onClick={() => setSelectedChart('revenue')}
              >
                Revenue
              </button>
              <button 
                className={selectedChart === 'orders' ? 'active' : ''}
                onClick={() => setSelectedChart('orders')}
              >
                Orders
              </button>
              <button 
                className={selectedChart === 'customers' ? 'active' : ''}
                onClick={() => setSelectedChart('customers')}
              >
                Customers
              </button>
            </div>
          </div>
          
          <div className="chart-content">
            <div className="simple-bar-chart">
              {filteredData.map((month, index) => {
                const maxValue = Math.max(...filteredData.map(m => m[selectedChart]));
                const height = (month[selectedChart] / maxValue) * 200;
                
                return (
                  <div key={index} className="bar-container">
                    <div 
                      className="bar"
                      style={{ height: `${height}px` }}
                      title={`${month.month} ${month.year}: ${month[selectedChart].toLocaleString()}`}
                    ></div>
                    <span className="bar-label">{month.month.slice(0, 3)}</span>
                    <span className="bar-value">
                      {selectedChart === 'revenue' ? `₹${(month[selectedChart] / 1000).toFixed(0)}K` : month[selectedChart]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Product Performance */}
      <div className="product-performance-section">
        <h3>Top Performing Products</h3>
        <div className="product-performance-table">
          <table>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Rating</th>
                <th>Growth</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {salesData.productPerformance.slice(0, 7).map((product) => (
                <tr key={product.id}>
                  <td className="product-name">{product.name}</td>
                  <td className="product-category">{product.category}</td>
                  <td className="product-sales">{product.totalSales}</td>
                  <td className="product-revenue">₹{product.totalRevenue.toLocaleString()}</td>
                  <td className="product-rating">
                    <span className="rating-stars">★</span>
                    {product.avgRating}
                  </td>
                  <td className={`product-growth ${product.trend}`}>
                    {product.trend === 'up' ? <FaArrowUp /> : 
                     product.trend === 'down' ? <FaArrowDown /> : '−'}
                    {product.monthlyGrowth > 0 ? '+' : ''}{product.monthlyGrowth}%
                  </td>
                  <td className={`product-status ${product.stockStatus}`}>
                    {product.stockStatus === 'in_stock' ? 'In Stock' :
                     product.stockStatus === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regional Performance */}
      <div className="regional-performance-section">
        <h3>Regional Sales Performance</h3>
        <div className="regional-grid">
          {salesData.regionalSales.map((region, index) => (
            <div key={index} className="regional-card">
              <div className="regional-header">
                <FaMapMarkerAlt className="region-icon" />
                <h4>{region.region}</h4>
              </div>
              <div className="regional-stats">
                <div className="stat">
                  <span className="stat-label">Revenue</span>
                  <span className="stat-value">₹{region.revenue.toLocaleString()}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Orders</span>
                  <span className="stat-value">{region.orders}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Customers</span>
                  <span className="stat-value">{region.customers}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Growth</span>
                  <span className={`stat-value growth ${region.growth > 0 ? 'positive' : 'negative'}`}>
                    {region.growth > 0 ? '+' : ''}{region.growth}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Analytics */}
      <div className="customer-analytics-section">
        <h3>Customer Analytics</h3>
        <div className="customer-stats-grid">
          <div className="customer-stat-card">
            <h4>Total Customers</h4>
            <p className="stat-number">{salesData.customerAnalytics.totalCustomers.toLocaleString()}</p>
            <span className="stat-subtitle">Registered users</span>
          </div>
          <div className="customer-stat-card">
            <h4>Active Customers</h4>
            <p className="stat-number">{salesData.customerAnalytics.activeCustomers.toLocaleString()}</p>
            <span className="stat-subtitle">Last 30 days</span>
          </div>
          <div className="customer-stat-card">
            <h4>Retention Rate</h4>
            <p className="stat-number">{salesData.customerAnalytics.customerRetentionRate}%</p>
            <span className="stat-subtitle">Customer loyalty</span>
          </div>
          <div className="customer-stat-card">
            <h4>Avg Lifetime Value</h4>
            <p className="stat-number">₹{salesData.customerAnalytics.averageCustomerLifetimeValue.toLocaleString()}</p>
            <span className="stat-subtitle">Per customer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
