import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useOrders } from '../../../contexts/OrderContext';
import { 
  FaUser, 
  FaShoppingCart, 
  FaHeart, 
  FaCreditCard, 
  FaGift, 
  FaBell, 
  FaSignOutAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronRight,
  FaPlus,
  FaTrash,
  FaWallet,
  FaMobile,
  FaQrcode,
  FaHome,
  FaBuilding,
  FaSearch,
  FaShoppingBag,
  FaCalendar,
  FaRupeeSign
} from 'react-icons/fa';
import './Profile.css';

const UserProfileDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { orders, orderStats } = useOrders();
  const navigate = useNavigate();
  const [currentActiveTab, setCurrentActiveTab] = useState('dashboard');
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [showAddPaymentCard, setShowAddPaymentCard] = useState(false);
  const [showAddUPIMethod, setShowAddUPIMethod] = useState(false);
  const [showAddWalletMethod, setShowAddWalletMethod] = useState(false);
  const [showAddUserAddress, setShowAddUserAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [displayUPIQRCode, setDisplayUPIQRCode] = useState(false);
  const [selectedUPIForQR, setSelectedUPIForQR] = useState(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');

  // User profile information
  const [userProfileInfo, setUserProfileInfo] = useState({
    firstName: 'Manoj',
    lastName: 'Kumar',
    emailAddress: 'smartmanoj621@gmail.com',
    phoneNumber: '+916303060469',
    birthDate: '15/08/1990',
    currentAddress: 'Bangalore, Karnataka'
  });

  // Payment methods data
  const [savedPaymentCards, setSavedPaymentCards] = useState([
    { 
      cardId: 1, 
      cardNumber: '**** **** **** 1234', 
      cardHolderName: 'Manoj Kumar', 
      expiryDate: '12/25', 
      cardType: 'Visa',
      isDefault: true 
    },
    { 
      cardId: 2, 
      cardNumber: '**** **** **** 5678', 
      cardHolderName: 'Manoj Kumar', 
      expiryDate: '08/26', 
      cardType: 'Mastercard',
      isDefault: false 
    }
  ]);

  const [savedUPIMethods, setSavedUPIMethods] = useState([
    { 
      upiId: 1, 
      upiAddress: 'manoj@paytm', 
      upiProvider: 'Paytm', 
      isVerified: true,
      isDefault: true 
    },
    { 
      upiId: 2, 
      upiAddress: 'manoj@phonepe', 
      upiProvider: 'PhonePe', 
      isVerified: true,
      isDefault: false 
    }
  ]);

  const [savedWalletMethods, setSavedWalletMethods] = useState([
    { 
      walletId: 1, 
      walletName: 'Paytm Wallet', 
      walletBalance: '₹1,250', 
      walletProvider: 'Paytm',
      isLinked: true 
    },
    { 
      walletId: 2, 
      walletName: 'PhonePe Wallet', 
      walletBalance: '₹850', 
      walletProvider: 'PhonePe',
      isLinked: true 
    }
  ]);

  // Sample order data - Set to empty array [] to test zero orders state
  const [userOrderHistory, setUserOrderHistory] = useState([
    {
      orderId: 'ORD001',
      orderDate: '2024-01-15',
      orderStatus: 'Delivered',
      orderTotal: 1250,
      itemCount: 3,
      productName: 'Dehydrated Mango Slices',
      deliveryDate: '2024-01-18'
    },
    {
      orderId: 'ORD002',
      orderDate: '2024-01-20',
      orderStatus: 'Shipped',
      orderTotal: 850,
      itemCount: 2,
      productName: 'Mixed Vegetable Chips',
      deliveryDate: '2024-01-23'
    },
    {
      orderId: 'ORD003',
      orderDate: '2024-01-25',
      orderStatus: 'Processing',
      orderTotal: 650,
      itemCount: 1,
      productName: 'Banana Powder',
      deliveryDate: '2024-01-28'
    }
  ]);

  // Address data
  const [userAddressList, setUserAddressList] = useState([
    {
      addressId: 1,
      addressType: 'Home',
      fullName: 'Manoj Kumar',
      phoneNumber: '+916303060469',
      addressLine1: '123 MG Road',
      addressLine2: 'Near City Mall',
      cityName: 'Bangalore',
      stateName: 'Karnataka',
      pinCode: '560001',
      isDefault: true
    },
    {
      addressId: 2,
      addressType: 'Office',
      fullName: 'Manoj Kumar',
      phoneNumber: '+916303060469',
      addressLine1: '456 Tech Park',
      addressLine2: 'Electronic City',
      cityName: 'Bangalore',
      stateName: 'Karnataka',
      pinCode: '560100',
      isDefault: false
    }
  ]);

  const handleUserLogout = () => {
    logout();
    navigate('/');
  };

  const handleCloseProfile = () => {
    navigate(-1); // Go back to previous page
  };

  const handleSaveUserProfile = () => {
    setIsEditingUserInfo(false);
  };

  const removePaymentCard = (cardId) => {
    setSavedPaymentCards(savedPaymentCards.filter(card => card.cardId !== cardId));
  };

  const removeUPIMethod = (upiId) => {
    setSavedUPIMethods(savedUPIMethods.filter(upi => upi.upiId !== upiId));
  };

  const removeWalletMethod = (walletId) => {
    setSavedWalletMethods(savedWalletMethods.filter(wallet => wallet.walletId !== walletId));
  };

  const removeUserAddress = (addressId) => {
    setUserAddressList(userAddressList.filter(address => address.addressId !== addressId));
  };

 

  const navigationMenuItems = [
    { 
      tabId: 'dashboard', 
      tabIcon: <FaUser />, 
      tabTitle: 'Profile Dashboard', 
      tabSubtitle: 'View and edit your personal information'
    },
    { 
      tabId: 'orderHistory', 
      tabIcon: <FaShoppingCart />, 
      tabTitle: 'Order History', 
      tabSubtitle: `${userOrderHistory.length} orders placed`
    },
    { 
      tabId: 'addressBook', 
      tabIcon: <FaMapMarkerAlt />, 
      tabTitle: 'Address Book', 
      tabSubtitle: 'Manage your delivery addresses'
    },
    { 
      tabId: 'paymentMethods', 
      tabIcon: <FaCreditCard />, 
      tabTitle: 'Payment Methods', 
      tabSubtitle: 'Manage cards, UPI, and wallets'
    },
    { 
      tabId: 'wishlistItems', 
      tabIcon: <FaHeart />, 
      tabTitle: 'My Wishlist', 
      tabSubtitle: 'Your favorite products',
      actionHandler: () => navigate('/favorites')
    },
    { 
      tabId: 'giftCardsVouchers', 
      tabIcon: <FaGift />, 
      tabTitle: 'Gift Cards & Vouchers', 
      tabSubtitle: 'View your gift cards and vouchers'
    },
    { 
      tabId: 'notificationSettings', 
      tabIcon: <FaBell />, 
      tabTitle: 'Notification Settings', 
      tabSubtitle: 'Manage your notification preferences'
    }
  ];

  const renderUserDashboard = () => (
    <div className="user-profile-dashboard">
      <div className="user-profile-header-section">
        <div className="user-profile-avatar-container">
          <FaUser />
        </div>
        <div className="user-profile-information">
          <h2>{userProfileInfo.firstName} {userProfileInfo.lastName}</h2>
          <p>{userProfileInfo.emailAddress}</p>
        </div>
        <button 
          className="edit-user-profile-button"
          onClick={() => setIsEditingUserInfo(!isEditingUserInfo)}
        >
          {isEditingUserInfo ? <FaTimes /> : <FaEdit />}
        </button>
      </div>

      <div className="user-profile-details-section">
        <h3>Personal Information</h3>
        <div className="user-details-grid">
          <div className="user-detail-item">
            <FaUser className="user-detail-icon" />
            <div className="user-detail-content">
              <label>Full Name</label>
              {isEditingUserInfo ? (
                <div className="edit-user-name-container">
                  <input
                    type="text"
                    value={userProfileInfo.firstName}
                    onChange={(e) => setUserProfileInfo({...userProfileInfo, firstName: e.target.value})}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    value={userProfileInfo.lastName}
                    onChange={(e) => setUserProfileInfo({...userProfileInfo, lastName: e.target.value})}
                    placeholder="Last Name"
                  />
                </div>
              ) : (
                <span>{userProfileInfo.firstName} {userProfileInfo.lastName}</span>
              )}
            </div>
          </div>

          <div className="user-detail-item">
            <FaEnvelope className="user-detail-icon" />
            <div className="user-detail-content">
              <label>Email Address</label>
              {isEditingUserInfo ? (
                <input
                  type="email"
                  value={userProfileInfo.emailAddress}
                  onChange={(e) => setUserProfileInfo({...userProfileInfo, emailAddress: e.target.value})}
                />
              ) : (
                <span>{userProfileInfo.emailAddress}</span>
              )}
            </div>
          </div>

          <div className="user-detail-item">
            <FaPhone className="user-detail-icon" />
            <div className="user-detail-content">
              <label>Phone Number</label>
              {isEditingUserInfo ? (
                <input
                  type="tel"
                  value={userProfileInfo.phoneNumber}
                  onChange={(e) => setUserProfileInfo({...userProfileInfo, phoneNumber: e.target.value})}
                />
              ) : (
                <span>{userProfileInfo.phoneNumber}</span>
              )}
            </div>
          </div>

          <div className="user-detail-item">
            <FaCalendarAlt className="user-detail-icon" />
            <div className="user-detail-content">
              <label>Date of Birth</label>
              {isEditingUserInfo ? (
                <input
                  type="date"
                  value={userProfileInfo.birthDate}
                  onChange={(e) => setUserProfileInfo({...userProfileInfo, birthDate: e.target.value})}
                />
              ) : (
                <span>{userProfileInfo.birthDate}</span>
              )}
            </div>
          </div>

          <div className="user-detail-item">
            <FaMapMarkerAlt className="user-detail-icon" />
            <div className="user-detail-content">
              <label>Current Address</label>
              {isEditingUserInfo ? (
                <textarea
                  value={userProfileInfo.currentAddress}
                  onChange={(e) => setUserProfileInfo({...userProfileInfo, currentAddress: e.target.value})}
                  rows="2"
                />
              ) : (
                <span>{userProfileInfo.currentAddress}</span>
              )}
            </div>
          </div>
        </div>

        {isEditingUserInfo && (
          <div className="user-edit-actions-container">
            <button className="save-user-profile-button" onClick={handleSaveUserProfile}>
              <FaSave /> Save Changes
            </button>
            <button className="cancel-user-edit-button" onClick={() => setIsEditingUserInfo(false)}>
              <FaTimes /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="user-quick-statistics">
        <h3>Quick Statistics</h3>
        <div className="user-stats-grid">
          <div className="user-stat-card">
            <FaShoppingCart />
            <div>
              <span className="user-stat-number">{orderStats?.totalOrders || 0}</span>
              <span className="user-stat-label">Total Orders</span>
            </div>
          </div>
          <div className="user-stat-card">
            <FaHeart />
            <div>
              <span className="user-stat-number">12</span>
              <span className="user-stat-label">Wishlist Items</span>
            </div>
          </div>
          <div className="user-stat-card">
            <FaGift />
            <div>
              <span className="user-stat-number">₹500</span>
              <span className="user-stat-label">Gift Card Balance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentMethodsSection = () => (
    <div className="payment-methods-section">
      <h2>Payment Methods</h2>
      <p>Manage your saved payment methods including cards, UPI, and wallets.</p>

      {/* Credit/Debit Cards */}
      <div className="payment-category-container">
        <div className="payment-category-header">
          <h3><FaCreditCard /> Credit & Debit Cards</h3>
          <button className="add-payment-method-button" onClick={() => setShowAddPaymentCard(true)}>
            <FaPlus /> Add Card
          </button>
        </div>
        <div className="payment-methods-grid">
          {savedPaymentCards.map(card => (
            <div key={card.cardId} className="payment-method-card">
              <div className="payment-card-info">
                <div className="payment-card-number">{card.cardNumber}</div>
                <div className="payment-card-details">
                  <span>{card.cardHolderName}</span>
                  <span>{card.expiryDate}</span>
                  <span className="payment-card-type">{card.cardType}</span>
                </div>
                {card.isDefault && <span className="default-payment-badge">Default</span>}
              </div>
              <button className="remove-payment-button" onClick={() => removePaymentCard(card.cardId)}>
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* UPI Methods */}
      <div className="payment-category-container">
        <div className="payment-category-header">
          <h3><FaMobile /> UPI Methods</h3>
          <button className="add-payment-method-button" onClick={() => setShowAddUPIMethod(true)}>
            <FaPlus /> Add UPI
          </button>
        </div>
        <div className="payment-methods-grid">
          {savedUPIMethods.map(upi => (
            <div key={upi.upiId} className="payment-method-card">
              <div className="payment-card-info">
                <div className="upi-address">{upi.upiAddress}</div>
                <div className="upi-provider">{upi.upiProvider}</div>
                {upi.isVerified && <span className="verified-upi-badge">Verified</span>}
                {upi.isDefault && <span className="default-payment-badge">Default</span>}
              </div>
              <div className="upi-actions">
                {/* <button className="show-qr-button" onClick={() => showUPIQRCode(upi)}>
                  <FaQrcode />
                </button> */}
                <button className="remove-payment-button" onClick={() => removeUPIMethod(upi.upiId)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wallet Methods */}
      <div className="payment-category-container">
        <div className="payment-category-header">
          <h3><FaWallet /> Digital Wallets</h3>
          <button className="add-payment-method-button" onClick={() => setShowAddWalletMethod(true)}>
            <FaPlus /> Add Wallet
          </button>
        </div>
        <div className="payment-methods-grid">
          {savedWalletMethods.map(wallet => (
            <div key={wallet.walletId} className="payment-method-card">
              <div className="payment-card-info">
                <div className="wallet-name">{wallet.walletName}</div>
                <div className="wallet-balance">{wallet.walletBalance}</div>
                <div className="wallet-provider">{wallet.walletProvider}</div>
                {wallet.isLinked && <span className="linked-wallet-badge">Linked</span>}
              </div>
              <button className="remove-payment-button" onClick={() => removeWalletMethod(wallet.walletId)}>
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOrderHistorySection = () => {
    // Filter orders based on search query
    const filteredOrders = userOrderHistory.filter(order => 
      order.orderId.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(orderSearchQuery.toLowerCase())
    );

    return (
      <div className="order-history-section">
        <div className="order-section-header">
          <h2>Order History</h2>
          <div className="order-search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search orders by ID, product, or status..."
              value={orderSearchQuery}
              onChange={(e) => setOrderSearchQuery(e.target.value)}
              className="order-search-input"
            />
          </div>
        </div>
        <p>Track and manage all your orders in one place.</p>

        {userOrderHistory.length === 0 ? (
          <div className="no-orders-container">
            <FaShoppingBag size={64} />
            <h3>No Orders Yet</h3>
            <p>You haven't initiated any orders yet. Start shopping to see your order history here!</p>
            <button className="start-shopping-button" onClick={() => navigate('/products')}>
              Start Shopping
            </button>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="no-search-results">
            <FaSearch size={48} />
            <h3>No Orders Found</h3>
            <p>No orders match your search criteria. Try different keywords.</p>
          </div>
        ) : (
          <div className="orders-grid">
            {filteredOrders.map(order => (
              <div key={order.orderId} className="order-card">
                <div className="order-header">
                  <div className="order-id-date">
                    <span className="order-id">#{order.orderId}</span>
                    <span className="order-date">
                      <FaCalendar /> {new Date(order.orderDate).toLocaleDateString()}
                    </span>
                  </div>
                  <span className={`order-status status-${order.orderStatus.toLowerCase()}`}>
                    {order.orderStatus}
                  </span>
                </div>
                <div className="order-details">
                  <div className="order-product">
                    <FaShoppingBag />
                    <div>
                      <div className="product-name">{order.productName}</div>
                      <div className="item-count">{order.itemCount} item{order.itemCount > 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  <div className="order-total">
                    <FaRupeeSign />
                    <span>₹{order.orderTotal}</span>
                  </div>
                </div>
                <div className="order-footer">
                  <span className="delivery-date">
                    Expected delivery: {new Date(order.deliveryDate).toLocaleDateString()}
                  </span>
                  <div className="order-actions">
                    <button className="track-order-button">Track Order</button>
                    <button className="view-details-button">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAddressBookSection = () => (
    <div className="address-book-section">
      <div className="address-section-header">
        <h2>Address Book</h2>
        <button className="add-address-button" onClick={() => setShowAddUserAddress(true)}>
          <FaPlus /> Add New Address
        </button>
      </div>
      <p>Manage your delivery addresses for faster checkout.</p>

      <div className="user-addresses-grid">
        {userAddressList.map(address => (
          <div key={address.addressId} className="user-address-card">
            <div className="address-type-header">
              <span className="address-type-icon">
                {address.addressType === 'Home' ? <FaHome /> : <FaBuilding />}
              </span>
              <span className="address-type-label">{address.addressType}</span>
              {address.isDefault && <span className="default-address-badge">Default</span>}
            </div>
            <div className="address-details">
              <div className="address-name">{address.fullName}</div>
              <div className="address-phone">{address.phoneNumber}</div>
              <div className="address-lines">
                <div>{address.addressLine1}</div>
                <div>{address.addressLine2}</div>
                <div>{address.cityName}, {address.stateName} - {address.pinCode}</div>
              </div>
            </div>
            <div className="address-actions">
              <button className="edit-address-button" onClick={() => setEditingAddressId(address.addressId)}>
                <FaEdit />
              </button>
              <button className="remove-address-button" onClick={() => removeUserAddress(address.addressId)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (currentActiveTab) {
      case 'dashboard':
        return renderUserDashboard();
      case 'orderHistory':
        return renderOrderHistorySection();
      case 'paymentMethods':
        return renderPaymentMethodsSection();
      case 'addressBook':
        return renderAddressBookSection();
      case 'giftCardsVouchers':
        return (
          <div className="tab-content-section">
            <h2>Gift Cards & Vouchers</h2>
            <p>View and manage your gift cards and promotional vouchers.</p>
            <div className="coming-soon-container">
              <FaGift size={48} />
              <p>Gift card management coming soon!</p>
            </div>
          </div>
        );
      case 'notificationSettings':
        return (
          <div className="tab-content-section">
            <h2>Notification Settings</h2>
            <p>Manage how you want to receive notifications.</p>
            <div className="coming-soon-container">
              <FaBell size={48} />
              <p>Notification settings coming soon!</p>
            </div>
          </div>
        );
      default:
        return renderUserDashboard();
    }
  };

  return (
    <div className="user-profile-page">
      <div className="user-profile-container">
        {/* Profile Sidebar */}
        <div className="user-profile-sidebar">
          <div className="user-greeting-section">
            <div className="user-avatar-display">
              <FaUser />
            </div>
            <div className="user-greeting-text">
              <span className="user-greeting">Hello,</span>
              <span className="user-display-name">{userProfileInfo.firstName}</span>
            </div>
            <button className="close-profile-button" onClick={handleCloseProfile}>
              <FaTimes />
            </button>
          </div>

          <div className="user-profile-navigation">
            {navigationMenuItems.map((menuItem) => (
              <div
                key={menuItem.tabId}
                className={`navigation-menu-item ${currentActiveTab === menuItem.tabId ? 'active' : ''}`}
                onClick={() => {
                  if (menuItem.actionHandler) {
                    menuItem.actionHandler();
                  } else {
                    setCurrentActiveTab(menuItem.tabId);
                  }
                }}
              >
                <div className="menu-item-content-wrapper">
                  <span className="menu-item-icon">{menuItem.tabIcon}</span>
                  <div className="menu-item-text-content">
                    <span className="menu-item-title">{menuItem.tabTitle}</span>
                    <span className="menu-item-subtitle">{menuItem.tabSubtitle}</span>
                  </div>
                </div>
                <FaChevronRight className="menu-navigation-arrow" />
              </div>
            ))}
            
            <div className="menu-section-divider"></div>
            
            <div className="navigation-menu-item logout-menu-item" onClick={handleUserLogout}>
              <div className="menu-item-content-wrapper">
                <span className="menu-item-icon"><FaSignOutAlt /></span>
                <div className="menu-item-text-content">
                  <span className="menu-item-title">Logout</span>
                  <span className="menu-item-subtitle">Sign out of your account</span>
                </div>
              </div>
              <FaChevronRight className="menu-navigation-arrow" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="user-profile-main-content">
          {renderTabContent()}
        </div>
      </div>

      {/* Add Payment Card Modal */}
      {showAddPaymentCard && (
        <div className="modal-overlay-background" onClick={() => setShowAddPaymentCard(false)}>
          <div className="payment-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="payment-modal-header">
              <h3>Add New Payment Card</h3>
              <button className="modal-close-button" onClick={() => setShowAddPaymentCard(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="payment-modal-content">
              <form onSubmit={(e) => { e.preventDefault(); setShowAddPaymentCard(false); }}>
                <div className="form-input-group">
                  <label>Card Number *</label>
                  <input type="text" placeholder="1234 5678 9012 3456" maxLength="19" required />
                </div>
                <div className="form-input-group">
                  <label>Cardholder Name *</label>
                  <input type="text" placeholder="Name as on card" required />
                </div>
                <div className="form-row-container">
                  <div className="form-input-group">
                    <label>Expiry Date *</label>
                    <input type="text" placeholder="MM/YY" maxLength="5" required />
                  </div>
                  <div className="form-input-group">
                    <label>CVV *</label>
                    <input type="text" placeholder="123" maxLength="4" required />
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="checkbox-input-label">
                    <input type="checkbox" />
                    Set as default payment method
                  </label>
                </div>
                <div className="modal-action-buttons">
                  <button type="button" className="cancel-modal-button" onClick={() => setShowAddPaymentCard(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-modal-button">
                    Add Card
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add UPI Modal */}
      {showAddUPIMethod && (
        <div className="modal-overlay-background" onClick={() => setShowAddUPIMethod(false)}>
          <div className="payment-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="payment-modal-header">
              <h3>Add UPI Method</h3>
              <button className="modal-close-button" onClick={() => setShowAddUPIMethod(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="payment-modal-content">
              <form onSubmit={(e) => { e.preventDefault(); setShowAddUPIMethod(false); }}>
                <div className="form-input-group">
                  <label>UPI ID *</label>
                  <input type="text" placeholder="username@paytm" required />
                </div>
                <div className="form-input-group">
                  <label>UPI Provider</label>
                  <select>
                    <option value="">Select Provider</option>
                    <option value="Paytm">Paytm</option>
                    <option value="PhonePe">PhonePe</option>
                    <option value="Google Pay">Google Pay</option>
                    <option value="BHIM">BHIM</option>
                    <option value="Amazon Pay">Amazon Pay</option>
                  </select>
                </div>
                <div className="form-input-group">
                  <label className="checkbox-input-label">
                    <input type="checkbox" defaultChecked />
                    Verify this UPI ID
                  </label>
                </div>
                <div className="modal-action-buttons">
                  <button type="button" className="cancel-modal-button" onClick={() => setShowAddUPIMethod(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-modal-button">
                    Add UPI
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Wallet Modal */}
      {showAddWalletMethod && (
        <div className="modal-overlay-background" onClick={() => setShowAddWalletMethod(false)}>
          <div className="payment-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="payment-modal-header">
              <h3>Link Digital Wallet</h3>
              <button className="modal-close-button" onClick={() => setShowAddWalletMethod(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="payment-modal-content">
              <form onSubmit={(e) => { e.preventDefault(); setShowAddWalletMethod(false); }}>
                <div className="form-input-group">
                  <label>Wallet Provider *</label>
                  <select required>
                    <option value="">Select Wallet</option>
                    <option value="Paytm">Paytm Wallet</option>
                    <option value="PhonePe">PhonePe Wallet</option>
                    <option value="Amazon Pay">Amazon Pay</option>
                    <option value="Mobikwik">Mobikwik</option>
                    <option value="Freecharge">Freecharge</option>
                  </select>
                </div>
                <div className="form-input-group">
                  <label>Mobile Number *</label>
                  <input type="tel" placeholder="Enter mobile number" required />
                </div>
                <div className="modal-action-buttons">
                  <button type="button" className="cancel-modal-button" onClick={() => setShowAddWalletMethod(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-modal-button">
                    Link Wallet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {showAddUserAddress && (
        <div className="modal-overlay-background" onClick={() => setShowAddUserAddress(false)}>
          <div className="address-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="address-modal-header">
              <h3>Add New Address</h3>
              <button className="modal-close-button" onClick={() => setShowAddUserAddress(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="address-modal-content">
              <form onSubmit={(e) => { e.preventDefault(); setShowAddUserAddress(false); }}>
                <div className="form-input-group">
                  <label>Address Type *</label>
                  <select required>
                    <option value="">Select Type</option>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-row-container">
                  <div className="form-input-group">
                    <label>Full Name *</label>
                    <input type="text" placeholder="Enter full name" required />
                  </div>
                  <div className="form-input-group">
                    <label>Phone Number *</label>
                    <input type="tel" placeholder="Enter phone number" required />
                  </div>
                </div>
                <div className="form-input-group">
                  <label>Address Line 1 *</label>
                  <input type="text" placeholder="House/Flat/Office No., Building Name" required />
                </div>
                <div className="form-input-group">
                  <label>Address Line 2</label>
                  <input type="text" placeholder="Area, Street, Sector, Village" />
                </div>
                <div className="form-row-container">
                  <div className="form-input-group">
                    <label>City *</label>
                    <input type="text" placeholder="Enter city" required />
                  </div>
                  <div className="form-input-group">
                    <label>State *</label>
                    <input type="text" placeholder="Enter state" required />
                  </div>
                  <div className="form-input-group">
                    <label>PIN Code *</label>
                    <input type="text" placeholder="Enter PIN code" maxLength="6" required />
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="checkbox-input-label">
                    <input type="checkbox" />
                    Set as default address
                  </label>
                </div>
                <div className="modal-action-buttons">
                  <button type="button" className="cancel-modal-button" onClick={() => setShowAddUserAddress(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-modal-button">
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* UPI QR Code Modal */}
      {displayUPIQRCode && selectedUPIForQR && (
        <div className="modal-overlay-background" onClick={() => setDisplayUPIQRCode(false)}>
          <div className="qr-code-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="qr-modal-header">
              <h3>UPI QR Code</h3>
              <button className="modal-close-button" onClick={() => setDisplayUPIQRCode(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="qr-modal-content">
              <div className="qr-code-display">
                <div className="qr-code-placeholder">
                  <FaQrcode size={120} />
                  <p>QR Code for {selectedUPIForQR.upiAddress}</p>
                </div>
              </div>
              <div className="qr-code-info">
                <p><strong>UPI ID:</strong> {selectedUPIForQR.upiAddress}</p>
                <p><strong>Provider:</strong> {selectedUPIForQR.upiProvider}</p>
                <p className="qr-code-instruction">Scan this QR code to make payments</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDashboard;