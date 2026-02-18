import { useState } from 'react';
import { motion } from 'framer-motion';

const formOptions = {
  budget: ['RM 300 - RM 2,000', 'RM 2,000 - RM 5,000', 'RM 5,000 - RM 7,500', 'RM 7,500 - RM 10,000'],
};

type FormData = {
  budget: string;
};

const initialFormData: FormData = {
  budget: '',
};

function FormSection({
  title,
  fields,
  formData,
  setFormData,
}: {
  title: string;
  fields: { label: string; name: keyof FormData; options: string[] }[];
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}) {
  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl font-bold mb-6 md:mb-8 border-b border-[var(--border-color)] pb-4"
      >
        {title}
      </motion.h3>

      {fields.map((field, index) => (
        <motion.div
          key={field.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-8"
        >
          <label className="block text-[var(--text-muted)] mb-3 md:mb-4">{field.label}</label>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {field.options.map((option) => (
              <motion.button
                key={option}
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, [field.name]: option }))}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full border transition-all text-sm md:text-base touch-action-manipulation min-h-[44px] ${
                  formData[field.name] === option
                    ? 'bg-[var(--button-bg)] text-[var(--button-text)] border-[var(--button-bg)]'
                    : 'border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--text-primary)]'
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const formFields = [
    {
      label: 'Your estimated budget (In MYR)',
      name: 'budget' as const,
      options: formOptions.budget,
    },
  ];

  return (
    <section id="contact" className="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 md:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12"
          >
            Let's Get in Touch.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[var(--text-muted)] text-base md:text-lg mb-8 md:mb-12"
          >
            I am ready to help! Whether you're interested in launching a new project, refining your
            existing site, seeking a quote, or discussing a potential collaboration, don't hesitate
            to contact me.
          </motion.p>

          <div className="space-y-4">
            {[
              { label: '→ prakasvinraj@gmail.com', href: 'mailto:prakasvinraj@gmail.com' },
              { label: '→ +60132450518', href: 'tel:+60132450518' },
              { label: '→ Book a free discovery call', href: '#contact' },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
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

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <FormSection
            title="Project Details"
            fields={formFields}
            formData={formData}
            setFormData={setFormData}
          />
        </motion.div>
      </div>
    </section>
  );
}
