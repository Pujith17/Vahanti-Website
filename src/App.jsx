import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ClaritySection from './components/ClaritySection';
import AboutSection, { PrinciplesSection } from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ProductsPage from './components/ProductsPage';

import IntroAnimation from './components/IntroAnimation';
import ScrollReveal from './components/ScrollReveal';
import CookieBanner from './components/CookieBanner';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top immediately when route path changes (but ignore hash changes on the same route)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Home = ({ siteVisible }) => (
  <main>
    <HeroSection siteVisible={siteVisible} />
    <ClaritySection />
    <AboutSection siteVisible={siteVisible} />
    <ServicesSection />
    <PrinciplesSection />
    <ContactSection />
  </main>
);

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

  const handleIntroComplete = () => {
    setShowIntro(false);

    setTimeout(() => {
      setSiteVisible(true);
    }, 50);
  };

  return (
    <>
      <div className={`site-shell ${siteVisible ? 'visible' : ''}`}>
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home siteVisible={siteVisible} />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>

        <Footer />
        <CookieBanner />
      </div>

      {showIntro && (
        <IntroAnimation
          onComplete={handleIntroComplete}
        />
      )}
    </>
  );
};

export default App;