import React, { useState } from 'react';
import { useProducts } from '../../../contexts/ProductContext';
import { FaEdit, FaSave, FaTimes, FaEye, FaEyeSlash, FaBox, FaExclamationTriangle, FaCheck, FaTrash, FaPlus } from 'react-icons/fa';
import AddProductModal from '../components/AddProductModal';
import './ProductManagement.css';

const ProductManagement = () => {
  const { 
    getAllProducts, 
    updateProductAvailability, 
    updateProductStock, 
    updateProductPrice,
    addProduct,
    deleteProduct,
    resetProducts 
  } = useProducts();
  
  const [products, setProducts] = useState(getAllProducts());
  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filter, setFilter] = useState('all'); // 'all', 'available', 'unavailable', 'out_of_stock'
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleEditStart = (product) => {
    setEditingProduct(product.id);
    setEditForm({
      price: product.price,
      originalPrice: product.originalPrice || '',
      stockQuantity: product.stockQuantity,
      stockStatus: product.stockStatus,
      isAvailable: product.isAvailable
    });
  };

  const handleEditCancel = () => {
    setEditingProduct(null);
    setEditForm({});
  };

  const handleEditSave = (productId) => {
    // Update price if changed
    updateProductPrice(productId, parseFloat(editForm.price), editForm.originalPrice ? parseFloat(editForm.originalPrice) : null);
    
    // Update stock
    updateProductStock(productId, editForm.stockStatus, parseInt(editForm.stockQuantity));
    
    // Update availability
    updateProductAvailability(productId, editForm.isAvailable);
    
    refreshProducts();
    setEditingProduct(null);
    setEditForm({});
  };

  const handleQuickToggleAvailability = (productId, currentStatus) => {
    updateProductAvailability(productId, !currentStatus);
    refreshProducts();
  };

  const handleQuickStockUpdate = (productId, stockStatus) => {
    updateProductStock(productId, stockStatus);
    refreshProducts();
  };

  const handleAddProduct = (productData) => {
    const newProduct = addProduct(productData);
    refreshProducts();
    setShowAddModal(false);
  };

  const handleDeleteProduct = (productId) => {
    deleteProduct(productId);
    refreshProducts();
    setDeleteConfirm(null);
  };

  const refreshProducts = () => {
    setProducts([...getAllProducts()]);
  };

  const getStatusBadge = (product) => {
    if (!product.isAvailable) {
      return <span className="status-badge unavailable">Unavailable</span>;
    }
    
    switch (product.stockStatus) {
      case 'in_stock':
        return <span className="status-badge in-stock">In Stock</span>;
      case 'out_of_stock':
        return <span className="status-badge out-of-stock">Out of Stock</span>;
      case 'discontinued':
        return <span className="status-badge discontinued">Discontinued</span>;
      default:
        return <span className="status-badge unknown">Unknown</span>;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (filter) {
      case 'available':
        return matchesSearch && product.isAvailable && product.stockStatus === 'in_stock';
      case 'unavailable':
        return matchesSearch && !product.isAvailable;
      case 'out_of_stock':
        return matchesSearch && product.stockStatus === 'out_of_stock';
      default:
        return matchesSearch;
    }
  });

  const getStockColor = (quantity) => {
    if (quantity <= 10) return 'low-stock';
    if (quantity <= 30) return 'medium-stock';
    return 'high-stock';
  };

  return (
    <div className="product-management">
      <div className="pm-header">
        <h2>🏪 Product Management</h2>
        <p>Manage product availability, pricing, and stock levels</p>
      </div>

      <div className="pm-controls">
        <div className="pm-search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="pm-filters">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
            <option value="all">All Products</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>

        <div className="pm-actions">
          <button onClick={() => setShowAddModal(true)} className="add-btn">
            <FaPlus /> Add New Product
          </button>
          <button onClick={resetProducts} className="reset-btn">
            <FaTrash /> Reset All Products
          </button>
        </div>
      </div>

      <div className="pm-stats">
        <div className="stat-card">
          <span className="stat-number">{products.filter(p => p.isAvailable && p.stockStatus === 'in_stock').length}</span>
          <span className="stat-label">Available</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{products.filter(p => p.stockStatus === 'out_of_stock').length}</span>
          <span className="stat-label">Out of Stock</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{products.filter(p => !p.isAvailable).length}</span>
          <span className="stat-label">Unavailable</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{products.length}</span>
          <span className="stat-label">Total Products</span>
        </div>
      </div>

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id} className={!product.isAvailable ? 'unavailable-row' : ''}>
                <td className="product-info-cell">
                  <div className="product-info">
                    <img src={product.image} alt={product.name} className="product-thumbnail" />
                    <div>
                      <h4>{product.name}</h4>
                      <span className="product-category">{product.category}</span>
                    </div>
                  </div>
                </td>
                
                <td className="price-cell">
                  {editingProduct === product.id ? (
                    <div className="edit-price">
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.price}
                        onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                        className="price-input"
                      />
                      <input
                        type="number"
                        step="0.01"
                        value={editForm.originalPrice}
                        onChange={(e) => setEditForm({...editForm, originalPrice: e.target.value})}
                        placeholder="Original"
                        className="price-input original"
                      />
                    </div>
                  ) : (
                    <div className="price-display">
                      <span className="current-price">₹{product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  )}
                </td>

                <td className="stock-cell">
                  {editingProduct === product.id ? (
                    <div className="edit-stock">
                      <input
                        type="number"
                        value={editForm.stockQuantity}
                        onChange={(e) => setEditForm({...editForm, stockQuantity: e.target.value})}
                        className="stock-input"
                      />
                      <select
                        value={editForm.stockStatus}
                        onChange={(e) => setEditForm({...editForm, stockStatus: e.target.value})}
                        className="stock-select"
                      >
                        <option value="in_stock">In Stock</option>
                        <option value="out_of_stock">Out of Stock</option>
                        <option value="discontinued">Discontinued</option>
                      </select>
                    </div>
                  ) : (
                    <div className="stock-display">
                      <span className={`stock-quantity ${getStockColor(product.stockQuantity)}`}>
                        {product.stockQuantity} units
                      </span>
                    </div>
                  )}
                </td>

                <td className="status-cell">
                  {editingProduct === product.id ? (
                    <label className="availability-toggle">
                      <input
                        type="checkbox"
                        checked={editForm.isAvailable}
                        onChange={(e) => setEditForm({...editForm, isAvailable: e.target.checked})}
                      />
                      Available
                    </label>
                  ) : (
                    getStatusBadge(product)
                  )}
                </td>

                <td className="actions-cell">
                  {editingProduct === product.id ? (
                    <div className="edit-actions">
                      <button
                        onClick={() => handleEditSave(product.id)}
                        className="save-btn"
                        title="Save changes"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="cancel-btn"
                        title="Cancel editing"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="product-actions">
                      <button
                        onClick={() => handleEditStart(product)}
                        className="edit-btn"
                        title="Edit product"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleQuickToggleAvailability(product.id, product.isAvailable)}
                        className={`toggle-btn ${product.isAvailable ? 'hide' : 'show'}`}
                        title={product.isAvailable ? 'Hide from customers' : 'Show to customers'}
                      >
                        {product.isAvailable ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      {product.stockStatus === 'in_stock' ? (
                        <button
                          onClick={() => handleQuickStockUpdate(product.id, 'out_of_stock')}
                          className="stock-out-btn"
                          title="Mark as out of stock"
                        >
                          <FaExclamationTriangle />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleQuickStockUpdate(product.id, 'in_stock')}
                          className="stock-in-btn"
                          title="Mark as in stock"
                        >
                                                  <FaCheck />
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteConfirm(product.id)}
                      className="delete-btn"
                      title="Delete product"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <FaBox className="no-products-icon" />
          <h3>No products found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddProduct={handleAddProduct}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="delete-modal-actions">
              <button onClick={() => setDeleteConfirm(null)} className="cancel-btn">
                Cancel
              </button>
              <button onClick={() => handleDeleteProduct(deleteConfirm)} className="delete-confirm-btn">
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
