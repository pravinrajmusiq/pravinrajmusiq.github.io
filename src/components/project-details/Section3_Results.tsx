import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ResultsProps {
  logoText: string;
  flipbookImages?: string[];
  flipbookVideos?: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
}

function FlipbookSection({ images, videos }: { images?: string[]; videos?: string[] }) {
  const items = videos && videos.length > 0 ? videos : images || [];
  const isVideo = videos && videos.length > 0;

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextPage = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % items.length);
  };

  const prevPage = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev - 1 + items.length) % items.length);
  };

  const variants = {
    enter: (d: number) => ({
      rotateY: d > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: { rotateY: 0, opacity: 1 },
    exit: (d: number) => ({
      rotateY: d > 0 ? -90 : 90,
      opacity: 0,
    }),
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-32">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-bold mb-16 text-center text-white"
      >
        Project Showcase
      </motion.h2>

      <div className="relative" style={{ perspective: '2000px' }}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              rotateY: { type: 'spring', stiffness: 100, damping: 20 },
              opacity: { duration: 0.3 },
            }}
            className="relative h-[500px] md:h-[700px] rounded-3xl overflow-hidden shadow-2xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {isVideo ? (
              <video
                src={items[currentPage]}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={items[currentPage]}
                alt={`Page ${currentPage + 1}`}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute bottom-8 right-8 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-white font-semibold">
                {currentPage + 1} / {items.length}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-6 mt-12">
          <motion.button
            onClick={prevPage}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-2xl hover:bg-white/20 transition-colors"
          >
            ←
          </motion.button>
          <div className="flex items-center gap-2">
            {items.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentPage ? 1 : -1);
                  setCurrentPage(index);
                }}
                whileHover={{ scale: 1.2 }}
                className={`h-3 rounded-full transition-all ${
                  index === currentPage ? 'w-12 bg-white' : 'w-3 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          <motion.button
            onClick={nextPage}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-2xl hover:bg-white/20 transition-colors"
          >
            →
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function TestimonialSection({ testimonial }: { testimonial: ResultsProps['testimonial'] }) {
  return (
    <div className="max-w-4xl mx-auto px-8 py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative p-12 rounded-3xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="absolute -top-8 left-12 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl text-white"
        >
          "
        </motion.div>
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-gray-300 italic mb-8 leading-relaxed"
        >
          {testimonial.quote}
        </motion.blockquote>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
        >
          <motion.img
            whileHover={{ scale: 1.1, rotate: 5 }}
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-16 h-16 rounded-full border-2 border-purple-500 object-cover"
          />
          <div>
            <div className="font-semibold text-xl text-white">{testimonial.author}</div>
            <div className="text-gray-400">{testimonial.role}</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Section3_Results({ logoText, flipbookImages, flipbookVideos, testimonial }: ResultsProps) {
  return (
    <section className="relative min-h-screen bg-black text-white py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center py-20"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-4">Brand Evolution</h2>
        <motion.p
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {logoText}
        </motion.p>
      </motion.div>

      <FlipbookSection images={flipbookImages} videos={flipbookVideos} />
      <TestimonialSection testimonial={testimonial} />
    </section>
  );
}
