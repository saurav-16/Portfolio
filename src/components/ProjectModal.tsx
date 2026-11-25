import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import type { ProjectItem } from '../data/resume';
import { ACCENT_TONES } from '../utils/themeTones';
import { MarksDemoWidget } from './MarksDemoWidget';

interface ProjectModalProps {
  project: ProjectItem | null;
  initialTab?: 'overview' | 'demo';
  onClose: () => void;
}

export function ProjectModal({ project, initialTab = 'overview', onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'demo'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [project, initialTab]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  const tone = project ? ACCENT_TONES[project.accentTone] : ACCENT_TONES.cobalt;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 backdrop-blur-xs p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            key="project-modal-panel"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
          >
            <div aria-hidden="true" className={`h-1.5 w-full bg-gradient-to-r ${tone.bar}`} />

            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-200 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  <span>{project.stackLabel}</span>
                  <span aria-hidden="true">{' · '}</span>
                  <span>{project.year}</span>
                  {project.recognition && (
                    <>
                      <span aria-hidden="true">{' · '}</span>
                      <span className={`font-semibold ${tone.text}`}>{project.recognition}</span>
                    </>
                  )}
                </p>
                <h3
                  id="project-modal-title"
                  className="font-display text-2xl font-bold text-[#0F172A] mt-1"
                >
                  {project.title}
                </h3>
                <p className="text-sm text-slate-600 mt-0.5">{project.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="w-10 h-10 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-[#0F172A] hover:border-slate-300 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Optional Tabs if interactive demo exists */}
            {project.hasInteractiveDemo && (
              <div className="px-6 pt-3 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'overview'
                      ? 'border-[#059669] text-[#047857]'
                      : 'border-transparent text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  Architecture & Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('demo')}
                  className={`px-4 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'demo'
                      ? 'border-[#059669] text-[#047857]'
                      : 'border-transparent text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  Live Grade & CSV Calculator
                </button>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {activeTab === 'demo' && project.hasInteractiveDemo ? (
                <MarksDemoWidget />
              ) : (
                <>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    {project.summary}
                  </p>

                  {project.venue && (
                    <div className="py-3 px-4 bg-blue-50/60 border border-blue-200/80 rounded-xl text-sm text-slate-700">
                      <span className="font-semibold text-[#0F172A]">Hackathon Outcome: </span>
                      {project.venue}
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-semibold text-[#0F172A] mb-3">
                      Key Contributions
                    </h4>
                    <ul className="space-y-2.5 text-sm text-slate-700">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 leading-relaxed">
                          <span aria-hidden="true" className={`${tone.text} font-bold mt-0.5`}>
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#0F172A] mb-3">
                      System Breakdown
                    </h4>
                    <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                      {project.architectureNotes.map((note) => (
                        <div key={note.layer} className="p-4 bg-white">
                          <div className="text-sm font-semibold text-[#0F172A]">{note.layer}</div>
                          <div className="text-xs text-slate-600 mt-1 leading-relaxed">{note.detail}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                    <div className="text-xs text-slate-500">
                      Technologies: {project.stack.join(' · ')}
                    </div>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${tone.text}`}
                    >
                      View GitHub Profile
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
