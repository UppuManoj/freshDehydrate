import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import productsData from './productsData';
import './ProductDetail.css';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find(p => p.id === parseInt(id));
  
  // Initialize state at the top level
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!product) {
    return <div className="product-not-found">Product not found</div>;
  }
  
  const productImages = product.images || [product.image];
  const currentImage = productImages[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? productImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Products
      </button>
      
      <div className="product-detail">
        <div className="product-gallery">
          <div className="main-image-container">
            <img 
              src={currentImage} 
              alt={product.name} 
              className="product-large-image" 
            />
            {productImages.length > 1 && (
              <>
                <button className="gallery-nav prev" onClick={prevImage}>&lt;</button>
                <button className="gallery-nav next" onClick={nextImage}>&gt;</button>
              </>
            )}
          </div>
          {productImages.length > 1 && (
            <div className="thumbnail-container">
              {productImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-meta">
            <span className="product-category">{product.category}</span>
            <span className="product-rating">★ {product.rating} ({Math.floor(Math.random() * 100) + 1} reviews)</span>
          </div>
          
          <div className="product-price">
            <span className="current-price">₹{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
            )}
            {product.originalPrice && (
              <span className="discount-badge">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
          
          <p className="product-description">{product.description}</p>
          
          <div className="product-specs">
            <h3>Specifications</h3>
            <ul>
              <li><strong>Brand:</strong> FreshDehydrate</li>
              <li><strong>Weight:</strong> 100g</li>
              <li><strong>Shelf Life:</strong> 12 months</li>
              <li><strong>Storage:</strong> Store in a cool, dry place</li>
              <li><strong>Allergen Info:</strong> May contain traces of nuts</li>
              <li><strong>Certifications:</strong> FSSAI Certified</li>
            </ul>
          </div>
          
          <div className="product-actions">
            <button 
              className="add-to-cart-btn"
              onClick={() => onAddToCart(product)}
            >
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      <div className="product-details-section">
        <h2>Product Details</h2>
        <p>Our premium {product.name.toLowerCase()} is carefully selected and dehydrated at low temperatures to preserve maximum nutrients and flavor. Perfect for snacking, baking, or adding to your favorite recipes.</p>
        
        <h3>Benefits</h3>
        <ul>
          <li>100% natural with no added preservatives</li>
          <li>Rich in essential vitamins and minerals</li>
          <li>No added sugar or artificial colors</li>
          <li>Perfect for on-the-go snacking</li>
          <li>Great for hiking, camping, and travel</li>
        </ul>
        
        <h3>How to Use</h3>
        <p>Enjoy as a healthy snack straight from the pack, or rehydrate by soaking in water for 10-15 minutes before use in recipes.</p>
      </div>
    </div>
  );
};

export default ProductDetail;
