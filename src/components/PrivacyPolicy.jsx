import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './LegalPages.css';

const PrivacyPolicy = () => (
  <div className="legal-page">
    <div className="container legal-container">
      <Link to="/" className="legal-back">
        <ArrowLeft size={15} /> Back to home
      </Link>
      <div className="legal-header">
        <span className="section-eyebrow">Legal</span>
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-meta">Vahanti Technologies Pvt. Ltd. · Last updated: June 2026</p>
      </div>
      <div className="legal-body">
        <div>
          <h2>1. Who We Are</h2>
          <p>Vahanti Technologies Pvt. Ltd. ("Vahanti", "we", "us") is a software services company operating from Bengaluru, Karnataka, India. This Policy explains how we collect, use, and protect personal data via vahanti.in and in the course of our business engagements.</p>
        </div>
        <div>
          <h2>2. Data We Collect</h2>
          <ul>
            <li><strong>Identity &amp; contact data:</strong> Full name, work email, job title, and organisation name — submitted via our contact form.</li>
            <li><strong>Technical &amp; usage data:</strong> IP addresses, browser type, OS, pages visited, and session duration — collected automatically via cookies and analytics tools.</li>
            <li><strong>Communication data:</strong> Content of messages or documents you share voluntarily.</li>
          </ul>
          <p>We do not collect payment data, government IDs, or sensitive personal data.</p>
        </div>
        <div>
          <h2>3. How We Use Your Data</h2>
          <ul>
            <li>To respond to enquiries and manage discovery call bookings</li>
            <li>To understand website usage and improve content and performance</li>
            <li>To comply with legal and regulatory obligations</li>
            <li>To send capability updates where you have consented</li>
          </ul>
        </div>
        <div>
          <h2>4. Legal Basis for Processing (GDPR)</h2>
          <p>Where GDPR applies, we rely on: (a) your consent; (b) performance of or entry into a contract; (c) our legitimate interests in operating and improving our business; and (d) compliance with a legal obligation.</p>
        </div>
        <div>
          <h2>5. Cookies</h2>
          <p>We use strictly necessary cookies to operate the site, and optional analytics cookies to understand usage. You may accept, reject, or manage preferences via the banner on your first visit. Rejecting optional cookies will not affect site functionality.</p>
        </div>
        <div>
          <h2>6. Data Sharing</h2>
          <p>We do not sell, rent, or trade your personal data. We may share data with trusted service providers who process it on our behalf under confidentiality obligations. We may disclose data where required by law.</p>
        </div>
        <div>
          <h2>7. Data Retention</h2>
          <p>Contact and enquiry data is retained for up to 24 months from last contact. Technical usage data is retained for up to 14 months.</p>
        </div>
        <div>
          <h2>8. Your Rights</h2>
          <p>You may request access, correction, erasure, restriction of processing, or portability of your personal data by contacting <strong>hello@vahanti.in</strong>. We will respond within 30 days.</p>
        </div>
        <div>
          <h2>9. Data Security</h2>
          <p>We implement appropriate technical and organisational measures to protect personal data. All data transmissions use TLS encryption.</p>
        </div>
        <div>
          <h2>10. Contact</h2>
          <p><strong>Vahanti Technologies Pvt. Ltd.</strong>, Bengaluru, Karnataka 560001, India. Email: hello@vahanti.in</p>
        </div>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;