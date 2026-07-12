import React, { useEffect, lazy, Suspense } from 'react';
import { SEO } from '../config/seo';

import HeroSection from './HeroSection';
import ClaritySection from './ClaritySection';

const AboutSection = lazy(() => import('./AboutSection'));
const PrinciplesSection = lazy(() => import('./AboutSection').then(m => ({ default: m.PrinciplesSection })));
const ServicesSection = lazy(() => import('./ServicesSection'));
const ContactSection = lazy(() => import('./ContactSection'));

const HomePage = ({ siteVisible }) => {
  useEffect(() => {
    document.title = SEO.defaultTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', SEO.defaultDescription);
    }
  }, []);

  return (
    <>
      <title>{SEO.defaultTitle}</title>
      <meta name="description" content={SEO.defaultDescription} />
      <link rel="canonical" href={SEO.siteUrl} />
      <meta property="og:title" content={SEO.defaultTitle} />
      <meta property="og:description" content={SEO.defaultDescription} />
      <meta property="og:url" content={SEO.siteUrl} />
      <meta name="twitter:title" content={SEO.defaultTitle} />
      <meta name="twitter:description" content={SEO.defaultDescription} />
      <main>
        <HeroSection siteVisible={siteVisible} />
        <ClaritySection />
        <Suspense fallback={<div style={{ minHeight: '300px' }} />}>
          <AboutSection siteVisible={siteVisible} />
          <ServicesSection />
          <PrinciplesSection />
          <ContactSection />
        </Suspense>
      </main>
    </>
  );
};

export default HomePage;
