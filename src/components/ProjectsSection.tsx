import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Calculator, Layers } from 'lucide-react';
import { PROJECTS, type ProjectCategory, type ProjectItem } from '../data/resume';
import { filterProjects } from '../utils/portfolio';
import { ACCENT_TONES } from '../utils/themeTones';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem, startInDemo?: boolean) => void;
}

const FILTER_OPTIONS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'fullstack', label: 'Full-Stack Web' },
  { id: 'python-backend', label: 'Python & Backend' },
];

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const visibleProjects = filterProjects(PROJECTS, filter);

  return (
    <section id="projects" className="py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-[#2563EB]">Selected Projects</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mt-1">
              Engineering Work
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-2 max-w-xl">
              Full-stack web applications, REST services, and Python desktop utilities built for real user workflows.
            </p>
          </div>

          {/* Animated Segmented Filter */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap md:flex-nowrap items-center gap-1 p-1 bg-slate-200/70 rounded-xl self-start md:self-auto max-w-full shrink-0"
          >
            {FILTER_OPTIONS.map((option) => {
              const active = filter === option.id;
              const count = filterProjects(PROJECTS, option.id).length;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(option.id)}
                  className={`relative px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active ? 'text-[#0F172A]' : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="project-filter-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-white rounded-lg shadow-xs"
                    />
                  )}
                  <span className="relative z-10">
                    {option.label}{' '}
                    <span className="font-mono tabular-nums text-slate-400 ml-0.5">
                      ({count})
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          data-testid="projects-grid"
          className="grid grid-cols-1 lg:grid-cols-2 gap-7"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => {
              const tone = ACCENT_TONES[project.accentTone];

              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                  className={`relative overflow-hidden bg-white border border-slate-200 ${tone.borderHover} rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6 transition-colors`}
                >
                  {/* Subtle top color accent bar */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${tone.bar}`}
                  />

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                      <span>
                        <span className="font-mono tabular-nums text-slate-400 mr-2">
                          0{index + 1}.
                        </span>
                        <span className="font-medium text-slate-700">{project.stackLabel}</span>
                        <span aria-hidden="true">{' · '}</span>
                        <span className="font-mono tabular-nums">{project.year}</span>
                      </span>

                      {project.recognition ? (
                        <span className={`font-semibold ${tone.text}`}>
                          {project.recognition}
                        </span>
                      ) : (
                        <span className={`font-medium ${tone.text}`}>
                          {project.categoryLabel}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-display text-2xl font-bold text-[#0F172A] tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-600 mt-1">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-600">
                      {project.summary}
                    </p>

                    <ul className="space-y-2 pt-3 border-t border-slate-100 text-sm text-slate-700">
                      {project.highlights.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 leading-relaxed">
                          <span aria-hidden="true" className={`${tone.text} font-bold mt-0.5`}>
                            —
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="text-xs text-slate-500 leading-relaxed">
                      {project.stack.join(' · ')}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project, false)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          Case Study
                        </button>

                        {project.hasInteractiveDemo && (
                          <button
                            type="button"
                            onClick={() => onSelectProject(project, true)}
                            className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold ${tone.softBg} rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer`}
                          >
                            <Calculator className="w-3.5 h-3.5" />
                            Live Calculator
                          </button>
                        )}
                      </div>

                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0F172A] whitespace-nowrap shrink-0"
                      >
                        <span>{project.repoDisplay}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
