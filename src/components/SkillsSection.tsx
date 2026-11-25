import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FAMILIAR_WITH_SKILLS, SKILL_GROUPS, type SkillCategory } from '../data/resume';
import { filterSkillGroups } from '../utils/portfolio';
import { ACCENT_TONES } from '../utils/themeTones';

const SKILL_TABS: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Skills' },
  { id: 'languages', label: 'Languages' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'databases', label: 'Databases' },
  { id: 'tools', label: 'Tools' },
  { id: 'concepts', label: 'Core Concepts' },
];

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');
  const visibleGroups = filterSkillGroups(SKILL_GROUPS, selectedCategory);

  return (
    <section id="skills" className="py-16 md:py-20 border-t border-slate-200 bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-sm font-semibold text-[#059669]">Technical Stack</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mt-1">
              Tools & Foundations
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filter technical skills by group"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl self-start lg:self-auto"
          >
            {SKILL_TABS.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active ? 'text-[#0F172A]' : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="skill-filter-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-white rounded-lg shadow-xs"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          data-testid="skills-grid"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleGroups.map((group, idx) => {
              const tone = ACCENT_TONES[group.accentTone];
              return (
                <motion.div
                  layout
                  key={group.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="pt-5 border-t border-slate-200 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div
                      aria-hidden="true"
                      className={`h-1 w-8 rounded-full bg-gradient-to-r ${tone.bar} mb-3`}
                    />

                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-lg font-bold text-[#0F172A]">
                        {group.label}
                      </h3>
                      <span className={`font-mono text-xs font-semibold tabular-nums ${tone.text}`}>
                        0{idx + 1}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {group.context}
                    </p>

                    <p className="mt-4 text-sm font-medium text-[#0F172A] leading-7">
                      {group.items.map((item, itemIdx) => (
                        <span key={item}>
                          <span>{item}</span>
                          {itemIdx < group.items.length - 1 && (
                            <span aria-hidden="true" className="text-slate-300 mx-1">
                              {' / '}
                            </span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <div className="mt-10 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-slate-700">
            Also familiar with
          </span>
          <span className="text-slate-600">
            {FAMILIAR_WITH_SKILLS.join(' · ')}
          </span>
        </div>
      </div>
    </section>
  );
}
