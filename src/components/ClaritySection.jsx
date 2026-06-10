import React from 'react';
import './ClaritySection.css';

const ClaritySection = () => {
  return (
    <section className="clarity-section">
      <div className="container clarity-container">
        <span className="section-eyebrow">Why Vahanti</span>

        <h2 className="clarity-title">
          We build aviation systems that are
          <br />
          operationally grounded, not just
          <br />
          technically impressive.
        </h2>

        <p className="clarity-copy">
          Air cargo teams do not need generic transformation language. They need
          better visibility, faster decisions, and software that understands how
          real operations behave under pressure. That is the gap Vahanti is built to close.
        </p>
      </div>
    </section>
  );
};

export default ClaritySection;