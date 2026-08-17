import { motion } from 'framer-motion';
import { assetPath } from '../utils/assetPath';

const services = [
  {
    number: '01',
    title: 'Graphic Designer',
    description: 'I create compelling visual designs that communicate your brand message effectively. From logos and branding to print materials and digital graphics, I deliver designs that stand out and resonate with your audience.',
    image: assetPath('/branding_infographic.jpg'),
  },
  {
    number: '02',
    title: 'Video Editing',
    description: 'I create high-quality edited videos from raw footage to final delivery. Whether it\'s promotional videos, social media content, or creative storytelling, I handle editing and post-production to bring your vision to life.',
    image: assetPath('/timeline-edit-1.png'),
  },
  {
    number: '03',
    title: 'Motion Graphics',
    description: 'I create dynamic animated graphics and visual effects that captivate audiences. From animated logos and title sequences to explainer videos and social media content, I bring static designs to life with smooth, professional motion.',
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true, margin: '-200px' }}
      className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-24 md:mb-32 relative pt-20 md:pt-0"
    >
      <div className="absolute top-0 left-0 w-8 md:w-12 h-8 md:h-12 border-l-2 border-t-2 border-[var(--border-color)]" />
      <div className="absolute bottom-0 right-0 w-8 md:w-12 h-8 md:h-12 border-r-2 border-b-2 border-[var(--border-color)]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        viewport={{ once: true }}
        className="absolute -top-4 md:-top-8 -left-4 md:-left-8 text-6xl md:text-8xl font-bold opacity-30 z-0 select-none text-[var(--text-primary)]"
      >
        [ {service.number} ]
      </motion.div>

      <div className="relative z-10">
        <motion.h3
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
        >
          {service.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
          viewport={{ once: true }}
          className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-6 md:mb-8"
        >
          {service.description}
        </motion.p>

        <motion.span
          whileHover={{ x: 10 }}
          className="inline-flex items-center gap-2 text-[var(--text-primary)] group cursor-pointer"
        >
          → {service.title}
        </motion.span>
      </div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
        className="relative h-[280px] md:h-[400px] rounded-2xl overflow-hidden group cursor-pointer order-first md:order-none"
      >
        {service.number === '03' ? (
          <iframe
            src="https://player.vimeo.com/video/1218221679?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
            frameBorder="0"
            allow="autoplay; fullscreen"
            className="absolute inset-0"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            title="Gardenia Ad - Motion Graphics"
          />
        ) : (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-xl md:text-2xl">↗</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="bg-[var(--page-bg)] text-[var(--text-primary)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {services.map((service, index) => (
          <ServiceCard key={service.number} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
