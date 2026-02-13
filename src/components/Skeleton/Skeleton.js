/**
 * @file Skeleton loading component with shimmer effect.
 */
import React from 'react';
import './Skeleton.css';

/**
 * Skeleton placeholder with shimmer animation.
 * @param {string} variant - Shape variant: 'rect', 'circle', 'text'
 * @param {string|number} width - Width of the skeleton
 * @param {string|number} height - Height of the skeleton
 * @param {string} className - Additional CSS classes
 */
function Skeleton({ variant = 'rect', width, height, className = '' }) {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`skeleton skeleton-${variant} ${className}`}
      style={style}
    />
  );
}

export default Skeleton;
