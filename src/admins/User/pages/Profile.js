import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useOrders } from '../../../contexts/OrderContext';
import { useProfile } from '../../../contexts/ProfileContext';
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
  FaRupeeSign,
  FaDownload,
  FaCheckCircle,
  FaClock,
  FaTruck
} from 'react-icons/fa';
import './Profile.css';

const UserProfileDashboard = () => {
  const { logout } = useAuth();
  const { orderStats } = useOrders();
  const { 
    userProfileInfo, 
    setUserProfileInfo,
    userAddressList, 
    savedPaymentCards, 
    savedUPIMethods, 
    savedWalletMethods,
    addAddress,
    updateAddress,
    removeAddress: removeAddressFromContext,
    removePaymentCard: removePaymentCardFromContext,
    removeUPIMethod: removeUPIMethodFromContext,
    removeWalletMethod: removeWalletMethodFromContext
  } = useProfile();
  const navigate = useNavigate();
  const [currentActiveTab, setCurrentActiveTab] = useState('dashboard');
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [showAddPaymentCard, setShowAddPaymentCard] = useState(false);
  const [showAddUPIMethod, setShowAddUPIMethod] = useState(false);
  const [showAddWalletMethod, setShowAddWalletMethod] = useState(false);
  const [showAddUserAddress, setShowAddUserAddress] = useState(false);
  const [showEditUserAddress, setShowEditUserAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  
  // Address form state
  const [addressForm, setAddressForm] = useState({
    addressType: '',
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    cityName: '',
    stateName: '',
    pinCode: '',
    isDefault: false
  });
  const [displayUPIQRCode, setDisplayUPIQRCode] = useState(false);
  const [selectedUPIForQR] = useState(null);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTrackOrder, setShowTrackOrder] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);


  // Sample order data - Set to empty array [] to test zero orders state
  const [userOrderHistory] = useState([
    {
      orderId: 'ORD001',
      orderDate: '2024-01-15',
      orderStatus: 'Delivered',
      orderTotal: 1250,
      itemCount: 3,
      productName: 'Dehydrated Mango Slices',
      deliveryDate: '2024-01-18',
      deliveredDate: '2024-01-18',
      paymentMode: 'UPI - manoj@paytm',
      paymentStatus: 'Paid',
      shippingAddress: userAddressList[0],
      items: [
        { name: 'Dehydrated Mango Slices', quantity: 2, price: 299, total: 598 },
        { name: 'Apple Chips', quantity: 1, price: 199, total: 199 },
        { name: 'Mixed Nuts', quantity: 1, price: 399, total: 399 }
      ],
      subtotal: 1196,
      shipping: 54,
      tax: 0,
      discount: 0,
      trackingInfo: [
        { status: 'Order Placed', date: '2024-01-15', time: '10:30 AM', completed: true },
        { status: 'Order Confirmed', date: '2024-01-15', time: '11:15 AM', completed: true },
        { status: 'Packed', date: '2024-01-16', time: '09:00 AM', completed: true },
        { status: 'Shipped', date: '2024-01-16', time: '02:30 PM', completed: true },
        { status: 'Out for Delivery', date: '2024-01-18', time: '08:00 AM', completed: true },
        { status: 'Delivered', date: '2024-01-18', time: '11:45 AM', completed: true }
      ]
    },
    {
      orderId: 'ORD002',
      orderDate: '2024-01-20',
      orderStatus: 'Shipped',
      orderTotal: 850,
      itemCount: 2,
      productName: 'Mixed Vegetable Chips',
      deliveryDate: '2024-01-23',
      paymentMode: 'Credit Card - **** 1234',
      paymentStatus: 'Paid',
      shippingAddress: userAddressList[1],
      items: [
        { name: 'Mixed Vegetable Chips', quantity: 2, price: 249, total: 498 },
        { name: 'Tomato Slices', quantity: 1, price: 299, total: 299 }
      ],
      subtotal: 797,
      shipping: 53,
      tax: 0,
      discount: 0,
      trackingInfo: [
        { status: 'Order Placed', date: '2024-01-20', time: '02:15 PM', completed: true },
        { status: 'Order Confirmed', date: '2024-01-20', time: '02:45 PM', completed: true },
        { status: 'Packed', date: '2024-01-21', time: '10:30 AM', completed: true },
        { status: 'Shipped', date: '2024-01-21', time: '04:00 PM', completed: true },
        { status: 'Out for Delivery', date: '2024-01-23', time: '09:00 AM', completed: false },
        { status: 'Delivered', date: '2024-01-23', time: 'Expected by 6:00 PM', completed: false }
      ]
    },
    {
      orderId: 'ORD003',
      orderDate: '2024-01-25',
      orderStatus: 'Processing',
      orderTotal: 650,
      itemCount: 1,
      productName: 'Banana Powder',
      deliveryDate: '2024-01-28',
      paymentMode: 'Paytm Wallet',
      paymentStatus: 'Paid',
      shippingAddress: userAddressList[0],
      items: [
        { name: 'Banana Powder', quantity: 1, price: 599, total: 599 }
      ],
      subtotal: 599,
      shipping: 51,
      tax: 0,
      discount: 0,
      trackingInfo: [
        { status: 'Order Placed', date: '2024-01-25', time: '11:20 AM', completed: true },
        { status: 'Order Confirmed', date: '2024-01-25', time: '11:50 AM', completed: true },
        { status: 'Packed', date: '2024-01-26', time: 'Expected by 2:00 PM', completed: false },
        { status: 'Shipped', date: '2024-01-26', time: 'Expected by 5:00 PM', completed: false },
        { status: 'Out for Delivery', date: '2024-01-28', time: 'Expected by 10:00 AM', completed: false },
        { status: 'Delivered', date: '2024-01-28', time: 'Expected by 6:00 PM', completed: false }
      ]
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
    removePaymentCardFromContext(cardId);
  };

  const removeUPIMethod = (upiId) => {
    removeUPIMethodFromContext(upiId);
  };

  const removeWalletMethod = (walletId) => {
    removeWalletMethodFromContext(walletId);
  };

  const removeUserAddress = (addressId) => {
    removeAddressFromContext(addressId);
  };

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleTrackOrder = (order) => {
    setTrackingOrder(order);
    setShowTrackOrder(true);
  };

  const generateInvoicePDF = (order) => {
    // Create a simple invoice content
    const invoiceContent = `
      FRESH DEHYDRATE - INVOICE
      
      Order ID: ${order.orderId}
      Order Date: ${new Date(order.orderDate).toLocaleDateString()}
      
      Bill To:
      ${order.shippingAddress.fullName}
      ${order.shippingAddress.addressLine1}
      ${order.shippingAddress.addressLine2}
      ${order.shippingAddress.cityName}, ${order.shippingAddress.stateName} - ${order.shippingAddress.pinCode}
      Phone: ${order.shippingAddress.phoneNumber}
      
      Items:
      ${order.items.map(item => 
        `${item.name} - Qty: ${item.quantity} - ₹${item.price} each - Total: ₹${item.total}`
      ).join('\n')}
      
      Subtotal: ₹${order.subtotal}
      Shipping: ₹${order.shipping}
      Tax: ₹${order.tax}
      Discount: ₹${order.discount}
      
      Total Amount: ₹${order.orderTotal}
      
      Payment Mode: ${order.paymentMode}
      Payment Status: ${order.paymentStatus}
      
      Thank you for shopping with Fresh Dehydrate!
    `;

    // Create and download the invoice as a text file (in a real app, you'd use a PDF library)
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${order.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Address management functions
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressForm({
      addressType: address.addressType,
      fullName: address.fullName,
      phoneNumber: address.phoneNumber,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      cityName: address.cityName,
      stateName: address.stateName,
      pinCode: address.pinCode,
      isDefault: address.isDefault
    });
    setShowEditUserAddress(true);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      addressType: '',
      fullName: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      cityName: '',
      stateName: '',
      pinCode: '',
      isDefault: false
    });
    setShowAddUserAddress(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    
    if (editingAddress) {
      // Update existing address
      updateAddress(editingAddress.addressId, addressForm);
      setShowEditUserAddress(false);
    } else {
      // Add new address
      addAddress(addressForm);
      setShowAddUserAddress(false);
    }
    
    // Reset form
    setAddressForm({
      addressType: '',
      fullName: '',
      phoneNumber: '',
      addressLine1: '',
      addressLine2: '',
      cityName: '',
      stateName: '',
      pinCode: '',
      isDefault: false 
    });
  };

  const handleAddressFormChange = (field, value) => {
    setAddressForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

 

  const navigationMenuItems = [
    { 
      tabId: 'dashboard', 
      tabIcon: <FaUser />, 
      tabTitle: 'Profile Dashboard', 
      tabSubtitle: 'View & edit your personal information'
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
                    <button className="track-order-button" onClick={() => handleTrackOrder(order)}>
                      Track Order
                    </button>
                    <button className="view-details-button" onClick={() => handleViewOrderDetails(order)}>
                      View Details
                    </button>
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
        <button className="add-address-button" onClick={handleAddNewAddress}>
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
              <button className="edit-address-button" onClick={() => handleEditAddress(address)}>
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
              <span className="user-display-name">{userProfileInfo.firstName} {userProfileInfo.lastName}</span>
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
              <form onSubmit={handleSaveAddress}>
                <div className="form-input-group">
                  <label>Address Type *</label>
                  <select 
                    value={addressForm.addressType}
                    onChange={(e) => handleAddressFormChange('addressType', e.target.value)}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-row-container">
                  <div className="form-input-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Enter full name" 
                      value={addressForm.fullName}
                      onChange={(e) => handleAddressFormChange('fullName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-input-group">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="Enter phone number" 
                      value={addressForm.phoneNumber}
                      onChange={(e) => handleAddressFormChange('phoneNumber', e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="form-input-group">
                  <label>Address Line 1 *</label>
                  <input 
                    type="text" 
                    placeholder="House/Flat/Office No., Building Name" 
                    value={addressForm.addressLine1}
                    onChange={(e) => handleAddressFormChange('addressLine1', e.target.value)}
                    required 
                  />
                </div>
                <div className="form-input-group">
                  <label>Address Line 2</label>
                  <input 
                    type="text" 
                    placeholder="Area, Street, Sector, Village" 
                    value={addressForm.addressLine2}
                    onChange={(e) => handleAddressFormChange('addressLine2', e.target.value)}
                  />
                </div>
                <div className="form-row-container">
                  <div className="form-input-group">
                    <label>City *</label>
                    <input 
                      type="text" 
                      placeholder="Enter city" 
                      value={addressForm.cityName}
                      onChange={(e) => handleAddressFormChange('cityName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-input-group">
                    <label>State *</label>
                    <input 
                      type="text" 
                      placeholder="Enter state" 
                      value={addressForm.stateName}
                      onChange={(e) => handleAddressFormChange('stateName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-input-group">
                    <label>PIN Code *</label>
                    <input 
                      type="text" 
                      placeholder="Enter PIN code" 
                      maxLength="6" 
                      value={addressForm.pinCode}
                      onChange={(e) => handleAddressFormChange('pinCode', e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="checkbox-input-label">
                    <input 
                      type="checkbox" 
                      checked={addressForm.isDefault}
                      onChange={(e) => handleAddressFormChange('isDefault', e.target.checked)}
                    />
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

      {/* Edit Address Modal */}
      {showEditUserAddress && editingAddress && (
        <div className="modal-overlay-background" onClick={() => setShowEditUserAddress(false)}>
          <div className="address-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="address-modal-header">
              <h3>Edit Address</h3>
              <button className="modal-close-button" onClick={() => setShowEditUserAddress(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="address-modal-content">
              <form onSubmit={handleSaveAddress}>
                <div className="form-input-group">
                  <label>Address Type *</label>
                  <select 
                    value={addressForm.addressType}
                    onChange={(e) => handleAddressFormChange('addressType', e.target.value)}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-row-container">
                  <div className="form-input-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Enter full name" 
                      value={addressForm.fullName}
                      onChange={(e) => handleAddressFormChange('fullName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-input-group">
                    <label>Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="Enter phone number" 
                      value={addressForm.phoneNumber}
                      onChange={(e) => handleAddressFormChange('phoneNumber', e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="form-input-group">
                  <label>Address Line 1 *</label>
                  <input 
                    type="text" 
                    placeholder="House/Flat/Office No., Building Name" 
                    value={addressForm.addressLine1}
                    onChange={(e) => handleAddressFormChange('addressLine1', e.target.value)}
                    required 
                  />
                </div>
                <div className="form-input-group">
                  <label>Address Line 2</label>
                  <input 
                    type="text" 
                    placeholder="Area, Street, Sector, Village" 
                    value={addressForm.addressLine2}
                    onChange={(e) => handleAddressFormChange('addressLine2', e.target.value)}
                  />
                </div>
                <div className="form-row-container">
                  <div className="form-input-group">
                    <label>City *</label>
                    <input 
                      type="text" 
                      placeholder="Enter city" 
                      value={addressForm.cityName}
                      onChange={(e) => handleAddressFormChange('cityName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-input-group">
                    <label>State *</label>
                    <input 
                      type="text" 
                      placeholder="Enter state" 
                      value={addressForm.stateName}
                      onChange={(e) => handleAddressFormChange('stateName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-input-group">
                    <label>PIN Code *</label>
                    <input 
                      type="text" 
                      placeholder="Enter PIN code" 
                      maxLength="6" 
                      value={addressForm.pinCode}
                      onChange={(e) => handleAddressFormChange('pinCode', e.target.value)}
                      required 
                    />
                  </div>
                </div>
                <div className="form-input-group">
                  <label className="checkbox-input-label">
                    <input 
                      type="checkbox" 
                      checked={addressForm.isDefault}
                      onChange={(e) => handleAddressFormChange('isDefault', e.target.checked)}
                    />
                    Set as default address
                  </label>
                </div>
                <div className="modal-action-buttons">
                  <button type="button" className="cancel-modal-button" onClick={() => setShowEditUserAddress(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-modal-button">
                    Update Address
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

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="modal-overlay-background" onClick={() => setShowOrderDetails(false)}>
          <div className="order-details-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="order-details-modal-header">
              <h3>Order Details - #{selectedOrder.orderId}</h3>
              <button className="modal-close-button" onClick={() => setShowOrderDetails(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="order-details-modal-content">
              {/* Order Status */}
              <div className="order-detail-section">
                <h4>Order Status</h4>
                <div className="order-status-info">
                  <span className={`order-status status-${selectedOrder.orderStatus.toLowerCase()}`}>
                    {selectedOrder.orderStatus}
                  </span>
                  <span className="order-date-info">
                    Ordered on {new Date(selectedOrder.orderDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Items Ordered */}
              <div className="order-detail-section">
                <h4>Items Ordered</h4>
                <div className="order-items-list">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="order-item-row">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">Qty: {item.quantity}</span>
                      </div>
                      <div className="item-pricing">
                        <span className="item-price">₹{item.price} each</span>
                        <span className="item-total">₹{item.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Information */}
              <div className="order-detail-section">
                <h4>Payment Information</h4>
                <div className="payment-info-grid">
                  <div className="payment-info-item">
                    <span className="info-label">Payment Mode:</span>
                    <span className="info-value">{selectedOrder.paymentMode}</span>
                  </div>
                  <div className="payment-info-item">
                    <span className="info-label">Payment Status:</span>
                    <span className={`info-value payment-${selectedOrder.paymentStatus.toLowerCase()}`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="order-detail-section">
                <h4>Delivery Information</h4>
                <div className="delivery-info">
                  <div className="delivery-address">
                    <strong>{selectedOrder.shippingAddress.fullName}</strong><br />
                    {selectedOrder.shippingAddress.addressLine1}<br />
                    {selectedOrder.shippingAddress.addressLine2}<br />
                    {selectedOrder.shippingAddress.cityName}, {selectedOrder.shippingAddress.stateName} - {selectedOrder.shippingAddress.pinCode}<br />
                    Phone: {selectedOrder.shippingAddress.phoneNumber}
                  </div>
                  <div className="delivery-status">
                    {selectedOrder.orderStatus === 'Delivered' ? (
                      <span className="delivered-info">
                        <FaCheckCircle /> Delivered on {new Date(selectedOrder.deliveredDate).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="expected-delivery">
                        Expected delivery: {new Date(selectedOrder.deliveryDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="order-detail-section">
                <h4>Order Summary</h4>
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.subtotal}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>₹{selectedOrder.shipping}</span>
                  </div>
                  {selectedOrder.tax > 0 && (
                    <div className="summary-row">
                      <span>Tax:</span>
                      <span>₹{selectedOrder.tax}</span>
                    </div>
                  )}
                  {selectedOrder.discount > 0 && (
                    <div className="summary-row discount">
                      <span>Discount:</span>
                      <span>-₹{selectedOrder.discount}</span>
                    </div>
                  )}
                  <div className="summary-row total">
                    <span>Total Amount:</span>
                    <span>₹{selectedOrder.orderTotal}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="order-details-actions">
                <button className="download-invoice-button" onClick={() => generateInvoicePDF(selectedOrder)}>
                  <FaDownload /> Download Invoice
                </button>
                <button className="track-order-button" onClick={() => {
                  setShowOrderDetails(false);
                  handleTrackOrder(selectedOrder);
                }}>
                  <FaTruck /> Track Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Track Order Modal */}
      {showTrackOrder && trackingOrder && (
        <div className="modal-overlay-background" onClick={() => setShowTrackOrder(false)}>
          <div className="track-order-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="track-order-modal-header">
              <h3>Track Order - #{trackingOrder.orderId}</h3>
              <button className="modal-close-button" onClick={() => setShowTrackOrder(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="track-order-modal-content">
              <div className="tracking-header">
                <div className="tracking-order-info">
                  <h4>{trackingOrder.productName}</h4>
                  <p>{trackingOrder.itemCount} item{trackingOrder.itemCount > 1 ? 's' : ''} • ₹{trackingOrder.orderTotal}</p>
                </div>
                <div className="tracking-expected-delivery">
                  {trackingOrder.orderStatus === 'Delivered' ? (
                    <span className="delivered-status">
                      <FaCheckCircle /> Delivered on {new Date(trackingOrder.deliveredDate).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="expected-status">
                      Expected delivery: {new Date(trackingOrder.deliveryDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="tracking-timeline">
                {trackingOrder.trackingInfo.map((track, index) => (
                  <div key={index} className={`tracking-step ${track.completed ? 'completed' : 'pending'}`}>
                    <div className="tracking-step-icon">
                      {track.completed ? (
                        <FaCheckCircle />
                      ) : (
                        <FaClock />
                      )}
                    </div>
                    <div className="tracking-step-content">
                      <div className="tracking-step-title">{track.status}</div>
                      <div className="tracking-step-datetime">
                        {track.date} • {track.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="tracking-delivery-address">
                <h4>Delivery Address</h4>
                <div className="address-info">
                  <strong>{trackingOrder.shippingAddress.fullName}</strong><br />
                  {trackingOrder.shippingAddress.addressLine1}<br />
                  {trackingOrder.shippingAddress.addressLine2}<br />
                  {trackingOrder.shippingAddress.cityName}, {trackingOrder.shippingAddress.stateName} - {trackingOrder.shippingAddress.pinCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDashboard;