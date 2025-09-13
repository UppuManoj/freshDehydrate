import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useOrders } from '../../../contexts/OrderContext';
import { FaUser, FaShoppingCart, FaCreditCard, FaGift, FaCog, FaEdit, FaSave, FaTimes, FaPhone, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaPlus, FaTrash, FaStar, FaBell, FaHeart, FaTicketAlt, FaSearch, FaFilter } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const { orders, orderStats } = useOrders();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('profile');
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingMobile, setEditingMobile] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [showAddPAN, setShowAddPAN] = useState(false);
  const [showAddGiftCard, setShowAddGiftCard] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddUPI, setShowAddUPI] = useState(false);

  // Handle navigation from dropdown
  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location.state]);

  // Remove functions
  const removeUPI = (id) => {
    setSavedUPIs(savedUPIs.filter(upi => upi.id !== id));
  };

  const removeCard = (id) => {
    setSavedCards(savedCards.filter(card => card.id !== id));
  };

  const [profileData, setProfileData] = useState({
    firstName: 'Manoj',
    lastName: 'Kumar',
    gender: 'Male',
    email: 'smartmanoj621@gmail.com',
    mobile: '+916303060469',
    dateOfBirth: '15/08/1990',
    location: 'Bangalore, Karnataka'
  });

  const [savedUPIs, setSavedUPIs] = useState([
    { id: 1, upiId: 'manoj@paytm', provider: 'Paytm', verified: true },
    { id: 2, upiId: 'manojkumar@phonepe', provider: 'PhonePe', verified: true }
  ]);

  const [savedCards, setSavedCards] = useState([
    { id: 1, cardNumber: '**** **** **** 1234', cardType: 'Visa', bankName: 'HDFC Bank', expiryDate: '12/25' },
    { id: 2, cardNumber: '**** **** **** 5678', cardType: 'Mastercard', bankName: 'SBI', expiryDate: '08/26' }
  ]);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'Manoj Kumar',
      address: '123, MG Road, Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      phone: '+916303060469',
      isDefault: true
    },
    {
      id: 2,
      type: 'Work',
      name: 'Manoj Kumar',
      address: '456, Tech Park, Electronic City',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560100',
      phone: '+916303060469',
      isDefault: false
    }
  ]);


  const [coupons] = useState([
    {
      id: 1,
      title: 'SAVE20',
      description: 'Get 20% off on orders above ₹500',
      discount: '20% OFF',
      minOrder: '₹500',
      validity: '31 Dec 2024',
      code: 'SAVE20'
    },
    {
      id: 2,
      title: 'FREESHIP',
      description: 'Free shipping on all orders',
      discount: 'FREE SHIPPING',
      minOrder: 'No minimum',
      validity: '15 Jan 2025',
      code: 'FREESHIP'
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      type: 'Order',
      title: 'Order Delivered Successfully',
      message: 'Your order #FD12345 has been delivered',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'Offer',
      title: 'Special Discount Available',
      message: 'Get 25% off on Premium Mango Slices',
      time: '1 day ago',
      read: true
    },
    {
      id: 3,
      type: 'Review',
      title: 'Rate Your Recent Purchase',
      message: 'How was your experience with Banana Chips?',
      time: '3 days ago',
      read: false
    }
  ]);

  const [wishlistItems] = useState([
    {
      id: 1,
      name: 'Premium Mango Slices',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      inStock: true
    },
    {
      id: 2,
      name: 'Dried Pineapple Rings',
      price: 249,
      originalPrice: 329,
      image: 'https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      inStock: false
    }
  ]);

  const sidebarItems = [
    { 
      icon: <FaShoppingCart />, 
      label: 'MY ORDERS', 
      key: 'orders',
      hasArrow: true 
    },
    {
      icon: <FaUser />,
      label: 'ACCOUNT SETTINGS',
      key: 'account',
      subItems: [
        { label: 'Profile Information', key: 'profile' },
        { label: 'Manage Addresses', key: 'addresses' },
        { label: 'PAN Card Information', key: 'pan' }
      ]
    },
    {
      icon: <FaCreditCard />,
      label: 'PAYMENTS',
      key: 'payments',
      subItems: [
        { label: 'Gift Cards', key: 'giftcards', value: '₹0' },
        { label: 'Saved UPI', key: 'upi' },
        { label: 'Saved Cards', key: 'cards' }
      ]
    },
    {
      icon: <FaGift />,
      label: 'MY STUFF',
      key: 'stuff',
      subItems: [
        { label: 'My Coupons', key: 'coupons' },
        { label: 'My Reviews & Ratings', key: 'reviews' },
        { label: 'All Notifications', key: 'notifications' },
        { label: 'My Wishlist', key: 'wishlist' }
      ]
    }
  ];

  const handleEdit = (section) => {
    if (section === 'personal') setEditingPersonal(true);
    if (section === 'email') setEditingEmail(true);
    if (section === 'mobile') setEditingMobile(true);
  };

  const handleSave = (section) => {
    if (section === 'personal') setEditingPersonal(false);
    if (section === 'email') setEditingEmail(false);
    if (section === 'mobile') setEditingMobile(false);
    // Here you would typically save to backend
  };

  const handleCancel = (section) => {
    if (section === 'personal') setEditingPersonal(false);
    if (section === 'email') setEditingEmail(false);
    if (section === 'mobile') setEditingMobile(false);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderPersonalInformation = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Personal Information</h3>
        {!editingPersonal ? (
          <button className="edit-btn" onClick={() => handleEdit('personal')}>
            Edit
          </button>
        ) : (
          <div className="edit-actions">
            <button className="save-btn" onClick={() => handleSave('personal')}>
              <FaSave /> Save
            </button>
            <button className="cancel-btn" onClick={() => handleCancel('personal')}>
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!editingPersonal}
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!editingPersonal}
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="gender-section">
        <label>Your Gender</label>
        <div className="gender-options">
          <label className="radio-option">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={profileData.gender === 'Male'}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              disabled={!editingPersonal}
            />
            Male
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={profileData.gender === 'Female'}
              onChange={(e) => handleInputChange('gender', e.target.value)}
              disabled={!editingPersonal}
            />
            Female
          </label>
        </div>
      </div>
    </div>
  );

  const renderEmailAddress = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Email Address</h3>
        {!editingEmail ? (
          <button className="edit-btn" onClick={() => handleEdit('email')}>
            Edit
          </button>
        ) : (
          <div className="edit-actions">
            <button className="save-btn" onClick={() => handleSave('email')}>
              <FaSave /> Save
            </button>
            <button className="cancel-btn" onClick={() => handleCancel('email')}>
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="form-group">
        <input
          type="email"
          value={profileData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          disabled={!editingEmail}
          placeholder="Email Address"
        />
      </div>
    </div>
  );

  const renderMobileNumber = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Mobile Number</h3>
        {!editingMobile ? (
          <button className="edit-btn" onClick={() => handleEdit('mobile')}>
            Edit
          </button>
        ) : (
          <div className="edit-actions">
            <button className="save-btn" onClick={() => handleSave('mobile')}>
              <FaSave /> Save
            </button>
            <button className="cancel-btn" onClick={() => handleCancel('mobile')}>
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="form-group">
        <input
          type="tel"
          value={profileData.mobile}
          onChange={(e) => handleInputChange('mobile', e.target.value)}
          disabled={!editingMobile}
          placeholder="Mobile Number"
        />
      </div>
    </div>
  );

  const renderFAQs = () => (
    <div className="profile-section">
      <h3>FAQs</h3>
      <div className="faq-list">
        <div className="faq-item">
          <h4>What happens when I update my email address (or mobile number)?</h4>
          <p>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
        </div>
        <div className="faq-item">
          <h4>When will my Fresh Dehydrate account be updated with the new email address (or mobile number)?</h4>
          <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
        </div>
        <div className="faq-item">
          <h4>What happens to my existing Fresh Dehydrate account when I update my email address (or mobile number)?</h4>
          <p>Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
        </div>
        <div className="faq-item">
          <h4>Does my Seller account get affected when I update my email address?</h4>
          <p>Fresh Dehydrate has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
        </div>
      </div>
      
      <div className="account-actions">
        <button className="deactivate-btn">Deactivate Account</button>
        <button className="delete-btn">Delete Account</button>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>My Orders</h3>
        <div className="order-filters">
          <FaSearch />
          <input type="text" placeholder="Search in orders" />
        </div>
      </div>
      
      <div className="orders-content">
        {orders && orders.length > 0 ? (
          orders.slice(0, 5).map((order) => (
            <div key={order.id} className="order-item">
              <div className="order-header">
                <div className="order-info">
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <span className={`order-status ${order.status}`}>{order.status}</span>
              </div>
              <div className="order-items">
                {order.items.slice(0, 2).map((item, index) => (
                  <div key={index} className="order-product">
                    <img src={item.image} alt={item.name} />
                    <div className="product-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity} | ₹{item.price}</p>
                    </div>
                  </div>
                ))}
                {order.items.length > 2 && (
                  <div className="more-items">+{order.items.length - 2} more items</div>
                )}
              </div>
              <div className="order-footer">
                <span className="order-total">Total: ₹{order.total}</span>
                <div className="order-actions">
                  <button className="track-btn">Track Order</button>
                  <button className="invoice-btn">Download Invoice</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FaShoppingCart className="empty-icon" />
            <h3>No orders yet</h3>
            <p>Looks like you haven't placed any orders yet. Start shopping to see your orders here.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Manage Addresses</h3>
        <button className="add-btn" onClick={() => setShowAddAddress(true)}>
          <FaPlus /> Add New Address
        </button>
      </div>
      
      <div className="addresses-grid">
        {addresses.map((address) => (
          <div key={address.id} className="address-card">
            <div className="address-header">
              <div className="address-type">
                <span className="type-badge">{address.type}</span>
                {address.isDefault && <span className="default-badge">Default</span>}
              </div>
              <div className="address-actions">
                <button onClick={() => setEditingAddress(address.id)}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteAddress(address.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="address-details">
              <h4>{address.name}</h4>
              <p>{address.address}</p>
              <p>{address.city}, {address.state} - {address.pincode}</p>
              <p>Mobile: {address.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>Saved Payment Methods</h3>
        <button className="add-btn" onClick={() => setShowAddCard(true)}>
          <FaPlus /> Add New Card
        </button>
      </div>
      
      <div className="payment-methods">
        <div className="gift-cards">
          <h4>Gift Cards</h4>
          <div className="gift-card-balance">
            <FaGift />
            <span>₹0</span>
            <button className="add-gift-card" onClick={() => setShowAddGiftCard(true)}>Add Gift Card</button>
          </div>
        </div>
        
        <div className="saved-cards">
          <h4>Saved Cards</h4>
          {savedCards.map((card) => (
            <div key={card.id} className="card-item">
              <div className="card-info">
                <FaCreditCard />
                <div className="card-details">
                  <span className="card-number">{card.cardNumber}</span>
                  <span className="card-bank">{card.bankName} {card.cardType}</span>
                  <span className="card-expiry">Expires {card.expiryDate}</span>
                </div>
              </div>
              <button className="remove-card" onClick={() => removeCard(card.id)}>
                <FaTrash />
              </button>
            </div>
          ))}
          {savedCards.length === 0 && (
            <div className="no-cards-message">
              <p>No cards saved. Add your card for faster payments.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCoupons = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>My Coupons</h3>
        <span className="coupon-count">{coupons.length} Available</span>
      </div>
      
      <div className="coupons-grid">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="coupon-card">
            <div className="coupon-discount">
              {coupon.discount}
            </div>
            <div className="coupon-details">
              <h4>{coupon.title}</h4>
              <p>{coupon.description}</p>
              <div className="coupon-terms">
                <span>Min Order: {coupon.minOrder}</span>
                <span>Valid till: {coupon.validity}</span>
              </div>
              <div className="coupon-code">
                Code: <strong>{coupon.code}</strong>
              </div>
            </div>
            <button className="use-coupon">Use Now</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>All Notifications</h3>
        <button className="mark-all-read">Mark all as read</button>
      </div>
      
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
            <div className="notification-icon">
              {notification.type === 'Order' && <FaShoppingCart />}
              {notification.type === 'Offer' && <FaGift />}
              {notification.type === 'Review' && <FaStar />}
            </div>
            <div className="notification-content">
              <h4>{notification.title}</h4>
              <p>{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
            {!notification.read && <div className="unread-dot"></div>}
          </div>
        ))}
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="profile-section">
      <div className="section-header">
        <h3>My Wishlist</h3>
        <span className="wishlist-count">{wishlistItems.length} Items</span>
      </div>
      
      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
              {!item.inStock && <div className="out-of-stock-overlay">Out of Stock</div>}
            </div>
            <div className="item-details">
              <h4>{item.name}</h4>
              <div className="item-price">
                <span className="current-price">₹{item.price}</span>
                {item.originalPrice && (
                  <span className="original-price">₹{item.originalPrice}</span>
                )}
              </div>
              <div className="item-actions">
                <button className="add-to-cart" disabled={!item.inStock}>
                  Add to Cart
                </button>
                <button className="remove-wishlist">
                  <FaHeart />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const handleDeleteAddress = (addressId) => {
    setAddresses(addresses.filter(addr => addr.id !== addressId));
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="user-greeting">
            <div className="user-avatar">
              <FaUser />
            </div>
            <div className="greeting-text">
              <span className="greeting">Hello,</span>
              <strong>{profileData.firstName} {profileData.lastName}</strong>
            </div>
          </div>

          <div className="sidebar-menu">
            {sidebarItems.map((item) => (
              <div key={item.key} className="menu-section">
                <div 
                  className={`menu-item ${activeSection === item.key ? 'active' : ''} ${item.subItems ? 'non-clickable' : ''}`}
                  onClick={() => !item.subItems && setActiveSection(item.key)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                  {item.hasArrow && <span className="menu-arrow">›</span>}
                </div>
                
                {item.subItems && (
                  <div className="submenu">
                    {item.subItems.map((subItem) => (
                      <div
                        key={subItem.key}
                        className={`submenu-item ${activeSection === subItem.key ? 'active' : ''}`}
                        onClick={() => setActiveSection(subItem.key)}
                      >
                        <span className="submenu-label">{subItem.label}</span>
                        {subItem.value && <span className="submenu-value">{subItem.value}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            <div className="footer-links">
              <span>Frequently Visited:</span>
              <a href="#track">Track Order</a>
              <a href="#help">Help Center</a>
            </div>
            <div className="logout-section">
              <FaCog />
              <span>Logout</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          {activeSection === 'profile' && (
            <>
              {renderPersonalInformation()}
              {renderEmailAddress()}
              {renderMobileNumber()}
              {renderFAQs()}
            </>
          )}
          
            {activeSection === 'orders' && renderOrders()}
          {activeSection === 'addresses' && renderAddresses()}
          {activeSection === 'pan' && (
            <div className="profile-section">
              <div className="section-header">
                <h3>PAN Card Information</h3>
                <button className="add-btn" onClick={() => setShowAddPAN(true)}>
                  <FaPlus /> Add PAN Card
                </button>
              </div>
              <div className="pan-info">
                <p>Your PAN card details are used for tax purposes and order verification.</p>
                <div className="pan-benefits">
                  <h4>Benefits of adding PAN:</h4>
                  <ul>
                    <li>Faster checkout process</li>
                    <li>Easy returns and refunds</li>
                    <li>Tax invoice generation</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'giftcards' && (
            <div className="profile-section">
              <div className="section-header">
                <h3>Gift Cards</h3>
                <span className="gift-balance">Balance: ₹0</span>
              </div>
              <div className="gift-card-content">
                <div className="gift-card-balance-display">
                  <FaGift className="gift-icon" />
                  <div className="balance-info">
                    <h4>Total Gift Card Balance</h4>
                    <span className="balance-amount">₹0</span>
                  </div>
                </div>
                <button className="add-gift-card-btn" onClick={() => setShowAddGiftCard(true)}>Add Gift Card</button>
              </div>
            </div>
          )}
          
          {activeSection === 'upi' && (
            <div className="profile-section">
              <div className="section-header">
                <h3>Saved UPI</h3>
                <button className="add-btn" onClick={() => setShowAddUPI(true)}>
                  <FaPlus /> Add UPI ID
                </button>
              </div>
              <div className="upi-list">
                {savedUPIs.map((upi) => (
                  <div key={upi.id} className="upi-item">
                    <FaCreditCard />
                    <div className="upi-details">
                      <span className="upi-id">{upi.upiId}</span>
                      <span className="upi-provider">{upi.provider}</span>
                      {upi.verified && <span className="verified-badge">Verified</span>}
                    </div>
                    <button className="remove-btn" onClick={() => removeUPI(upi.id)}>Remove</button>
                  </div>
                ))}
                {savedUPIs.length === 0 && (
                  <div className="no-upi-message">
                    <p>No UPI IDs saved. Add your UPI ID for faster payments.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {activeSection === 'cards' && renderPayments()}
          {activeSection === 'coupons' && renderCoupons()}
          {activeSection === 'reviews' && (
            <div className="profile-section">
              <div className="section-header">
                <h3>My Reviews & Ratings</h3>
                <span className="review-count">3 Reviews</span>
              </div>
              <div className="reviews-list">
                <div className="review-item">
                  <div className="product-info">
                    <img src="https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Product" />
                    <div className="product-details">
                      <h4>Premium Mango Slices</h4>
                      <p>Purchased on 15 Dec 2024</p>
                    </div>
                  </div>
                  <div className="rating">
                    <div className="stars">
                      {[1,2,3,4,5].map(star => (
                        <FaStar key={star} className="star filled" />
                      ))}
                    </div>
                    <p>"Excellent quality and taste! Highly recommended."</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'notifications' && renderNotifications()}
          {activeSection === 'wishlist' && renderWishlist()}
        </div>
      </div>

      {/* Add PAN Card Modal */}
      {showAddPAN && (
        <div className="modal-overlay" onClick={() => setShowAddPAN(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add PAN Card</h3>
              <button className="modal-close" onClick={() => setShowAddPAN(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={(e) => { e.preventDefault(); setShowAddPAN(false); }}>
                <div className="form-group">
                  <label>PAN Number *</label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    maxLength="10"
                    style={{ textTransform: 'uppercase' }}
                    required
                  />
                  <small>Enter your 10-digit PAN number (e.g. ABCDE1234F)</small>
                </div>
                <div className="form-group">
                  <label>Full Name (as per PAN) *</label>
                  <input
                    type="text"
                    placeholder="Full name as mentioned in PAN card"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowAddPAN(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Add PAN Card
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddAddress && (
        <div className="modal-overlay" onClick={() => setShowAddAddress(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Address</h3>
              <button className="modal-close" onClick={() => setShowAddAddress(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={(e) => { e.preventDefault(); setShowAddAddress(false); }}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number *</label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      placeholder="6-digit pincode"
                      pattern="[0-9]{6}"
                      maxLength="6"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <select required>
                      <option value="">Select State</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Address (House No, Building, Street, Area) *</label>
                  <textarea
                    placeholder="Enter complete address"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City/District/Town *</label>
                    <input
                      type="text"
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Landmark (Optional)</label>
                    <input
                      type="text"
                      placeholder="E.g. near Apollo Hospital"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Address Type</label>
                  <div className="address-type-options">
                    <label className="radio-option">
                      <input type="radio" name="addressType" value="Home" defaultChecked />
                      Home
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="addressType" value="Work" />
                      Work
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label className="checkbox-option">
                    <input type="checkbox" />
                    Make this my default address
                  </label>
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowAddAddress(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Add Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Gift Card Modal */}
      {showAddGiftCard && (
        <div className="modal-overlay" onClick={() => setShowAddGiftCard(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Gift Card</h3>
              <button className="modal-close" onClick={() => setShowAddGiftCard(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={(e) => { e.preventDefault(); setShowAddGiftCard(false); }}>
                <div className="form-group">
                  <label>Gift Card Number *</label>
                  <input
                    type="text"
                    placeholder="Enter 16-digit gift card number"
                    pattern="[0-9]{16}"
                    maxLength="16"
                    required
                  />
                  <small>Enter your 16-digit gift card number</small>
                </div>
                <div className="form-group">
                  <label>PIN *</label>
                  <input
                    type="password"
                    placeholder="Enter 4-digit PIN"
                    pattern="[0-9]{4}"
                    maxLength="4"
                    required
                  />
                  <small>Enter the 4-digit PIN from the gift card</small>
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowAddGiftCard(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Add Gift Card
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="modal-overlay" onClick={() => setShowAddCard(false)}>
          <div className="modal large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Card</h3>
              <button className="modal-close" onClick={() => setShowAddCard(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={(e) => { e.preventDefault(); setShowAddCard(false); }}>
                <div className="form-group">
                  <label>Card Number *</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    pattern="[0-9\s]{19}"
                    maxLength="19"
                    required
                  />
                  <small>Enter your 16-digit card number</small>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Month *</label>
                    <select required>
                      <option value="">Month</option>
                      <option value="01">01 - January</option>
                      <option value="02">02 - February</option>
                      <option value="03">03 - March</option>
                      <option value="04">04 - April</option>
                      <option value="05">05 - May</option>
                      <option value="06">06 - June</option>
                      <option value="07">07 - July</option>
                      <option value="08">08 - August</option>
                      <option value="09">09 - September</option>
                      <option value="10">10 - October</option>
                      <option value="11">11 - November</option>
                      <option value="12">12 - December</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Expiry Year *</label>
                    <select required>
                      <option value="">Year</option>
                      <option value="24">2024</option>
                      <option value="25">2025</option>
                      <option value="26">2026</option>
                      <option value="27">2027</option>
                      <option value="28">2028</option>
                      <option value="29">2029</option>
                      <option value="30">2030</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>CVV *</label>
                  <input
                    type="password"
                    placeholder="123"
                    pattern="[0-9]{3,4}"
                    maxLength="4"
                    required
                  />
                  <small>3 or 4 digit number on the back of your card</small>
                </div>
                <div className="form-group">
                  <label>Cardholder Name *</label>
                  <input
                    type="text"
                    placeholder="Name as on card"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="checkbox-option">
                    <input type="checkbox" />
                    Save this card for future payments
                  </label>
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowAddCard(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Add Card
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add UPI Modal */}
      {showAddUPI && (
        <div className="modal-overlay" onClick={() => setShowAddUPI(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add UPI ID</h3>
              <button className="modal-close" onClick={() => setShowAddUPI(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={(e) => { e.preventDefault(); setShowAddUPI(false); }}>
                <div className="form-group">
                  <label>UPI ID *</label>
                  <input
                    type="text"
                    placeholder="username@paytm"
                    pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+"
                    required
                  />
                  <small>Enter your UPI ID (e.g. username@paytm, user@phonepe)</small>
                </div>
                <div className="form-group">
                  <label>UPI Provider</label>
                  <select>
                    <option value="">Select Provider</option>
                    <option value="Paytm">Paytm</option>
                    <option value="PhonePe">PhonePe</option>
                    <option value="Google Pay">Google Pay</option>
                    <option value="BHIM">BHIM</option>
                    <option value="Amazon Pay">Amazon Pay</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="checkbox-option">
                    <input type="checkbox" defaultChecked />
                    Verify this UPI ID
                  </label>
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowAddUPI(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Add UPI ID
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
