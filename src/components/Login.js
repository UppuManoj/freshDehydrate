import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin, onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'user@admin.com' && password === 'P@ssw0rd') {
      onLogin();
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // In a real app, you would register the user
    setIsLoginView(true); // Switch to login view after signup
  };

  return (
    <div className="login-modal-backdrop">
      <div className="login-modal-content">
        <button className="close-modal-btn" onClick={onClose}>×</button>
        {isLoginView ? (
          <form onSubmit={handleLogin} className="login-form">
            <h2>Login</h2>
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
            <button type="submit">Login</button>
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
