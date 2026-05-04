'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { IconCertificate } from '@tabler/icons-react';
import type { Certification } from '@/types/portfolio';

interface CertificationsProps {
  data: Certification[];
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Certifications({ data }: CertificationsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="certifications"
      ref={ref}
      aria-label="Licenses and Certifications"
      className="section-padding scroll-mt-nav"
    >
      <motion.h2
        variants={headingVariant}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="font-sans font-bold text-display-lg uppercase tracking-tighter text-black dark:text-white mb-16"
      >
        Certifications
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((cert, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="border border-black dark:border-white p-8 flex flex-col gap-6 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 group"
          >
            <div className="flex justify-between items-start">
              <IconCertificate
                size={28}
                stroke={1.5}
                className="text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors"
              />
              <span className="font-sans text-label-sm uppercase tracking-widest text-muted dark:text-zinc-400 group-hover:text-white/70 dark:group-hover:text-black/70 transition-colors">
                {cert.issued}
              </span>
            </div>

            <div className="space-y-2 flex-1">
              <h3 className="font-sans font-semibold text-body-lg leading-snug tracking-tight">
                {cert.title}
              </h3>
              <p className="font-sans text-label-bold text-label-bold uppercase tracking-widest text-muted dark:text-zinc-400 group-hover:text-white/70 dark:group-hover:text-black/70 transition-colors">
                {cert.issuer}
              </p>
            </div>

            <div className="pt-4 border-t border-black/20 dark:border-white/20 group-hover:border-white/20 dark:group-hover:border-black/20 transition-colors">
              <span className="font-sans text-label-sm text-muted dark:text-zinc-500 group-hover:text-white/60 dark:group-hover:text-black/60 transition-colors font-mono">
                ID: {cert.credentialId}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
