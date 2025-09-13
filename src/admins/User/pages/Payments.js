import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useOrders } from '../../../contexts/OrderContext';
import { FaCreditCard, FaUniversity, FaMobile, FaShieldAlt, FaLock, FaCheckCircle, FaTimes, FaArrowLeft, FaRupeeSign } from 'react-icons/fa';
import './Payments.css';

const Payments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { confirmOrder } = useOrders();
  
  const [orderData] = useState(location.state || {});
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Card details
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
    // UPI details
    upiId: '',
    // Net Banking
    bankName: '',
    // Billing details
    billingAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      phone: ''
    }
  });

  useEffect(() => {
    // If no order data, redirect back to cart
    if (!orderData.items || orderData.items.length === 0) {
      navigate('/cart');
    }
  }, [orderData, navigate]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    if (paymentMethod === 'card') {
      return formData.cardNumber.replace(/\s/g, '').length === 16 &&
             formData.expiryDate.length === 5 &&
             formData.cvv.length === 3 &&
             formData.cardHolderName.trim() !== '';
    } else if (paymentMethod === 'upi') {
      return formData.upiId.includes('@') && formData.upiId.length > 5;
    } else if (paymentMethod === 'netbanking') {
      return formData.bankName !== '';
    }
    return false;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Confirm the order
      const orderDetails = {
        customerEmail: currentUser?.email || 'user@example.com',
        customerName: currentUser?.name || 'Guest User',
        shippingAddress: orderData.shippingAddress || 'Default Address',
        billingAddress: formData.billingAddress,
        paymentMethod: paymentMethod,
        paymentDetails: {
          ...(paymentMethod === 'card' && {
            cardNumber: '**** **** **** ' + formData.cardNumber.slice(-4),
            cardHolderName: formData.cardHolderName
          }),
          ...(paymentMethod === 'upi' && {
            upiId: formData.upiId
          }),
          ...(paymentMethod === 'netbanking' && {
            bankName: formData.bankName
          })
        }
      };

      await confirmOrder(orderData.items, orderDetails);
      
      setShowSuccess(true);
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000);

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="payment-success">
        <div className="success-container">
          <FaCheckCircle className="success-icon" />
          <h2>Payment Successful!</h2>
          <p>Your order has been confirmed and will be processed shortly.</p>
          <p>Order Total: ₹{orderData.total?.toFixed(2)}</p>
          <p>Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payments-page">
      <div className="payments-header">
        <button className="back-btn" onClick={() => navigate('/cart')}>
          <FaArrowLeft /> Back to Cart
        </button>
        <h2><FaLock /> Secure Payment</h2>
        <p>Complete your purchase securely</p>
      </div>

      <div className="payment-container">
        <div className="payment-left">
          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {orderData.items?.map((item, index) => (
                <div key={index} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <span className="item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>₹{orderData.subtotal?.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>₹{orderData.shipping?.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax:</span>
                <span>₹{orderData.tax?.toFixed(2)}</span>
              </div>
              <div className="total-row final-total">
                <span>Total:</span>
                <span>₹{orderData.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="payment-right">
          {/* Payment Methods */}
          <div className="payment-methods">
            <h3>Choose Payment Method</h3>
            <div className="method-options">
              <label className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FaCreditCard />
                <span>Credit/Debit Card</span>
              </label>
              <label className={`method-option ${paymentMethod === 'upi' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FaMobile />
                <span>UPI</span>
              </label>
              <label className={`method-option ${paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  value="netbanking"
                  checked={paymentMethod === 'netbanking'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FaUniversity />
                <span>Net Banking</span>
              </label>
            </div>
          </div>

          {/* Payment Form */}
          <div className="payment-form">
            {paymentMethod === 'card' && (
              <div className="card-form">
                <h4>Card Details</h4>
                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                    maxLength="19"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                      maxLength="5"
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
                      maxLength="3"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.cardHolderName}
                    onChange={(e) => handleInputChange('cardHolderName', e.target.value)}
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="upi-form">
                <h4>UPI Details</h4>
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    placeholder="yourname@paytm"
                    value={formData.upiId}
                    onChange={(e) => handleInputChange('upiId', e.target.value)}
                  />
                </div>
                <div className="upi-apps">
                  <p>Popular UPI Apps:</p>
                  <div className="upi-app-logos">
                    <span>PhonePe</span>
                    <span>Google Pay</span>
                    <span>Paytm</span>
                    <span>BHIM</span>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="netbanking-form">
                <h4>Net Banking</h4>
                <div className="form-group">
                  <label>Select Your Bank</label>
                  <select
                    value={formData.bankName}
                    onChange={(e) => handleInputChange('bankName', e.target.value)}
                  >
                    <option value="">Choose your bank</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                    <option value="bob">Bank of Baroda</option>
                    <option value="canara">Canara Bank</option>
                    <option value="union">Union Bank</option>
                    <option value="idbi">IDBI Bank</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Security Notice */}
          <div className="security-notice">
            <FaShieldAlt />
            <div>
              <h4>Secure Payment</h4>
              <p>Your payment information is encrypted and secure. We do not store your card details.</p>
            </div>
          </div>

          {/* Payment Button */}
          <button
            className={`payment-btn ${isProcessing ? 'processing' : ''}`}
            onClick={handlePayment}
            disabled={isProcessing || !validateForm()}
          >
            {isProcessing ? (
              <>
                <div className="spinner"></div>
                Processing Payment...
              </>
            ) : (
              <>
                <FaLock />
                Pay ₹{orderData.total?.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;
