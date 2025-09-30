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

      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>10,000+</h3>
            <p>Happy Customers</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Product Varieties</p>
          </div>
          <div className="stat-item">
            <h3>5 Years</h3>
            <p>Industry Experience</p>
          </div>
          <div className="stat-item">
            <h3>100%</h3>
            <p>Natural Process</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Fresh Dehydrate?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🌟</div>
            <h3>Premium Quality</h3>
            <p>We source the finest produce from trusted farmers to ensure maximum flavor, nutritional value, and consistent quality in every batch.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">⏰</div>
            <h3>Extended Shelf Life</h3>
            <p>Our advanced dehydration process preserves food for 12+ months without any artificial additives or preservatives.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💚</div>
            <h3>Healthy & Convenient</h3>
            <p>Perfect for busy lifestyles - nutrient-dense snacks that are ready anytime, anywhere, supporting your wellness goals.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping nationwide with eco-friendly packaging to maintain freshness and reduce environmental impact.</p>
          </div>
          {/* <div className="feature-item">
            <div className="feature-icon">🔬</div>
            <h3>Scientific Process</h3>
            <p>Our state-of-the-art dehydration technology retains 95% of original nutrients while creating the perfect texture and taste.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🏆</div>
            <h3>Award Winning</h3>
            <p>Recognized by industry experts for excellence in food processing and commitment to sustainable agricultural practices.</p>
          </div> */}
        </div>
      </section>

      <section className="process-section">
        <h2>Our Dehydration Process</h2>
        <div className="process-container">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Careful Selection</h3>
            <p>We handpick the freshest fruits and vegetables at peak ripeness from certified organic farms.</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Gentle Preparation</h3>
            <p>Our produce is carefully washed, inspected, and prepared using food-safe techniques to maintain quality.</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Controlled Dehydration</h3>
            <p>Using low-temperature dehydration technology, we remove moisture while preserving nutrients and natural flavors.</p>
          </div>
          <div className="process-step">
            <div className="step-number">4</div>
            <h3>Quality Assurance</h3>
            <p>Every batch undergoes rigorous testing for quality, safety, and nutritional content before packaging.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-item">
            <div className="testimonial-content">
              <p>"The quality is outstanding! These dehydrated fruits taste so fresh and natural. My family loves them as healthy snacks."</p>
            </div>
            <div className="testimonial-author">
              <h4>Sarah Johnson</h4>
              <span>Health Enthusiast</span>
            </div>
          </div>
          <div className="testimonial-item">
            <div className="testimonial-content">
              <p>"Perfect for my hiking trips. Lightweight, nutritious, and delicious. The shelf life is incredible - no more food waste!"</p>
            </div>
            <div className="testimonial-author">
              <h4>Mike Chen</h4>
              <span>Outdoor Adventurer</span>
            </div>
          </div>
          <div className="testimonial-item">
            <div className="testimonial-content">
              <p>"As a nutritionist, I recommend Fresh Dehydrate to my clients. The nutrient retention is impressive and the taste is amazing."</p>
            </div>
            <div className="testimonial-author">
              <h4>Dr. Emily Rodriguez</h4>
              <span>Certified Nutritionist</span>
            </div>
          </div>
        </div>
      </section>

      <section className="product-showcase-section">
        <h2>Popular Products</h2>
        <div className="product-showcase-grid">
          <div className="showcase-item">
            <div className="showcase-image">🍎</div>
            <h3>Apple Slices</h3>
            <p>Crispy, naturally sweet apple slices perfect for healthy snacking</p>
            <span className="showcase-price">From ₹129</span>
          </div>
          <div className="showcase-item">
            <div className="showcase-image">🍌</div>
            <h3>Banana Chips</h3>
            <p>Crunchy banana chips with no added sugar or preservatives</p>
            <span className="showcase-price">From ₹99</span>
          </div>
          <div className="showcase-item">
            <div className="showcase-image">🥭</div>
            <h3>Mango Slices</h3>
            <p>Tropical mango slices bursting with natural sweetness</p>
            <span className="showcase-price">From ₹149</span>
          </div>
          <div className="showcase-item">
            <div className="showcase-image">🍅</div>
            <h3>Tomato Slices</h3>
            <p>Savory dehydrated tomatoes ideal for cooking and garnishing</p>
            <span className="showcase-price">From ₹119</span>
          </div>
        </div>
        {/* <button className="cta-button" onClick={() => navigate('/products')}>View All Products</button> */}
      </section>

      <section className="certifications-section">
        <h2>Quality Certifications & Standards</h2>
        <div className="certifications-grid">
          {/* <div className="certification-item">
            <div className="cert-icon">🏅</div>
            <h3>USDA Organic</h3>
            <p>Certified organic processing and sourcing standards</p>
          </div>  */}
          <div className="certification-item">
            <div className="cert-icon">🔒</div>
            <h3>FDA Approved</h3>
            <p>Meets all FDA food safety and quality regulations</p>
          </div>
          <div className="certification-item">
            <div className="cert-icon">🌱</div>
            <h3>Non-GMO</h3>
            <p>All products are verified non-genetically modified</p>
          </div>
          <div className="certification-item">
            <div className="cert-icon">♻️</div>
            <h3>Eco-Friendly</h3>
            <p>Sustainable packaging and carbon-neutral shipping</p>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-content">
          <h2>The Fresh Dehydrate Advantage</h2>
          <div className="benefits-grid">
            {/* <div className="benefit-item">
              <h3>Sustainable Practices</h3>
              <p>Committed to eco-friendly farming and packaging solutions that protect our planet for future generations.</p>
            </div> */}
            <div className="benefit-item">
              <h3>Nutritional Excellence</h3>
              <p>Retains essential vitamins, minerals, and antioxidants while eliminating water content and extending shelf life.</p>
            </div>
            <div className="benefit-item">
              <h3>Versatile Usage</h3>
              <p>Perfect for snacking, cooking, baking, or adding to cereals, yogurt, and smoothies for enhanced nutrition.</p>
            </div>
            <div className="benefit-item">
              <h3>Cost Effective</h3>
              <p>Reduce food waste and save money with products that last months longer than fresh alternatives.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-container">
          <div className="value-item">
            <div className="value-icon">🎯</div>
            <h3>Quality First</h3>
            <p>We never compromise on quality. Every product undergoes rigorous testing to ensure it meets our high standards before reaching your table.</p>
          </div>
          <div className="value-item">
            <div className="value-icon">🤝</div>
            <h3>Customer Focused</h3>
            <p>Your satisfaction is our priority. We listen to feedback and continuously improve our products and services to exceed expectations.</p>
          </div>
          <div className="value-item">
            <div className="value-icon">🌍</div>
            <h3>Environmental Responsibility</h3>
            <p>We're committed to sustainable practices that minimize our environmental impact while supporting local farming communities.</p>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>How long do dehydrated products last?</h3>
            <p>Our dehydrated products can last 8-12 months when stored properly in a cool, dry place. Each package includes specific storage instructions and expiration dates.</p>
          </div>
          <div className="faq-item">
            <h3>Do you use any artificial preservatives?</h3>
            <p>No, we use only natural dehydration processes. Our products contain no artificial preservatives, colors, or flavors - just pure, natural goodness.</p>
          </div>
          <div className="faq-item">
            <h3>What's your return policy?</h3>
            <p>We offer a 30-day money-back guarantee. If you're not completely satisfied with your purchase, contact us for a full refund or exchange.</p>
          </div>
          <div className="faq-item">
            <h3>Do you offer bulk discounts?</h3>
            <p>Yes! We offer attractive discounts for bulk orders. Contact our sales team for custom pricing on orders over $100.</p>
          </div>
        </div>
      </section>

      <section className="call-to-action-section">
        <h2>Ready to Transform Your Snacking?</h2>
        <p>Join thousands of satisfied customers who have made the switch to healthier, longer-lasting dehydrated foods.</p>
        <div className="cta-buttons">
          <button className="cta-button primary" onClick={() => navigate('/products')}>Browse Products</button>
          <button className="cta-button primary" onClick={() => navigate('/about')}>Learn More</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
