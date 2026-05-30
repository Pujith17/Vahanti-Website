import React from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <h2 className="section-title">Get in Touch</h2>
        
        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Let's build something amazing together.</h3>
            <p>
              Whether you have a project in mind or just want to chat about the future of the web, 
              we'd love to hear from you.
            </p>
            
            <div className="info-items">
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <h4>Email Us</h4>
                  <p>hello@vahanti.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <h4>Call Us</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" required />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" rows="4" placeholder="Tell us about your project..." required></textarea>
              </div>
              
              <button type="submit" className="btn-primary submit-btn">
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
