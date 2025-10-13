import React from 'react';
import './About.css';
import { FiHeart, FiAward, FiUsers, FiClock } from 'react-icons/fi';

const About = () => {
  return (
    <div className="about-page">
      <header className="about-hero">
        <h1>Our Story</h1>
        <p>Born from a passion for healthy living and sustainable practices, Fresh Dehydrate transforms the finest produce into nutritious, delicious snacks that fuel your active lifestyle.</p>
      </header>

      <main className="about-page-main-content">
        <div className="about-vision-mission-container">
          <h2>Our Vision & Mission</h2>
          <div className="about-vision-mission-item">
            <h3>Vision</h3>
            <p>To be the leading provider of premium dehydrated foods that make healthy eating convenient, delicious, and sustainable for everyone.</p>
          </div>
          <div className="about-vision-mission-item">
            <h3>Mission</h3>
            <p>We preserve nature's goodness through careful dehydration techniques, creating nutrient-dense snacks that support healthy lifestyles while promoting sustainable farming practices.</p>
          </div>
        </div>

        <div className="about-stats-container">
          <div className="stat-card">
            <FiHeart className="stat-icon" />
            <h4>100% Natural</h4>
            <p>Health First</p>
          </div>
          <div className="stat-card">
            <FiAward className="stat-icon" />
            <h4>Premium Grade</h4>
            <p>Quality</p>
          </div>
          <div className="stat-card">
            <FiUsers className="stat-icon" />
            <h4>10K+ Customers</h4>
            <p>Community</p>
          </div>
          <div className="stat-card">
            <FiClock className="stat-icon" />
            <h4>2+ Years</h4>
            <p>Experience</p>
          </div>
        </div>
      </main> 

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <p>The passionate people behind Fresh Dehydrate</p>
        <div className="team-members">
          <div className="team-member">
            <img src="" alt="Manoj kumar" />
            <h4>Manoj kumar</h4>
            <p className="role">Founder & CEO</p>
            <p>Passionate about healthy living and sustainable food practices.</p>
          </div>
          <div className="team-member">
            <img src="" alt="Jaswanth" />
            <h4>Jaswanth kumar</h4>
            <p className="role">Head of Operations</p>
            <p>2+ years experience in food processing and quality control.</p>
          </div>
          <div className="team-member">
            <img src="" alt="Pandu" />
            <h4>Pandu</h4>
            <p className="role">Nutritionist</p>
            <p>Certified nutritionist ensuring our products meet the highest standards.</p>
          </div>
        </div>
      </section>

      <section className="core-values-section">
        <h2>Our Core Values</h2>
        <div className="core-values">
          <div className="core-value">
            <div className="value-icon">⭐</div>
            <h4>Quality</h4>
            <p>We never compromise on quality. Every product meets our rigorous standards.</p>
          </div>
          <div className="core-value">
            <div className="value-icon">🌱</div>
            <h4>Sustainability</h4>
            <p>Environmental responsibility guides everything we do, from sourcing to packaging.</p>
          </div>
          <div className="core-value">
            <div className="value-icon">🚀</div>
            <h4>Innovation</h4>
            <p>We continuously improve our processes to bring you better products.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
