import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import MetricsSection from '../components/MetricsSection';
import TechStack from '../components/TechStack';
import ProjectCard from '../components/ProjectCard';
import SEO from '../components/common/SEO';
import { projects } from '../data/projects';

const Home = () => {
  const featuredProjects = projects.filter(p => p.featured);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Karelys Denis",
    "jobTitle": "Senior Full-Stack Developer & Performance Engineer",
    "description": "Professional software developer with 10+ years experience in fullstack web development",
    "url": "https://kadenis.reakagency.com",
    "sameAs": [
      "https://www.linkedin.com/in/karelysdenis",
      "https://github.com/karelysdenis"
    ],
    "knowsAbout": ["WordPress", "React", "Node.js", "JavaScript", "MySQL", "Azure Cloud", "Web Performance"],
    "email": "karelys@reakagency.com"
  };

  return (
    <>
      <SEO
        title="Senior Full-Stack Developer & Performance Engineer"
        description="Professional portfolio showcasing 20+ production projects. Specialized in WordPress development, React, Node.js, and high-performance web applications."
        canonical="/"
        structuredData={structuredData}
      />
      <div className="min-h-screen">
        <Hero />

      <MetricsSection />

      <TechStack />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A selection of my most impactful web development projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Link
              to="/projects"
              className="inline-block px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700"
            >
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Available for Remote Work
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Currently accepting new projects and collaborations.
            Specialized in scalable web applications and high-traffic platforms. 
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Discuss Your Project
          </Link>
        </motion.div>
      </section>
      </div>
    </>
  );
};

export default Home;
