import React from 'react';
import { ArrowRight } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="gradient-blob shape-1"></div>
        <div className="gradient-blob shape-2"></div>
      </div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <span className="badge">Welcome to Vahanti</span>
          <h1 className="hero-title">
            Crafting Digital 
            <span className="text-gradient"> Excellence</span>
          </h1>
          <p className="hero-description">
            We build premium, highly dynamic, and beautiful digital experiences that help your brand stand out in the modern web.
          </p>
          <div className="hero-actions">
            <a href="#portfolio" className="btn-primary">
              View Our Work
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="glass-card main-card">
            <div className="card-header">
              <div className="window-controls">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className="card-body">
              <div className="skeleton-line title"></div>
              <div className="skeleton-line"></div>
              <div className="skeleton-line short"></div>
              <div className="grid-preview">
                <div className="grid-item"></div>
                <div className="grid-item"></div>
                <div className="grid-item"></div>
                <div className="grid-item"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
