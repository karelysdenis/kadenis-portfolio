import { useSyncExternalStore } from 'react';

const subscribe = (callback) => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
};

const getSnapshot = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getServerSnapshot = () => false;

/**
 * Custom hook to detect user's motion preference
 * Returns true if user prefers reduced motion
 * @returns {boolean} prefersReducedMotion
 */
export const useReducedMotion = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
