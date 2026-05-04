import type { SocialLink } from '@/types/portfolio';
import { currentYear } from '@/lib/utils';

interface FooterProps {
  socialLinks: SocialLink[];
  name: string;
}

export default function Footer({ socialLinks, name }: FooterProps) {
  const year = currentYear();
  const displayName = name.replace('.', '').toUpperCase();

  return (
    <footer
      className="border-t border-black dark:border-white bg-white dark:bg-[#0a0a0a]"
      role="contentinfo"
    >
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-container mx-auto px-gutter py-12 gap-8">
        {/* Copyright */}
        <div className="font-sans text-xs font-bold uppercase tracking-widest text-black dark:text-white">
          © {year} {displayName} — ALL RIGHTS RESERVED
        </div>

        {/* Social Links */}
        <nav aria-label="Social links" className="flex gap-10">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs font-semibold tracking-widest uppercase text-black dark:text-white hover:line-through transition-all"
              aria-label={`${link.platform} profile`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
