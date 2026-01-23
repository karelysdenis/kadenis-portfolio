import { useEffect } from 'react';

/**
 * Custom hook for detecting clicks outside a specified element
 * @param {React.RefObject} ref - Reference to the element
 * @param {Function} callback - Function to call when click outside is detected
 * @param {boolean} enabled - Whether the hook is enabled (default: true)
 */
export const useClickOutside = (ref, callback, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, enabled]);
};
