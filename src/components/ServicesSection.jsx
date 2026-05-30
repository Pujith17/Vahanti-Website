import React from 'react';
import { Monitor, Smartphone, Globe, PenTool, Database, Zap } from 'lucide-react';
import './ServicesSection.css';

const services = [
  {
    icon: <Monitor size={32} />,
    title: 'Web Application Development',
    description: 'We build fast, scalable, and secure web applications tailored to your business needs.'
  },
  {
    icon: <Smartphone size={32} />,
    title: 'Mobile-First Design',
    description: 'Every interface we create is fully responsive, ensuring a perfect experience on all devices.'
  },
  {
    icon: <PenTool size={32} />,
    title: 'UI/UX Excellence',
    description: 'We craft intuitive and aesthetically pleasing interfaces that engage users and boost conversions.'
  },
  {
    icon: <Globe size={32} />,
    title: 'SEO Optimization',
    description: 'Built-in best practices to ensure your digital presence ranks high and reaches your target audience.'
  },
  {
    icon: <Database size={32} />,
    title: 'Backend Architecture',
    description: 'Robust server-side solutions and databases that power your applications with reliability.'
  },
  {
    icon: <Zap size={32} />,
    title: 'Performance Tuning',
    description: 'We optimize every asset and line of code to ensure lightning-fast load times.'
  }
];

const ServicesSection = () => {
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <h2 className="section-title">Our Expertise</h2>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
