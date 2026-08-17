import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ProjectPageTransition } from '../../components/project-details/ProjectPageTransition';
import { ProjectHero } from '../../components/project-details/ProjectHero';
import { assetPath } from '../../utils/assetPath';

type BoxCategory = {
  label: string;
  images: string[];
};

type BoxItem = {
  id: number;
  title: string;
  image: string;
  categories?: BoxCategory[];
  comingSoon?: boolean;
};

const boxes: BoxItem[] = [
  {
    id: 1,
    title: 'AMH Food Pack, Bag, Spoon Fork Packaging, POP',
    image: '',
    comingSoon: true,
  },
  {
    id: 2,
    title: 'Ice Cream Potong Box',
    image: assetPath('/box_icecream_potong.jpg'),
    categories: [
      { label: 'Ice Cream Potong Box', images: [assetPath('/box_icecream_potong.jpg')] },
    ],
  },
  {
    id: 3,
    title: 'Watch Box',
    image: assetPath('/box_watch_fossil.jpg'),
    categories: [{ label: 'Watch Box', images: [assetPath('/box_watch_fossil.jpg')] }],
  },
  {
    id: 4,
    title: '888 Tea Redesign Box',
    image: assetPath('/box_888_tea_render.jpg'),
    categories: [
      {
        label: '888 Tea Redesign Box',
        images: [assetPath('/box_888_tea_render.jpg'), assetPath('/box_888_tea_dieline.jpg')],
      },
    ],
  },
  {
    id: 5,
    title: 'McD Box',
    image: assetPath('/box_mcd_handle.jpg'),
    categories: [
      {
        label: 'McD Box',
        images: [assetPath('/box_mcd_open.jpg'), assetPath('/box_mcd_handle.jpg')],
      },
    ],
  },
];

export default function BoxDesignsProject() {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [fullscreen, setFullscreen] = useState<{ images: string[]; index: number } | null>(null);

  const activeBox = activeImage !== null ? boxes.find((b) => b.id === activeImage) : null;

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
        title="Box Design"
        category="Packaging • Product Design • Branding"
        heroImage={assetPath('/box_888_tea_render.jpg')}
        gradient="from-orange-500 to-red-500"
      />

      <div className="bg-[var(--page-bg)] text-[var(--text-primary)] py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Box &amp; Packaging Designs</h2>
          <p className="text-[var(--text-muted)] text-lg">{boxes.length} designs</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boxes.map((box, index) => (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={box.comingSoon ? 'group' : 'group cursor-pointer'}
              onClick={() => {
                if (!box.comingSoon) setActiveImage(box.id);
              }}
            >
              <div className="relative rounded-xl overflow-hidden bg-[var(--border-color)] aspect-video mb-3 flex items-center justify-center">
                {box.comingSoon ? (
                  <div className="w-full h-full border-2 border-dashed border-[var(--border-color)] flex items-center justify-center">
                    <span className="text-[var(--text-muted)] text-sm font-medium">Coming Soon</span>
                  </div>
                ) : (
                  <>
                    <img
                      src={box.image}
                      alt={box.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                        <span className="text-white text-2xl">↗</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-start gap-3 px-1">
                <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm">📦</span>
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] font-medium text-sm md:text-base leading-snug group-hover:opacity-80 transition-opacity">
                    {box.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-xs mt-0.5">
                    {box.comingSoon ? 'Coming soon' : 'Pravinraj'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {activeBox && activeBox.categories && (
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
              <h2 className="text-white font-bold text-xl">{activeBox.title}</h2>
              <button
                onClick={() => setActiveImage(null)}
                className="text-white/70 hover:text-white text-2xl transition-colors"
              >
                ✕
              </button>
            </div>

            {activeBox.categories.map((category) => (
              <div key={category.label} className="mb-8">
                <div
                  className={
                    category.images.length === 1
                      ? 'flex flex-row justify-center gap-3 md:gap-4'
                      : 'flex flex-row flex-nowrap gap-3 md:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory'
                  }
                >
                  {category.images.map((src, index) => (
                    <div
                      key={src}
                      className="flex-none h-64 sm:h-72 md:h-80 snap-start cursor-pointer rounded-xl overflow-hidden bg-black/40 flex items-center justify-center"
                      onClick={() => openFullscreen(category.images, index)}
                    >
                      <img
                        src={src}
                        alt={`${activeBox.title} ${index + 1}`}
                        className="h-full w-auto object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}

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
              alt="Box design preview"
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
