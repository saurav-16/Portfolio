import { useState, type RefObject } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone, Send } from 'lucide-react';
import { PROFILE } from '../data/resume';
import { validateContactForm, type ContactValidationErrors } from '../utils/portfolio';

interface ContactSectionProps {
  nameInputRef: RefObject<HTMLInputElement | null>;
}

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ContactSection({ nameInputRef }: ContactSectionProps) {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);

  const handleCopy = async (field: 'email' | 'phone', value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Clipboard API may be unavailable in restricted contexts; still confirm visual intent
    }
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField((current) => (current === field ? null : current));
    }, 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm({ name, email, message });
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedData({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
  };

  const handleReset = () => {
    setSubmittedData(null);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
  };

  const mailtoHref = submittedData
    ? `mailto:${PROFILE.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${submittedData.name}`
      )}&body=${encodeURIComponent(
        `${submittedData.message}\n\nReply-To: ${submittedData.name} (${submittedData.email})`
      )}`
    : `mailto:${PROFILE.email}`;

  return (
    <section id="contact" className="py-16 md:py-20 border-t border-slate-200 bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-semibold text-[#2563EB]">Contact</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mt-1">
                Let’s Connect
              </h2>
              <p className="text-sm md:text-base text-slate-600 mt-3 leading-relaxed">
                Open to entry-level software developer roles and full-stack product teams where I can build, ship, and keep learning.
              </p>
            </div>

            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              <div className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500">Email</div>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-sm font-medium text-[#0F172A] hover:text-[#2563EB] truncate block"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('email', PROFILE.email)}
                  aria-label="Copy email address"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer shrink-0"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#059669]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Phone className="w-4 h-4 text-[#059669] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500">Phone</div>
                    <a
                      href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-medium font-mono tabular-nums text-[#0F172A] hover:text-[#059669] block"
                    >
                      {PROFILE.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('phone', PROFILE.phone)}
                  aria-label="Copy phone number"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer shrink-0"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#059669]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="py-4 flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0" />
                <div>
                  <div className="text-xs text-slate-500">Location</div>
                  <div className="text-sm font-medium text-[#0F172A]">{PROFILE.location}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-5 text-sm font-semibold">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-700 hover:text-[#2563EB]"
              >
                GitHub
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={PROFILE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-slate-700 hover:text-[#0891B2]"
              >
                LinkedIn
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Inquiry Composer */}
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/35 border border-slate-200 rounded-2xl p-6 md:p-8">
              {submittedData ? (
                <div className="space-y-5 py-4" role="status">
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#059669]">
                    <Check className="w-4 h-4" />
                    <span>Message Prepared</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0F172A]">
                    Thanks for reaching out, {submittedData.name}.
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Your inquiry is ready to send directly to{' '}
                    <span className="font-medium text-[#0F172A]">{PROFILE.email}</span> via your email client, or you can edit and compose another note below.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Open in Email App
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-colors cursor-pointer"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-medium text-[#0F172A] mb-1.5"
                      >
                        Your Name
                      </label>
                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Priya Menon"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#2563EB]"
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="text-xs text-red-600 mt-1.5">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-medium text-[#0F172A] mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="priya@company.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#2563EB]"
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="text-xs text-red-600 mt-1.5">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-[#0F172A] mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Share details about the role, team, or project..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#2563EB] resize-y"
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="text-xs text-red-600 mt-1.5">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <span className="text-xs text-slate-500">
                      Direct email: {PROFILE.email}
                    </span>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
