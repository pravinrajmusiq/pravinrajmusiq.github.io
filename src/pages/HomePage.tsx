import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion } from 'framer-motion';
import { CustomCursor } from '../components/ui/CustomCursor';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { Hero } from '../components/Hero';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { Logo3DSection } from '../components/Logo3DSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';

export default function HomePage() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

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
        <Logo3DSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </motion.main>
      <div className="grain" aria-hidden="true" />
    </div>
  );
}
