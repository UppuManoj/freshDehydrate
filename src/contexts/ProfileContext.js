import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  // User profile information
  const [userProfileInfo, setUserProfileInfo] = useState({
    firstName: 'Manoj',
    lastName: 'Kumar',
    emailAddress: 'smartmanoj621@gmail.com',
    phoneNumber: '+916303060469',
    birthDate: '15/08/1990',
    currentAddress: 'Bangalore, Karnataka'
  });

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

  // Functions to add new addresses and payment methods
  const addAddress = (newAddress) => {
    const addressWithId = {
      ...newAddress,
      addressId: Date.now()
    };
    
    if (newAddress.isDefault) {
      setUserAddressList(prev => [
        ...prev.map(addr => ({ ...addr, isDefault: false })),
        addressWithId
      ]);
    } else {
      setUserAddressList(prev => [...prev, addressWithId]);
    }
  };

  const updateAddress = (addressId, updatedAddress) => {
    setUserAddressList(prev => 
      prev.map(address => 
        address.addressId === addressId 
          ? { ...address, ...updatedAddress }
          : address
      )
    );
  };

  const removeAddress = (addressId) => {
    setUserAddressList(prev => prev.filter(address => address.addressId !== addressId));
  };

  const addPaymentCard = (newCard) => {
    const cardWithId = {
      ...newCard,
      cardId: Date.now()
    };
    setSavedPaymentCards(prev => [...prev, cardWithId]);
  };

  const removePaymentCard = (cardId) => {
    setSavedPaymentCards(prev => prev.filter(card => card.cardId !== cardId));
  };

  const addUPIMethod = (newUPI) => {
    const upiWithId = {
      ...newUPI,
      upiId: Date.now()
    };
    setSavedUPIMethods(prev => [...prev, upiWithId]);
  };

  const removeUPIMethod = (upiId) => {
    setSavedUPIMethods(prev => prev.filter(upi => upi.upiId !== upiId));
  };

  const addWalletMethod = (newWallet) => {
    const walletWithId = {
      ...newWallet,
      walletId: Date.now()
    };
    setSavedWalletMethods(prev => [...prev, walletWithId]);
  };

  const removeWalletMethod = (walletId) => {
    setSavedWalletMethods(prev => prev.filter(wallet => wallet.walletId !== walletId));
  };

  const value = {
    // Profile data
    userProfileInfo,
    setUserProfileInfo,
    
    // Address data and functions
    userAddressList,
    setUserAddressList,
    addAddress,
    updateAddress,
    removeAddress,
    
    // Payment methods data and functions
    savedPaymentCards,
    setSavedPaymentCards,
    addPaymentCard,
    removePaymentCard,
    
    savedUPIMethods,
    setSavedUPIMethods,
    addUPIMethod,
    removeUPIMethod,
    
    savedWalletMethods,
    setSavedWalletMethods,
    addWalletMethod,
    removeWalletMethod
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
