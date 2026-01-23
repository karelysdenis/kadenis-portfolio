import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useClickOutside } from '@hooks';
import { dropdownMenu } from '@constants/animations';

const FilterDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  useClickOutside(dropdownRef, handleClickOutside);

  const handleSelect = useCallback((option) => {
    onChange(option);
    setIsOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  }, [onChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) {
        // Open dropdown with Enter or Space when button is focused
        if (
          (event.key === 'Enter' || event.key === ' ') &&
          document.activeElement === buttonRef.current
        ) {
          event.preventDefault();
          setIsOpen(true);
          setFocusedIndex(options.indexOf(value));
        }
        return;
      }

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : prev
          );
          break;

        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < options.length) {
            handleSelect(options[focusedIndex]);
          }
          break;

        case 'Escape':
          event.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          buttonRef.current?.focus();
          break;

        case 'Home':
          event.preventDefault();
          setFocusedIndex(0);
          break;

        case 'End':
          event.preventDefault();
          setFocusedIndex(options.length - 1);
          break;

        default:
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, focusedIndex, options, value, handleSelect]);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(options.indexOf(value));
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Dropdown Button */}
      <button
        ref={buttonRef}
        onClick={handleButtonClick}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Filter projects by category"
        className="w-full px-4 py-3 bg-slate-800 text-white rounded-lg border-2 border-slate-700 hover:border-slate-600 focus:outline-none focus:border-primary-600 font-medium transition-colors flex items-center justify-between"
      >
        <span>{value}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown className="text-primary-600" />
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...dropdownMenu}
            transition={{ duration: 0.2 }}
            role="listbox"
            className="absolute z-50 w-full mt-2 bg-slate-800 border-2 border-slate-700 rounded-lg shadow-xl overflow-hidden"
          >
            {options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={value === option}
                className={`w-full px-4 py-3 text-left font-medium transition-colors ${
                  value === option
                    ? 'bg-primary-600 text-white'
                    : focusedIndex === index
                    ? 'bg-slate-700 text-white ring-2 ring-primary-600 ring-inset'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

FilterDropdown.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default memo(FilterDropdown);
