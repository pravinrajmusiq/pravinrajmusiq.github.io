import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assetPath } from '../utils/assetPath';

const projects = [
  {
    title: 'Videos',
    link: '/projects/videos',
    category: 'Webflow Development',
    description:
      'The product design & branding studio. Founded by designers, The Bang is an award winning design studio.',
    image: assetPath('/ca1.png'),
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Poster',
    link: '/projects/poster',
    category: 'Webflow Development, Web Design, Branding',
    description:
      'Aid Studio, based in Romania, operates as an interior design and architecture studio.',
    image: assetPath('/mp.png'),
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Magazine',
    link: '/projects/magazine',
    category: 'Webflow Development',
    description:
      'Avazia are a technology and engineering consultancy. Experts in data acquisition, control.',
    image: assetPath('/magazine.png'),
    gradient: 'from-green-500 to-teal-500',
  },
  {
    title: 'Box design',
    link: '/projects/box-design',
    category: 'Webflow Development, Web Design, Branding',
    description: 'Immersive storytelling experiences utilising augmented reality.',
    image: assetPath('/box.jpg'),
    gradient: 'from-orange-500 to-red-500',
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={project.link}>
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100,
      }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer relative"
    >
      <div className="relative h-[380px] md:h-[500px] rounded-2xl overflow-hidden bg-[var(--border-color)]">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-sm text-[var(--text-muted)] mb-2">{project.category}</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 text-[var(--text-primary)]">{project.title}</h3>
              <p className="text-[var(--text-muted)] text-sm md:text-base mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex items-center gap-2 text-[var(--text-primary)]">View Project →</div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isHovered ? 1 : 0 }}
          className="absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 border-t-2 border-r-2 border-[var(--text-primary)]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15 + 0.3 }}
        viewport={{ once: true }}
        className="mt-4"
      >
        <div className="text-sm text-[var(--text-muted)] mb-1">{project.category}</div>
        <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">{project.title}</h3>
      </motion.div>
    </motion.div>
    </Link>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-[var(--page-bg)] text-[var(--text-primary)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight">
            See my Projects That
            <br />
            Impress Both Clients and
            <br />
            Customers.
          </h2>
          <p className="text-[var(--text-muted)] text-lg md:text-xl max-w-3xl">
            My projects showcase the exceptional work that I have delivered. Have a look into my
            portfolio, highlighting the diverse range of web design and Webflow development projects
            for various industries.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 text-center"
        >
          <motion.button
            whileHover={{ x: 10 }}
            className="inline-flex items-center gap-2 text-xl text-[var(--text-primary)] touch-action-manipulation"
          >
            → View all
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
