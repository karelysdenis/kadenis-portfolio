import SocialLinks from './common/SocialLinks';
import { usePersonalInfo } from '@hooks';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { name, socialLinks } = usePersonalInfo();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-slate-400 text-sm">
            © {currentYear} {name}. All rights reserved.
          </p>

          {/* Social Links */}
          <SocialLinks
            links={socialLinks}
            size="small"
            className="text-slate-400"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
