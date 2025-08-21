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

      <main className="about-main-content">
        <div className="vision-mission-container">
          <h2>Our Vision & Mission</h2>
          <div className="vision-mission-item">
            <h3>Vision</h3>
            <p>To be the leading provider of premium dehydrated foods that make healthy eating convenient, delicious, and sustainable for everyone.</p>
          </div>
          <div className="vision-mission-item">
            <h3>Mission</h3>
            <p>We preserve nature's goodness through careful dehydration techniques, creating nutrient-dense snacks that support healthy lifestyles while promoting sustainable farming practices.</p>
          </div>
        </div>

        <div className="stats-container">
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
            <h4>5+ Years</h4>
            <p>Experience</p>
          </div>
        </div>
      </main>

      {/* <section className="journey-section">
        <h2>Our Journey</h2>
        <p>From humble beginnings to serving thousands of customers</p>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-year">2019</div>
            <div className="timeline-content">
              <p>Fresh Dehydrate founded with a simple mission</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2020</div>
            <div className="timeline-content">
              <p>Launched our first product line of dehydrated fruits</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2021</div>
            <div className="timeline-content">
              <p>Expanded to include vegetable snacks and trail mixes</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2022</div>
            <div className="timeline-content">
              <p>Achieved organic certification for 80% of our products</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2023</div>
            <div className="timeline-content">
              <p>Opened our second facility to meet growing demand</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2024</div>
            <div className="timeline-content">
              <p>Serving over 10,000 happy customers nationwide</p>
            </div>
          </div>
        </div>
      </section> */}

      <section className="team-section">
        <h2>Meet Our Team</h2>
        <p>The passionate people behind Fresh Dehydrate</p>
        <div className="team-members">
          <div className="team-member">
            <img src="https://i.pravatar.cc/150?u=sarah" alt="Manoj kumar" />
            <h4>Manoj kumar</h4>
            <p className="role">Founder & CEO</p>
            <p>Passionate about healthy living and sustainable food practices.</p>
          </div>
          <div className="team-member">
            <img src="https://i.pravatar.cc/150?u=michael" alt="Jaswanth" />
            <h4>Jaswanth kumar</h4>
            <p className="role">Head of Operations</p>
            <p>15+ years experience in food processing and quality control.</p>
          </div>
          <div className="team-member">
            <img src="https://i.pravatar.cc/150?u=emily" alt="Sairam" />
            <h4>sairam</h4>
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
