import { PROFILE } from '../data/resume';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[#FAFAFA] py-8">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-500">
        <div>
          <span className="font-semibold text-[#111827]">{PROFILE.name}</span>
          <span aria-hidden="true">{' · '}</span>
          <span>{PROFILE.location}</span>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <a href="#projects" className="hover:text-[#111827] transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-[#111827] transition-colors">
            Skills
          </a>
          <a href="#experience" className="hover:text-[#111827] transition-colors">
            Experience
          </a>
          <a href="#education" className="hover:text-[#111827] transition-colors">
            Education
          </a>
          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#111827] transition-colors"
          >
            GitHub
          </a>
          <a
            href={PROFILE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#111827] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
