import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useImageState } from '@hooks';
import { fadeInUp, viewportOnce } from '@constants/animations';

const ProjectCard = ({ project, index }) => {
  const { imageError, imageLoaded, handleImageError, handleImageLoad } = useImageState();

  return (
    <motion.div
      {...fadeInUp}
      whileInView="animate"
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden group cursor-pointer"
    >
      {/* Project Image */}
      <div className="relative h-48 bg-slate-700 overflow-hidden">
        {!imageError ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onError={handleImageError}
            onLoad={handleImageLoad}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-700">
            <div className="text-center text-slate-500">
              <svg
                className="w-16 h-16 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs">Image unavailable</p>
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        {project.url && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-slate-900 rounded-lg font-medium flex items-center gap-2 hover:bg-primary-600 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              View Site <FiExternalLink size={18} />
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-primary-600 transition-colors">
            {project.title}
          </h3>
          <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
            {project.year}
          </span>
        </div>

        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-slate-700 text-slate-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 text-slate-400 text-xs">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    url: PropTypes.string,
    year: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProjectCard;
