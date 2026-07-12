import React from 'react';
import './DesktopExperiencePlaceholder.css';

/**
 * Reusable placeholder card representing complex desktop experiences on mobile.
 * Displays a premium abstract graphic mock instead of a plain text placeholder.
 */
export default function DesktopExperiencePlaceholder({ badge, title, description, type }) {
  return (
    <div className="desktop-experience-placeholder">
      <span className="placeholder-badge">{badge}</span>
      <h4 className="placeholder-title">{title}</h4>
      <p className="placeholder-description">{description}</p>
      
      {type === 'analytics' && (
        <div className="placeholder-mock mock-analytics" aria-hidden="true">
          <div className="mock-chart-line">
            <svg viewBox="0 0 300 80" fill="none">
              <path d="M0,60 C40,40 60,70 100,50 C140,30 180,65 220,40 C260,15 280,45 300,30" stroke="var(--color-primary-active)" strokeWidth="3" opacity="0.8" />
              <path d="M0,70 C30,55 70,75 110,60 C150,45 170,55 210,48 C250,40 270,55 300,45" stroke="var(--color-primary)" strokeWidth="2" opacity="0.4" strokeDasharray="4,4" />
            </svg>
          </div>
          <div className="mock-chart-bars">
            <span className="mock-bar" style={{ height: '30%' }} />
            <span className="mock-bar" style={{ height: '50%' }} />
            <span className="mock-bar" style={{ height: '40%' }} />
            <span className="mock-bar" style={{ height: '65%' }} />
            <span className="mock-bar" style={{ height: '25%' }} />
            <span className="mock-bar" style={{ height: '80%' }} />
            <span className="mock-bar" style={{ height: '55%' }} />
          </div>
        </div>
      )}

      {type === 'workflow' && (
        <div className="placeholder-mock mock-workflow" aria-hidden="true">
          <div className="mock-workflow-nodes">
            {[
              { label: 'Truck', active: true },
              { label: 'Manifest', active: true },
              { label: 'Warehouse', active: false },
              { label: 'Release', active: false }
            ].map((node, idx) => (
              <div key={idx} className="mock-node-item">
                <span className={`mock-node-dot ${node.active ? 'active' : ''}`} />
                <span className="mock-node-label">{node.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="placeholder-footer">
        <span className="placeholder-footer-text">Open on desktop to explore the full interactive experience.</span>
      </div>
    </div>
  );
}
