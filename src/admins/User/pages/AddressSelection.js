import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProfile } from '../../../contexts/ProfileContext';
import { 
  FaHome, 
  FaBuilding, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaArrowLeft, 
  FaMapMarkerAlt,
  FaTimes,
  FaCheck
} from 'react-icons/fa';
import './AddressSelection.css';

const AddressSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userAddressList, addAddress, updateAddress, removeAddress } = useProfile();
  
  const [orderData] = useState(location.state || {});
  const [selectedAddressId, setSelectedAddressId] = useState(
    userAddressList.find(addr => addr.isDefault)?.addressId || userAddressList[0]?.addressId
  );
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
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

  // Redirect if no order data
  React.useEffect(() => {
    if (!orderData.items || orderData.items.length === 0) {
      navigate('/cart');
    }
  }, [orderData, navigate]);

  const handleAddressFormChange = (field, value) => {
    setAddressForm(prev => ({
      ...prev,
      [field]: value
    }));
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
    setShowAddAddressModal(true);
  };

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
    setShowEditAddressModal(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    
    if (editingAddress) {
      // Update existing address
      updateAddress(editingAddress.addressId, addressForm);
      setShowEditAddressModal(false);
    } else {
      // Add new address
      addAddress(addressForm);
      setShowAddAddressModal(false);
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

  const handleRemoveAddress = (addressId) => {
    if (window.confirm('Are you sure you want to remove this address?')) {
      removeAddress(addressId);
      // If removed address was selected, select another one
      if (selectedAddressId === addressId) {
        const remainingAddresses = userAddressList.filter(addr => addr.addressId !== addressId);
        if (remainingAddresses.length > 0) {
          setSelectedAddressId(remainingAddresses[0].addressId);
        }
      }
    }
  };

  const handleContinueToPayment = () => {
    const selectedAddress = userAddressList.find(addr => addr.addressId === selectedAddressId);
    
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    // Navigate to payments with order data and selected address
    const updatedOrderData = {
      ...orderData,
      shippingAddress: selectedAddress
    };

    navigate('/payments', { state: updatedOrderData });
  };

  return (
    <div className="address-selection-page">
      <div className="address-selection-header">
        <button className="back-btn" onClick={() => navigate('/cart')}>
          <FaArrowLeft /> Back to Cart
        </button>
        <h2><FaMapMarkerAlt /> Select Delivery Address</h2>
        <p>Choose where you want your order delivered</p>
      </div>

      <div className="address-selection-container">
        <div className="address-selection-left">
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

        <div className="address-selection-right">
          {/* Address Selection */}
          <div className="address-selection-section">
            <div className="address-section-header">
              <h3>Delivery Addresses</h3>
              <button className="add-address-btn" onClick={handleAddNewAddress}>
                <FaPlus /> Add New Address
              </button>
            </div>

            <div className="addresses-list">
              {userAddressList.map(address => (
                <div 
                  key={address.addressId} 
                  className={`address-card ${selectedAddressId === address.addressId ? 'selected' : ''}`}
                  onClick={() => setSelectedAddressId(address.addressId)}
                >
                  <div className="address-card-header">
                    <div className="address-type">
                      <span className="address-type-icon">
                        {address.addressType === 'Home' ? <FaHome /> : <FaBuilding />}
                      </span>
                      <span className="address-type-label">{address.addressType}</span>
                      {address.isDefault && <span className="default-badge">Default</span>}
                    </div>
                    <div className="address-actions">
                      <button 
                        className="edit-address-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditAddress(address);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="remove-address-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveAddress(address.addressId);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
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
                  <div className="address-selection-indicator">
                    <input 
                      type="radio" 
                      name="selectedAddress" 
                      checked={selectedAddressId === address.addressId}
                      onChange={() => setSelectedAddressId(address.addressId)}
                    />
                    <span className="checkmark">
                      {selectedAddressId === address.addressId && <FaCheck />}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {userAddressList.length === 0 && (
              <div className="no-addresses">
                <FaMapMarkerAlt size={48} />
                <h4>No addresses found</h4>
                <p>Add a delivery address to continue with your order</p>
                <button className="add-first-address-btn" onClick={handleAddNewAddress}>
                  <FaPlus /> Add Your First Address
                </button>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <button
            className="continue-to-payment-btn"
            onClick={handleContinueToPayment}
            disabled={!selectedAddressId || userAddressList.length === 0}
          >
            Continue to Payment
          </button>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="modal-overlay" onClick={() => setShowAddAddressModal(false)}>
          <div className="address-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Address</h3>
              <button className="close-btn" onClick={() => setShowAddAddressModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={handleSaveAddress}>
                <div className="form-group">
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
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Enter full name" 
                      value={addressForm.fullName}
                      onChange={(e) => handleAddressFormChange('fullName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
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
                <div className="form-group">
                  <label>Address Line 1 *</label>
                  <input 
                    type="text" 
                    placeholder="House/Flat/Office No., Building Name" 
                    value={addressForm.addressLine1}
                    onChange={(e) => handleAddressFormChange('addressLine1', e.target.value)}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Address Line 2</label>
                  <input 
                    type="text" 
                    placeholder="Area, Street, Sector, Village" 
                    value={addressForm.addressLine2}
                    onChange={(e) => handleAddressFormChange('addressLine2', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input 
                      type="text" 
                      placeholder="Enter city" 
                      value={addressForm.cityName}
                      onChange={(e) => handleAddressFormChange('cityName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input 
                      type="text" 
                      placeholder="Enter state" 
                      value={addressForm.stateName}
                      onChange={(e) => handleAddressFormChange('stateName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
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
                <div className="form-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={addressForm.isDefault}
                      onChange={(e) => handleAddressFormChange('isDefault', e.target.checked)}
                    />
                    Set as default address
                  </label>
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowAddAddressModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Address Modal */}
      {showEditAddressModal && editingAddress && (
        <div className="modal-overlay" onClick={() => setShowEditAddressModal(false)}>
          <div className="address-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Address</h3>
              <button className="close-btn" onClick={() => setShowEditAddressModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-content">
              <form onSubmit={handleSaveAddress}>
                <div className="form-group">
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
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Enter full name" 
                      value={addressForm.fullName}
                      onChange={(e) => handleAddressFormChange('fullName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
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
                <div className="form-group">
                  <label>Address Line 1 *</label>
                  <input 
                    type="text" 
                    placeholder="House/Flat/Office No., Building Name" 
                    value={addressForm.addressLine1}
                    onChange={(e) => handleAddressFormChange('addressLine1', e.target.value)}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Address Line 2</label>
                  <input 
                    type="text" 
                    placeholder="Area, Street, Sector, Village" 
                    value={addressForm.addressLine2}
                    onChange={(e) => handleAddressFormChange('addressLine2', e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input 
                      type="text" 
                      placeholder="Enter city" 
                      value={addressForm.cityName}
                      onChange={(e) => handleAddressFormChange('cityName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input 
                      type="text" 
                      placeholder="Enter state" 
                      value={addressForm.stateName}
                      onChange={(e) => handleAddressFormChange('stateName', e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-group">
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
                <div className="form-group">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={addressForm.isDefault}
                      onChange={(e) => handleAddressFormChange('isDefault', e.target.checked)}
                    />
                    Set as default address
                  </label>
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowEditAddressModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-btn">
                    Update Address
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

export default AddressSelection;
