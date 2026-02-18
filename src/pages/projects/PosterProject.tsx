import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProjectPageTransition } from '../../components/project-details/ProjectPageTransition';
import { ProjectHero } from '../../components/project-details/ProjectHero';
import { Section3_Results } from '../../components/project-details/Section3_Results';

export default function PosterProject() {
  const projectData = {
    hero: {
      title: 'Poster',
      category: 'Graphic Design • Branding • Print',
      year: '2024',
      heroImage: '/mp.png',
      gradient: 'from-blue-500 to-cyan-500',
    },
    overview: {
      challenge:
        'Designing impactful visual identities and posters that capture attention and communicate brand messages effectively. The challenge was to create designs that work across different mediums.',
      solution:
        'We developed a cohesive visual language with bold typography, striking imagery, and thoughtful color palettes. Each poster was crafted to tell a story and leave a lasting impression.',
      results:
        'Delivered award-winning poster designs that strengthened brand recognition and engagement. Designs successfully translated across print and digital platforms.',
      image1: '/mp.png',
      image2: '/magazine.png',
    },
    features: [
      {
        title: 'Visual Identity',
        description: 'Strong brand identity through consistent visual language and design principles.',
        image: '/mp.png',
        icon: '🎨',
      },
      {
        title: 'Typography',
        description: 'Bold typographic choices that enhance readability and visual impact.',
        image: '/magazine.png',
        icon: '✍️',
      },
      {
        title: 'Color Theory',
        description: 'Strategic color palettes that evoke emotion and support brand messaging.',
        image: '/box.jpg',
        icon: '🌈',
      },
      {
        title: 'Print Design',
        description: 'Print-ready designs optimized for various formats and sizes.',
        image: '/ca1.png',
        icon: '📄',
      },
    ],
    results: {
      logoText: 'POSTER',
      flipbookImages: ['/mp.png', '/magazine.png', '/box.jpg', '/ca1.png'],
      testimonial: {
        quote:
          'The poster designs exceeded our expectations. The creative team understood our vision and delivered stunning visuals that resonate with our audience.',
        author: 'Client',
        role: 'Marketing Manager',
        avatar: '/mp.png',
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
