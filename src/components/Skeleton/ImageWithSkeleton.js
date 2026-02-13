/**
 * @file Image component with skeleton loading state.
 */
import React, { useState } from 'react';
import Skeleton from './Skeleton';
import './Skeleton.css';

/**
 * Image that shows skeleton while loading.
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {string} className - CSS class for the image
 * @param {string} wrapperClassName - CSS class for the wrapper
 */
function ImageWithSkeleton({ src, alt, className = '', wrapperClassName = '' }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`image-skeleton-wrapper ${wrapperClassName}`}>
      {!loaded && (
        <Skeleton
          variant="rect"
          width="100%"
          height="100%"
          className="image-skeleton"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'loaded' : 'loading'}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}

export default ImageWithSkeleton;
