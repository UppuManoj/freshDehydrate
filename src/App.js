import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SuperAdminApp from './admins/SuperAdmin/AdminApp';
import UserAdminApp from './admins/UserAdmin/AdminApp';
import UserApp from './admins/User/AdminApp';
import './App.css';

function AppContent() {
  const { currentUser } = useAuth();

  const renderAppByRole = () => {
    if (!currentUser) {
      // Show the regular user app with home page for non-logged-in users
      return <UserApp />;
    }

    switch (currentUser.role) {
      case 'superadmin':
        return <SuperAdminApp />;
      case 'useradmin':
        return <UserAdminApp />;
      case 'user':
      default:
        return <UserApp />;
    }
  };

  return (
    <div className="App">
      {renderAppByRole()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
