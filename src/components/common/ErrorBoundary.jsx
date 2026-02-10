import { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Here you could send error to logging service (Sentry, LogRocket, etc.)
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI passed as prop
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-slate-900">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <div className="text-6xl mb-4">⚠️</div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Something went wrong
              </h1>
              <p className="text-slate-400 mb-6">
                {this.props.message || 'An unexpected error occurred. Please try again.'}
              </p>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left bg-slate-800 rounded-lg p-4 border border-slate-700">
                <summary className="cursor-pointer text-sm font-medium text-slate-300 mb-2">
                  Error Details (Development Only)
                </summary>
                <div className="text-xs text-red-400 font-mono overflow-auto max-h-48">
                  <p className="mb-2">{this.state.error.toString()}</p>
                  {this.state.errorInfo && (
                    <pre className="whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Try Again
              </button>
              <a
                href="/"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700"
              >
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  message: PropTypes.string,
};

export default ErrorBoundary;
