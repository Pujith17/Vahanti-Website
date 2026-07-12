import React from 'react';
import { useInView, useScrollProgress } from '../hooks/useScrollProgress';
import { useIsMobile } from '../hooks/useIsMobile';
import './ClaritySection.css';

// Desktop copy is the canonical source of truth.
// Mobile copy preserves the same meaning at ~45% fewer words.
const CLARITY_COPY = {
  desktop:
    'Air cargo operations depend on accurate information, efficient workflows, and timely decisions to keep the global supply chain moving. As operations grow more complex, teams need complete operational visibility and software designed around real-world cargo processes, not generic systems. Vahanti develops intelligent aviation solutions that simplify operations, improve decision making, and deliver measurable operational and business outcomes.',
  mobile:
    'Air cargo operations need accurate information, efficient workflows, and timely decisions. As complexity grows, teams need real operational visibility and software built for cargo rather than generic systems. Vahanti delivers intelligent solutions that simplify operations and improve decision making.',
};

const ClaritySection = () => {
  const { ref: sectionRef, progress } = useScrollProgress({ start: 0.95, end: 0.1 });
  const { ref: headRef, inView: headVisible } = useInView({ threshold: 0.2 });
  const isMobile = useIsMobile();

  return (
    <section className="clarity-section" ref={sectionRef} style={{ '--sp': progress }}>
      <div className="container">
        <div
          ref={headRef}
          className={`clarity-story-head ${headVisible ? 'clarity-story-head--visible' : ''}`}
        >
          <span className="clarity-eyebrow">Why Vahanti</span>
          <h2 className="clarity-title">
            Operationally Grounded. <span className="clarity-title-muted">Architected on Leading-Edge Technology.</span>
          </h2>
          <p className="clarity-lead">
            {isMobile ? CLARITY_COPY.mobile : CLARITY_COPY.desktop}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClaritySection;