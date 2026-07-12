import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { SEO } from '../config/seo';
import './NotFoundPage.css';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = `404 - Page Not Found | ${SEO.siteName}`;
  }, []);

  return (
    <main className="not-found-page">
      <div className="not-found-glow" />
      <div className="container not-found-container">
        <div className="not-found-card glass-panel">
          <div className="not-found-icon-wrap">
            <AlertCircle size={48} className="not-found-icon" />
          </div>
          <span className="not-found-code">404 Error</span>
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-text">
            The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="btn-primary">
              <ArrowLeft size={16} />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
