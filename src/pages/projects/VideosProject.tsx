import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProjectPageTransition } from '../../components/project-details/ProjectPageTransition';
import { ProjectHero } from '../../components/project-details/ProjectHero';
import { Section3_Results } from '../../components/project-details/Section3_Results';
import { assetPath } from '../../utils/assetPath';

export default function VideosProject() {
  const projectData = {
    hero: {
      title: 'Videos',
      category: 'Video Production • Motion Graphics • Creative',
      year: '2024',
      heroImage: assetPath('/ca1.png'),
      gradient: 'from-purple-500 to-pink-500',
    },
    overview: {
      challenge:
        'Creating compelling video content that stands out in a crowded digital landscape. The challenge was to produce high-quality visuals that resonate with audiences and drive engagement.',
      solution:
        'We developed a full video production pipeline including concept development, filming, editing, and post-production. Motion graphics and dynamic effects were integrated to create memorable visual experiences.',
      results:
        'Delivered multiple video projects that exceeded client expectations. Increased engagement rates and brand recognition through strategic visual storytelling.',
      image1: assetPath('/ca1.png'),
      image2: assetPath('/mp.png'),
    },
    features: [
      {
        title: 'Video Production',
        description: 'End-to-end video production from concept to final delivery with professional editing and effects.',
        image: assetPath('/ca1.png'),
        icon: '🎬',
      },
      {
        title: 'Motion Graphics',
        description: 'Dynamic animations and motion design that bring your content to life.',
        image: assetPath('/mp.png'),
        icon: '✨',
      },
      {
        title: 'Creative Direction',
        description: 'Strategic creative direction ensuring every frame aligns with your brand vision.',
        image: assetPath('/magazine.png'),
        icon: '🎨',
      },
      {
        title: 'Post-Production',
        description: 'Professional editing, color grading, and sound design for polished results.',
        image: assetPath('/box.jpg'),
        icon: '⚡',
      },
    ],
    results: {
      logoText: 'VIDEOS',
      flipbookVideos: [assetPath('/videos/video1.mp4'), assetPath('/videos/video2.mp4'), assetPath('/videos/video3.mp4')],
      testimonial: {
        quote:
          'The video production quality exceeded our expectations. Every project was delivered on time and the creative vision was perfectly captured.',
        author: 'Client',
        role: 'Creative Director',
        avatar: assetPath('/ca1.png'),
      },
    },
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

      <ProjectHero {...projectData.hero} />
      <Section3_Results {...projectData.results} />
    </ProjectPageTransition>
  );
}
