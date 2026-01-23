import { useMemo } from 'react';
import { personalInfo } from '../data/projects';

/**
 * Custom hook to access personal information
 * Provides memoized access to personal data and derived values
 * @returns {object} Personal information and utilities
 */
export const usePersonalInfo = () => {
  // Memoize social links array
  const socialLinks = useMemo(
    () => [
      {
        type: 'linkedin',
        name: 'LinkedIn',
        url: personalInfo.linkedin,
        label: 'LinkedIn Profile',
      },
      {
        type: 'github',
        name: 'GitHub',
        url: personalInfo.github,
        label: 'GitHub Profile',
      },
      {
        type: 'email',
        name: 'Email',
        url: `mailto:${personalInfo.email}`,
        label: 'Email Contact',
      },
    ],
    []
  );

  // Memoize contact info array
  const contactInfo = useMemo(
    () => [
      {
        type: 'email',
        label: 'Email',
        value: personalInfo.email,
        link: `mailto:${personalInfo.email}`,
      },
      {
        type: 'location',
        label: 'Location',
        value: personalInfo.location,
        link: null,
      },
    ],
    []
  );

  // Memoize full name display
  const fullName = useMemo(() => personalInfo.name, []);

  // Memoize title
  const title = useMemo(() => personalInfo.title, []);

  // Memoize availability status
  const isAvailable = useMemo(
    () => personalInfo.availability === 'Available for remote work',
    []
  );

  return {
    // Raw data
    ...personalInfo,

    // Derived/formatted data
    socialLinks,
    contactInfo,
    fullName,
    title,
    isAvailable,
  };
};
