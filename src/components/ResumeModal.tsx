import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Download, ExternalLink, X } from 'lucide-react';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCES,
  FAMILIAR_WITH_SKILLS,
  PROFILE,
  PROJECTS,
  SKILL_GROUPS,
} from '../data/resume';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="resume-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 backdrop-blur-xs p-4 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            key="resume-modal-panel"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl max-h-[88vh] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden flex flex-col my-auto"
          >
            <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div>
                <h3 id="resume-modal-title" className="font-display text-lg font-bold text-[#0F172A]">
                  Saurav Kumar — Resume
                </h3>
                <p className="text-xs text-slate-500">
                  Software Developer · B.E. Computer Science (2026)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={PROFILE.resumePath}
                  download="Saurav_Kumar_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download PDF
                </a>

                <a
                  href={PROFILE.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0F172A] bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open PDF
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume preview"
                  className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-[#0F172A] hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Crisp Formatted Resume Sheet */}
            <div className="flex-1 overflow-y-auto bg-slate-50 p-5 md:p-8">
              <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl p-6 md:p-10 space-y-7 text-sm text-slate-700">
                <div className="border-b border-slate-200 pb-5">
                  <h4 className="font-display text-2xl font-bold text-[#0F172A]">
                    {PROFILE.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {PROFILE.location} · {PROFILE.phone} · {PROFILE.email} · {PROFILE.linkedinHandle} · {PROFILE.githubHandle}
                  </p>
                </div>

                <section className="space-y-2">
                  <h5 className="text-xs font-bold text-[#2563EB]">Summary</h5>
                  <p className="leading-relaxed">{PROFILE.summary}</p>
                </section>

                <section className="space-y-2.5 border-t border-slate-100 pt-5">
                  <h5 className="text-xs font-bold text-[#2563EB]">Technical Skills</h5>
                  <ul className="space-y-1.5 text-xs md:text-sm">
                    {SKILL_GROUPS.map((group) => (
                      <li key={group.id}>
                        <span className="font-semibold text-[#0F172A]">{group.label}: </span>
                        <span>{group.items.join(', ')}</span>
                      </li>
                    ))}
                    <li>
                      <span className="font-semibold text-[#0F172A]">Familiar with: </span>
                      <span>{FAMILIAR_WITH_SKILLS.join(', ')}</span>
                    </li>
                  </ul>
                </section>

                <section className="space-y-4 border-t border-slate-100 pt-5">
                  <h5 className="text-xs font-bold text-[#2563EB]">Resume Projects</h5>
                  {PROJECTS.slice(0, 2).map((project) => (
                    <div key={project.id} className="space-y-1.5">
                      <div className="font-semibold text-[#0F172A]">
                        {project.title}: {project.subtitle} · {project.stackLabel} · {project.year}
                      </div>
                      <ul className="space-y-1 text-xs md:text-sm text-slate-600">
                        {project.highlights.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span aria-hidden="true">—</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section className="space-y-3 border-t border-slate-100 pt-5">
                  <h5 className="text-xs font-bold text-[#2563EB]">Experience & Leadership</h5>
                  {EXPERIENCES.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex flex-wrap justify-between gap-2 font-semibold text-[#0F172A]">
                        <span>
                          {exp.role} · {exp.organization}
                        </span>
                        <span className="font-mono text-xs text-slate-500 font-normal">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-1 text-xs md:text-sm text-slate-600">
                        {exp.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span aria-hidden="true">—</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section className="space-y-2 border-t border-slate-100 pt-5">
                  <h5 className="text-xs font-bold text-[#2563EB]">Education</h5>
                  <ul className="space-y-2 text-xs md:text-sm">
                    {EDUCATION.map((edu) => (
                      <li key={edu.id} className="flex flex-wrap justify-between gap-2">
                        <span>
                          <span className="font-semibold text-[#0F172A]">{edu.degree}</span> · {edu.institution}, {edu.location}
                        </span>
                        <span className="font-mono text-xs text-slate-500">{edu.period}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-2 border-t border-slate-100 pt-5">
                  <h5 className="text-xs font-bold text-[#2563EB]">Certifications & Achievements</h5>
                  <ul className="space-y-1 text-xs md:text-sm text-slate-600">
                    {CERTIFICATIONS.map((cert) => (
                      <li key={cert.id}>
                        {cert.title}
                        {cert.issuer ? `, ${cert.issuer}` : ''}
                      </li>
                    ))}
                    <li className="pt-1 font-medium text-[#0F172A]">
                      3rd Place, TechXcelerate 2025 (BITS Pilani, Hyderabad): built and presented a full-stack MERN marketplace in 24 hours.
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
