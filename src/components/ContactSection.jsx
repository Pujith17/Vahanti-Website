import React, { useState } from 'react';
import { Mail, MapPin, Send, Clock, Loader } from 'lucide-react';
import './ContactSection.css';

const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // e.g. 'xyzabcde'

const CHALLENGES = [
  'Select your primary operational challenge',
  'Payload allocation & capacity utilisation',
  'Freight manifest processing & AWB automation',
  'Route yield analysis & revenue leakage identification',
  'Ground handling resource optimisation',
  'Cargo demand forecasting',
  'Control tower visibility & real-time dashboards',
  'Legacy system integration & data pipelines',
  'Delay risk prediction & schedule reliability',
  'Custom aviation software development',
  'Other / Not listed above',
];

const ContactSection = () => {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [formData, setFormData] = useState({
    name: '', org: '', email: '', role: '', challenge: '', message: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch(`https://formspree.io/f/mnjkoynb`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:       formData.name,
          email:      formData.email,
          organisation: formData.org,
          role:       formData.role,
          challenge:  formData.challenge,
          message:    formData.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-wrapper">

          {/* ── Left: info ── */}
          <div className="contact-info">
            <span className="section-eyebrow">Get in touch</span>
            <h2 className="section-title">Talk to Vahanti</h2>
            <p className="contact-lead">
              Discuss your cargo operations, current systems, and where you need better visibility, automation, or operational control.
            </p>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon"><Mail size={16} /></div>
                <div><h4>Email</h4><p>support@vahanti.in</p></div>
              </div>
              <div className="info-item">
                <div className="info-icon"><MapPin size={16} /></div>
                <div><h4>Location</h4><p>Bengaluru, Karnataka</p></div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Clock size={16} /></div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon – Fri, 9:00 AM – 6:00 PM IST</p>
                </div>
              </div>
            </div>

            <div className="audit-callout">
              <div className="audit-callout-label">Not sure where to start?</div>
              <p>
                Book a complimentary 30-minute Technical Audit call. We'll map your data sources,
                identify your top three operational bottlenecks, and outline a practical roadmap with
                no commitment required.
              </p>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="contact-form-container">

            {/* SUCCESS STATE */}
            {status === 'success' && (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Message received.</h3>
                <p>
                  We'll review your submission and respond within one business day (IST).
                  Expect a reply with a proposed discovery call time.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => { setStatus('idle'); setFormData({ name:'', org:'', email:'', role:'', challenge:'', message:'' }); }}
                >
                  Send another message
                </button>
              </div>
            )}

            {/* FORM STATE */}
            {status !== 'success' && (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ct-name">Full Name <span className="required">*</span></label>
                    <input
                      type="text" id="ct-name" name="name"
                      placeholder="Your name"
                      value={formData.name} onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ct-org">Organisation <span className="required">*</span></label>
                    <input
                      type="text" id="ct-org" name="org"
                      placeholder="Airline / Terminal / Operator"
                      value={formData.org} onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ct-email">Work Email <span className="required">*</span></label>
                    <input
                      type="email" id="ct-email" name="email"
                      placeholder="you@company.com"
                      value={formData.email} onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ct-role">Your Role</label>
                    <input
                      type="text" id="ct-role" name="role"
                      placeholder="e.g. Head of Cargo"
                      value={formData.role} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="ct-challenge">
                    What operational challenge can we help you solve? <span className="required">*</span>
                  </label>
                  <select
                    id="ct-challenge" name="challenge"
                    value={formData.challenge} onChange={handleChange}
                    required
                  >
                    {CHALLENGES.map((c, i) => (
                      <option key={i} value={i === 0 ? '' : c} disabled={i === 0}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="ct-message">Tell us more</label>
                  <textarea
                    id="ct-message" name="message" rows={4}
                    placeholder="Describe your current setup, the data you have available, and the outcome you're aiming for..."
                    value={formData.message} onChange={handleChange}
                  />
                </div>

                {/* ERROR BANNER */}
                {status === 'error' && (
                  <div className="form-error-banner">
                    Something went wrong. Please try again or email us directly at <a href="mailto:support@vahanti.in" style={{ color: 'inherit', textDecoration: 'underline' }}>support@vahanti.in</a>
                  </div>
                )}

                <div className="form-footer">
                  <button
                    type="submit"
                    className="btn-primary submit-btn"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <><Loader size={15} className="spin" aria-hidden="true" /> Sending…</>
                    ) : (
                      <><Send size={15} aria-hidden="true" /> Talk to Vahanti</>
                    )}
                  </button>
                  <p className="form-trust">
                    We respond to all enquiries within one business day (IST). Your information is
                    handled in accordance with our Privacy Policy and is never shared with third parties.
                  </p>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;