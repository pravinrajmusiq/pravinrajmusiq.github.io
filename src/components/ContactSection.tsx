import { motion } from 'framer-motion';

const contacts = [
  {
    icon: '✉',
    label: 'Email',
    value: 'prakasvinraj@gmail.com',
    href: 'mailto:prakasvinraj@gmail.com',
  },
  {
    icon: 'in',
    label: 'LinkedIn',
    value: 'pravinraj-prakash',
    href: 'https://www.linkedin.com/in/pravinraj-prakash-193996262/',
  },
  {
    icon: 'f',
    label: 'Facebook',
    value: 'Pravinraj',
    href: 'https://www.facebook.com/profile.php?id=61586036431439&mibextid=rS40aB7S9Ucbxw6v',
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="bg-[var(--page-bg)] text-[var(--text-primary)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <p className="text-[var(--text-muted)] text-base md:text-lg text-center mb-10 md:mb-12 max-w-2xl mx-auto">
          Also open to full-time roles — feel free to reach out or download my resume.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {contacts.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="flex flex-col items-center text-center p-8 md:p-10 rounded-2xl border border-[var(--border-color)] hover:border-[var(--text-primary)] transition-all duration-300 group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[var(--border-color)] group-hover:border-[var(--text-primary)] flex items-center justify-center text-xl md:text-2xl font-bold mb-4 transition-all duration-300">
                {item.icon}
              </div>
              <div className="text-[var(--text-muted)] text-sm mb-1">{item.label}</div>
              <div className="text-[var(--text-primary)] font-medium text-sm md:text-base">
                {item.value}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
