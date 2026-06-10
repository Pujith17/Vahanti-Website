import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import CookieBanner from './CookieBanner';
import './Footer.css';

const Footer = () => (
  <>
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <Link to="/" className="footer-logo">
              <span>Vahanti Technologies</span>
            </Link>

            <p className="footer-desc">
              Bespoke AI/ML and data software for commercial airlines and air cargo
              terminals. Built in Bengaluru by people who understand freight.
            </p>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About us</a></li>
                <li><a href="#services">Services</a></li>
                <li><Link to="/products">Products</Link></li>
                <li><a href="#approach">Approach</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="link-group">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@vahanti.com">Email</a>
                </li>
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
          <p>© 2026 Vahanti Technologies Pvt. Ltd. All rights reserved. Bengaluru, Karnataka, India.</p>

          <div className="social-links">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a href="mailto:hello@vahanti.com" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>

    <CookieBanner />
  </>
);

export default Footer;