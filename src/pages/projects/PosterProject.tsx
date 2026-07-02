import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ProjectPageTransition } from '../../components/project-details/ProjectPageTransition';
import { ProjectHero } from '../../components/project-details/ProjectHero';
import { assetPath } from '../../utils/assetPath';

type PosterItem = {
  id: number;
  title: string;
  image: string;
  subImages?: string[];
};

const posters: PosterItem[] = [
  {
    id: 1,
    title: 'Orang Perang',
    image: assetPath('/org prg poster 1 new.jpg'),
    subImages: [
      assetPath('/op2.jpg'),
      assetPath('/op3.jpg'),
    ],
  },
  { id: 2, title: 'Magazine Cover', image: assetPath('/magazine.png') },
];

export default function PosterProject() {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const activePoster = activeImage !== null ? posters.find((p) => p.id === activeImage) : null;
  const galleryImages =
    activePoster?.subImages && activePoster.subImages.length > 0
      ? [activePoster.image, ...activePoster.subImages]
      : activePoster
        ? [activePoster.image]
        : [];

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
        title="Poster"
        category="Graphic Design • Branding • Print"
        heroImage={assetPath('/mp.png')}
        gradient="from-blue-500 to-cyan-500"
      />

      <div className="bg-[var(--page-bg)] text-[var(--text-primary)] py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">My Posters</h2>
          <p className="text-[var(--text-muted)] text-lg">{posters.length} designs</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posters.map((poster, index) => (
            <motion.div
              key={poster.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setActiveImage(poster.id)}
            >
              <div className="relative rounded-xl overflow-hidden bg-[var(--border-color)] aspect-video mb-3">
                <img
                  src={poster.image}
                  alt={poster.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                    <span className="text-white text-2xl">↗</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 px-1">
                <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm">🎨</span>
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] font-medium text-sm md:text-base leading-snug group-hover:opacity-80 transition-opacity">
                    {poster.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-xs mt-0.5">Pravinraj</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {activePoster !== null && activePoster !== undefined && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-bold text-xl">{activePoster.title}</h2>
              <button
                onClick={() => setActiveImage(null)}
                className="text-white/70 hover:text-white text-2xl transition-colors"
              >
                ✕
              </button>
            </div>
            {galleryImages.length > 1 ? (
              <div className="grid grid-cols-2 gap-3 md:gap-4 h-[calc(100vh-10rem)] max-h-[720px]">
                {galleryImages.map((src, index) => (
                  <div
                    key={src}
                    className="flex items-center justify-center rounded-xl overflow-hidden bg-black/40 min-h-0"
                  >
                    <img
                      src={src}
                      alt={`${activePoster.title} ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <img
                src={activePoster.image}
                alt={activePoster.title}
                className="w-full rounded-xl object-contain max-h-[80vh]"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </ProjectPageTransition>
  );
}
