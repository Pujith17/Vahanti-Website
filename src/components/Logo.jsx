import React from 'react';
import logoImage from '../assets/vahanti-logo.webp';

const Logo = ({ size = 32, className = '' }) => {
  const scale = 3840 / 2048; // 1.875 to make the V mark height exactly equal to size
  const imageSize = size * scale;

  // Exact padding around the V mark in the 3840x3840 source canvas
  const paddingX = (1203 / 3840) * imageSize;
  const paddingY = (896 / 3840) * imageSize;

  return (
    <img
      src={logoImage}
      alt="Vahanti"
      width={imageSize}
      height={imageSize}
      className={`logo-img ${className}`}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        objectFit: 'contain',
        marginLeft: `${-paddingX}px`,
        marginRight: `${-paddingX}px`,
        marginTop: `${-paddingY}px`,
        marginBottom: `${-paddingY}px`,
      }}
    />
  );
};

export default Logo;
