import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ProjectPageTransition } from '../../components/project-details/ProjectPageTransition';
import { ProjectHero } from '../../components/project-details/ProjectHero';
import { assetPath } from '../../utils/assetPath';

const magazines = [
  { id: 1, title: 'Film Set Vol.1', image: assetPath('/magazine.png') },
];

const menuBook = [
  { id: 1, title: 'Menu Page 1', image: assetPath('/1.png') },
  { id: 2, title: 'Menu Page 2', image: assetPath('/2.png') },
  { id: 3, title: 'Menu Page 3', image: assetPath('/3.png') },
  { id: 4, title: 'Menu Page 4', image: assetPath('/4.png') },
  { id: 5, title: 'Menu Page 5', image: assetPath('/5.png') },
];

export default function MagazineProject() {
  const [activeImage, setActiveImage] = useState<{ src: string; title: string } | null>(null);

  return (
    <ProjectPageTransition>
      <Link to="/">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ x: -5 }}
          className="fixed top-8 left-8 z-50 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20 hover:bg-white/20 transition-colors flex items-center gap-2"
        >
          ← Back to Home
        </motion.button>
      </Link>

      <ProjectHero
        title="Magazine"
        category="Editorial Design • Layout • Publishing"
        year="2024"
        heroImage={assetPath('/magazine.png')}
        gradient="from-green-500 to-teal-500"
      />

      {/* Magazine Grid */}
      <div className="bg-[var(--page-bg)] text-[var(--text-primary)] py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">My Magazines</h2>
          <p className="text-[var(--text-muted)] text-lg">{magazines.length} design</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {magazines.map((magazine, index) => (
            <motion.div
              key={magazine.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setActiveImage({ src: magazine.image, title: magazine.title })}
            >
              <div className="relative rounded-xl overflow-hidden bg-[var(--border-color)] aspect-video mb-3">
                <img
                  src={magazine.image}
                  alt={magazine.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                    <span className="text-white text-2xl">↗</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 px-1">
                <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm">📖</span>
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] font-medium text-sm md:text-base leading-snug">
                    {magazine.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-xs mt-0.5">Pravinraj</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Ali Muthu Ah Hock Menu Book */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Ali Muthu Ah Hock — Menu Book</h2>
          <p className="text-[var(--text-muted)] text-lg">{menuBook.length} pages</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuBook.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setActiveImage({ src: item.image, title: item.title })}
            >
              <div className="relative rounded-xl overflow-hidden bg-[var(--border-color)] aspect-video mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                    <span className="text-white text-2xl">↗</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 px-1">
                <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm">🍽️</span>
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] font-medium text-sm md:text-base leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-xs mt-0.5">Pravinraj</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {activeImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-bold text-xl">{activeImage.title}</h2>
              <button
                onClick={() => setActiveImage(null)}
                className="text-white/70 hover:text-white text-2xl transition-colors"
              >
                ✕
              </button>
            </div>
            <img
              src={activeImage.src}
              alt={activeImage.title}
              className="w-full rounded-xl object-contain max-h-[80vh]"
            />
          </motion.div>
        </motion.div>
      )}
    </ProjectPageTransition>
  );
}
