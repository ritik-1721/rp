import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import portfolioData from '@/data/portfolio.json';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: {
    default: portfolioData.meta.title,
    template: `%s | ${portfolioData.meta.title}`,
  },
  description: portfolioData.meta.description,
  metadataBase: new URL(portfolioData.meta.siteUrl),
  openGraph: {
    title: portfolioData.meta.title,
    description: portfolioData.meta.description,
    url: portfolioData.meta.siteUrl,
    siteName: portfolioData.meta.title,
    images: [{ url: portfolioData.meta.ogImage, width: 1200, height: 630, alt: portfolioData.meta.title }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolioData.meta.title,
    description: portfolioData.meta.description,
    images: [portfolioData.meta.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans bg-white dark:bg-[#111111] text-black dark:text-[#F0EDE5] antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          {/* Square cursor — desktop only, hides on touch */}
          <CustomCursor />
          <Navbar socialLinks={portfolioData.contact.socialLinks} resumeUrl={portfolioData.meta.resumeUrl ?? '/resume.pdf'} />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer socialLinks={portfolioData.contact.socialLinks} name={portfolioData.hero.name} />
        </ThemeProvider>
      </body>
    </html>
  );
}
