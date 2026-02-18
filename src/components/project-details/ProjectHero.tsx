import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

interface ProjectHeroProps {
  title: string;
  category: string;
  year: string;
  heroImage: string;
  gradient: string;
}

export function ProjectHero({ title, category, year, heroImage, gradient }: ProjectHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    if (!audioPlayed) {
      try {
        const audio = new Audio('/sounds/whoosh.mp3');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      } catch {
        // ignore
      }
      setAudioPlayed(true);
    }
  }, [audioPlayed]);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-30 z-0">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial color="#8352FD" distort={0.5} speed={2} roughness={0.2} />
          </Sphere>
        </Canvas>
      </div>

      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
        animate={{
          background: [
            'linear-gradient(to bottom right, #8352FD, #E91E63)',
            'linear-gradient(to bottom right, #E91E63, #FFC107)',
            'linear-gradient(to bottom right, #FFC107, #8352FD)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ opacity: 0.2 }}
      />

      <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-[1]">
        <img src={heroImage} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-6 py-2 mb-6 rounded-full border border-white/30 backdrop-blur-sm"
          >
            <span className="text-white/80 text-sm">{year}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
          >
            {title.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl text-white/70 mb-12"
          >
            {category}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-white/50"
          >
            <div className="text-sm mb-2">Scroll to explore</div>
            <div className="w-6 h-10 mx-auto border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white/50 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 opacity-10 pointer-events-none z-10 bg-[url(\'/grain.png\')] bg-cover" aria-hidden="true" />
    </section>
  );
}
