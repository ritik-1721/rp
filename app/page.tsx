import portfolioData from '@/data/portfolio.json';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import TechStack from '@/components/sections/TechStack';
import Timeline from '@/components/sections/Timeline';
// import Projects from '@/components/sections/Projects'; // hidden for now
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';
import SectionDivider from '@/components/ui/SectionDivider';

export default function Home() {
  return (
    <>
      {/* Hero — full viewport */}
      <Hero data={portfolioData.hero} />

      <div className="max-w-container mx-auto px-gutter">
        <SectionDivider />

        {/* About */}
        <About data={portfolioData.about} />

        <SectionDivider />

        {/* Tech Stack */}
        <TechStack data={portfolioData.techStack} />

        <SectionDivider />

        {/* Timeline — work + education */}
        <Timeline data={portfolioData.timeline} />

        <SectionDivider />

        {/* Projects — hidden for now */}
        {/* <Projects data={portfolioData.projects} /> */}
        {/* <SectionDivider /> */}

        {/* Certifications */}
        <Certifications data={portfolioData.certifications} />
      </div>

      {/* Contact — full bleed */}
      <SectionDivider />
      <Contact data={portfolioData.contact} />
    </>
  );
}
