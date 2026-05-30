import React from 'react';
import { Globe, Mail, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#" className="logo">
              Vahanti<span className="dot">.</span>
            </a>
            <p className="footer-description">
              Building premium digital experiences with cutting-edge technology and 
              beautiful design.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
              </ul>
            </div>
            
            <div className="link-group">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Vahanti. All rights reserved.</p>
          
          <div className="social-links">
            <a href="#" aria-label="Website"><Globe size={20} /></a>
            <a href="#" aria-label="Email"><Mail size={20} /></a>
            <a href="#" aria-label="Chat"><MessageCircle size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
