import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './LegalPages.css';

const TermsOfService = () => (
  <div className="legal-page">
    <div className="container legal-container">
      <Link to="/" className="legal-back">
        <ArrowLeft size={15} /> Back to home
      </Link>
      <div className="legal-header">
        <span className="section-eyebrow">Legal</span>
        <h1 className="legal-title">Terms of Service</h1>
        <p className="legal-meta">Vahanti Technologies Pvt. Ltd. · Last updated: June 2026</p>
      </div>
      <div className="legal-body">
        <div>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing vahanti.in, you agree to these Terms. If you do not agree, discontinue use immediately. These Terms govern website use only; separate agreements govern all service engagements.</p>
        </div>
        <div>
          <h2>2. Permitted Use</h2>
          <p>You may use this website for lawful purposes only. You must not: (a) violate applicable laws; (b) attempt unauthorised access to site systems; (c) transmit harmful or infringing content; or (d) scrape content without prior written consent.</p>
        </div>
        <div>
          <h2>3. Intellectual Property</h2>
          <p>All website content — text, graphics, logos, dashboard designs, code snippets, and visual assets — is the property of Vahanti Technologies Pvt. Ltd. and is protected under applicable Indian and international IP laws. Reproduction without express written permission is prohibited.</p>
          <p><strong>Custom software and concepts:</strong> Any software, algorithms, models, dashboards, or system architectures discussed during discovery calls, proposals, or technical audits remain the confidential intellectual property of Vahanti Technologies until explicitly transferred under a signed written agreement.</p>
        </div>
        <div>
          <h2>4. Disclaimer of Warranties</h2>
          <p>This website and its content are provided "as is" without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, or non-infringement.</p>
        </div>
        <div>
          <h2>5. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Vahanti Technologies and its directors, employees, and contractors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website. Our total aggregate liability for any claim shall not exceed INR 10,000.</p>
        </div>
        <div>
          <h2>6. Third-Party Links</h2>
          <p>Links to third-party sites are provided for convenience only. Vahanti Technologies does not endorse or accept responsibility for any third-party content or practices.</p>
        </div>
        <div>
          <h2>7. Governing Law &amp; Jurisdiction</h2>
          <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India.</p>
        </div>
        <div>
          <h2>8. Changes</h2>
          <p>We may update these Terms at any time. Changes will be posted here with an updated date. Continued use constitutes acceptance of the updated Terms.</p>
        </div>
        <div>
          <h2>9. Contact</h2>
          <p><strong>Vahanti Technologies Pvt. Ltd.</strong>, Bengaluru, Karnataka 560001, India. Email: hello@vahanti.in</p>
        </div>
      </div>
    </div>
  </div>
);

export default TermsOfService;