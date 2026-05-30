import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './AboutSection.css';

const AboutSection = () => {
  const benefits = [
    "Premium Digital Design",
    "High Performance Architecture",
    "Scalable Solutions",
    "Seamless User Experience"
  ];

  return (
    <section className="section about-section" id="about">
      <div className="container">
        <h2 className="section-title">About Vahanti</h2>
        
        <div className="about-content">
          <div className="about-text">
            <h3>Pioneering the Future of the Web</h3>
            <p>
              At Vahanti, we believe that your digital presence should be as dynamic and 
              forward-thinking as your business. We specialize in building custom web 
              applications that don't just look stunning, but perform flawlessly.
            </p>
            <p>
              Our team combines cutting-edge technology with premium design aesthetics to 
              create experiences that captivate users and drive results. From modern React 
              applications to robust backends, we deliver excellence at every layer.
            </p>
            
            <ul className="benefits-list">
              {benefits.map((benefit, index) => (
                <li key={index}>
                  <CheckCircle2 className="check-icon" size={20} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="about-image-container">
            <div className="image-placeholder">
              <div className="abstract-shape"></div>
            </div>
            <div className="stats-card">
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
