import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

// Better email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Simple rate limiting
const SUBMISSION_COOLDOWN = 60000; // 1 minute
let lastSubmissionTime = 0;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '' // Honeypot field
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const statusTimeoutRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (statusTimeoutRef.current) {
        clearTimeout(statusTimeoutRef.current);
      }
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check honeypot (bot detection)
    if (formData._gotcha) {
      return;
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastSubmissionTime < SUBMISSION_COOLDOWN) {
      setStatus({
        type: 'error',
        message: 'Please wait before submitting another message.'
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      if (!FORMSPREE_ID) {
        throw new Error('Form configuration error. Please contact me directly via email.');
      }

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
        })
      });

      if (response.ok) {
        lastSubmissionTime = now;
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.'
        });

        // Reset form after 2 seconds
        statusTimeoutRef.current = setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            _gotcha: ''
          });
        }, 2000);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Oops! Something went wrong. Please try again or email me directly at karelys@reakagency.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
      noValidate
    >
      {/* Honeypot field - hidden from users, but bots will fill it */}
      <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
        <label htmlFor="_gotcha">Don't fill this out if you're human:</label>
        <input
          type="text"
          id="_gotcha"
          name="_gotcha"
          value={formData._gotcha}
          onChange={handleChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
          Name <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-slate-700 text-white rounded-lg border ${
            errors.name ? 'border-red-500' : 'border-slate-600'
          } focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all`}
          placeholder="Your name"
          required
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
          Email <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-slate-700 text-white rounded-lg border ${
            errors.email ? 'border-red-500' : 'border-slate-600'
          } focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all`}
          placeholder="your.email@example.com"
          required
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
          Subject <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-slate-700 text-white rounded-lg border ${
            errors.subject ? 'border-red-500' : 'border-slate-600'
          } focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all`}
          placeholder="Project inquiry"
          required
          autoComplete="off"
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="mt-1 text-sm text-red-500">{errors.subject}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
          Message <span className="text-red-500" aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="6"
          className={`w-full px-4 py-3 bg-slate-700 text-white rounded-lg border ${
            errors.message ? 'border-red-500' : 'border-slate-600'
          } focus:outline-none focus:ring-2 focus:ring-primary-600 transition-all resize-none`}
          placeholder="Tell me about your project..."
          required
          autoComplete="off"
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      {status.message && (
        <div
          role={status.type === 'error' ? 'alert' : 'status'}
          aria-live="polite"
          className={`p-4 rounded-lg ${
            status.type === 'success'
              ? 'bg-green-600/20 text-green-400 border border-green-600'
              : 'bg-red-600/20 text-red-400 border border-red-600'
          }`}
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="sr-only">Sending message...</span>
            <span aria-hidden="true">Sending...</span>
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </motion.form>
  );
};

export default ContactForm;
