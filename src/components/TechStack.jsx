import { memo } from 'react';
import { motion } from 'framer-motion';
import { homeTechnologies } from '../data/technologies';
import { getIcon } from '../utils/iconMap';
import { staggerContainer, staggerItem, viewportOnce } from '@constants/animations';

const TechStack = () => {
  const technologies = homeTechnologies;
  const containerVariants = staggerContainer(0.1);
  const itemVariants = staggerItem;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          variants={staggerItem}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technologies I Use
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Core stack for building scalable web applications
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-6"
        >
          {technologies.map((tech) => {
            const IconComponent = getIcon(tech.iconName);
            return (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -8 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 group-hover:border-primary-600 transition-all">
                  <div className="text-slate-400 group-hover:text-primary-600 transition-colors">
                    {IconComponent && <IconComponent size={48} aria-hidden="true" />}
                  </div>
                </div>
                <span className="text-xs font-medium text-center text-slate-400 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default memo(TechStack);
