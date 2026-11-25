import { motion } from 'motion/react';
import { Award, Briefcase, GraduationCap } from 'lucide-react';
import { CERTIFICATIONS, EDUCATION, EXPERIENCES } from '../data/resume';
import { ACCENT_TONES } from '../utils/themeTones';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ExperienceEducationSection() {
  return (
    <section className="py-16 md:py-20 border-t border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
        {/* Left Column: Experience & Leadership */}
        <motion.div
          id="experience"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="lg:col-span-6 space-y-8 scroll-mt-24"
        >
          <div>
            <p className="text-sm font-semibold text-[#2563EB] inline-flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              <span>Experience & Leadership</span>
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-[#0F172A] mt-1">
              Work & Campus Roles
            </h2>
          </div>

          <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {EXPERIENCES.map((item) => (
              <article key={item.id} className="py-6 space-y-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#0F172A]">
                      {item.role}
                    </h3>
                    <p className="text-sm font-medium text-slate-700">
                      {item.organization}
                    </p>
                  </div>

                  <span
                    className={`font-mono text-xs tabular-nums font-medium ${
                      item.type === 'leadership' ? 'text-[#059669]' : 'text-[#2563EB]'
                    }`}
                  >
                    {item.type === 'leadership' ? 'Leadership' : 'Experience'} · {item.period}
                  </span>
                </div>

                <ul className="space-y-2 text-sm text-slate-600">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 leading-relaxed">
                      <span aria-hidden="true" className="text-slate-400 mt-0.5">
                        —
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Education, Certifications & Achievement */}
        <motion.div
          id="education"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, delay: 0.08, ease: EASE_OUT }}
          className="lg:col-span-6 space-y-10 scroll-mt-24"
        >
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-[#0891B2] inline-flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>Academic Background</span>
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#0F172A] mt-1">
                Education
              </h2>
            </div>

            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.id}
                  className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                >
                  <div>
                    <h3 className="font-display text-base font-bold text-[#0F172A]">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-slate-600 mt-0.5">
                      {edu.institution} · {edu.location}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-slate-500 tabular-nums shrink-0">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-[#0F172A]">
                Certifications
              </h3>
              <span className="font-mono text-xs text-slate-500 tabular-nums">
                {CERTIFICATIONS.length} completed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CERTIFICATIONS.map((cert) => {
                const tone = ACCENT_TONES[cert.accentTone];
                return (
                  <motion.div
                    key={cert.id}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.16, ease: EASE_OUT }}
                    className={`relative overflow-hidden bg-white border border-slate-200 ${tone.borderHover} rounded-xl p-4 space-y-1 transition-colors`}
                  >
                    <div
                      aria-hidden="true"
                      className={`h-0.5 w-8 rounded-full bg-gradient-to-r ${tone.bar} mb-2`}
                    />
                    <div className="text-sm font-semibold text-[#0F172A]">
                      {cert.title}
                    </div>
                    {cert.issuer && (
                      <div className={`text-xs font-medium ${tone.text}`}>
                        {cert.issuer}
                      </div>
                    )}
                    <p className="text-xs text-slate-600 leading-relaxed pt-0.5">
                      {cert.focus}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50/80 via-white to-blue-50/70 border border-amber-200/80 rounded-xl p-5 flex items-start gap-3.5">
            <Award className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-[#0F172A]">
                3rd Place, TechXcelerate 2025 (BITS Pilani, Hyderabad)
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Built and presented TalentHubb, a full-stack MERN marketplace, within 24 hours alongside teammates.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
