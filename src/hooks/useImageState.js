import { useState } from 'react';

/**
 * Custom hook for managing image loading and error states
 * @returns {object} Image state and handlers
 */
export const useImageState = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const resetImageState = () => {
    setImageError(false);
    setImageLoaded(false);
  };

  return {
    imageError,
    imageLoaded,
    handleImageError,
    handleImageLoad,
    resetImageState,
  };
};
