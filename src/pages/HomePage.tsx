import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CustomCursor } from '../components/ui/CustomCursor';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { DeferredLogo3DSection } from '../components/DeferredLogo3DSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      document.documentElement.classList.add('cursor-none');
    }
    return () => document.documentElement.classList.remove('cursor-none');
  }, []);

  return (
    <div className="bg-[var(--page-bg)] text-[var(--text-primary)]">
      <ThemeToggle />
      <CustomCursor />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
        <AboutSection />
        <ServicesSection />
        <DeferredLogo3DSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </motion.main>
      <div className="grain" aria-hidden="true" />
    </div>
  );
}
