import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';

const Contact = () => {
    const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage('Sending...');

    emailjs.sendForm(
      'YOUR_SERVICE_ID', // Replace with your EmailJS Service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS Template ID
      form.current, 
      'YOUR_USER_ID' // Replace with your EmailJS User ID (Public Key)
    )
    .then((result) => {
        console.log(result.text);
        setStatusMessage('Message sent successfully!');
        setIsSending(false);
        e.target.reset();
    }, (error) => {
        console.log(error.text);
        setStatusMessage('Failed to send message. Please try again.');
        setIsSending(false);
    });
  };

  return (
    <div className="contact-page">
      <header className="contact-hero">
        <h1>Get in Touch</h1>
        <p>Have questions about our products or need assistance? We're here to help and would love to hear from you.</p>
      </header>

      <div className="contact-body">
        <div className="contact-form-container">
          <h2>Send us a Message</h2>
          <p>Fill out the form below and we'll get back to you as soon as possible.</p>
                    <form ref={form} onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                                <input type="text" id="fullName" name="fullName" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                                <input type="email" id="email" name="email" placeholder="john@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
                            <input type="text" id="subject" name="subject" placeholder="How can we help you?" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
                            <textarea id="message" name="message" placeholder="Tell us more about how we can help you..." required></textarea>
            </div>
                        <button type="submit" className="send-button" disabled={isSending}>
                            {isSending ? 'Sending...' : <><FiSend /> Send Message</>}
            </button>
            {statusMessage && <p className="status-message">{statusMessage}</p>}
          </form>
        </div>

        <div className="contact-info-container">
          <h2>Contact Information</h2>
          <p>Reach out to us through any of these channels. We're always happy to help!</p>
          <div className="info-card">
            <FiMapPin className="info-icon" />
            <div>
              <h4>Visit Us</h4>
              <p>Lucky homes, jubilee hills, Hyderabad</p>
            </div>
          </div>
          <div className="info-card">
            <FiPhone className="info-icon" />
            <div>
              <h4>Call Us</h4>
              <p>+91 6303060469</p>
              <p>+91 8464936840</p>
            </div>
          </div>
          <div className="info-card">
            <FiMail className="info-icon" />
            <div>
              <h4>Email Us</h4>
              <p>hello@freshdehydrate.com</p>
              <p>support@freshdehydrate.com</p>
            </div>
          </div>
          <div className="info-card">
            <FiClock className="info-icon" />
            <div>
              <h4>Business Hours</h4>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday & Sunday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
