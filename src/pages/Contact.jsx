import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import SEO from '../components/common/SEO';
import SocialLinks from '../components/common/SocialLinks';
import ContactForm from '../components/ContactForm';
import { usePersonalInfo } from '@hooks';

const Contact = () => {
  const { contactInfo, socialLinks, availability } = usePersonalInfo();

  // Only show LinkedIn and GitHub (first 2 social links)
  const contactSocialLinks = socialLinks.slice(0, 2);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Karelys Denis",
    "url": "https://kadenis.reakagency.com/contact",
    "mainEntity": {
      "@type": "Person",
      "name": "Karelys Denis",
      "email": "karelys@reakagency.com",
      "jobTitle": "Full-Stack Developer & UX Specialist",
      "url": "https://kadenis.reakagency.com"
    }
  };

  // Map icon types to icon components
  const getContactIcon = (type) => {
    const iconMap = {
      email: <FaEnvelope size={24} />,
      location: <FaMapMarkerAlt size={24} />,
    };
    return iconMap[type] || null;
  };

  return (
    <>
      <SEO
        title="Contact - Let's Work Together"
        description="Open to project collaborations in full-stack development and UX. Contact Karelys Denis for web applications, dashboards, and product-driven development."
        canonical="/contact"
        keywords="hire full-stack developer, hire UX developer, web application development, project collaboration, React Node.js developer"
        structuredData={structuredData}
      />
      <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-green-600/20 border border-green-600 rounded-lg p-4 text-center">
              <p className="text-green-400 font-medium">
                ✓ {availability}
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-4 p-4 bg-slate-800 rounded-lg border border-slate-700"
                >
                  <div className="text-primary-600 mt-1">
                    {getContactIcon(info.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm text-slate-400 mb-1">
                      {info.label}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-white hover:text-primary-600 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Connect With Me
              </h3>
              <SocialLinks
                links={contactSocialLinks}
                size="medium"
                showLabels={true}
                variant="horizontal"
              />
            </div>

            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <h3 className="text-lg font-semibold mb-3">
                Response Time
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I respond to inquiries within 24 hours on business days.
                For urgent matters use LinkedIn.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
              <h2 className="text-2xl font-bold mb-6">
                Send Me a Message
              </h2>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
