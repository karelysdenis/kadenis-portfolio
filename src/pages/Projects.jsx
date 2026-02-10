import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import FilterDropdown from '../components/FilterDropdown';
import SEO from '../components/common/SEO';
import { projects } from '../data/projects';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Projects Portfolio - Karelys Denis",
    "description": "20+ production projects across healthcare, e-commerce, legal, and cultural sectors.",
    "url": "https://kadenis.reakagency.com/projects",
    "author": {
      "@type": "Person",
      "name": "Karelys Denis"
    }
  };

  const categories = useMemo(
    () => [
      'All',
      'Performance & Cloud',
      'Healthcare & Compliance',
      'E-commerce & Payments',
      'Enterprise Solutions',
    ],
    []
  );

  const filteredProjects = useMemo(
    () =>
      activeFilter === 'All'
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter]
  );

  return (
    <>
      <SEO
        title="Projects Portfolio"
        description="Browse 20+ production projects delivered across healthcare, e-commerce, legal, and cultural sectors. Full-stack development with React, Node.js, and user-centered design."
        canonical="/projects"
        keywords="web development projects, React applications, full-stack development, UX design, e-commerce solutions, user-centered web apps"
        structuredData={structuredData}
      />
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            All Projects
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A comprehensive collection of web development projects I've delivered
            across various industries and technologies
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeFilter === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:hidden mb-6 px-4"
        >
          <FilterDropdown
            value={activeFilter}
            onChange={setActiveFilter}
            options={categories}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <p className="text-slate-400">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-400 text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
    </>
  );
};

export default Projects;
