import { memo } from 'react';
import PropTypes from 'prop-types';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const iconMap = {
  linkedin: FaLinkedin,
  github: FaGithub,
  email: FaEnvelope,
};

/**
 * Reusable social links component
 * Supports multiple display variants: icons, horizontal, vertical
 */
const SocialLinks = ({
  links,
  variant = 'icons',
  size = 'medium',
  className = '',
  showLabels = false,
}) => {
  const sizeMap = {
    small: 20,
    medium: 24,
    large: 28,
  };

  const iconSize = sizeMap[size] || sizeMap.medium;

  const getVariantClasses = () => {
    switch (variant) {
      case 'horizontal':
        return 'flex gap-4';
      case 'vertical':
        return 'flex flex-col gap-3';
      case 'icons':
      default:
        return 'flex gap-4';
    }
  };

  const getLinkClasses = () => {
    const baseClasses =
      'transition-colors hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-slate-900 rounded';

    if (variant === 'horizontal' || variant === 'vertical') {
      return `${baseClasses} flex items-center gap-2`;
    }

    return baseClasses;
  };

  return (
    <div className={`${getVariantClasses()} ${className}`}>
      {links.map((link) => {
        const Icon = iconMap[link.type] || iconMap.linkedin;

        return (
          <a
            key={link.type}
            href={link.url}
            target="_blank"
            rel="me noopener noreferrer"
            className={getLinkClasses()}
            aria-label={link.label || link.name}
          >
            <Icon size={iconSize} aria-hidden="true" />
            {showLabels && (
              <span className="text-sm font-medium">{link.name}</span>
            )}
          </a>
        );
      })}
    </div>
  );
};

SocialLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(['linkedin', 'github', 'email']).isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  variant: PropTypes.oneOf(['icons', 'horizontal', 'vertical']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  showLabels: PropTypes.bool,
};

export default memo(SocialLinks);
