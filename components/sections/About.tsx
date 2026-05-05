'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import type { About as AboutType } from '@/types/portfolio';

interface AboutProps {
  data: AboutType;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function About({ data }: AboutProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About me"
      className="section-padding scroll-mt-nav"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-2 gap-16"
      >
        {/* Left — heading */}
        <motion.div variants={fadeUp}>
          <h2 className="font-sans font-bold text-display-lg uppercase tracking-tighter text-black dark:text-white">
            About Me
          </h2>

          {/* Availability badge */}
          {data.availability && (
            <div className="mt-8 inline-flex items-center gap-2.5 leading-none">
              <span className="relative inline-flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <span className="font-sans text-label-bold uppercase tracking-widest text-green-600 dark:text-green-400 leading-none">
                {data.availabilityLabel}
              </span>
            </div>
          )}
        </motion.div>

        {/* Right — content */}
        <motion.div variants={fadeUp} className="space-y-10">
          {/* Bio */}
          <p className="font-sans text-body-lg text-muted dark:text-zinc-400 leading-relaxed">
            {data.bio}
          </p>

        </motion.div>
      </motion.div>
    </section>
  );
}
