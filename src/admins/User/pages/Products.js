import React, { useState, useMemo } from 'react';
import { FaShoppingCart, FaRegHeart, FaHeart, FaStar, FaStarHalfAlt, FaBoxOpen, FaHeadset } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Products.css';
import productBg from '../../../assets/logo/product-bg.jpg';
import productsData from './productsData';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
      {halfStar && <FaStarHalfAlt key="half" />}
      {[...Array(emptyStars)].map((_, i) => <FaStar key={`empty-${i}`} style={{ color: '#e4e5e9' }} />)}
      <span className="rating-text">({rating})</span>
    </div>
  );
};

const Products = ({ onAddToCart, onToggleFavorite, favorites }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState('All Prices');
  const [sortOrder, setSortOrder] = useState('Sort by Popularity');

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...productsData];

    if (searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category !== 'All Categories') {
      products = products.filter(p => p.category === category);
    }

    if (priceRange !== 'All Prices') {
      const [min, max] = priceRange.split('-').map(Number);
      products = products.filter(p => p.price >= min && p.price <= max);
    }

    // Sorting logic
    switch (sortOrder) {
      case 'Name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Price: Low to High':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'Rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'Sort by Popularity' (default)
        // Keep original order which is by popularity
        break;
    }

    return products;
  }, [searchQuery, category, priceRange, sortOrder]);

  // We are keeping the main page structure from the previous step,
  // but replacing the product grid's content with the new design.
  // The hero, banner, search, and filters are assumed to be correct.

  return (
    <div className="products-page-container">
            <div className="product-hero" style={{ backgroundImage: `url(${productBg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Premium Dehydrated Products Collection</h1>
          <p>Discover our exclusive range of dehydrated products</p>
          <div className="hero-stats">
            <div className="stat-item">
              <FaBoxOpen />
              <span>150+</span>
              <p>Products</p>
            </div>
            <div className="stat-item">
              <FaHeadset />
              <span>24/7</span>
              <p>Support</p>
            </div>
            <div className="stat-item">
              <FaStar />
              <span>4.5★</span>
              <p>Rating</p>
            </div>
          </div>
        </div>
      </div>

      <div className="products-controls">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters-container">
          <h3 className="filters-title">Filters</h3>
          <div className="filter-buttons">
            {['All Products', 'Fruits', 'Vegetables', 'Blends', 'Powder', 'Organic'].map(cat => (
              <button
                key={cat}
                className={`filter-btn ${category === (cat === 'All Products' ? 'All Categories' : cat) ? 'active' : ''}`}
                onClick={() => setCategory(cat === 'All Products' ? 'All Categories' : cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="sort-container">
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="Sort by Popularity">Sort by Popularity</option>
            <option value="Name">Name</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
            <option value="Rating">Rating</option>
          </select>
          
          <select 
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="price-filter"
          >
            <option value="All Prices">All Prices</option>
            <option value="0-100">Under ₹100</option>
            <option value="100-150">₹100 - ₹150</option>
            <option value="150-200">₹150 - ₹200</option>
            <option value="200-1000">Over ₹200</option>
          </select>
        </div>
      </div>

      <div className="products-main-content">
        <p className="product-count">Showing {filteredAndSortedProducts.length} products</p>
        <div className="product-grid">
          {filteredAndSortedProducts.map(product => (
              <div key={product.id} className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
              <div className="product-image-container">
                <img src={product.image} alt={product.name} />
                <button onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(product);
                }} className="like-btn">
                  {favorites.some(item => item.id === product.id) ? <FaHeart color="red" /> : <FaRegHeart />}
                </button>
                {product.originalPrice && (
                  <span className="discount-tag">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <StarRating rating={product.rating} />
                <h4 className="product-name">{product.name}</h4>
                <p className="product-description">{product.description}</p>
                <div className="product-price">
                  <span className="current-price">₹{product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
                <button onClick={() => onAddToCart(product)} className="add-to-cart-btn">
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;


