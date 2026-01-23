import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * Reusable Call-to-Action component
 * Supports both internal links and external links
 */
const CTA = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'default',
  className = '',
}) => {
  const getContainerClasses = () => {
    const baseClasses = 'text-center rounded-lg p-12 border';

    switch (variant) {
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700`;
      case 'outlined':
        return `${baseClasses} bg-transparent border-slate-700`;
      case 'default':
      default:
        return `${baseClasses} bg-slate-800/50 border-slate-700`;
    }
  };

  const renderAction = (action, isPrimary = true) => {
    if (!action) return null;

    const buttonClasses = isPrimary
      ? 'inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-slate-900'
      : 'inline-block px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-900';

    if (action.external) {
      return (
        <a
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
          aria-label={action.ariaLabel}
        >
          {action.label}
        </a>
      );
    }

    return (
      <Link to={action.to} className={buttonClasses} aria-label={action.ariaLabel}>
        {action.label}
      </Link>
    );
  };

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}

      {description && (
        <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
          {description}
        </p>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        {renderAction(primaryAction, true)}
        {renderAction(secondaryAction, false)}
      </div>
    </div>
  );
};

CTA.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  primaryAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    external: PropTypes.bool,
    ariaLabel: PropTypes.string,
  }),
  secondaryAction: PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
    href: PropTypes.string,
    external: PropTypes.bool,
    ariaLabel: PropTypes.string,
  }),
  variant: PropTypes.oneOf(['default', 'gradient', 'outlined']),
  className: PropTypes.string,
};

export default memo(CTA);
