import { useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { ContactSection } from './components/ContactSection';
import { ExperienceEducationSection } from './components/ExperienceEducationSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { Navbar } from './components/Navbar';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { SkillsSection } from './components/SkillsSection';
import type { ProjectItem } from './data/resume';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projectModalTab, setProjectModalTab] = useState<'overview' | 'demo'>('overview');
  const [resumeOpen, setResumeOpen] = useState(false);
  const contactNameInputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectProject = (project: ProjectItem, startInDemo = false) => {
    setProjectModalTab(startInDemo && project.hasInteractiveDemo ? 'demo' : 'overview');
    setSelectedProject(project);
  };

  const handleContactClick = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      contactNameInputRef.current?.focus();
    }, 300);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
        <Navbar onContactClick={handleContactClick} />

        <main className="flex-1">
          <HeroSection
            onOpenResume={() => setResumeOpen(true)}
            onSelectProject={handleSelectProject}
          />

          <MarqueeRibbon />

          <ProjectsSection onSelectProject={handleSelectProject} />

          <SkillsSection />

          <ExperienceEducationSection />

          <ContactSection nameInputRef={contactNameInputRef} />
        </main>

        <Footer />

        <ProjectModal
          project={selectedProject}
          initialTab={projectModalTab}
          onClose={() => setSelectedProject(null)}
        />

        <ResumeModal
          open={resumeOpen}
          onClose={() => setResumeOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
