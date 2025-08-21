import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import './Login.css';

const Login = ({ onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      onClose(); // Close the login modal after successful login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // In a real app, you would register the user
    setIsLoginView(true); // Switch to login view after signup
  };

  const fillCredentials = (userType) => {
    switch (userType) {
      case 'superadmin':
        setEmail('superadmin@dehydrate.com');
        setPassword('Superadmin@123');
        break;
      case 'useradmin':
        setEmail('useradmin@dehydrate.com');
        setPassword('Useradmin@123');
        break;
      case 'user':
        setEmail('user@admin.com');
        setPassword('User@123');
        break;
      default:
        break;
    }
  };

  return (
    <div className="login-modal-backdrop">
      <div className="login-modal-content">
        <button className="close-modal-btn" onClick={onClose}>×</button>
        {isLoginView ? (
          <form onSubmit={handleLogin} className="login-form">
            <h2>Login to Fresh Dehydrator</h2>
            {error && <p className="error-message">{error}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            {/* <div className="demo-credentials">
              <h4>Quick Login (Demo):</h4>
              <div className="credential-buttons">
                <button 
                  type="button" 
                  className="demo-btn superadmin-btn"
                  onClick={() => fillCredentials('superadmin')}
                >
                  Super Admin
                </button>
                <button 
                  type="button" 
                  className="demo-btn useradmin-btn"
                  onClick={() => fillCredentials('useradmin')}
                >
                  User Admin
                </button>
                <button 
                  type="button" 
                  className="demo-btn user-btn"
                  onClick={() => fillCredentials('user')}
                >
                  User
                </button>
              </div>
              <div className="credentials-info">
                <p><small><strong>Super Admin:</strong> superadmin@dehydrate.com</small></p>
                <p><small><strong>User Admin:</strong> useradmin@dehydrate.com</small></p>
                <p><small><strong>User:</strong> user@admin.com</small></p>
              </div>
            </div> */}
            
            <p>Don't have an account? <span onClick={() => setIsLoginView(false)}>Sign up</span></p>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="signup-form">
            <h2>Sign Up</h2>
            <input type="text" placeholder="Full Name" required />
            <input type="number" placeholder="Phone Number" required />
            <input type="email" placeholder="Email ID" required />
            <input type="text" placeholder="Address" required />
            <input type="text" placeholder="State" required />
            <input type="text" placeholder="City" required />
            <input type="number" placeholder="Pincode" required />
            <input type="password" placeholder="Create Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button type="submit">Create Account</button>
            <p>Already have an account? <span onClick={() => setIsLoginView(true)}>Login</span></p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
