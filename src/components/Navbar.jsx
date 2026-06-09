import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen]             = useState(false);

  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`navbar${isScrolled ? ' scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <svg className="logo-mark" width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M6 28 L16 4 L26 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 28 L16 14 L22 28" fill="currentColor" opacity="0.4"/>
            <circle cx="16" cy="3.5" r="2.2" fill="currentColor"/>
          </svg>
          Vahanti Technologies
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <ul className="nav-links">
            <li><a href="/#about">About</a></li>
            <li><a href="/#services">Capabilities</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/#team">Our Model</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
          <a href="/#contact" className="btn-primary">Book Discovery Call</a>
        </nav>
        <button
          className="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <ul className="mobile-nav-links">
            <li><a href="/#about"    onClick={() => setOpen(false)}>About</a></li>
            <li><a href="/#services" onClick={() => setOpen(false)}>Capabilities</a></li>
            <li><Link to="/products" onClick={() => setOpen(false)}>Products</Link></li>
            <li><a href="/#team"     onClick={() => setOpen(false)}>Our Model</a></li>
            <li><a href="/#contact"  onClick={() => setOpen(false)}>Contact</a></li>
          </ul>
          <a href="/#contact" className="btn-primary mobile-cta" onClick={() => setOpen(false)}>
            Book Discovery Call
          </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;