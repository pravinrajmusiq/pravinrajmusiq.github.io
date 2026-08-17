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
  embedPadding?: string;
  embedTitle?: string;
};

type VideoCategory = {
  label: string;
  videos: VideoItem[];
};

const categories: VideoCategory[] = [
  {
    label: 'FnB Ads',
    videos: [
      {
        id: 3,
        title: 'Straw-Ber-Rita Ad',
        duration: '3:10',
        src: 'https://player.vimeo.com/video/1218220750?badge=0&autopause=0&player_id=0&app_id=58479',
        thumbnail: assetPath('/reel-thumb.png'),
        isEmbed: true,
        embedPadding: '56.25%',
        embedTitle: '3D CAN DRINK AD',
      },
      {
        id: 2,
        title: 'Famous Amos Ad',
        duration: '1:45',
        src: 'https://player.vimeo.com/video/1218222974?badge=0&autopause=0&player_id=0&app_id=58479',
        thumbnail: assetPath('/famous_amos_thumb.jpg'),
        isEmbed: true,
        embedPadding: '56.25%',
        embedTitle: 'FAMOUS AMOS VIDEO AD',
      },
      {
        id: 8,
        title: 'Gardenia Ad',
        duration: '0:30',
        src: 'https://player.vimeo.com/video/1218221679?badge=0&autopause=0&player_id=0&app_id=58479',
        thumbnail: assetPath('/gardenia_thumb.jpg'),
        isEmbed: true,
        embedPadding: '56.25%',
        embedTitle: 'GARDENIA VIDEO AD',
      },
      {
        id: 9,
        title: 'Milo Ad',
        duration: '0:30',
        src: 'https://player.vimeo.com/video/1218224141?badge=0&autopause=0&player_id=0&app_id=58479',
        thumbnail: assetPath('/milo_ad_thumb.jpg'),
        isEmbed: true,
        embedPadding: '177.78%',
        embedTitle: 'MILO VIDEO AD',
      },
    ],
  },
  {
    label: 'BTS Orang Perang',
    videos: [
      {
        id: 7,
        title: 'Interview BTS — Nanord Studio',
        duration: '6:33',
        src: 'https://player.vimeo.com/video/1218216117?badge=0&autopause=0&player_id=0&app_id=58479',
        thumbnail: assetPath('/bts-thumb.png'),
        isEmbed: true,
        embedPadding: '56.25%',
        embedTitle: 'INTERVIEW BTS PRODUCER OF ORANG PERANG',
      },
      {
        id: 15,
        title: 'BTS Premium — Orang Perang',
        duration: '0:30',
        src: 'https://player.vimeo.com/video/1218213327?badge=0&autopause=0&player_id=0&app_id=58479',
        thumbnail: assetPath('/bts_premium_thumb.jpg'),
        isEmbed: true,
        embedPadding: '56.25%',
        embedTitle: 'BTS PREMIUM ORANG PERANG',
      },
    ],
  },
  {
    label: 'Social Media Videos',
    videos: [
      {
        id: 10,
        title: 'Social Media Reel',
        duration: '0:20',
        src: assetPath('/videos/0519.mp4'),
        thumbnail: assetPath('/social_media_reel_thumb.jpg'),
      },
      {
        id: 11,
        title: 'Tiang',
        duration: '0:20',
        src: assetPath('/videos/tiang-new.mp4'),
        thumbnail: assetPath('/tiang_thumbnail.png'),
      },
      {
        id: 12,
        title: 'Culik',
        duration: '0:20',
        src: assetPath('/videos/culik-reedit.mp4'),
        thumbnail: assetPath('/culik_thumbnail_vertical.png'),
      },
      {
        id: 13,
        title: 'Airpod',
        duration: '0:20',
        src: assetPath('/videos/airpod-edited.mp4'),
        thumbnail: assetPath('/airpod_thumbnail.png'),
      },
    ],
  },
  {
    label: 'Entangled Hearts Trailer',
    videos: [
      {
        id: 1,
        title: 'Entangled Hearts Trailer',
        duration: '2:34',
        src: assetPath('/videos/video1.mp4'),
        thumbnail: assetPath('/ca1.png'),
      },
    ],
  },
  {
    label: 'Justice Short Film',
    videos: [
      {
        id: 6,
        title: 'Justice — Short Film',
        duration: '7:55',
        src: assetPath('/videos/videoplayback.mp4'),
        thumbnail: assetPath('/justice-thumb.png'),
      },
      {
        id: 4,
        title: 'Rasuah — SPRM Short Film',
        duration: '5:00',
        src: 'https://player.vimeo.com/video/1218225022?badge=0&autopause=0&player_id=0&app_id=58479',
        thumbnail: assetPath('/rasuah-thumb.png'),
        isEmbed: true,
        embedPadding: '56.25%',
        embedTitle: 'SPRM CAMPAIGN VIDEO AD',
      },
    ],
  },
  {
    label: 'Car Video Ad (Phavaan)',
    videos: [
      {
        id: 5,
        title: 'Car Video',
        duration: '0:40',
        src: assetPath('/videos/full-video.mp4'),
        thumbnail: assetPath('/car-thumb.png'),
      },
    ],
  },
  {
    label: 'Other Ads',
    videos: [
      {
        id: 14,
        title: 'AES Basic Audio Engineering — Course Ad',
        duration: '0:30',
        src: 'https://player.vimeo.com/video/1218219450?badge=0&autopause=0&player_id=0&app_id=58479',
        thumbnail: '',
        isEmbed: true,
        embedPadding: '56.25%',
        embedTitle: 'AES BASIC AUDIO ENGINEERING AD',
      },
    ],
  },
];

const allVideos = categories.flatMap((c) => c.videos);

export default function VideosProject() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

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
        title="Videos"
        category="Video Editing • Motion Graphics • Creative"
        heroImage={assetPath('/bts-thumb.png')}
        gradient="from-purple-500 to-pink-500"
      />

      <div className="bg-[var(--page-bg)] text-[var(--text-primary)] py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">My Videos</h2>
          <p className="text-[var(--text-muted)] text-lg">{allVideos.length} videos</p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category.label} className="mb-12">
              <h3 className="text-[var(--text-primary)]/80 font-semibold text-lg mb-3">{category.label}</h3>

              {category.videos.length === 0 ? (
                <div className="w-full h-32 border-2 border-dashed border-[var(--border-color)] rounded-xl flex items-center justify-center">
                  <span className="text-[var(--text-muted)] text-sm font-medium">Coming Soon</span>
                </div>
              ) : (
                <div
                  className={
                    category.videos.length === 1
                      ? 'grid grid-cols-1 sm:max-w-sm gap-6'
                      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  }
                >
                  {category.videos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group cursor-pointer"
                      onClick={() => setActiveVideo(video.id)}
                    >
                      <div className="relative rounded-xl overflow-hidden bg-[var(--border-color)] aspect-video mb-3">
                        {video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : !video.isEmbed ? (
                          <video
                            src={video.src}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            preload="metadata"
                            muted
                            playsInline
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                            <span className="text-white text-2xl ml-1">▶</span>
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
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
              )}
            </div>
          ))}
        </div>
      </div>

      {activeVideo !== null &&
        (() => {
          const video = allVideos.find((v) => v.id === activeVideo);
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
                  <div style={{ padding: `${video.embedPadding ?? '56.25%'} 0 0 0`, position: 'relative' }}>
                    <iframe
                      src={video.src}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      title={video.embedTitle ?? video.title}
                    ></iframe>
                  </div>
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
