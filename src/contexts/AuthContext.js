import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Predefined user credentials
const USERS = [
  {
    email: 'superadmin@dehydrate.com',
    password: 'Superadmin@123',
    role: 'superadmin',
    name: 'Super Admin'
  },
  {
    email: 'useradmin@dehydrate.com',
    password: 'Useradmin@123',
    role: 'useradmin',
    name: 'User Admin'
  },
  {
    email: 'user@admin.com',
    password: 'User@123',
    role: 'user',
    name: 'User'
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored auth on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        const user = USERS.find(u => u.email === email && u.password === password);
        
        if (user) {
          const authUser = {
            email: user.email,
            role: user.role,
            name: user.name
          };
          setCurrentUser(authUser);
          localStorage.setItem('currentUser', JSON.stringify(authUser));
          resolve(authUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000); // 1 second delay to simulate network request
    });
  };

  const logout = () => {
    console.log('Logout function called'); // Debug log
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    // Redirect to home page after logout
    setTimeout(() => {
      window.location.href = '/';
    }, 100);
  };

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
