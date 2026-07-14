import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../config/seo';
import './LegalPages.css';

const sections = [
  { id: 'acceptance', label: 'Acceptance' },
  { id: 'permitted-use', label: 'Permitted use' },
  { id: 'intellectual-property', label: 'Intellectual property' },
  { id: 'confidential-concepts', label: 'Custom software and concepts' },
  { id: 'disclaimers', label: 'Disclaimers' },
  { id: 'liability', label: 'Limitation of liability' },
  { id: 'third-party-links', label: 'Third-party links' },
  { id: 'governing-law', label: 'Governing law' },
  { id: 'updates', label: 'Updates' },
  { id: 'contact', label: 'Contact' },
];

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('acceptance');

  useEffect(() => {
    document.title = `Terms of Service | ${SEO.siteName}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `Terms of Service for ${SEO.siteName} Technologies Private Limited`);
    }
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observedSections = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    observedSections.forEach((section) => observer.observe(section));

    return () => {
      observedSections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return (
    <main className="legal-page">
      <title>Terms of Service | {SEO.siteName}</title>
      <meta name="description" content={`Terms of Service for ${SEO.siteName} Technologies Private Limited`} />
      <link rel="canonical" href={`${SEO.siteUrl}/terms`} />
      <meta property="og:title" content={`Terms of Service | ${SEO.siteName}`} />
      <meta property="og:description" content={`Terms of Service for ${SEO.siteName} Technologies Private Limited`} />
      <meta property="og:url" content={`${SEO.siteUrl}/terms`} />
      <div className="container legal-container">
        <Link to="/" className="legal-back">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <section className="legal-hero">
          <div className="legal-hero-copy">
            <span className="legal-kicker">Legal</span>
            <h1 className="legal-title">Terms of Service</h1>
            <p className="legal-intro">
              These Terms govern your use of the Vahanti website. Separate
              signed agreements govern any software development, consulting, or service
              engagements.
            </p>
          </div>

          <div className="legal-meta-card">
            <div className="legal-meta-row">
              <span className="legal-meta-label">Company</span>
              <span className="legal-meta-value">Vahanti Technologies Private Limited</span>
            </div>
            <div className="legal-meta-row">
              <span className="legal-meta-label">Last updated</span>
              <span className="legal-meta-value">June 2026</span>
            </div>
            <div className="legal-meta-row">
              <span className="legal-meta-label">Jurisdiction</span>
              <span className="legal-meta-value">Bengaluru, Karnataka, India</span>
            </div>
          </div>
        </section>

        <div className="legal-layout">
          <aside className="legal-sidebar">
            <div className="legal-sidebar-card">
              <div className="legal-sidebar-title">On this page</div>
              <nav className="legal-toc">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={activeSection === section.id ? 'active' : ''}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="legal-content">
            <section className="legal-section" id="acceptance">
              <h2>1. Acceptance</h2>
              <p>
                By accessing or using vahanti.in, you agree to be bound by these Terms
                of Service. If you do not agree, you should discontinue use of the site
                immediately. These Terms apply only to website use and not to separate
                client or vendor contracts.
              </p>
            </section>

            <section className="legal-section" id="permitted-use">
              <h2>2. Permitted use</h2>
              <p>You may use this website for lawful purposes only. You must not:</p>
              <ul>
                <li>Use the site in violation of applicable laws or regulations.</li>
                <li>Attempt unauthorised access to any part of the website or related systems.</li>
                <li>Transmit harmful, offensive, infringing, or misleading content through site forms.</li>
                <li>Scrape, harvest, copy, or index site content using automated tools without prior written consent.</li>
              </ul>
            </section>

            <section className="legal-section" id="intellectual-property">
              <h2>3. Intellectual property</h2>
              <p>
                All content on this website, including text, graphics, branding, logos,
                visual assets, interface elements, layouts, and other materials, is the
                intellectual property of Vahanti Technologies Private Limited or its licensors
                and is protected under applicable Indian and international intellectual
                property laws.
              </p>
              <p>
                You may not reproduce, republish, distribute, modify, or create
                derivative works from this content without our prior written permission.
              </p>
            </section>

            <section className="legal-section" id="confidential-concepts">
              <h2>4. Custom software and concepts</h2>
              <p>
                Any software ideas, algorithms, models, dashboards, workflows, system
                architectures, proposals, or solution approaches discussed during
                discovery calls, proposals, or technical audits remain the confidential
                intellectual property of Vahanti unless explicitly
                transferred under a signed written agreement.
              </p>
            </section>

            <section className="legal-section" id="disclaimers">
              <h2>5. Disclaimers</h2>
              <p>
                This website and its content are provided on an &quot;as is&quot; and &quot;as
                available&quot; basis without warranties of any kind, express or implied,
                including warranties of merchantability, fitness for a particular
                purpose, or non-infringement. We do not warrant that the website will
                always be available, accurate, secure, or free of harmful components.
              </p>
            </section>

            <section className="legal-section" id="liability">
              <h2>6. Limitation of liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Vahanti Technologies
                Private Limited, its directors, employees, contractors, and affiliates shall
                not be liable for any indirect, incidental, special, consequential, or
                punitive damages arising from your use of or inability to use this
                website.
              </p>
              <p>
                Our total aggregate liability for any claim arising out of website use
                shall not exceed INR 10,000.
              </p>
            </section>

            <section className="legal-section" id="third-party-links">
              <h2>7. Third-party links</h2>
              <p>
                This website may contain links to third-party websites for convenience.
                Vahanti does not control, endorse, or assume responsibility
                for the content, services, privacy practices, or policies of third-party
                sites. Accessing such sites is at your own risk.
              </p>
            </section>

            <section className="legal-section" id="governing-law">
              <h2>8. Governing law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of
                India. Any disputes arising from these Terms or your use of this website
                shall be subject to the exclusive jurisdiction of the courts of
                Bengaluru, Karnataka, India.
              </p>
            </section>

            <section className="legal-section" id="updates">
              <h2>9. Updates</h2>
              <p>
                We may update these Terms from time to time. Any changes will be posted
                on this page together with a revised update date. Continued use of the
                website after changes are posted constitutes acceptance of the revised
                Terms.
              </p>
            </section>

            <section className="legal-contact-box" id="contact">
              <h2>10. Contact</h2>
              <p>
                For any questions regarding these Terms, contact Vahanti Technologies
                Private Limited, Bengaluru, Karnataka 560001, India.
              </p>
              <p>
                Email: <a href="mailto:support@vahanti.in">support@vahanti.in</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;