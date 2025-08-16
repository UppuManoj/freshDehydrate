import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import './Favorites.css';

const Favorites = ({ favorites, onToggleFavorite, onAddToCart }) => {
  return (
    <div className="favorites-container">
      <h2>Your Favorites</h2>
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>You haven't added any favorites yet.</p>
          <Link to="/products" className="find-products-btn">Find Products</Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(product => (
            <div key={product.id} className="favorite-product-card">
              <div className="favorite-product-image-container">
                <img src={product.image} alt={product.name} />
                <button onClick={() => onToggleFavorite(product)} className="remove-favorite-btn">
                  <FaHeart color="red" />
                </button>
              </div>
              <div className="favorite-product-info">
                <h4 className="favorite-product-name">{product.name}</h4>
                <p className="favorite-product-price">${product.price.toFixed(2)}</p>
                <button onClick={() => onAddToCart(product)} className="add-to-cart-btn">
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
