import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface OverviewProps {
  challenge: string;
  solution: string;
  results: string;
  image1: string;
  image2: string;
}

export function Section1_Overview({ challenge, solution, results, image1, image2 }: OverviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const image1Y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const image2Y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black text-white py-32 overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Project Overview</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div style={{ y: textY }}>
            <motion.h3
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              01. The Challenge
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-400 leading-relaxed"
            >
              {challenge}
            </motion.p>
          </motion.div>

          <motion.div
            style={{ y: image1Y }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group"
          >
            <img
              src={image1}
              alt="Challenge"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              animate={{ y: [0, 500] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent h-32 pointer-events-none"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            style={{ y: image2Y }}
            className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group order-2 md:order-1"
          >
            <img
              src={image2}
              alt="Solution"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />
          </motion.div>

          <motion.div style={{ y: textY }} className="order-1 md:order-2">
            <motion.h3
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              02. The Solution
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl text-gray-400 leading-relaxed"
            >
              {solution}
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
            03. The Results
          </motion.h3>
          <motion.p className="text-lg md:text-xl text-gray-400 leading-relaxed">{results}</motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
            {[
              { value: '300%', label: 'Traffic Increase' },
              { value: '2.5x', label: 'Conversion Rate' },
              { value: '95%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
