import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CookieBanner.css';

const COOKIE_KEY = 'vahanti_cookie_consent';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_KEY);

    if (!savedConsent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (value) => {
    localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent banner">
      <p className="cookie-text">
        Vahanti Technologies uses cookies to understand how visitors interact with our
        site and to improve your experience. We collect anonymised usage data
        (including IP addresses) via analytics cookies. No personal data is shared
        with third parties. See our{' '}
        <Link to="/privacy">Privacy Policy</Link> for full details.
      </p>

      <div className="cookie-actions">
        <button
          type="button"
          className="cookie-btn-accept"
          onClick={() => handleConsent('accepted')}
        >
          Accept
        </button>

        <button
          type="button"
          className="cookie-btn-reject"
          onClick={() => handleConsent('rejected')}
        >
          Reject
        </button>

        <button
          type="button"
          className="cookie-btn-manage"
          onClick={() => handleConsent('dismissed')}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;