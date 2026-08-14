import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { assetPath } from '../utils/assetPath';

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] py-24 md:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Video Editing.
            <br />
            Graphic Design and
            <br />
            Creative Solutions.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-6 md:mb-8"
          >
            Graphic Designer and Video Editor with a Bachelor's in Graphic Design and hands-on experience across branding, motion graphics, and video production — from a feature film production to full brand identity systems. I bring ideas from concept to final delivery, whether that's as part of a team or on freelance projects.
          </motion.p>

          <div className="flex flex-wrap gap-4 md:gap-6">
            <motion.button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ x: 10 }}
              className="text-[var(--text-primary)] flex items-center gap-2 group touch-action-manipulation"
            >
              → Services
            </motion.button>
            <motion.a
              href={assetPath('/resume/Pravinraj-Resume.pdf')}
              download
              whileHover={{ x: 10 }}
              className="text-[var(--text-primary)] flex items-center gap-2 touch-action-manipulation"
            >
              → Download Resume
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          style={{ y: imageY, opacity }}
          className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-50 z-10" />
          <img
            src={assetPath('/my.jpg')}
            alt="Workspace"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          <motion.div
            animate={{ y: [0, 600] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-32 z-20 pointer-events-none"
          />
        </motion.div>
      </div>
    </section>
  );
}
