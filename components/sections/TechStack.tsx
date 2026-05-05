'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import {
  IconCode, IconTerminal, IconBraces, IconDatabase,
  IconBox, IconCloud, IconGitBranch, IconLayout,
  IconServer, IconBrandReact,
} from '@tabler/icons-react';
import type { TechItem } from '@/types/portfolio';

interface TechStackProps {
  data: TechItem[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  code: IconCode,
  terminal: IconTerminal,
  braces: IconBraces,
  database: IconDatabase,
  box: IconBox,
  cloud: IconCloud,
  'git-branch': IconGitBranch,
  layout: IconLayout,
  server: IconServer,
  react: IconBrandReact,
};

const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 },
  }),
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function TechStack({ data }: TechStackProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" ref={ref} aria-label="Technical skills" className="section-padding scroll-mt-nav">
      <motion.h2
        variants={headingVariant}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="font-sans font-bold text-display-lg uppercase tracking-tighter text-black dark:text-white mb-16"
      >
        Technical Skill
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {data.map((item, i) => {
          const Icon = ICON_MAP[item.icon] ?? IconCode;
          return (
            <motion.div
              key={item.name}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              /* ─ Fixed height instead of aspect-square prevents text overflow ─ */
              className="border border-black dark:border-white p-4 md:p-7 h-36 md:h-44 flex flex-col justify-between hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 group cursor-none overflow-hidden"
              role="listitem"
              aria-label={`${item.name} — ${item.category}`}
            >
              <div className="flex justify-between items-start">
                <span className="font-sans text-[10px] md:text-label-bold uppercase tracking-widest opacity-50 group-hover:opacity-80 leading-none">
                  {item.index}
                </span>
                <Icon
                  size={20}
                  stroke={1.5}
                  className="text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors flex-shrink-0"
                />
              </div>
              <div className="min-w-0">
                <span className="font-sans text-[9px] md:text-[11px] uppercase tracking-widest font-semibold opacity-40 group-hover:opacity-60 block mb-1 leading-none">
                  {item.category}
                </span>
                <span className="font-sans font-bold text-sm md:text-xl uppercase tracking-tight leading-tight block truncate">
                  {item.name}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
