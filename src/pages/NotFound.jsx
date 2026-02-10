import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';

const NotFound = () => {
  return (
    <>
      <SEO
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Browse Karelys Denis portfolio projects or return to the homepage."
        canonical="/"
      />
      <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-8">
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-9xl font-bold text-gradient mb-4"
          >
            404
          </motion.h1>
          <h2 className="text-3xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/projects"
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700"
          >
            View Projects
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <p className="text-sm text-slate-500">
            Lost? Try searching from the{' '}
            <Link to="/" className="text-primary-600 hover:text-primary-500">
              homepage
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
    </>
  );
};

export default NotFound;
