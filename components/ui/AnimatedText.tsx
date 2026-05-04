'use client';

import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  mode?: 'word' | 'char';
  once?: boolean;
}

export default function AnimatedText({
  text,
  className,
  delay = 0,
  mode = 'word',
  once = true,
}: AnimatedTextProps) {
  const tokens = mode === 'word' ? text.split(' ') : text.split('');
  const gap = mode === 'word' ? ' ' : '';

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: mode === 'word' ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20, skewY: 1 },
    show: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once }}
      className={cn('inline-flex flex-wrap', className)}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          variants={item}
          className="inline-block"
          style={{ marginRight: gap ? '0.25em' : undefined }}
        >
          {token}
          {mode === 'char' && token === ' ' ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}
