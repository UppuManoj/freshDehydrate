import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProducts } from './ProductContext';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalViews: 0,
    activeUsers: 0
  });
  const { updateProductStock } = useProducts();

  // Initialize orders from localStorage
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    const storedStats = localStorage.getItem('orderStats');
    
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
    
    if (storedStats) {
      setOrderStats(JSON.parse(storedStats));
    } else {
      // Initialize with some baseline stats for demonstration
      const initialStats = {
        totalOrders: 156,
        totalRevenue: 45780,
        totalViews: 2847,
        activeUsers: 432
      };
      setOrderStats(initialStats);
      localStorage.setItem('orderStats', JSON.stringify(initialStats));
    }
  }, []);

  // Save to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orderStats', JSON.stringify(orderStats));
  }, [orderStats]);

  const confirmOrder = (cartItems, orderDetails) => {
    const newOrder = {
      id: Date.now(),
      items: cartItems,
      orderDetails,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      total: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    // Add to orders
    setOrders(prevOrders => [newOrder, ...prevOrders]);

    // Update product stock for each item in the order
    cartItems.forEach(item => {
      updateProductStock(item.id, 'in_stock', item.currentStock - item.quantity);
    });

    // Update order statistics
    setOrderStats(prevStats => ({
      ...prevStats,
      totalOrders: prevStats.totalOrders + 1,
      totalRevenue: prevStats.totalRevenue + newOrder.total,
      totalViews: prevStats.totalViews + Math.floor(Math.random() * 50) + 10, // Simulate view increase
      activeUsers: prevStats.activeUsers + (Math.random() > 0.7 ? 1 : 0) // Occasionally add new user
    }));

    return newOrder;
  };

  const getRecentOrders = (limit = 10) => {
    return orders.slice(0, limit);
  };

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  // Method to simulate live data updates (for demo purposes)
  const simulateLiveUpdate = () => {
    setOrderStats(prevStats => ({
      ...prevStats,
      totalViews: prevStats.totalViews + Math.floor(Math.random() * 5) + 1,
      activeUsers: prevStats.activeUsers + (Math.random() > 0.8 ? 1 : Math.random() > 0.5 ? -1 : 0)
    }));
  };

  // Simulate live updates every 30 seconds (for demo)
  useEffect(() => {
    const interval = setInterval(simulateLiveUpdate, 30000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    orders,
    orderStats,
    confirmOrder,
    getRecentOrders,
    getOrdersByStatus,
    updateOrderStatus,
    simulateLiveUpdate
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
