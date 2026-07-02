import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ProjectPageTransition } from '../../components/project-details/ProjectPageTransition';
import { ProjectHero } from '../../components/project-details/ProjectHero';
import { assetPath } from '../../utils/assetPath';

type BrandingCategory = {
  label: string;
  images: string[];
};

const categories: BrandingCategory[] = [
  {
    label: 'Menu Book',
    images: [
      assetPath('/branding_menu_cover.jpg'),
      assetPath('/branding_menu_rice.jpg'),
      assetPath('/branding_menu_noodles.jpg'),
      assetPath('/branding_menu_sides.jpg'),
      assetPath('/branding_menu_drinks.jpg'),
    ],
  },
  {
    label: 'Promotional Posters',
    images: [
      assetPath('/branding_poster_nasilemak.jpg'),
      assetPath('/branding_poster_prawnnoodle.jpg'),
      assetPath('/branding_poster_rotibakar.jpg'),
    ],
  },
  {
    label: 'Research Infographic',
    images: [assetPath('/branding_infographic.jpg')],
  },
];

export default function BrandingProject() {
  const [fullscreen, setFullscreen] = useState<{ images: string[]; index: number } | null>(null);

  const openFullscreen = (images: string[], index: number) => setFullscreen({ images, index });

  const showNext = () => {
    if (!fullscreen) return;
    setFullscreen({ ...fullscreen, index: (fullscreen.index + 1) % fullscreen.images.length });
  };

  const showPrev = () => {
    if (!fullscreen) return;
    setFullscreen({
      ...fullscreen,
      index: (fullscreen.index - 1 + fullscreen.images.length) % fullscreen.images.length,
    });
  };

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
        title="Branding"
        category="Brand Identity • Rebranding • Print"
        heroImage={assetPath('/branding_infographic.jpg')}
        gradient="from-amber-500 to-orange-500"
      />

      <div className="bg-[var(--page-bg)] text-[var(--text-primary)] py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Rebranding of Ali, Muthu &amp; Ah Hock</h2>
          <p className="text-[var(--text-muted)] text-lg">
            A full brand identity project covering menu design, promotional posters, and research.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category.label} className="mb-10">
              <h3 className="text-[var(--text-primary)]/80 font-semibold text-lg mb-3">{category.label}</h3>
              <div className="flex flex-row flex-nowrap gap-3 md:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                {category.images.map((src, index) => (
                  <div
                    key={src}
                    className="flex-none h-64 sm:h-72 md:h-80 snap-start cursor-pointer rounded-xl overflow-hidden bg-[var(--border-color)] flex items-center justify-center"
                    onClick={() => openFullscreen(category.images, index)}
                  >
                    <img
                      src={src}
                      alt={`${category.label} ${index + 1}`}
                      className="h-full w-auto object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
            onClick={() => setFullscreen(null)}
          >
            <button
              onClick={() => setFullscreen(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl z-10"
            >
              ✕
            </button>

            {fullscreen.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl z-10 px-2"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-4xl z-10 px-2"
                >
                  ›
                </button>
              </>
            )}

            <motion.img
              key={fullscreen.images[fullscreen.index]}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              src={fullscreen.images[fullscreen.index]}
              alt="Branding preview"
              className="max-w-[92vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {fullscreen.images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                {fullscreen.index + 1} / {fullscreen.images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </ProjectPageTransition>
  );
}
