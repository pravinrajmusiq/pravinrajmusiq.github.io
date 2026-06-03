import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ProjectPageTransition } from '../../components/project-details/ProjectPageTransition';
import { ProjectHero } from '../../components/project-details/ProjectHero';
import { assetPath } from '../../utils/assetPath';

type VideoItem = {
  id: number;
  title: string;
  duration: string;
  src: string;
  thumbnail: string;
  isEmbed?: boolean;
};

const videos: VideoItem[] = [
  {
    id: 1,
    title: 'Entangled Hearts Trailer',
    duration: '2:34',
    src: assetPath('/videos/video1.mp4'),
    thumbnail: assetPath('/ca1.png'),
  },
  {
    id: 2,
    title: 'Famous Amos Ad',
    duration: '1:45',
    src: assetPath('/videos/video2.mp4'),
    thumbnail: assetPath('/mp.png'),
  },
  {
    id: 3,
    title: 'Straw-Ber-Rita Ad',
    duration: '3:10',
    src: assetPath('/videos/video3.mp4'),
    thumbnail: assetPath('/reel-thumb.png'),
  },
  {
    id: 4,
    title: 'Rasuah — SPRM Short Film',
    duration: '5:00',
    src: assetPath('/videos/rasuah-final-video.mp4'),
    thumbnail: assetPath('/rasuah-thumb.png'),
  },
  {
    id: 5,
    title: 'Car Video',
    duration: '0:40',
    src: assetPath('/videos/full-video.mp4'),
    thumbnail: assetPath('/car-thumb.png'),
  },
  {
    id: 6,
    title: 'Justice — Short Film',
    duration: '7:55',
    src: assetPath('/videos/videoplayback.mp4'),
    thumbnail: assetPath('/justice-thumb.png'),
  },
  {
    id: 7,
    title: 'Interview BTS — Nanord Studio',
    duration: '6:33',
    src: assetPath('/videos/interview-bts.mp4'),
    thumbnail: assetPath('/bts-thumb.png'),
  },
];

export default function VideosProject() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  return (
    <ProjectPageTransition>
      {/* Back Button */}
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

      {/* Hero Section */}
      <ProjectHero
        title="Videos"
        category="Video Editing • Motion Graphics • Creative"
        year="2024"
        heroImage={assetPath('/ca1.png')}
        gradient="from-purple-500 to-pink-500"
      />

      {/* Video Grid */}
      <div className="bg-[var(--page-bg)] text-[var(--text-primary)] py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">My Videos</h2>
          <p className="text-[var(--text-muted)] text-lg">{videos.length} videos</p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setActiveVideo(video.id)}
            >
              {/* Thumbnail */}
              <div className="relative rounded-xl overflow-hidden bg-[var(--border-color)] aspect-video mb-3">
                {video.id === 3 || video.id === 4 || video.id === 6 ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <video
                    src={video.src}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    preload="metadata"
                    muted
                    playsInline
                  />
                )}
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                    <span className="text-white text-2xl ml-1">▶</span>
                  </div>
                </div>
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="flex items-start gap-3 px-1">
                <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-sm">🎬</span>
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] font-medium text-sm md:text-base leading-snug group-hover:opacity-80 transition-opacity">
                    {video.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-xs mt-0.5">Pravinraj</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {activeVideo !== null &&
        (() => {
          const video = videos.find((v) => v.id === activeVideo);
          return video ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
              onClick={() => setActiveVideo(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-white font-bold text-xl">{video.title}</h2>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="text-white/70 hover:text-white text-2xl transition-colors"
                  >
                    ✕
                  </button>
                </div>
                {video.isEmbed ? (
                  <iframe
                    src={video.src}
                    className="w-full rounded-xl"
                    style={{ height: '400px' }}
                    allow="autoplay"
                    allowFullScreen
                  />
                ) : (
                  <video src={video.src} controls autoPlay className="w-full rounded-xl" />
                )}
              </motion.div>
            </motion.div>
          ) : null;
        })()}
    </ProjectPageTransition>
  );
}
