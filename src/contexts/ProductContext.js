import React, { createContext, useContext, useState, useEffect } from 'react';
import productsDataDefault from '../admins/SuperAdmin/data/productsData';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

// Add default availability and stock status to existing products
const initializeProductsData = (products) => {
  return products.map(product => ({
    ...product,
    isAvailable: true,
    stockStatus: 'in_stock', // 'in_stock', 'out_of_stock', 'discontinued'
    stockQuantity: Math.floor(Math.random() * 100) + 10, // Random stock for demo
    lastUpdated: new Date().toISOString()
  }));
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize products data
  useEffect(() => {
    const storedProducts = localStorage.getItem('managedProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      const initializedProducts = initializeProductsData(productsDataDefault);
      setProducts(initializedProducts);
      localStorage.setItem('managedProducts', JSON.stringify(initializedProducts));
    }
    setLoading(false);
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('managedProducts', JSON.stringify(products));
    }
  }, [products, loading]);

  const updateProduct = (productId, updates) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { 
              ...product, 
              ...updates, 
              lastUpdated: new Date().toISOString() 
            }
          : product
      )
    );
  };

  const updateProductAvailability = (productId, isAvailable) => {
    updateProduct(productId, { isAvailable });
  };

  const updateProductStock = (productId, stockStatus, stockQuantity = null) => {
    const updates = { stockStatus };
    if (stockQuantity !== null) {
      updates.stockQuantity = stockQuantity;
    }
    // If setting to out of stock, also make unavailable
    if (stockStatus === 'out_of_stock') {
      updates.isAvailable = false;
    }
    updateProduct(productId, updates);
  };

  const updateProductPrice = (productId, price, originalPrice = null) => {
    const updates = { price };
    if (originalPrice !== null) {
      updates.originalPrice = originalPrice;
    }
    updateProduct(productId, updates);
  };

  const getAvailableProducts = () => {
    return products.filter(product => 
      product.isAvailable && product.stockStatus !== 'out_of_stock'
    );
  };

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const getAllProducts = () => {
    return products;
  };

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: Math.max(...products.map(p => p.id)) + 1,
      isAvailable: true,
      stockStatus: 'in_stock',
      stockQuantity: productData.stockQuantity || 50,
      lastUpdated: new Date().toISOString()
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
    return newProduct;
  };

  const deleteProduct = (productId) => {
    setProducts(prevProducts => 
      prevProducts.filter(product => product.id !== productId)
    );
  };

  const resetProducts = () => {
    const resetProducts = initializeProductsData(productsDataDefault);
    setProducts(resetProducts);
    localStorage.setItem('managedProducts', JSON.stringify(resetProducts));
  };

  const value = {
    products,
    loading,
    updateProduct,
    updateProductAvailability,
    updateProductStock,
    updateProductPrice,
    addProduct,
    deleteProduct,
    getAvailableProducts,
    getProductById,
    getAllProducts,
    resetProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {!loading && children}
    </ProductContext.Provider>
  );
};
