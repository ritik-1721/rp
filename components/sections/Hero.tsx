'use client';

import { motion, Variants } from 'framer-motion';
import type { Hero as HeroType } from '@/types/portfolio';

interface HeroProps {
  data: HeroType;
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const wordReveal: Variants = {
  hidden: { opacity: 0, y: 40, skewY: 3 },
  show: {
    opacity: 1, y: 0, skewY: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const STATS = [
  { value: '4+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Shipped' },
  { value: '2', label: 'Countries Served' },
  { value: '30%', label: 'Avg. Perf. Gain' },
];

const MARQUEE_ITEMS = [
  'React.js', '·', 'Node.js', '·', 'TypeScript', '·',
  'AWS', '·', 'Docker', '·', 'PostgreSQL', '·',
  'Next.js', '·', 'CI/CD', '·', 'Microservices', '·',
  'REST APIs', '·', 'Redis', '·', 'GitHub Actions', '·',
];

function AnimatedWords({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <motion.span key={i} variants={wordReveal} className="inline-block mr-[0.2em] last:mr-0">
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero({ data }: HeroProps) {
  return (
    <section id="hero" aria-label="Hero section" className="min-h-screen flex flex-col pt-16 relative overflow-hidden">

      {/* ── Decorative outlined text in background ── */}
      <div
        aria-hidden="true"
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
      >
        <span
          className="font-black uppercase text-[clamp(8rem,16vw,18rem)] leading-none tracking-tighter text-outline opacity-[0.04]"
          style={{ WebkitTextStroke: '2px #222222', color: 'transparent' }}
        >
          DEV
        </span>
      </div>

      {/* ── Subtle grid overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Main content ── */}
      <div className="max-w-container mx-auto px-gutter flex flex-col justify-center flex-1 py-24 md:py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-10 md:space-y-14"
        >
          {/* Top meta row */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
            {/* Availability badge — dot + text perfectly inline */}
            <div className="inline-flex items-center gap-2.5 border border-black/20 dark:border-white/20 px-4 py-2.5 leading-none">
              {/* Tailwind animate-ping pulse dot */}
              <span className="relative inline-flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="font-sans text-xs uppercase tracking-widest font-semibold text-green-700 dark:text-green-400 leading-none">
                Open for opportunities
              </span>
            </div>
            <span className="font-sans text-xs text-muted uppercase tracking-widest hidden sm:inline-flex items-center gap-1.5 leading-none">
              📍 Bengaluru, India
            </span>
          </motion.div>

          {/* ── Headline ── */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-16">
            <h1 className="font-sans font-black uppercase leading-[0.88] tracking-[-0.045em] text-[clamp(3rem,8.5vw,6.5rem)] text-black dark:text-white flex-1">
              <span className="overflow-hidden block">
                <AnimatedWords text={`${data.greeting} ${data.name}`} />
              </span>
              <span className="overflow-hidden block mt-1">
                <AnimatedWords
                  text={data.title}
                />
              </span>
            </h1>

            {/* Tagline column */}
            <motion.div variants={fadeUp} className="lg:max-w-sm xl:max-w-md flex-shrink-0">
              <div className="border-l-2 border-black/20 dark:border-white/20 pl-6 space-y-4">
                <p className="font-sans text-body-lg text-muted dark:text-zinc-400 leading-relaxed">
                  {data.tagline}
                </p>
                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={data.ctaPrimary.href}
                    className="inline-flex items-center justify-center bg-black dark:bg-white text-white dark:text-black px-8 py-4 font-sans font-semibold text-xs uppercase tracking-widest hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white border border-black dark:border-white transition-all duration-300 group"
                    aria-label={data.ctaPrimary.label}
                  >
                    <span className="group-hover:tracking-[0.1em] transition-all duration-300">{data.ctaPrimary.label}</span>
                  </a>
                  <a
                    href={data.ctaSecondary.href}
                    className="inline-flex items-center justify-center border border-black dark:border-white text-black dark:text-white px-8 py-4 font-sans font-semibold text-xs uppercase tracking-widest hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300 group"
                    aria-label={data.ctaSecondary.label}
                  >
                    <span className="group-hover:tracking-[0.1em] transition-all duration-300">{data.ctaSecondary.label}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── Stats row ── */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-black/10 dark:border-white/10 divide-x divide-black/10 dark:divide-white/10"
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="px-6 py-5 flex flex-col gap-1">
                <span className="font-sans font-black text-3xl tracking-tighter text-black dark:text-white">
                  {value}
                </span>
                <span className="font-sans text-xs uppercase tracking-widest text-muted font-semibold">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 text-muted dark:text-zinc-500">
            <motion.div
              className="w-px h-10 bg-black/30 dark:bg-white/30 origin-top"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-sans text-xs uppercase tracking-widest font-semibold">Scroll</span>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
}
