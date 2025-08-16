import React, { useState, useMemo } from 'react';
import { FaShoppingCart, FaRegHeart, FaHeart, FaStar, FaStarHalfAlt, FaBoxOpen, FaHeadset } from 'react-icons/fa';
import './Products.css';
import productBg from '../assets/product-bg.jpg';
import mixedFruits from '../assets/mixed fruits.jpg';
import dehydrated from '../assets/dehydrated.jpg';
import bananaChips from '../assets/banana-chips.jpeg';
import mixedVegetables from '../assets/mixed vegetables.jpeg';
import bananaPowder from '../assets/banana powder.jpg';

const productsData = [
  {
    id: 1,
    name: 'Antioxidant Berry Mix',
    image: mixedFruits,
    price: 189.00,
    originalPrice: 259.00,
    rating: 4.8,
    category: 'Fruits',
    description: 'A powerful blend of dehydrated blueberries, cranberries, and goji berries.'
  },
  {
    id: 2,
    name: 'Crispy Kale Chips',
    image: dehydrated,
    price: 109.00,
    originalPrice: 159.00,
    rating: 4.4,
    category: 'Vegetables',
    description: 'Lightly seasoned kale chips, a perfect guilt-free snack.'
  },
  {
    id: 3,
    name: 'Crunchy Banana Chips',
    image: bananaChips,
    price: 99.00,
    originalPrice: 119.00,
    rating: 4.6,
    category: 'Fruits',
    description: 'Naturally sweet banana chips that make the perfect healthy snack for any time.'
  },
  {
    id: 4,
    name: 'Garden Vegetable Mix',
    image: mixedVegetables,
    price: 129.00,
    originalPrice: 159.00,
    rating: 4.9,
    category: 'Vegetables',
    description: 'A colorful blend of bell peppers, carrots, and tomatoes packed with nutrients.'
  },
  {
    id: 5,
    name: 'Antioxidant Berry Mix',
    image: mixedFruits,
    price: 189.00,
    originalPrice: 259.00,
    rating: 4.8,
    category: 'Fruits',
    description: 'A powerful blend of dehydrated blueberries, cranberries, and goji berries.'
  },
  
  {
    id: 6,
    name: 'bananaPowder',
    image: bananaPowder,
    price: 109.00,
    originalPrice: 159.00,
    rating: 4.4,
    category: 'Powder',
    description: 'Lightly seasoned banana powder, a perfect guilt-free snack.'
  }
];

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

    // Add price and sorting logic here if needed

    return products;
  }, [searchQuery, category]);

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
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option>Sort by Popularity</option>
            <option>Name</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      <div className="products-main-content">
        <p className="product-count">Showing {filteredAndSortedProducts.length} products</p>
        <div className="product-grid">
          {filteredAndSortedProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} />
                <button onClick={() => onToggleFavorite(product)} className="like-btn">
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


