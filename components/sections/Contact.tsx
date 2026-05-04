'use client';

import { useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useForm } from 'react-hook-form';
import type { Contact as ContactType } from '@/types/portfolio';

interface ContactProps {
  data: ContactType;
}

interface FormData {
  name: string;
  email: string;
  brief: string;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.1,
    },
  }),
};

const slideIn: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
};

export default function Contact({ data }: ContactProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (formData: FormData) => {
    // Simulate network request
    await new Promise((r) => setTimeout(r, 1000));
    console.log('Form submitted:', formData);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Contact section"
      className="bg-black text-white"
    >
      <div className="max-w-container mx-auto px-gutter py-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Left — Headline */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="space-y-8"
          >
            <h2 className="font-sans font-black text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[0.95] tracking-tighter">
              {data.headline.split(' ').map((word, i) => (
                <span key={i} className="block">
                  {word}
                </span>
              ))}
            </h2>

            <p className="font-sans text-body-lg text-zinc-400 max-w-sm leading-relaxed">
              {data.subtext}
            </p>

            {/* Email CTA */}
            <a
              href={`mailto:${data.email}`}
              className="inline-block font-sans text-body-md border-b border-zinc-600 hover:border-white pb-1 transition-all text-zinc-300 hover:text-white"
              aria-label={`Email ${data.email}`}
            >
              {data.email}
            </a>

            {/* Social Links */}
            <div className="flex gap-8 pt-4">
              {data.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-white hover:line-through transition-all"
                  aria-label={`${link.platform} profile`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            variants={slideIn}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {submitted ? (
              <div className="border border-zinc-700 p-12 text-center space-y-4">
                <div className="text-4xl">✓</div>
                <p className="font-sans font-semibold uppercase tracking-widest text-sm">
                  Message Received
                </p>
                <p className="font-sans text-zinc-400 text-body-md">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-10"
                noValidate
                aria-label="Contact form"
              >
                {/* Name */}
                <div className="space-y-3">
                  <label
                    htmlFor="contact-name"
                    className="font-sans text-label-bold text-label-bold uppercase tracking-widest text-zinc-400 block"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    className={`w-full bg-transparent border-b py-4 outline-none font-sans text-body-md placeholder:text-zinc-600 transition-colors ${errors.name
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-zinc-700 focus:border-white'
                      }`}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-400 text-xs font-sans" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <label
                    htmlFor="contact-email"
                    className="font-sans text-label-bold text-label-bold uppercase tracking-widest text-zinc-400 block"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    className={`w-full bg-transparent border-b py-4 outline-none font-sans text-body-md placeholder:text-zinc-600 transition-colors ${errors.email
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-zinc-700 focus:border-white'
                      }`}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
                    })}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-400 text-xs font-sans" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Brief */}
                <div className="space-y-3">
                  <label
                    htmlFor="contact-brief"
                    className="font-sans text-label-bold text-label-bold uppercase tracking-widest text-zinc-400 block"
                  >
                    Brief
                  </label>
                  <textarea
                    id="contact-brief"
                    placeholder="Tell me about your project"
                    rows={4}
                    className={`w-full bg-transparent border-b py-4 outline-none font-sans text-body-md placeholder:text-zinc-600 resize-none transition-colors ${errors.brief
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-zinc-700 focus:border-white'
                      }`}
                    aria-describedby={errors.brief ? 'brief-error' : undefined}
                    {...register('brief', { required: 'Please describe your project' })}
                  />
                  {errors.brief && (
                    <p id="brief-error" className="text-red-400 text-xs font-sans" role="alert">
                      {errors.brief.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black py-6 font-sans font-semibold text-xs uppercase tracking-widest hover:bg-transparent hover:text-white border border-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Submit contact form"
                >
                  {isSubmitting ? 'Sending...' : 'Initialize Contact'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
