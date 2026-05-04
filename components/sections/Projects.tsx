'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';
import { IconExternalLink, IconBrandGithub, IconLock } from '@tabler/icons-react';
import type { Project } from '@/types/portfolio';

interface ProjectsProps {
  data: Project[];
}

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.12,
    },
  }),
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Projects({ data }: ProjectsProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="work"
      ref={ref}
      aria-label="Projects"
      className="section-padding scroll-mt-nav"
    >
      <motion.h2
        variants={headingVariant}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        className="font-sans font-bold text-display-lg uppercase tracking-tighter text-black dark:text-white mb-16"
      >
        Selected Work
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((project, i) => (
          <motion.article
            key={project.title}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="border border-black dark:border-white group hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000] dark:hover:shadow-[4px_4px_0px_#fff] transition-all duration-300 flex flex-col"
            aria-label={`Project: ${project.title}`}
          >
            {/* Image */}
            <div className="relative w-full aspect-video border-b border-black dark:border-white overflow-hidden bg-surface dark:bg-zinc-900">
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col gap-6 flex-1">
              <div className="space-y-3">
                <h3 className="font-sans font-bold text-headline-md uppercase tracking-tight text-black dark:text-white">
                  {project.title}
                </h3>
                <p className="font-sans text-body-md text-muted dark:text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-black dark:border-white px-3 py-1 font-sans text-label-sm uppercase tracking-widest font-semibold text-black dark:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-6 mt-auto pt-6 border-t border-black/20 dark:border-white/20">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-sans text-label-bold text-label-bold uppercase tracking-widest text-black dark:text-white hover:opacity-60 transition-opacity"
                    aria-label={`View ${project.title} live`}
                  >
                    <IconExternalLink size={15} stroke={2} />
                    Live Site
                  </a>
                )}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-sans text-label-bold text-label-bold uppercase tracking-widest text-muted dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <IconBrandGithub size={15} stroke={2} />
                    Source
                  </a>
                ) : (
                  <span className="flex items-center gap-2 font-sans text-label-sm uppercase tracking-widest text-muted dark:text-zinc-600">
                    <IconLock size={13} stroke={2} />
                    Private Codebase
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
