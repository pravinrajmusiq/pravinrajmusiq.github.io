import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ProjectPageTransition } from '../../components/project-details/ProjectPageTransition';
import { ProjectHero } from '../../components/project-details/ProjectHero';
import { assetPath } from '../../utils/assetPath';

type PosterCategory = {
  label: string;
  images: string[];
};

type PosterItem = {
  id: number;
  title: string;
  image: string;
  categories?: PosterCategory[];
};

const posters: PosterItem[] = [
  {
    id: 1,
    title: 'Orang Perang',
    image: assetPath('/org prg poster 1 new.jpg'),
    categories: [
      {
        label: 'Official Poster',
        images: [
          assetPath('/org prg poster 1 new.jpg'),
          assetPath('/op2.jpg'),
          assetPath('/op3.jpg'),
        ],
      },
      {
        label: 'Teaser Poster',
        images: [
          assetPath('/op-teaser1.jpg'),
          assetPath('/op-teaser2.jpg'),
        ],
      },
      {
        label: 'Social Media Content',
        images: [
          assetPath('/bloopers_org_prg_1.png'),
          assetPath('/kalau_zaman_atuk_thumbnail.png'),
          assetPath('/whoever_gets_caught_thumbnail.png'),
          assetPath('/saya_diculik_thumbnail.png'),
          assetPath('/culik_thumbnail_vertical.png'),
          assetPath('/culik_thumbnail.png'),
          assetPath('/escape_camera_thumbnail.png'),
          assetPath('/jatuh_thumbnail.png'),
          assetPath('/tiang_thumbnail.png'),
          assetPath('/airpod_thumbnail.png'),
          assetPath('/model_content_thumbnail_vertical.png'),
          assetPath('/alamak_thumbnail.png'),
        ],
      },
    ],
  },
  { id: 2, title: 'Magazine Cover', image: assetPath('/magazine.png') },
];

export default function PosterProject() {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [fullscreen, setFullscreen] = useState<{ images: string[]; index: number } | null>(null);
  const [scrollStates, setScrollStates] = useState<Record<string, boolean>>({});

  const activePoster = activeImage !== null ? posters.find((p) => p.id === activeImage) : null;

  const openFullscreen = (images: string[], index: number) => {
    setFullscreen({ images, index });
  };

  const showNext = () => {
    if (!fullscreen) return;
    setFullscreen({
      ...fullscreen,
      index: (fullscreen.index + 1) % fullscreen.images.length,
    });
  };

  const showPrev = () => {
    if (!fullscreen) return;
    setFullscreen({
      ...fullscreen,
      index: (fullscreen.index - 1 + fullscreen.images.length) % fullscreen.images.length,
    });
  };

  const handleRowScroll = (key: string, el: HTMLDivElement) => {
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
    setScrollStates((prev) => (prev[key] === !isAtEnd ? prev : { ...prev, [key]: !isAtEnd }));
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

      {/* Category / Thumbnail Modal */}
      {activePoster !== null && activePoster !== undefined && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-start md:items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={() => setActiveImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-full max-w-5xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-xl">{activePoster.title}</h2>
              <button
                onClick={() => setActiveImage(null)}
                className="text-white/70 hover:text-white text-2xl transition-colors"
              >
                ✕
              </button>
            </div>

            {activePoster.categories ? (
              activePoster.categories.map((category) => (
                <div key={category.label} className="mb-8">
                  <h3 className="text-white/80 font-semibold text-lg mb-3">{category.label}</h3>
                  <div className="relative">
                    <div
                      className="flex flex-row flex-nowrap gap-3 md:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
                      onScroll={(e) => handleRowScroll(category.label, e.currentTarget)}
                      ref={(el) => {
                        if (el && scrollStates[category.label] === undefined) {
                          handleRowScroll(category.label, el);
                        }
                      }}
                    >
                      {category.images.map((src, index) => (
                      <div
                        key={src}
                        className="flex-none h-40 sm:h-56 md:h-64 snap-start cursor-pointer rounded-xl overflow-hidden bg-black/40 flex items-center justify-center"
                        onClick={() => openFullscreen(category.images, index)}
                      >
                        <img
                          src={src}
                          alt={`${activePoster.title} ${category.label} ${index + 1}`}
                          className="h-full w-auto max-w-none object-contain hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      ))}
                    </div>
                    {category.images.length > 1 && scrollStates[category.label] !== false && (
                      <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-16 bg-gradient-to-l from-[var(--page-bg)] to-transparent flex items-center justify-end pr-1">
                        <div className="w-8 h-8 rounded-full bg-[var(--text-primary)]/10 backdrop-blur-sm border border-[var(--border-color)] flex items-center justify-center animate-pulse">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--text-primary)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <img
                src={activePoster.image}
                alt={activePoster.title}
                className="w-full rounded-xl object-contain max-h-[80vh] cursor-pointer"
                onClick={() => openFullscreen([activePoster.image], 0)}
              />
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Fullscreen Single Image Preview */}
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
              alt="Poster preview"
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
