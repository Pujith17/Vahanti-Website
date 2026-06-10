import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ClaritySection from './components/ClaritySection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ProductsPage from './components/ProductsPage';

import IntroAnimation from './components/IntroAnimation';
import ScrollReveal from './components/ScrollReveal';

const Home = () => (
  <main>
    <HeroSection />

    <ScrollReveal delay={0}>
      <ClaritySection />
    </ScrollReveal>

    <ScrollReveal delay={40}>
      <AboutSection />
    </ScrollReveal>

    <ScrollReveal delay={40}>
      <ServicesSection />
    </ScrollReveal>

    <ScrollReveal delay={40}>
      <ContactSection />
    </ScrollReveal>
  </main>
);

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [siteVisible, setSiteVisible] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);

    setTimeout(() => {
      setSiteVisible(true);
    }, 50);
  };

  return (
    <>
      <div className={`site-shell ${siteVisible ? 'visible' : ''}`}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>

        <ScrollReveal delay={60}>
          <Footer />
        </ScrollReveal>
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