import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useOrders } from '../../../contexts/OrderContext';
import { useProfile } from '../../../contexts/ProfileContext';
import { FaCreditCard, FaUniversity, FaMobile, FaShieldAlt, FaLock, FaArrowLeft, FaWallet, FaPlus } from 'react-icons/fa';
import './Payments.css';

const Payments = ({ clearCart }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { confirmOrder } = useOrders();
  const { savedPaymentCards, savedUPIMethods, savedWalletMethods } = useProfile();
  
  const [orderData] = useState(location.state || {});
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddNewPayment, setShowAddNewPayment] = useState(false);
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
    
    // Set default payment method and selected payment
    if (savedPaymentCards.length > 0) {
      const defaultCard = savedPaymentCards.find(card => card.isDefault) || savedPaymentCards[0];
      setPaymentMethod('card');
      setSelectedPaymentId(defaultCard.cardId);
    } else if (savedUPIMethods.length > 0) {
      const defaultUPI = savedUPIMethods.find(upi => upi.isDefault) || savedUPIMethods[0];
      setPaymentMethod('upi');
      setSelectedPaymentId(defaultUPI.upiId);
    } else if (savedWalletMethods.length > 0) {
      const defaultWallet = (savedWalletMethods.find(wallet => wallet.isLinked) || savedWalletMethods[0]);
      setPaymentMethod('wallet');
      setSelectedPaymentId(defaultWallet.walletId);
    }
  }, [orderData, navigate, savedPaymentCards, savedUPIMethods, savedWalletMethods]);

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
    const match = (matches && matches[0]) || '';
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
    if (showAddNewPayment) {
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
    } else {
      // Using saved payment method
      return selectedPaymentId !== null;
    }
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

      // Get payment details based on selected method
      let paymentDetails = {};
      
      if (showAddNewPayment) {
        paymentDetails = {
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
        };
      } else {
        // Using saved payment method
        if (paymentMethod === 'card') {
          const selectedCard = savedPaymentCards.find(card => card.cardId === selectedPaymentId);
          paymentDetails = {
            cardNumber: selectedCard?.cardNumber,
            cardHolderName: selectedCard?.cardHolderName,
            cardType: selectedCard?.cardType
          };
        } else if (paymentMethod === 'upi') {
          const selectedUPI = savedUPIMethods.find(upi => upi.upiId === selectedPaymentId);
          paymentDetails = {
            upiId: selectedUPI?.upiAddress,
            upiProvider: selectedUPI?.upiProvider
          };
        } else if (paymentMethod === 'wallet') {
          const selectedWallet = savedWalletMethods.find(wallet => wallet.walletId === selectedPaymentId);
          paymentDetails = {
            walletName: selectedWallet?.walletName,
            walletProvider: selectedWallet?.walletProvider,
            walletBalance: selectedWallet?.walletBalance
          };
        }
      }

      // Confirm the order
      const orderDetails = {
        customerEmail: currentUser?.email || 'user@example.com',
        customerName: currentUser?.name || 'Guest User',
        shippingAddress: orderData.shippingAddress,
        billingAddress: formData.billingAddress,
        paymentMethod: paymentMethod,
        paymentDetails: paymentDetails
      };

      const newOrder = await confirmOrder(orderData.items, orderDetails);
      
      // Navigate to order success page with complete order data
      const completeOrderData = {
        ...orderData,
        orderId: newOrder.id,
        orderDate: newOrder.createdAt,
        paymentMethod: paymentMethod,
        paymentDetails: paymentDetails
      };

      navigate('/order-success', { 
        state: completeOrderData,
        replace: true 
      });

    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="payments-page">
      <div className="payments-header">
        <button className="back-btn" onClick={() => navigate('/address-selection', { state: orderData })}>
          <FaArrowLeft /> Back to Address
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
            
            {/* Saved Cards */}
            {savedPaymentCards.length > 0 && (
              <div className="saved-payment-section">
                <div className="payment-section-header">
                  <h4><FaCreditCard /> Saved Cards</h4>
                  <button 
                    className="add-new-btn"
                    onClick={() => {
                      setPaymentMethod('card');
                      setShowAddNewPayment(true);
                      setSelectedPaymentId(null);
                    }}
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
                <div className="saved-payment-list">
                  {savedPaymentCards.map(card => (
                    <div 
                      key={card.cardId}
                      className={`saved-payment-item ${paymentMethod === 'card' && selectedPaymentId === card.cardId ? 'selected' : ''}`}
                      onClick={() => {
                        setPaymentMethod('card');
                        setSelectedPaymentId(card.cardId);
                        setShowAddNewPayment(false);
                      }}
                    >
                      <div className="payment-item-info">
                        <FaCreditCard className="payment-icon" />
                        <div className="payment-details">
                          <span className="payment-number">{card.cardNumber}</span>
                          <span className="payment-name">{card.cardHolderName}</span>
                          <span className="payment-type">{card.cardType} • Expires {card.expiryDate}</span>
                        </div>
                      </div>
                      {card.isDefault && <span className="default-badge">Default</span>}
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        checked={paymentMethod === 'card' && selectedPaymentId === card.cardId}
                        onChange={() => {}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved UPI Methods */}
            {savedUPIMethods.length > 0 && (
              <div className="saved-payment-section">
                <div className="payment-section-header">
                  <h4><FaMobile /> UPI Methods</h4>
                  <button 
                    className="add-new-btn"
                    onClick={() => {
                      setPaymentMethod('upi');
                      setShowAddNewPayment(true);
                      setSelectedPaymentId(null);
                    }}
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
                <div className="saved-payment-list">
                  {savedUPIMethods.map(upi => (
                    <div 
                      key={upi.upiId}
                      className={`saved-payment-item ${paymentMethod === 'upi' && selectedPaymentId === upi.upiId ? 'selected' : ''}`}
                      onClick={() => {
                        setPaymentMethod('upi');
                        setSelectedPaymentId(upi.upiId);
                        setShowAddNewPayment(false);
                      }}
                    >
                      <div className="payment-item-info">
                        <FaMobile className="payment-icon" />
                        <div className="payment-details">
                          <span className="payment-number">{upi.upiAddress}</span>
                          <span className="payment-type">{upi.upiProvider}</span>
                        </div>
                      </div>
                      {upi.isVerified && <span className="verified-badge">Verified</span>}
                      {upi.isDefault && <span className="default-badge">Default</span>}
                <input
                  type="radio"
                        name="paymentMethod" 
                        checked={paymentMethod === 'upi' && selectedPaymentId === upi.upiId}
                        onChange={() => {}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Wallets */}
            {savedWalletMethods.length > 0 && (
              <div className="saved-payment-section">
                <div className="payment-section-header">
                  <h4><FaWallet /> Digital Wallets</h4>
                  <button 
                    className="add-new-btn"
                    onClick={() => {
                      setPaymentMethod('wallet');
                      setShowAddNewPayment(true);
                      setSelectedPaymentId(null);
                    }}
                  >
                    <FaPlus /> Add New
                  </button>
                </div>
                <div className="saved-payment-list">
                  {savedWalletMethods.map(wallet => (
                    <div 
                      key={wallet.walletId}
                      className={`saved-payment-item ${paymentMethod === 'wallet' && selectedPaymentId === wallet.walletId ? 'selected' : ''}`}
                      onClick={() => {
                        setPaymentMethod('wallet');
                        setSelectedPaymentId(wallet.walletId);
                        setShowAddNewPayment(false);
                      }}
                    >
                      <div className="payment-item-info">
                        <FaWallet className="payment-icon" />
                        <div className="payment-details">
                          <span className="payment-number">{wallet.walletName}</span>
                          <span className="payment-balance">{wallet.walletBalance}</span>
                          <span className="payment-type">{wallet.walletProvider}</span>
                        </div>
                      </div>
                      {wallet.isLinked && <span className="linked-badge">Linked</span>}
                <input
                  type="radio"
                        name="paymentMethod" 
                        checked={paymentMethod === 'wallet' && selectedPaymentId === wallet.walletId}
                        onChange={() => {}}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Net Banking Option */}
            <div className="saved-payment-section">
              <div className="payment-section-header">
                <h4><FaUniversity /> Net Banking</h4>
              </div>
              <div className="saved-payment-list">
                <div 
                  className={`saved-payment-item ${paymentMethod === 'netbanking' ? 'selected' : ''}`}
                  onClick={() => {
                    setPaymentMethod('netbanking');
                    setShowAddNewPayment(true);
                    setSelectedPaymentId('netbanking');
                  }}
                >
                  <div className="payment-item-info">
                    <FaUniversity className="payment-icon" />
                    <div className="payment-details">
                      <span className="payment-number">Net Banking</span>
                      <span className="payment-type">Pay using your bank account</span>
                    </div>
                  </div>
                <input
                  type="radio"
                    name="paymentMethod" 
                  checked={paymentMethod === 'netbanking'}
                    onChange={() => {}}
                />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form - Only show when adding new payment */}
          {showAddNewPayment && (
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
          )}

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
