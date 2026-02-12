import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { useImageState } from '@hooks';
import { personalInfo } from '../data/projects';

const About = () => {
  const { imageError, imageLoaded, handleImageError, handleImageLoad } = useImageState();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Karelys Denis",
      "jobTitle": "Full-Stack Developer & UX Specialist",
      "url": "https://kadenis.reakagency.com",
      "image": "https://kadenis.reakagency.com/images/profile.jpg",
      "sameAs": [
        "https://www.linkedin.com/in/karelys-denis",
        "https://github.com/karelysdenis"
      ],
      "knowsAbout": ["React", "Node.js", "JavaScript", "WordPress", "MySQL", "Tailwind CSS", "Express.js", "Azure Cloud", "UX Design"],
      "hasCredential": [
        { "@type": "EducationalOccupationalCredential", "name": "ISTQB Certified Tester" },
        { "@type": "EducationalOccupationalCredential", "name": "IT Security Specialist" }
      ]
    }
  };

  return (
    <>
      <SEO
        title="About - Professional Background & Experience"
        description="Full-stack developer and UX specialist with 10+ years building web applications. From React and Node.js platforms to AI-powered products across healthcare, e-commerce, and cultural sectors."
        canonical="/about"
        keywords="full-stack developer, UX specialist, React developer, Node.js developer, web applications, user experience, frontend development"
        structuredData={structuredData}
      />
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About Me
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Building solutions that solve real problems for real users
          </p>
        </motion.div>

        {/* Photo + Intro + Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-20"
        >
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="aspect-square bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                {!imageError ? (
                  <img
                    src="/images/profile.jpg"
                    alt="Karelys Denis"
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
                        className="w-24 h-24 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <p className="text-sm">Photo unavailable</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {personalInfo.title}
                </h2>
                <p className="text-slate-400 leading-relaxed">
                  {personalInfo.bio}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {personalInfo.languages.map((lang) => (
                    <span
                      key={lang.name}
                      className="px-4 py-2 bg-slate-800 rounded-lg border border-slate-700 text-slate-300"
                    >
                      {lang.name} ({lang.level})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What I Do */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
            <h2 className="text-2xl font-bold mb-4">What I Do</h2>
            <p className="text-slate-400 leading-relaxed">
              {personalInfo.aboutWhatIDo}
            </p>
          </div>
        </motion.div>

        {/* Who I Work With */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
            <h2 className="text-2xl font-bold mb-4">Who I Work With</h2>
            <p className="text-slate-400 leading-relaxed">
              {personalInfo.aboutWhoIWorkWith}
            </p>
          </div>
        </motion.div>

        {/* Professional Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Professional Experience
          </h2>

          <div className="space-y-8">
            {personalInfo.experience.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 border-l-2 border-primary-600"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary-600 rounded-full" />

                <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      {(exp.company || exp.location) && (
                        <p className="text-sm text-slate-400 mt-1">
                          {exp.company}{exp.company && exp.location && ' · '}{exp.location}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-slate-400 whitespace-nowrap mt-1 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-slate-400">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Education & Certifications
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {personalInfo.education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800 rounded-lg border border-slate-700 p-6"
              >
                <h3 className="text-lg font-bold mb-2">{edu.degree}</h3>
                <p className="text-slate-400 mb-1">{edu.institution}</p>
                <p className="text-sm text-slate-500">{edu.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What I Can Do - Categorized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            What I Can Do
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(personalInfo.whatICanDo).map(([category, skills], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800 rounded-lg border border-slate-700 p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  {category}
                </h3>
                <ul className="space-y-2">
                  {skills.map((skill) => (
                    <li key={skill} className="text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center bg-slate-800/50 rounded-lg p-12 border border-slate-700"
        >
          <h2 className="text-3xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Open to project collaborations. If you have something that needs building, let's talk.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default About;
