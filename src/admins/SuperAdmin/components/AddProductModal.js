import React, { useState } from 'react';
import { FaTimes, FaPlus, FaUpload } from 'react-icons/fa';
import './AddProductModal.css';

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fruits',
    price: '',
    originalPrice: '',
    description: '',
    rating: 4.0,
    stockQuantity: 50,
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ['Fruits', 'Vegetables', 'Powder', 'Blends', 'Organic'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (formData.originalPrice && parseFloat(formData.originalPrice) <= parseFloat(formData.price)) {
      newErrors.originalPrice = 'Original price should be higher than current price';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    }

    if (!formData.image) {
      newErrors.image = 'Product image is required';
    }

    if (!formData.stockQuantity || parseInt(formData.stockQuantity) < 0) {
      newErrors.stockQuantity = 'Valid stock quantity is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        rating: parseFloat(formData.rating),
        stockQuantity: parseInt(formData.stockQuantity)
      };

      onAddProduct(productData);
      
      // Reset form
      setFormData({
        name: '',
        category: 'Fruits',
        price: '',
        originalPrice: '',
        description: '',
        rating: 4.0,
        stockQuantity: 50,
        image: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      category: 'Fruits',
      price: '',
      originalPrice: '',
      description: '',
      rating: 4.0,
      stockQuantity: 50,
      image: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <FaPlus className="modal-icon" />
            Add New Product
          </h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder="Enter product name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="price">Current Price (₹) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className={errors.price ? 'error' : ''}
                placeholder="0.00"
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="originalPrice">Original Price (₹)</label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className={errors.originalPrice ? 'error' : ''}
                placeholder="0.00 (optional)"
              />
              {errors.originalPrice && <span className="error-text">{errors.originalPrice}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                step="0.1"
                min="0"
                max="5"
                placeholder="4.0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="stockQuantity">Stock Quantity *</label>
              <input
                type="number"
                id="stockQuantity"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                min="0"
                className={errors.stockQuantity ? 'error' : ''}
                placeholder="50"
              />
              {errors.stockQuantity && <span className="error-text">{errors.stockQuantity}</span>}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Product Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={errors.description ? 'error' : ''}
              placeholder="Describe the product features, benefits, and usage..."
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="image">Product Image *</label>
            <div className="image-upload-container">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="image-input"
              />
              <div className="image-upload-area">
                {formData.image ? (
                  <div className="image-preview">
                    <img src={formData.image} alt="Product preview" />
                    <button type="button" onClick={() => setFormData(prev => ({...prev, image: ''}))}>
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <FaUpload className="upload-icon" />
                    <p>Click to upload product image</p>
                    <small>Supports: JPG, PNG, GIF</small>
                  </div>
                )}
              </div>
            </div>
            {errors.image && <span className="error-text">{errors.image}</span>}
          </div>

          <div className="modal-actions">
            <button type="button" onClick={handleClose} className="cancel-btn" disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
