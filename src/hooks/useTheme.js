import { useState } from 'react';

const defaultTheme = {
  primaryColor: '#22c55e',
  bgDark: '#0d0d0d',
  bgMedium: '#1a1a1a',
  bgLight: '#2a2a2a',
};

// Apply theme to CSS variables
const applyTheme = (newTheme) => {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', newTheme.primaryColor);
  root.style.setProperty('--color-bg-dark', newTheme.bgDark);
  root.style.setProperty('--color-bg-medium', newTheme.bgMedium);
  root.style.setProperty('--color-bg-light', newTheme.bgLight);
};

const getStoredTheme = () => {
  try {
    const saved = localStorage.getItem('portfolioTheme');
    if (saved) return JSON.parse(saved);
  } catch { /* ignore corrupt localStorage */ }
  return null;
};

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const stored = getStoredTheme();
    if (stored) {
      applyTheme(stored);
      return stored;
    }
    return defaultTheme;
  });
  const [savedTheme, setSavedTheme] = useState(() => getStoredTheme() || defaultTheme);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Update theme (preview only)
  const updateTheme = (key, value) => {
    const newTheme = { ...theme, [key]: value };
    setTheme(newTheme);
    applyTheme(newTheme);
    setHasUnsavedChanges(true);
  };

  // Save theme to localStorage
  const saveTheme = () => {
    try {
      localStorage.setItem('portfolioTheme', JSON.stringify(theme));
      setSavedTheme(theme);
      setHasUnsavedChanges(false);
      return true;
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
      return false;
    }
  };

  // Reset to default theme
  const resetTheme = () => {
    setTheme(defaultTheme);
    applyTheme(defaultTheme);
    setHasUnsavedChanges(true);
  };

  // Revert to saved theme
  const revertToSaved = () => {
    setTheme(savedTheme);
    applyTheme(savedTheme);
    setHasUnsavedChanges(false);
  };

  return {
    theme,
    savedTheme,
    hasUnsavedChanges,
    defaultTheme,
    updateTheme,
    saveTheme,
    resetTheme,
    revertToSaved,
  };
};
