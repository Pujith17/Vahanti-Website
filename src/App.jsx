import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar          from './components/Navbar';
import HeroSection     from './components/HeroSection';
import ClaritySection  from './components/ClaritySection';
import AboutSection    from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ContactSection  from './components/ContactSection';
import Footer          from './components/Footer';
import PrivacyPolicy   from './components/PrivacyPolicy';
import TermsOfService  from './components/TermsOfService';
import ProductsPage    from './components/ProductsPage';

const Home = () => (
  <main>
    <HeroSection />
    <ClaritySection />
    <AboutSection />
    <ServicesSection />
    <ContactSection />
  </main>
);

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/"         element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/privacy"  element={<PrivacyPolicy />} />
      <Route path="/terms"    element={<TermsOfService />} />
    </Routes>
    <Footer />
  </>
);

export default App;