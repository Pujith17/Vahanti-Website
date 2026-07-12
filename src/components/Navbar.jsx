import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAtHero, setIsAtHero] = useState(true);
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      // Hero section is roughly 100dvh tall
      setIsAtHero(y < window.innerHeight * 0.6);

      const scrollTop = y;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        scrollHeight > 0
          ? (scrollTop / scrollHeight) * 100
          : 0;

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    handleScroll();

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, []);

  const isLegalPage = location.pathname === '/privacy' || location.pathname === '/terms';
  const showHeroMode = isAtHero && !isLegalPage;

  return (
    <header className={`navbar${isScrolled ? ' scrolled' : ''}${showHeroMode ? ' hero-mode' : ''}`}>
      <div className="container navbar-container">
        <Link to="/#home" className="logo">
          <Logo size={32} className="logo-mark" />
          <span>ahanti</span>
        </Link>

        <nav
          className="desktop-nav"
          aria-label="Primary navigation"
        >
          <ul className="nav-links">
            <li><Link to="/#about">About</Link></li>
            <li><Link to="/#services">Capabilities</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/#contact" className="nav-cta">Contact Us</Link></li>
          </ul>
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          aria-label={
            open ? 'Close menu' : 'Open menu'
          }
          aria-expanded={open}
        >
          {open ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      <nav
        className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`}
        aria-label="Mobile navigation"
      >
        <ul className="mobile-nav-links">
          <li>
            <Link
              to="/#about"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="/#services"
              onClick={() => setOpen(false)}
            >
              Capabilities
            </Link>
          </li>

          <li>
            <Link
              to="/products"
              onClick={() => setOpen(false)}
            >
              Products
            </Link>
          </li>

          <li>
            <Link
              to="/#contact"
              className="nav-cta"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      <div className="navbar-progress">
        <div
          className="navbar-progress-fill"
          style={{
            width: `${scrollProgress}%`,
          }}
        >
          <span className="navbar-progress-dot" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;