import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProjectPageTransition } from '../../components/project-details/ProjectPageTransition';
import { ProjectHero } from '../../components/project-details/ProjectHero';
import { Section3_Results } from '../../components/project-details/Section3_Results';

export default function BoxDesignProject() {
  const projectData = {
    hero: {
      title: 'Box Design',
      category: 'Packaging • Product Design • Branding',
      year: '2024',
      heroImage: '/box.jpg',
      gradient: 'from-orange-500 to-red-500',
    },
    overview: {
      challenge:
        'Creating packaging designs that stand out on shelves while maintaining brand consistency. The challenge was to design boxes that are both functional and visually compelling.',
      solution:
        'We developed a comprehensive packaging design system considering 3D form, materials, and print specifications. Each design was optimized for both aesthetics and production feasibility.',
      results:
        'Delivered packaging designs that increased brand recognition and shelf appeal. Clients reported positive feedback from retailers and consumers.',
      image1: '/box.jpg',
      image2: '/ca1.png',
    },
    features: [
      {
        title: '3D Packaging',
        description: 'Designs that consider the full 3D form and how it unfolds on shelves.',
        image: '/box.jpg',
        icon: '📦',
      },
      {
        title: 'Material Selection',
        description: 'Thoughtful material choices that enhance the product experience.',
        image: '/mp.png',
        icon: '✨',
      },
      {
        title: 'Brand Integration',
        description: 'Seamless integration of brand elements across all packaging surfaces.',
        image: '/magazine.png',
        icon: '🎨',
      },
      {
        title: 'Production Ready',
        description: 'Print-ready files with proper dielines and specifications.',
        image: '/ca1.png',
        icon: '🖨️',
      },
    ],
    results: {
      logoText: 'BOX DESIGN',
      flipbookImages: ['/box.jpg', '/ca1.png', '/mp.png', '/magazine.png'],
      testimonial: {
        quote:
          'The box design perfectly captured our brand essence. The packaging has become a talking point for our customers and has helped drive sales.',
        author: 'Client',
        role: 'Product Manager',
        avatar: '/box.jpg',
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
