import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaPalette } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useClickOutside } from '@hooks';

const Navbar = ({ onThemeClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
  }, []);

  useClickOutside(mobileMenuRef, handleClickOutside, isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav
      ref={mobileMenuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gradient">
            KD
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === link.path
                    ? 'text-primary-600'
                    : 'text-slate-300'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Theme Customizer Button */}
            <button
              onClick={onThemeClick}
              className="p-2 text-slate-300 hover:text-primary-600 transition-colors"
              aria-label="Customize Theme"
              title="Customize Theme"
            >
              <FaPalette size={18} />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-slate-800 border-t border-slate-700"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Theme Customizer Button - Mobile */}
            <button
              onClick={() => { onThemeClick(); setIsOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <FaPalette size={18} />
              Customize Theme
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  onThemeClick: PropTypes.func.isRequired,
};

export default Navbar;
