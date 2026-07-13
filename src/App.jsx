import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';

const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const ProductsPage = lazy(() => import('./components/ProductsPage'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));

import IntroAnimation from './components/IntroAnimation';
import ScrollReveal from './components/ScrollReveal';
import CookieBanner from './components/CookieBanner';
import CloudflareAnalytics from './components/common/CloudflareAnalytics';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // If there's a hash, find the target element and scroll to it
    if (window.location.hash) {
      const hashId = window.location.hash.slice(1);
      const targetElement = document.getElementById(hashId);
      
      if (targetElement) {
        const timer = setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      // Scroll to top immediately when route path changes
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, window.location.hash]);

  return null;
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [siteVisible, setSiteVisible] = useState(false);

  // Disable scrolling while intro is playing
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  // Memoized to maintain stable references across App re-renders.
  // Unstable references would cause IntroAnimation's animation useEffect
  // to restart (root cause of the double-play bug).
  const handleIntroExitStart = useCallback(() => {
    // No-op here so site content does not fade in early during the exit transition.
  }, []);

  const siteVisibleTimerRef = useRef(null);

  const handleIntroComplete = useCallback(() => {
    // Remove the intro overlay
    setShowIntro(false);
    // Trigger the .site-shell opacity transition to fade in the content
    if (siteVisibleTimerRef.current) clearTimeout(siteVisibleTimerRef.current);
    siteVisibleTimerRef.current = setTimeout(() => setSiteVisible(true), 0);
  }, []);

  const location = useLocation();
  const prevPathnameRef = useRef(location.pathname);

  // Page-change transitions:
  // Re-trigger the full intro animation and fade out site shell on route changes
  useEffect(() => {
    if (prevPathnameRef.current === location.pathname) {
      prevPathnameRef.current = location.pathname;
      return;
    }
    prevPathnameRef.current = location.pathname;

    setShowIntro(true);
    setSiteVisible(false);
  }, [location.pathname]);

  return (
    <>
      <CloudflareAnalytics />
      <div className={`site-shell ${siteVisible ? 'visible' : ''}`}>
        <ScrollToTop />
        <Navbar />

        <Suspense fallback={<div style={{ minHeight: '80vh', background: '#0b1110' }} />}>
          <Routes>
            <Route path="/" element={<HomePage siteVisible={siteVisible} />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>

        <Footer />
        <CookieBanner />
      </div>

      {showIntro && (
        <IntroAnimation
          onExitStart={handleIntroExitStart}
          onComplete={handleIntroComplete}
        />
      )}
    </>
  );
};

export default App;