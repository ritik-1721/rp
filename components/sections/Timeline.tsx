'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { TimelineEntry } from '@/types/portfolio';

interface TimelineProps {
  data: TimelineEntry[];
}

const entryVariant = {
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.15,
    },
  }),
};

const headingVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const lineVariant = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Timeline({ data }: TimelineProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="timeline"
      ref={ref}
      aria-label="Experience timeline"
      className="section-padding scroll-mt-nav"
    >
      <motion.h2
        variants={headingVariant}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="font-sans font-bold text-display-lg uppercase tracking-tighter text-black dark:text-white mb-16"
      >
        Timeline
      </motion.h2>

      <div className="relative">
        {/* Animated vertical line */}
        <motion.div
          variants={lineVariant}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ originY: 0 }}
          className="absolute left-0 top-2 bottom-0 w-px bg-black dark:bg-white"
        />

        <div className="space-y-0">
          {data.map((entry, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={entryVariant}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className={`pl-12 relative ${i < data.length - 1 ? 'pb-16' : 'pb-0'}`}
            >
              {/* Timeline dot */}
              <div className="absolute left-[-7px] top-2 w-3.5 h-3.5 bg-black dark:bg-white border-2 border-white dark:border-[#0a0a0a]" />

              {/* Year + Type badges */}
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-sans text-label-bold text-label-bold text-muted dark:text-zinc-400 uppercase tracking-widest">
                  {entry.year}
                </span>
                {entry.type === 'education' && (
                  <span className="border border-muted dark:border-zinc-500 px-2 py-0.5 font-sans text-[10px] tracking-widest uppercase font-semibold text-muted dark:text-zinc-400">
                    EDU
                  </span>
                )}
                {entry.location && (
                  <span className="font-sans text-[11px] text-muted dark:text-zinc-500 tracking-wide">
                    📍 {entry.location}
                  </span>
                )}
              </div>

              {/* Role + Company */}
              <h3 className="font-sans font-semibold text-headline-md uppercase tracking-tight text-black dark:text-white mb-3">
                {entry.role}{' '}
                {entry.companyUrl ? (
                  <a
                    href={entry.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted dark:text-zinc-400 font-normal hover:text-black dark:hover:text-white hover:underline transition-colors"
                    aria-label={`Visit ${entry.company} website`}
                  >
                    at {entry.company}
                  </a>
                ) : (
                  <span className="text-muted dark:text-zinc-400 font-normal">
                    at {entry.company}
                  </span>
                )}
              </h3>

              {/* Description */}
              <p className="font-sans text-body-md text-muted dark:text-zinc-400 max-w-2xl leading-relaxed">
                {entry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
