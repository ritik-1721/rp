export interface Meta {
  title: string;
  description: string;
  ogImage: string;
  siteUrl: string;
  resumeUrl?: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface Hero {
  greeting: string;
  name: string;
  title: string;
  tagline: string;
  ctaPrimary: CtaLink;
  ctaSecondary: CtaLink;
}

export interface About {
  bio: string;
  email: string;
  phone: string;
  location: string;
  availability: boolean;
  availabilityLabel: string;
  skills: string[];
}

export interface TechItem {
  name: string;
  icon: string;
  category: string;
  index: string;
}

export interface TimelineEntry {
  year: string;
  role: string;
  company: string;
  companyUrl: string;
  location: string;
  description: string;
  type: 'work' | 'education';
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

export interface Certification {
  title: string;
  issuer: string;
  issued: string;
  credentialId: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface Contact {
  headline: string;
  subtext: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks: SocialLink[];
}

export interface PortfolioData {
  meta: Meta;
  hero: Hero;
  about: About;
  techStack: TechItem[];
  timeline: TimelineEntry[];
  projects: Project[];
  certifications: Certification[];
  contact: Contact;
}
