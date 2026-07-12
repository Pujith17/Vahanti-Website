import React, { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, Send, Clock, Loader } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import './ContactSection.css';

const CHALLENGES = [
  'Select operational challenge',
  'Operational Visibility',
  'Warehouse Operations',
  'Cargo Analytics',
  'Forecasting & Planning',
  'Manifest Processing',
  'Billing & Revenue',
  'Ground Handling',
  'AI & Automation',
  'Digital Transformation',
  'Other',
];

const ContactSection = () => {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [formData, setFormData] = useState({
    name: '', org: '', email: '', role: '', challenge: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [hasStarted, setHasStarted] = useState(false);
  
  // Cloudflare Turnstile states and refs
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileContainerRef = useRef(null);
  const widgetIdRef = useRef(null);

  const successRef = useRef(null);
  const formRef = useRef(null);

  // Track Form Viewed
  useEffect(() => {
    trackEvent('Form Viewed', {
      page: window.location.pathname,
      referrer: document.referrer,
    });
  }, []);

  // Set selected product from URL query parameter on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get('product');
    if (productParam) {
      const allowedProducts = ['SkyLnk', 'RoadLnk', 'Control Tower'];
      if (allowedProducts.includes(productParam)) {
        setFormData(prev => ({ ...prev, challenge: 'Other', message: `Interested in: ${productParam}. ` }));
        // Set focus or scroll to form if product param is present
        const timer = setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Initialize Cloudflare Turnstile
  useEffect(() => {
    let script = document.getElementById('cf-turnstile-script');
    
    const renderTurnstile = () => {
      if (window.turnstile && turnstileContainerRef.current && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY || '',
            size: window.innerWidth < 380 ? 'compact' : 'normal',
            callback: (token) => {
              setTurnstileToken(token);
              setErrors(prev => ({ ...prev, turnstile: '' }));
            },
            'expired-callback': () => {
              setTurnstileToken('');
            },
            'error-callback': () => {
              setTurnstileToken('');
            }
          });
        } catch (err) {
          console.error('Error rendering Turnstile:', err);
        }
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = 'cf-turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        renderTurnstile();
      };
      document.body.appendChild(script);
    } else if (window.turnstile) {
      renderTurnstile();
    } else {
      script.addEventListener('load', renderTurnstile);
    }

    return () => {
      if (script) {
        script.removeEventListener('load', renderTurnstile);
      }
      if (window.turnstile && widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (e) {
          console.warn('Failed to clean up Turnstile:', e);
        }
      }
    };
  }, [status]); // Re-render widget if status changes (e.g. going back from success/error)

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Trigger Form Started event once
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('Form Started');
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field as they type
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getScreenCategory = () => {
    const width = window.innerWidth;
    if (width < 480) return 'Mobile';
    if (width < 768) return 'Tablet';
    if (width < 1200) return 'Laptop';
    return 'Desktop';
  };

  const getUtmParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
    };
  };

  const validateForm = () => {
    const newErrors = {};
    const nameTrimmed = formData.name.trim();
    const orgTrimmed = formData.org.trim();
    const emailTrimmed = formData.email.trim();
    const challengeTrimmed = formData.challenge.trim();

    if (!nameTrimmed) {
      newErrors.name = 'Full name is required';
    }
    
    if (!orgTrimmed) {
      newErrors.org = 'Company / Organization is required';
    }

    if (!emailTrimmed) {
      newErrors.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      newErrors.email = 'Please enter a valid work email address';
    }

    if (!challengeTrimmed) {
      newErrors.challenge = 'Please select an operational challenge';
    }

    if (formData.message && formData.message.length > 1000) {
      newErrors.message = 'Project details must be 1000 characters or less';
    }

    if (!turnstileToken) {
      newErrors.turnstile = 'Please verify that you are not a robot';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return; // Prevent double submit

    // Client-side validation
    if (!validateForm()) {
      trackEvent('Form Validation Error', errors);
      return;
    }

    setStatus('sending');
    trackEvent('Form Submitted');

    // Prepare dynamic metadata
    const queryParams = new URLSearchParams(window.location.search);
    const derivedProduct = queryParams.get('product') || null;

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      organisation: formData.org.trim(),
      role: formData.role.trim(),
      challenge: formData.challenge.trim(),
      message: formData.message.trim(),
      'cf-turnstile-response': turnstileToken,
      
      // Metadata
      source: 'Website',
      currentPage: window.location.pathname,
      currentProduct: derivedProduct,
      screenSize: getScreenCategory(),
      browserLanguage: navigator.language,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
      ...getUtmParams()
    };

    try {
      const res = await fetch(`https://formspree.io/f/mnjkoynb`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
        trackEvent('Form Submitted Successfully');
        // Scroll success card into view in next macro-task to let DOM render
        setTimeout(() => {
          successRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 100);
      } else {
        setStatus('error');
        trackEvent('Form Submission Failed', { statusText: res.statusText });
        // Reset Turnstile on error so they can solve it again
        if (window.turnstile && widgetIdRef.current) {
          window.turnstile.reset(widgetIdRef.current);
          setTurnstileToken('');
        }
      }
    } catch (err) {
      setStatus('error');
      trackEvent('Form Submission Failed', { error: err.message });
      // Reset Turnstile on error
      if (window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current);
        setTurnstileToken('');
      }
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({ name: '', org: '', email: '', role: '', challenge: '', message: '' });
    setErrors({});
    setHasStarted(false);
    setTurnstileToken('');
    // Scroll smoothly back to top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

          {/* ── Right: form / success card ── */}
          <div className="contact-form-container" ref={formRef}>

            {/* SUCCESS STATE */}
            {status === 'success' && (
              <div className="form-success" ref={successRef}>
                <div className="success-icon">✓</div>
                <h3>Enquiry received</h3>
                <p>
                  Thank you for contacting Vahanti.
                </p>
                <p>
                  We've received your enquiry and will respond within one business day.
                </p>
                <div className="immediate-help">
                  <span>Need immediate assistance?</span>
                  <a href="mailto:support@vahanti.in">support@vahanti.in</a>
                </div>
                <button
                  className="btn-primary"
                  onClick={handleReset}
                >
                  Return to Home
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
                      autoComplete="name"
                      required
                    />
                    {errors.name && <span className="inline-error-msg">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="ct-org">Company / Organization <span className="required">*</span></label>
                    <input
                      type="text" id="ct-org" name="org"
                      placeholder="Airline / Terminal / Operator"
                      value={formData.org} onChange={handleChange}
                      autoComplete="organization"
                      required
                    />
                    {errors.org && <span className="inline-error-msg">{errors.org}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="ct-email">Work Email <span className="required">*</span></label>
                    <input
                      type="email" id="ct-email" name="email"
                      placeholder="you@company.com"
                      value={formData.email} onChange={handleChange}
                      autoComplete="email"
                      required
                    />
                    {errors.email && <span className="inline-error-msg">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="ct-role">Job Title</label>
                    <input
                      type="text" id="ct-role" name="role"
                      placeholder="e.g. Head of Cargo"
                      value={formData.role} onChange={handleChange}
                      autoComplete="organization-title"
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
                  {errors.challenge && <span className="inline-error-msg">{errors.challenge}</span>}
                </div>

                <div className="form-group">
                  <div className="textarea-label-row">
                    <label htmlFor="ct-message">Project Details</label>
                    <span className="char-counter">
                      {formData.message ? formData.message.length : 0} / 1000
                    </span>
                  </div>
                  <textarea
                    id="ct-message" name="message" rows={4}
                    placeholder="Describe your current setup, the data you have available, and the outcome you're aiming for..."
                    value={formData.message} onChange={handleChange}
                    maxLength={1000}
                  />
                  {errors.message && <span className="inline-error-msg">{errors.message}</span>}
                </div>

                {/* CLOUDFLARE TURNSTILE CAPTCHA */}
                <div className="form-group turnstile-group">
                  <div ref={turnstileContainerRef} />
                  {errors.turnstile && <span className="inline-error-msg">{errors.turnstile}</span>}
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