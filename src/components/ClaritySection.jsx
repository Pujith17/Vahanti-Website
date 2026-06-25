import React from 'react';
import { useInView, useScrollProgress } from '../hooks/useScrollProgress';
import './ClaritySection.css';

const ClaritySection = () => {
  const { ref: sectionRef, progress } = useScrollProgress({ start: 0.95, end: 0.1 });
  const { ref: headRef, inView: headVisible } = useInView({ threshold: 0.2 });

  return (
    <section className="clarity-section" ref={sectionRef} style={{ '--sp': progress }}>
      <div className="container">
        <div
          ref={headRef}
          className={`clarity-story-head ${headVisible ? 'clarity-story-head--visible' : ''}`}
        >
          <span className="clarity-eyebrow">Why Vahanti</span>
          <h2 className="clarity-title">
            We build aviation systems that are <span className="clarity-title-muted">operationally grounded, not just technically impressive.</span>
          </h2>
          <p className="clarity-lead">
            Air cargo teams do not need generic transformation language. They need better visibility, faster decisions, and software that understands how real operations behave under pressure. That is the gap Vahanti is built to close.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClaritySection;