import { motion } from 'framer-motion';

const siteLinks = ['Home', 'About me', 'Services', 'Projects', 'Contact', 'Free discovery call'];
const serviceLinks = ['Webflow Development', 'Web Design', 'Figma to Webflow', 'WordPress to Webflow'];
const otherLinks = ['LinkedIn', 'Twitter // X', 'Webflow', 'Awwwards', 'Instagram', 'Agency Website'];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (id === 'home') document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  else if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export function Footer() {
  return (
    <footer className="bg-[var(--page-bg)] text-[var(--text-primary)] py-12 md:py-16 border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div>
            <h4 className="text-[var(--text-muted)] text-sm mb-4">Site Links</h4>
            <ul className="space-y-2">
              {siteLinks.map((link) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <button
                    onClick={() =>
                      scrollToSection(
                        link === 'Home' ? 'home' : link === 'About me' ? 'about' : link === 'Services' ? 'services' : link === 'Projects' ? 'projects' : 'contact'
                      )
                    }
                    className={`text-left w-full ${
                      link === 'Free discovery call' ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    } transition-colors touch-action-manipulation`}
                  >
                    {link}
                  </button>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--text-muted)] text-sm mb-4">Service Links</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <a href="#services" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--text-muted)] text-sm mb-4">Other Links</h4>
            <ul className="space-y-2">
              {otherLinks.map((link) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-[var(--text-muted)] text-sm mb-4">Next Page</div>
            <motion.button
              onClick={() => scrollToSection('about')}
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-4xl font-bold inline-block text-left text-[var(--text-primary)] touch-action-manipulation"
            >
              About me
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[var(--border-color)]">
          <div className="text-[var(--text-muted)] text-sm text-center md:text-left">
            ©{new Date().getFullYear()}. Pravinraj. All rights reserved.
          </div>
          <div className="flex gap-6 md:gap-8 text-sm">
            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
