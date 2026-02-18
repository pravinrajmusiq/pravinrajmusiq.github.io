import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProjectPageTransition } from '../../components/project-details/ProjectPageTransition';
import { ProjectHero } from '../../components/project-details/ProjectHero';
import { Section3_Results } from '../../components/project-details/Section3_Results';

export default function MagazineProject() {
  const projectData = {
    hero: {
      title: 'Magazine',
      category: 'Editorial Design • Layout • Publishing',
      year: '2024',
      heroImage: '/magazine.png',
      gradient: 'from-green-500 to-teal-500',
    },
    overview: {
      challenge:
        'Creating compelling editorial layouts that balance content with visual design. The challenge was to design engaging magazine spreads that keep readers engaged from cover to cover.',
      solution:
        'We developed a comprehensive editorial design system with custom typography, grid systems, and visual hierarchy. Each spread was designed to guide the reader through the content seamlessly.',
      results:
        'Delivered multiple magazine issues with cohesive design language. Readers reported increased engagement and time spent with the publication.',
      image1: '/magazine.png',
      image2: '/box.jpg',
    },
    features: [
      {
        title: 'Editorial Layout',
        description: 'Thoughtful layout design that guides readers through content with clear hierarchy.',
        image: '/magazine.png',
        icon: '📖',
      },
      {
        title: 'Grid Systems',
        description: 'Consistent grid systems that create rhythm and harmony across pages.',
        image: '/mp.png',
        icon: '📐',
      },
      {
        title: 'Visual Storytelling',
        description: 'Storytelling through imagery and typography that captivates readers.',
        image: '/ca1.png',
        icon: '📝',
      },
      {
        title: 'Print Production',
        description: 'Print-ready files with proper bleed, color profiles, and specifications.',
        image: '/box.jpg',
        icon: '🖨️',
      },
    ],
    results: {
      logoText: 'MAGAZINE',
      flipbookImages: ['/magazine.png', '/box.jpg', '/ca1.png', '/mp.png'],
      testimonial: {
        quote:
          'The magazine design transformed our publication. The layouts are clean, professional, and engaging. Our readers love the new look.',
        author: 'Client',
        role: 'Editor in Chief',
        avatar: '/magazine.png',
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
