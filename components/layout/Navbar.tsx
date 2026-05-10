'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { IconDownload } from '@tabler/icons-react';
import type { SocialLink } from '@/types/portfolio';

interface NavbarProps {
  socialLinks: SocialLink[];
  resumeUrl?: string;
}

const NAV_LINKS = [
  { label: 'WORK', href: '#work' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
];

/* ─── Inline logo SVG (both modes) ───────────────────── */
function LogoMark({ dark }: { dark: boolean }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect width="400" height="400" fill={dark ? '#111111' : '#F5F5F5'} />
      <path
        d="M174.46 78L201.119 93.3822L200.712 157.795L159.198 133.376L129.69 151.065L188.299 186.637L148.005 209.71L119.108 193.174V264.894L78 241.436V134.337L174.46 78Z"
        fill={dark ? '#F5F5F5' : '#222222'}
      />
      <path
        d="M244.669 170.101V119.916L322 165.102V241.051L277.84 266.24H251.384L223.505 250.473L222.487 322L179.955 298.35V235.667L231.238 206.057L263.391 224.708L277.84 216.055V190.098L244.669 170.101Z"
        fill={dark ? '#F5F5F5' : '#222222'}
      />
    </svg>
  );
}

export default function Navbar({ socialLinks, resumeUrl = '/resume.pdf' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isDark = mounted && theme === 'dark';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-black dark:border-white transition-all duration-300 ${scrolled
          ? 'bg-white/95 dark:bg-[#111111]/95 backdrop-blur-sm'
          : 'bg-white dark:bg-[#111111]'
          }`}
        role="banner"
      >
        <div className="flex justify-between items-center w-full max-w-container mx-auto px-gutter h-16">

          {/* ── Logo (bigger: 10×10 instead of 8×8) ── */}
          <Link href="/" aria-label="Home" className="flex items-center gap-2 group flex-shrink-0">
            <div className="h-11 w-11 transition-transform group-hover:scale-95 border border-black/10 dark:border-white/10">
              {mounted ? <LogoMark dark={isDark} /> : <LogoMark dark={false} />}
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-sans uppercase tracking-widest font-semibold text-xs text-muted dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors cursor-none"
                aria-label={`Navigate to ${link.label}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-3">

            {/* Résumé download link — desktop only */}
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest px-4 py-2 border border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200"
              aria-label="View or download resume"
              title="View or Download Résumé"
            >
              <IconDownload size={12} stroke={2.5} />
              Résumé
            </a>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="hidden md:flex items-center justify-center w-9 h-9 border border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`block w-6 h-px bg-black dark:bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
              <span className={`block w-6 h-px bg-black dark:bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block w-6 h-px bg-black dark:bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      <div
        className={`fixed inset-0 z-40 bg-white dark:bg-[#111111] flex flex-col pt-20 px-6 pb-12 transition-all duration-500 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="flex flex-col gap-2 flex-1 justify-center" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left font-sans text-5xl font-bold uppercase tracking-tighter py-4 border-b border-black/10 dark:border-white/10 hover:pl-4 transition-all"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </button>
          ))}

          {/* Resume in mobile menu too */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-left font-sans text-5xl font-bold uppercase tracking-tighter py-4 border-b border-black/10 dark:border-white/10 hover:pl-4 transition-all flex items-center gap-4"
            aria-label="View or download resume"
            style={{ transitionDelay: `${NAV_LINKS.length * 60}ms` }}
          >
            Résumé
            <IconDownload size={32} stroke={2} />
          </a>
        </nav>

        {/* Social links in mobile menu */}
        <div className="flex gap-8 pt-8 border-t border-black/20 dark:border-white/20">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs font-semibold uppercase tracking-widest text-muted hover:text-black dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Theme toggle in mobile menu */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="mt-6 text-left font-sans text-xs font-semibold uppercase tracking-widest text-muted"
          >
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </button>
        )}
      </div>
    </>
  );
}
