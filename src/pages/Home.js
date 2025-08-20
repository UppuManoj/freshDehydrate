import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Experience Freshness, Dehydrated.</h1>
          <p>High-quality dehydrated fruits and vegetables, delivered to your door.</p>
          <button className="cta-button" onClick={() => navigate('/products')}>Shop Now</button>
        </div>
      </header>

      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Premium Quality</h3>
            <p>We source the best produce to ensure maximum flavor and nutritional value.</p>
          </div>
          <div className="feature-item">
            <h3>Long Shelf Life</h3>
            <p>Our dehydration process preserves food for months without any additives.</p>
          </div>
          <div className="feature-item">
            <h3>Healthy & Convenient</h3>
            <p>A perfect snack for a healthy lifestyle, ready anytime, anywhere.</p>
          </div>
        </div>
      </section>

      <section className="call-to-action-section">
        <h2>Ready to Taste the Difference?</h2>
        <p>Explore our wide range of products and find your new favorite snack.</p>
        <button className="cta-button" onClick={() => navigate('/products')}>Browse Products</button>
      </section>
    </div>
  );
};

export default Home;
