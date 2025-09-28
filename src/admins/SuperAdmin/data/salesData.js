/**
 * Sales Analytics Data - Last 9 Months
 * This file contains comprehensive sales data for analytics and reporting
 */

// Generate realistic sales data for the last 9 months
const generateSalesData = () => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  // Get last 9 months including current month
  const last9Months = [];
  for (let i = 8; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
    last9Months.push({
      month: months[monthIndex],
      year: year,
      monthIndex: monthIndex + 1
    });
  }
  
  // Product categories for realistic data
  const categories = ['Fruits', 'Vegetables', 'Powder', 'Mixed'];
  
  // Generate monthly sales data
  const monthlySales = last9Months.map((monthData, index) => {
    const baseRevenue = 25000 + (index * 3000); // Growing trend
    const randomVariation = (Math.random() - 0.5) * 8000;
    const revenue = Math.max(15000, baseRevenue + randomVariation);
    
    const orders = Math.floor(revenue / 180); // Average order value ~180
    const customers = Math.floor(orders * 0.7); // Some repeat customers
    
    return {
      ...monthData,
      revenue: Math.round(revenue),
      orders: orders,
      customers: customers,
      avgOrderValue: Math.round(revenue / orders),
      categoryBreakdown: categories.reduce((acc, category) => {
        acc[category] = Math.round(revenue * (0.15 + Math.random() * 0.4));
        return acc;
      }, {}),
      topProducts: [
        { name: 'Lemon Slices', sales: Math.floor(Math.random() * 50) + 20, revenue: Math.floor(Math.random() * 8000) + 3000 },
        { name: 'Banana Chips', sales: Math.floor(Math.random() * 40) + 15, revenue: Math.floor(Math.random() * 6000) + 2000 },
        { name: 'Mixed Vegetables', sales: Math.floor(Math.random() * 35) + 12, revenue: Math.floor(Math.random() * 5000) + 1500 },
        { name: 'Mango Slices', sales: Math.floor(Math.random() * 30) + 10, revenue: Math.floor(Math.random() * 4000) + 1200 },
        { name: 'Tomato Slices', sales: Math.floor(Math.random() * 25) + 8, revenue: Math.floor(Math.random() * 3500) + 1000 }
      ]
    };
  });
  
  return monthlySales;
};

// Generate daily sales data for the current month (for more detailed analytics)
const generateDailySalesData = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  const dailySales = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    const baseRevenue = 800 + (Math.random() * 600); // Daily revenue between 800-1400
    const weekendMultiplier = [0, 6].includes(new Date(currentYear, currentMonth, day).getDay()) ? 1.3 : 1;
    const revenue = Math.round(baseRevenue * weekendMultiplier);
    
    const orders = Math.floor(revenue / 180);
    const customers = Math.floor(orders * 0.8);
    
    dailySales.push({
      date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      day: day,
      revenue: revenue,
      orders: orders,
      customers: customers,
      avgOrderValue: Math.round(revenue / Math.max(orders, 1))
    });
  }
  
  return dailySales;
};

// Product performance data
const productPerformanceData = [
  {
    id: 1,
    name: 'Lemon Slices',
    category: 'Fruits',
    totalSales: 342,
    totalRevenue: 64638,
    avgRating: 4.8,
    stockStatus: 'in_stock',
    trend: 'up',
    monthlyGrowth: 12.5
  },
  {
    id: 2,
    name: 'Banana Chips',
    category: 'Fruits',
    totalSales: 289,
    totalRevenue: 28611,
    avgRating: 4.6,
    stockStatus: 'in_stock',
    trend: 'up',
    monthlyGrowth: 8.3
  },
  {
    id: 3,
    name: 'Mixed Vegetables',
    category: 'Vegetables',
    totalSales: 234,
    totalRevenue: 30186,
    avgRating: 4.9,
    stockStatus: 'low_stock',
    trend: 'up',
    monthlyGrowth: 15.7
  },
  {
    id: 4,
    name: 'Mango Slices',
    category: 'Fruits',
    totalSales: 198,
    totalRevenue: 39402,
    avgRating: 4.7,
    stockStatus: 'in_stock',
    trend: 'stable',
    monthlyGrowth: 2.1
  },
  {
    id: 5,
    name: 'Banana Powder',
    category: 'Powder',
    totalSales: 167,
    totalRevenue: 18203,
    avgRating: 4.4,
    stockStatus: 'in_stock',
    trend: 'down',
    monthlyGrowth: -3.2
  },
  {
    id: 6,
    name: 'Tomato Slices',
    category: 'Vegetables',
    totalSales: 145,
    totalRevenue: 21605,
    avgRating: 4.5,
    stockStatus: 'in_stock',
    trend: 'up',
    monthlyGrowth: 6.8
  },
  {
    id: 7,
    name: 'Ginger Flakes',
    category: 'Vegetables',
    totalSales: 123,
    totalRevenue: 14637,
    avgRating: 4.0,
    stockStatus: 'out_of_stock',
    trend: 'down',
    monthlyGrowth: -8.5
  }
];

// Customer analytics data
const customerAnalytics = {
  totalCustomers: 1247,
  activeCustomers: 932,
  newCustomersThisMonth: 87,
  returningCustomers: 845,
  customerRetentionRate: 74.5,
  averageCustomerLifetimeValue: 2340,
  topCustomerSegments: [
    { segment: 'Premium Buyers', count: 156, avgOrderValue: 450, totalRevenue: 70200 },
    { segment: 'Regular Customers', count: 523, avgOrderValue: 220, totalRevenue: 115060 },
    { segment: 'Occasional Buyers', count: 568, avgOrderValue: 150, totalRevenue: 85200 }
  ]
};

// Regional sales data
const regionalSalesData = [
  { region: 'North India', revenue: 89450, orders: 456, customers: 324, growth: 14.2 },
  { region: 'South India', revenue: 76230, orders: 398, customers: 287, growth: 18.7 },
  { region: 'West India', revenue: 65890, orders: 342, customers: 245, growth: 11.3 },
  { region: 'East India', revenue: 54320, orders: 287, customers: 198, growth: 8.9 },
  { region: 'Central India', revenue: 43210, orders: 234, customers: 167, growth: 22.1 }
];

// Export all data
export const salesData = {
  monthlySales: generateSalesData(),
  dailySales: generateDailySalesData(),
  productPerformance: productPerformanceData,
  customerAnalytics: customerAnalytics,
  regionalSales: regionalSalesData,
  
  // Summary statistics
  summary: {
    totalRevenue: generateSalesData().reduce((sum, month) => sum + month.revenue, 0),
    totalOrders: generateSalesData().reduce((sum, month) => sum + month.orders, 0),
    totalCustomers: 1247,
    averageOrderValue: 189,
    growthRate: 12.8,
    topSellingCategory: 'Fruits',
    bestPerformingMonth: 'September'
  }
};

export default salesData;
