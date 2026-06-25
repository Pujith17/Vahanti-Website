import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
        <a href="/#home" className="logo">
          <svg
            className="logo-mark"
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 28 L16 4 L26 28"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 28 L16 14 L22 28"
              fill="currentColor"
              opacity="0.4"
            />
            <circle
              cx="16"
              cy="3.5"
              r="2.2"
              fill="currentColor"
            />
          </svg>

          Vahanti
        </a>

        <nav
          className="desktop-nav"
          aria-label="Primary navigation"
        >
          <ul className="nav-links">
            <li><a href="/#about">About</a></li>
            <li><a href="/#services">Capabilities</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/#team">Our Team</a></li>
            <li><a href="/#contact">Contact</a></li>
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

      {open && (
        <nav
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          <ul className="mobile-nav-links">
            <li>
              <a
                href="/#about"
                onClick={() => setOpen(false)}
              >
                About
              </a>
            </li>

            <li>
              <a
                href="/#services"
                onClick={() => setOpen(false)}
              >
                Capabilities
              </a>
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
              <a
                href="/#team"
                onClick={() => setOpen(false)}
              >
                Our Team
              </a>
            </li>

            <li>
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}

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