import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Calculator, FileText, Github, Layers, Linkedin } from 'lucide-react';
import { PROFILE, PROOF_METRICS, PROJECTS, type ProjectItem } from '../data/resume';
import { ACCENT_TONES } from '../utils/themeTones';

interface HeroSectionProps {
  onOpenResume: () => void;
  onSelectProject: (project: ProjectItem, startInDemo?: boolean) => void;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection({ onOpenResume, onSelectProject }: HeroSectionProps) {
  const [featuredTab, setFeaturedTab] = useState<'talenthubb' | 'marks'>('talenthubb');

  const talentHubb = PROJECTS[0];
  const marksSystem = PROJECTS[1];
  const activeProject = featuredTab === 'talenthubb' ? talentHubb : marksSystem;
  const activeTone = ACCENT_TONES[activeProject.accentTone];

  return (
    <section id="top" className="relative overflow-hidden pt-10 pb-14 md:pt-16 md:pb-20">
      {/* Subtle atmospheric color wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[540px] bg-[radial-gradient(ellipse_75%_60%_at_18%_12%,rgba(37,99,235,0.11),transparent),radial-gradient(ellipse_60%_55%_at_84%_22%,rgba(16,185,129,0.10),transparent)]"
      />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="lg:col-span-7 flex flex-col justify-between gap-8"
          >
            <div className="space-y-6">
              <p className="text-sm font-medium text-slate-600">
                <span className="font-semibold text-[#2563EB]">{PROFILE.location}</span>
                <span aria-hidden="true">{' · '}</span>
                <span>Software Developer</span>
                <span aria-hidden="true">{' · '}</span>
                <span>MERN Stack & Python</span>
              </p>

              <h1 className="font-display text-[clamp(2.25rem,4.3vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-[#0F172A] text-balance max-w-2xl">
                {PROFILE.headlineLead}{' '}
                <span className="bg-gradient-to-r from-[#2563EB] via-[#0891B2] to-[#059669] bg-clip-text text-transparent">
                  {PROFILE.headlineAccent}
                </span>
              </h1>

              <p className="text-base md:text-[17px] leading-[1.68] text-slate-600 max-w-[65ch]">
                {PROFILE.summary}
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.16, ease: EASE_OUT }}
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] rounded-lg shadow-sm transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  <FileText className="w-4 h-4" />
                  View Resume
                </motion.button>

                <motion.a
                  href="#projects"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.16, ease: EASE_OUT }}
                  className="inline-flex items-center gap-1.5 px-5 py-3 text-sm font-semibold text-[#0F172A] bg-white border border-slate-200 hover:border-[#2563EB]/40 hover:bg-slate-50 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                >
                  Explore Projects
                </motion.a>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600 pt-1">
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] rounded-sm"
                >
                  <Github className="w-4 h-4 text-slate-500" />
                  <span>{PROFILE.githubHandle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href={PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-[#0891B2] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2563EB] rounded-sm"
                >
                  <Linkedin className="w-4 h-4 text-slate-500" />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Featured Architecture Spotlight (No Photo) */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE_OUT }}
            className="lg:col-span-5 flex"
          >
            <div className="relative overflow-hidden w-full lg:h-full bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-xs">
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${activeTone.bar}`}
              />

              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 tracking-wide whitespace-nowrap">
                    Featured Work Spotlight
                  </span>

                  <div
                    role="tablist"
                    aria-label="Featured project spotlight"
                    className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-auto"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={featuredTab === 'talenthubb'}
                      onClick={() => setFeaturedTab('talenthubb')}
                      className={`relative px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        featuredTab === 'talenthubb'
                          ? 'text-[#0F172A]'
                          : 'text-slate-600 hover:text-[#0F172A]'
                      }`}
                    >
                      {featuredTab === 'talenthubb' && (
                        <motion.span
                          layoutId="hero-spotlight-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          className="absolute inset-0 bg-white rounded-md shadow-xs"
                        />
                      )}
                      <span className="relative z-10">TalentHubb</span>
                    </button>

                    <button
                      type="button"
                      role="tab"
                      aria-selected={featuredTab === 'marks'}
                      onClick={() => setFeaturedTab('marks')}
                      className={`relative px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        featuredTab === 'marks'
                          ? 'text-[#0F172A]'
                          : 'text-slate-600 hover:text-[#0F172A]'
                      }`}
                    >
                      {featuredTab === 'marks' && (
                        <motion.span
                          layoutId="hero-spotlight-pill"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          className="absolute inset-0 bg-white rounded-md shadow-xs"
                        />
                      )}
                      <span className="relative z-10">Marks Analysis</span>
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: EASE_OUT }}
                    className="pt-5 space-y-5"
                  >
                    <div>
                      <p className={`text-xs font-semibold ${activeTone.text}`}>
                        {activeProject.venue ?? `${activeProject.stackLabel} · ${activeProject.year}`}
                      </p>
                      <h2 className="font-display text-xl font-bold text-[#0F172A] mt-1">
                        {activeProject.title}
                      </h2>
                      <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {activeProject.summary}
                      </p>
                    </div>

                    <div className="space-y-3 pt-1">
                      {activeProject.architectureNotes.map((note, idx) => (
                        <div
                          key={note.layer}
                          className="flex items-start gap-3 py-2.5 border-t border-slate-100 first:border-t-0 first:pt-0"
                        >
                          <span className={`font-mono text-xs font-semibold tabular-nums pt-0.5 ${activeTone.text}`}>
                            0{idx + 1}
                          </span>
                          <div>
                            <div className="text-sm font-semibold text-[#0F172A]">
                              {note.layer}
                            </div>
                            <div className="text-xs text-slate-600 leading-relaxed mt-0.5">
                              {note.detail}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-slate-500">
                  {activeProject.stackLabel} · {activeProject.year}
                </span>

                {featuredTab === 'talenthubb' ? (
                  <button
                    type="button"
                    onClick={() => onSelectProject(talentHubb, false)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] hover:text-[#1E40AF] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Layers className="w-4 h-4" />
                    Inspect Case Study
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelectProject(marksSystem, true)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#047857] hover:text-[#065F46] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Calculator className="w-4 h-4" />
                    Try Live Calculator
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Proof Strip Below Hero Split */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16, ease: EASE_OUT }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 border border-slate-200 bg-white rounded-2xl overflow-hidden"
        >
          {PROOF_METRICS.map((metric, idx) => {
            const tone = ACCENT_TONES[metric.accentTone];
            return (
              <div
                key={metric.label}
                className={`relative p-6 transition-colors hover:bg-slate-50/70 ${
                  idx < 2 ? 'border-b lg:border-b-0 border-slate-200' : ''
                } ${
                  idx % 2 === 0
                    ? 'border-r border-slate-200'
                    : 'lg:border-r lg:last:border-r-0 border-slate-200'
                }`}
              >
                <div
                  aria-hidden="true"
                  className={`h-1 w-8 rounded-full bg-gradient-to-r ${tone.bar} mb-3`}
                />
                <div className="font-display text-2xl md:text-3xl font-bold text-[#0F172A] tabular-nums">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-slate-800 mt-1">
                  {metric.label}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{metric.detail}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
