import { motion } from 'framer-motion';

export function ContactSection() {
  return (
    <section id="contact" className="bg-[var(--page-bg)] text-[var(--text-primary)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            {[
              { label: '→ prakasvinraj@gmail.com', href: 'mailto:prakasvinraj@gmail.com' },
              { label: '→ LinkedIn', href: 'https://www.linkedin.com/in/pravinraj-prakash-193996262/' },
              { label: '→ Facebook', href: 'https://www.facebook.com/profile.php?id=61586036431439&mibextid=rS40aB7S9Ucbxw6v' },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 10 }}
                className="block text-lg md:text-xl text-[var(--text-primary)] hover:opacity-80 transition-opacity"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
