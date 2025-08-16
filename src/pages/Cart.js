import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaArrowLeft } from 'react-icons/fa';
import './Cart.css';

const Cart = ({ cart, setCart }) => {

  const cartItems = cart.reduce((acc, product) => {
    const existingProduct = acc.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      acc.push({ ...product, quantity: 1 });
    }
    return acc;
  }, []);

  const handleUpdateQuantity = (product, newQuantity) => {
    const newCart = cart.filter(item => item.id !== product.id);
    for (let i = 0; i < newQuantity; i++) {
      newCart.push(product);
    }
    setCart(newCart);
  };

  const handleRemoveItem = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal > 0 && subtotal < 499 ? 99 : 0;
  const tax = 0; // Example tax
  const total = subtotal + shippingCost + tax;

  return (
    <div className="cart-page-container">
      <header className="cart-header">
        <FaShoppingCart />
        <h1>Your Shopping Cart</h1>
        <p>Review your items and proceed to checkout.</p>
      </header>

      <div className="cart-main-content">
        <div className="cart-items-section">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <h3>Your cart is empty.</h3>
              <p>Looks like you haven't added anything to your cart yet.</p>
              <Link to="/products" className="continue-shopping-btn-main">Start Shopping</Link>
            </div>
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item-card">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>Price: ₹{item.price.toFixed(2)}</p>
                    <div className="cart-item-quantity">
                      <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} className="cart-item-remove-btn"><FaTrash /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="order-summary-section">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>₹{shippingCost.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax:</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button className="proceed-to-checkout-btn">Proceed to Checkout</button>
          <div className="summary-actions">
            <button onClick={handleClearCart} className="clear-cart-btn">
              <FaTrash /> Clear Cart
            </button>
            <Link to="/products" className="continue-shopping-link">
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
