import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaSave, FaUndo, FaCheck, FaPalette } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ThemeCustomizer = ({ isOpen = false, setIsOpen = () => {} }) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const defaultTheme = {
    primaryColor: '#22c55e',
    bgDark: '#0d0d0d',
    bgMedium: '#1a1a1a',
    bgLight: '#2a2a2a',
  };

  const [theme, setTheme] = useState(defaultTheme);
  const [savedTheme, setSavedTheme] = useState(defaultTheme);

  // Apply theme to CSS variables (preview only)
  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    // Apply primary color to all variants
    root.style.setProperty('--color-primary', newTheme.primaryColor);
    root.style.setProperty('--color-primary-light', newTheme.primaryColor);
    root.style.setProperty('--color-primary-400', newTheme.primaryColor);
    root.style.setProperty('--color-primary-dark', newTheme.primaryColor);
    root.style.setProperty('--color-primary-darker', newTheme.primaryColor);
    // Apply background colors
    root.style.setProperty('--color-bg-dark', newTheme.bgDark);
    root.style.setProperty('--color-bg-medium', newTheme.bgMedium);
    root.style.setProperty('--color-bg-light', newTheme.bgLight);
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolioTheme');
    if (saved) {
      const parsed = JSON.parse(saved);
      setTheme(parsed);
      setSavedTheme(parsed);
      applyTheme(parsed);
    }
  }, []);

  // Handle color change (preview only)
  const handleColorChange = (key, value) => {
    const newTheme = { ...theme, [key]: value };
    setTheme(newTheme);
    applyTheme(newTheme);
    setHasUnsavedChanges(true);
  };

  // Save theme
  const saveTheme = () => {
    localStorage.setItem('portfolioTheme', JSON.stringify(theme));
    setSavedTheme(theme);
    setHasUnsavedChanges(false);
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  // Reset to default
  const resetToDefault = () => {
    setTheme(defaultTheme);
    applyTheme(defaultTheme);
    setHasUnsavedChanges(true);
  };

  // Cancel changes
  const cancelChanges = () => {
    setTheme(savedTheme);
    applyTheme(savedTheme);
    setHasUnsavedChanges(false);
  };

  // Preset themes
  const presets = [
    {
      name: 'Green (Default)',
      colors: {
        primaryColor: '#22c55e',
        bgDark: '#0d0d0d',
        bgMedium: '#1a1a1a',
        bgLight: '#2a2a2a',
      }
    },
    {
      name: 'Blue',
      colors: {
        primaryColor: '#3b82f6',
        bgDark: '#0d0d0d',
        bgMedium: '#1a1a1a',
        bgLight: '#2a2a2a',
      }
    },
    {
      name: 'Purple',
      colors: {
        primaryColor: '#a855f7',
        bgDark: '#0d0d0d',
        bgMedium: '#1a1a1a',
        bgLight: '#2a2a2a',
      }
    },
    {
      name: 'Orange',
      colors: {
        primaryColor: '#f97316',
        bgDark: '#0d0d0d',
        bgMedium: '#1a1a1a',
        bgLight: '#2a2a2a',
      }
    },
    {
      name: 'Dark Blue BG',
      colors: {
        primaryColor: '#22c55e',
        bgDark: '#0f172a',
        bgMedium: '#1e293b',
        bgLight: '#334155',
      }
    },
  ];

  const applyPreset = (preset) => {
    setTheme(preset.colors);
    applyTheme(preset.colors);
    setHasUnsavedChanges(true);
  };

  return (
    <>
      {/* Customizer Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-slate-800 shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-slate-900 p-6 border-b border-slate-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <FaPalette className="text-primary-600" />
                  Theme Customizer
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <FaTimes size={20} className="text-slate-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Presets */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-3">
                    Quick Presets
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors text-left"
                      >
                        <div
                          className="w-6 h-6 rounded mb-2"
                          style={{ backgroundColor: preset.colors.primaryColor }}
                        />
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Colors */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-3">
                    Custom Colors
                  </h3>

                  {/* Primary Color */}
                  <div className="space-y-2 mb-4">
                    <label className="text-sm text-slate-400">Primary Color</label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="color"
                        value={theme.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                        className="w-12 h-12 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.primaryColor}
                        onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:outline-none focus:border-primary-600"
                      />
                    </div>
                  </div>

                  {/* Background Dark */}
                  <div className="space-y-2 mb-4">
                    <label className="text-sm text-slate-400">Background Dark</label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="color"
                        value={theme.bgDark}
                        onChange={(e) => handleColorChange('bgDark', e.target.value)}
                        className="w-12 h-12 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.bgDark}
                        onChange={(e) => handleColorChange('bgDark', e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:outline-none focus:border-primary-600"
                      />
                    </div>
                  </div>

                  {/* Background Medium */}
                  <div className="space-y-2 mb-4">
                    <label className="text-sm text-slate-400">Background Medium</label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="color"
                        value={theme.bgMedium}
                        onChange={(e) => handleColorChange('bgMedium', e.target.value)}
                        className="w-12 h-12 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.bgMedium}
                        onChange={(e) => handleColorChange('bgMedium', e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:outline-none focus:border-primary-600"
                      />
                    </div>
                  </div>

                  {/* Background Light */}
                  <div className="space-y-2 mb-4">
                    <label className="text-sm text-slate-400">Background Light</label>
                    <div className="flex gap-3 items-center">
                      <input
                        type="color"
                        value={theme.bgLight}
                        onChange={(e) => handleColorChange('bgLight', e.target.value)}
                        className="w-12 h-12 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={theme.bgLight}
                        onChange={(e) => handleColorChange('bgLight', e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-700 text-white rounded border border-slate-600 focus:outline-none focus:border-primary-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-3">
                    Preview
                  </h3>
                  <div
                    className="p-4 rounded-lg border border-slate-600"
                    style={{ backgroundColor: theme.bgMedium }}
                  >
                    <div
                      className="px-4 py-2 rounded text-white font-medium inline-block mb-3"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      Primary Button
                    </div>
                    <div
                      className="p-3 rounded"
                      style={{ backgroundColor: theme.bgLight }}
                    >
                      <p className="text-slate-300 text-sm">Card Background</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {/* Save Button */}
                  <button
                    onClick={saveTheme}
                    disabled={!hasUnsavedChanges}
                    className={`w-full px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                      hasUnsavedChanges
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <FaSave />
                    {showSaveSuccess ? (
                      <>
                        <FaCheck className="text-green-400" />
                        Saved!
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Cancel Button */}
                    <button
                      onClick={cancelChanges}
                      disabled={!hasUnsavedChanges}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        hasUnsavedChanges
                          ? 'bg-slate-700 hover:bg-slate-600 text-white'
                          : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      Cancel
                    </button>

                    {/* Reset to Default */}
                    <button
                      onClick={resetToDefault}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <FaUndo size={14} />
                      Reset
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="text-xs text-slate-500 bg-slate-900 p-4 rounded-lg border border-slate-700">
                  {hasUnsavedChanges && (
                    <p className="mb-2 text-yellow-500 flex items-center gap-2">
                      ⚠️ You have unsaved changes
                    </p>
                  )}
                  <p className="mb-2">💡 Click "Save Changes" to persist your theme.</p>
                  <p>Your preferences are stored in browser localStorage.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

ThemeCustomizer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ThemeCustomizer;
