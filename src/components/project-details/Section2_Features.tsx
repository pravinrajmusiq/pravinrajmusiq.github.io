import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface Feature {
  title: string;
  description: string;
  image: string;
  icon: string;
}

interface FeaturesProps {
  features: Feature[];
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative w-[500px] md:w-[600px] h-[500px] md:h-[600px] flex-shrink-0 rounded-3xl overflow-hidden group cursor-pointer"
    >
      <motion.img
        src={feature.image}
        alt={feature.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        viewport={{ once: true }}
        className="absolute top-8 left-8 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
      >
        <span className="text-4xl">{feature.icon}</span>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 text-sm text-purple-400 font-semibold"
        >
          Feature {index + 1}
        </motion.div>
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          animate={{ y: isHovered ? -10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {feature.title}
        </motion.h3>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-gray-300 text-lg leading-relaxed"
        >
          {feature.description}
        </motion.p>
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-6 flex items-center gap-2 text-white"
        >
          <span>Explore</span>
          <motion.span
            animate={{ x: isHovered ? [0, 10, 0] : 0 }}
            transition={{ duration: 0.8, repeat: isHovered ? Infinity : 0 }}
          >
            →
          </motion.span>
        </motion.div>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-white/50"
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isHovered ? 1 : 0 }}
        className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-white/50"
      />
    </motion.div>
  );
}

export function Section2_Features({ features }: FeaturesProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute top-20 left-8 z-20">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Key Features
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
        </div>

        <motion.div
          style={{ x }}
          className="absolute top-0 left-0 h-full flex items-center gap-8 px-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 md:w-96 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 origin-left"
          />
        </div>
      </div>
    </section>
  );
}
