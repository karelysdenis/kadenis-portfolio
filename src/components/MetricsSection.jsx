import { memo } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/projects';
import { staggerContainer, staggerItem, viewportOnce } from '@constants/animations';

const MetricsSection = () => {
  const containerVariants = staggerContainer(0.2);
  const itemVariants = staggerItem;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personalInfo.metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              className="text-center p-8 bg-slate-800 rounded-lg border border-slate-700"
            >
              <div className="text-5xl font-bold text-gradient mb-2">
                {metric.value}
              </div>
              <div className="text-slate-400 text-lg">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default memo(MetricsSection);
