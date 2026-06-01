import { motion } from 'framer-motion';

const siteLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About me', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Footer() {
  return (
    <footer className="bg-[var(--page-bg)] text-[var(--text-primary)] py-12 md:py-16 border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-12">

          <div>
            <h4 className="text-[var(--text-muted)] text-sm mb-4">Site Links</h4>
            <ul className="space-y-2">
              {siteLinks.map((link) => (
                <motion.li key={link.label} whileHover={{ x: 5 }}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-left w-full text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors touch-action-manipulation"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <motion.li whileHover={{ x: 5 }}>
                <a
                  href="https://calendly.com/prakasvinraj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-primary)] font-medium hover:opacity-80 transition-opacity"
                >
                  Free discovery call
                </a>
              </motion.li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--text-muted)] text-sm mb-4">Contact</h4>
            <ul className="space-y-2">
              <motion.li whileHover={{ x: 5 }}>
                <a href="mailto:prakasvinraj@gmail.com" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                  prakasvinraj@gmail.com
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="https://www.linkedin.com/in/pravinraj-prakash-193996262/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                  LinkedIn
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="https://www.facebook.com/profile.php?id=61586036431439&mibextid=rS40aB7S9Ucbxw6v" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                  Facebook
                </a>
              </motion.li>
            </ul>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-[var(--text-muted)] text-sm mb-4">Book a Call</div>
            <motion.a
              href="https://calendly.com/prakasvinraj"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-4xl font-bold inline-block text-[var(--text-primary)] hover:opacity-80 transition-opacity"
            >
              Let's Talk →
            </motion.a>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[var(--border-color)]">
          <div className="text-[var(--text-muted)] text-sm text-center md:text-left">
            ©{new Date().getFullYear()}. Pravinraj. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
