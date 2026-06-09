import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CookieBanner.css';

const CookieBanner = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <p className="cookie-text">
        Vahanti Technologies uses cookies to understand how visitors interact with our site and to
        improve your experience. We collect anonymised usage data (including IP addresses) via analytics
        cookies. No personal data is shared with third parties. See our{' '}
        <Link to="/privacy">Privacy Policy</Link> for full details.
      </p>
      <div className="cookie-actions">
        <button className="cookie-btn-accept" onClick={() => setVisible(false)}>Accept All</button>
        <button className="cookie-btn-reject" onClick={() => setVisible(false)}>Reject All</button>
        <button className="cookie-btn-manage" onClick={() => setVisible(false)}>Manage Settings</button>
      </div>
    </div>
  );
};

export default CookieBanner;