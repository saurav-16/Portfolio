import type { AccentTone } from '../data/resume';

export interface ToneStyles {
  bar: string;
  text: string;
  softBg: string;
  borderHover: string;
  dot: string;
  button: string;
}

export const ACCENT_TONES: Record<AccentTone, ToneStyles> = {
  cobalt: {
    bar: 'from-[#2563EB] to-[#3B82F6]',
    text: 'text-[#1D4ED8]',
    softBg: 'bg-[#2563EB]/8 hover:bg-[#2563EB]/14 text-[#1D4ED8]',
    borderHover: 'hover:border-[#2563EB]/40',
    dot: 'bg-[#2563EB]',
    button: 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white',
  },
  emerald: {
    bar: 'from-[#059669] to-[#10B981]',
    text: 'text-[#047857]',
    softBg: 'bg-[#059669]/10 hover:bg-[#059669]/16 text-[#047857]',
    borderHover: 'hover:border-[#059669]/40',
    dot: 'bg-[#059669]',
    button: 'bg-[#059669] hover:bg-[#047857] text-white',
  },
  amber: {
    bar: 'from-[#D97706] to-[#F59E0B]',
    text: 'text-[#B45309]',
    softBg: 'bg-[#D97706]/10 hover:bg-[#D97706]/16 text-[#B45309]',
    borderHover: 'hover:border-[#D97706]/40',
    dot: 'bg-[#D97706]',
    button: 'bg-[#D97706] hover:bg-[#B45309] text-white',
  },
  cyan: {
    bar: 'from-[#0891B2] to-[#06B6D4]',
    text: 'text-[#0E7490]',
    softBg: 'bg-[#0891B2]/10 hover:bg-[#0891B2]/16 text-[#0E7490]',
    borderHover: 'hover:border-[#0891B2]/40',
    dot: 'bg-[#0891B2]',
    button: 'bg-[#0891B2] hover:bg-[#0E7490] text-white',
  },
  indigo: {
    bar: 'from-[#4F46E5] to-[#6366F1]',
    text: 'text-[#4338CA]',
    softBg: 'bg-[#4F46E5]/10 hover:bg-[#4F46E5]/16 text-[#4338CA]',
    borderHover: 'hover:border-[#4F46E5]/40',
    dot: 'bg-[#4F46E5]',
    button: 'bg-[#4F46E5] hover:bg-[#4338CA] text-white',
  },
  rose: {
    bar: 'from-[#E11D48] to-[#F43F5E]',
    text: 'text-[#BE123C]',
    softBg: 'bg-[#E11D48]/10 hover:bg-[#E11D48]/16 text-[#BE123C]',
    borderHover: 'hover:border-[#E11D48]/40',
    dot: 'bg-[#E11D48]',
    button: 'bg-[#E11D48] hover:bg-[#BE123C] text-white',
  },
};
