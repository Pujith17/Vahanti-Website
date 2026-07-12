import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../config/seo';
import './LegalPages.css';

const sections = [
  { id: 'scope', label: 'Scope' },
  { id: 'data-we-collect', label: 'Data we collect' },
  { id: 'how-we-use-data', label: 'How we use data' },
  { id: 'legal-bases', label: 'Legal bases' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'sharing', label: 'Data sharing' },
  { id: 'retention', label: 'Retention' },
  { id: 'rights', label: 'Your rights' },
  { id: 'security', label: 'Security' },
  { id: 'contact', label: 'Contact' },
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('scope');

  useEffect(() => {
    document.title = `Privacy Policy | ${SEO.siteName}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `Privacy Policy for ${SEO.siteName} Technologies Pvt. Ltd.`);
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
      <title>Privacy Policy | {SEO.siteName}</title>
      <meta name="description" content={`Privacy Policy for ${SEO.siteName} Technologies Pvt. Ltd.`} />
      <link rel="canonical" href={`${SEO.siteUrl}/privacy`} />
      <meta property="og:title" content={`Privacy Policy | ${SEO.siteName}`} />
      <meta property="og:description" content={`Privacy Policy for ${SEO.siteName} Technologies Pvt. Ltd.`} />
      <meta property="og:url" content={`${SEO.siteUrl}/privacy`} />
      <div className="container legal-container">
        <Link to="/" className="legal-back">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <section className="legal-hero">
          <div className="legal-hero-copy">
            <span className="legal-kicker">Legal</span>
            <h1 className="legal-title">Privacy Policy</h1>
            <p className="legal-intro">
              This Privacy Policy explains how Vahanti Technologies Pvt. Ltd. collects,
              uses, stores, and protects personal data through our website and during
              business interactions.
            </p>
          </div>

          <div className="legal-meta-card">
            <div className="legal-meta-row">
              <span className="legal-meta-label">Company</span>
              <span className="legal-meta-value">Vahanti Technologies Pvt. Ltd.</span>
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
            <section className="legal-section" id="scope">
              <h2>1. Scope</h2>
              <p>
                Vahanti Technologies Pvt. Ltd. (&quot;Vahanti&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a software
                services company operating from Bengaluru, Karnataka, India. This
                Privacy Policy applies to personal data collected through our website
                and in the course of enquiries, discovery calls, technical audits, and
                client interactions.
              </p>
            </section>

            <section className="legal-section" id="data-we-collect">
              <h2>2. Data we collect</h2>
              <p>When you contact us or use our website, we may collect:</p>
              <ul>
                <li>Name, company name, job title, email address, and phone number.</li>
                <li>Business enquiry details and information voluntarily shared with us.</li>
                <li>Technical usage data such as IP address, device/browser information, and analytics events.</li>
              </ul>
              <p>
                We do not collect payment card information, government identification
                numbers, or sensitive personal data unless explicitly required under a
                separate contractual arrangement.
              </p>
            </section>

            <section className="legal-section" id="how-we-use-data">
              <h2>3. How we use data</h2>
              <p>We use personal data to:</p>
              <ul>
                <li>Respond to enquiries and schedule calls or business discussions.</li>
                <li>Evaluate potential engagements and prepare proposals or audits.</li>
                <li>Operate, maintain, and improve our website and communications.</li>
                <li>Protect our systems, detect misuse, and comply with legal obligations.</li>
              </ul>
            </section>

            <section className="legal-section" id="legal-bases">
              <h2>4. Legal bases</h2>
              <p>
                Where the GDPR or similar laws apply, we rely on one or more of the
                following legal bases: your consent, the performance of or entry into a
                contract, our legitimate interests in operating and improving our
                business, and compliance with legal obligations.
              </p>
            </section>

            <section className="legal-section" id="cookies">
              <h2>5. Cookies</h2>
              <p>
                We use strictly necessary cookies for site operation and may use
                optional analytics cookies to understand usage patterns. You can accept,
                reject, or dismiss optional cookies using the banner displayed on your
                first visit. Rejecting optional cookies does not affect core website
                functionality.
              </p>
            </section>

            <section className="legal-section" id="sharing">
              <h2>6. Data sharing</h2>
              <p>
                We do not sell, rent, or trade personal data. We may share data with
                carefully selected service providers such as hosting, email, analytics,
                or infrastructure vendors who process data on our behalf under
                confidentiality and security obligations.
              </p>
              <p>
                We may also disclose data where required by law, regulation, court
                order, or competent governmental authority.
              </p>
            </section>

            <section className="legal-section" id="retention">
              <h2>7. Retention</h2>
              <p>
                Contact and enquiry records are generally retained for up to 24 months
                from the last meaningful interaction, unless a longer period is required
                by law or contract. Technical usage and analytics data may be retained
                for up to 14 months.
              </p>
            </section>

            <section className="legal-section" id="rights">
              <h2>8. Your rights</h2>
              <p>
                Depending on the laws that apply to you, you may have rights to access,
                correct, erase, restrict, object to the processing of, or request
                portability of your personal data. We will assess and respond to valid
                requests within a reasonable period, typically within 30 days.
              </p>
            </section>

            <section className="legal-section" id="security">
              <h2>9. Security</h2>
              <p>
                We implement appropriate technical and organisational measures to
                protect personal data against unauthorised access, disclosure, loss, or
                misuse. Data transmitted through our website is protected using TLS
                encryption, but no internet transmission method can be guaranteed to be
                completely secure.
              </p>
            </section>

            <section className="legal-contact-box" id="contact">
              <h2>10. Contact</h2>
              <p>
                For questions, requests, or concerns related to this Privacy Policy,
                contact Vahanti Technologies Pvt. Ltd., Bengaluru, Karnataka 560001,
                India.
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

export default PrivacyPolicy;