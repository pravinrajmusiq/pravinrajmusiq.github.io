import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const fullText = 'Graphic Designer &\nVisual\nCreative';

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Hero() {
  const [text, setText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--page-bg)]">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E')] bg-cover" />
      </div>

      {/* Top left - Nav */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-8 left-6 md:left-8 text-sm z-20"
      >
        <div className="flex flex-wrap gap-4 md:gap-6">
          <button onClick={() => scrollToSection('home')} className="text-[var(--text-primary)] hover:opacity-80 touch-action-manipulation">
            Home
          </button>
          <button onClick={() => scrollToSection('about')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] touch-action-manipulation">
            About me
          </button>
          <button onClick={() => scrollToSection('services')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] touch-action-manipulation">
            Services
          </button>
          <button onClick={() => scrollToSection('projects')} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] touch-action-manipulation">
            Projects
          </button>
        </div>
      </motion.div>

      {/* Top right - Name */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-8 right-[4.5rem] md:right-20 text-right text-sm z-20"
      >
        <div className="text-[var(--text-muted)]">Hello, my name is</div>
        <div className="text-[var(--text-primary)] font-medium">Pravinraj</div>
      </motion.div>

      {/* Single column: text only */}
      <div className="relative z-10 w-full grid grid-cols-1 min-h-screen items-center gap-0">
        <div className="min-w-0 px-6 md:px-8 overflow-hidden pt-24 md:pt-28">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none mb-6 md:mb-8 whitespace-pre-line"
          >
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1 h-12 md:h-20 bg-[var(--text-primary)] ml-2 align-middle"
            />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-[var(--text-muted)]"
          >
            Pravinraj
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('projects')}
            className="mt-10 md:mt-12 px-6 md:px-8 py-3 md:py-4 bg-[var(--button-bg)] text-[var(--button-text)] rounded-full font-medium hover:opacity-90 transition-opacity touch-action-manipulation min-h-[44px]"
          >
            View my work
          </motion.button>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-[var(--text-primary)] rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-[var(--text-primary)] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
