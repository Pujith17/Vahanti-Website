import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import CookieBanner from './CookieBanner';
import './Footer.css';

const Footer = () => (
  <>
    <CookieBanner />
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <Link to="/" className="logo footer-logo">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path d="M6 28 L16 4 L26 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 28 L16 14 L22 28" fill="currentColor" opacity="0.4"/>
                <circle cx="16" cy="3.5" r="2.2" fill="currentColor"/>
              </svg>
              Vahanti Technologies
            </Link>
            <p className="footer-desc">Bespoke AI/ML and data software for commercial airlines and air cargo terminals. Built in Bengaluru by people who understand freight.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Company</h4>
              <ul>
                <li><Link to="/#about">About us</Link></li>
                <li><Link to="/#services">Capabilities</Link></li>
                <li><Link to="/products">Products</Link></li> 
                <li><Link to="/#team">Our Model</Link></li>
                <li><Link to="/#contact">Contact</Link></li>
              </ul>
            </div>
            <div className="link-group">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Vahanti Technologies Pvt. Ltd. All rights reserved. Bengaluru, Karnataka, India.</p>
          <div className="social-links">
            <a href="https://linkedin.com/company/vahanti" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="mailto:hello@vahanti.in" aria-label="Email"><Mail size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;