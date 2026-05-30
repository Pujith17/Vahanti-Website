import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#" className="logo">
          Vahanti<span className="dot">.</span>
        </a>

        <nav className="desktop-nav">
          <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a href="#contact" className="btn-primary nav-cta">Get in Touch</a>
        </nav>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <ul className="mobile-nav-links">
            <li><a href="#about" onClick={toggleMobileMenu}>About</a></li>
            <li><a href="#services" onClick={toggleMobileMenu}>Services</a></li>
            <li><a href="#portfolio" onClick={toggleMobileMenu}>Portfolio</a></li>
            <li><a href="#contact" onClick={toggleMobileMenu}>Contact</a></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
