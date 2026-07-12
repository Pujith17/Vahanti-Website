import React from 'react';

const Logo = ({ size = 32, className = '' }) => {
  const height = size;
  const width = Math.round(size * (340 / 570));
  return (
    <svg
      width={width}
      height={height}
      viewBox="310 210 340 570"
      fill="none"
      className={`logo-svg ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="360" y1="310" x2="420" y2="690" stroke="#FF2D2D" strokeWidth="90" strokeLinecap="round" />
      <line x1="440" y1="730" x2="600" y2="260" stroke="#1D3583" strokeWidth="90" strokeLinecap="round" />
    </svg>
  );
};

export default Logo;
