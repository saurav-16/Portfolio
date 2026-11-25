import type {
  ProjectCategory,
  ProjectItem,
  SkillCategory,
  SkillGroup,
} from '../data/resume';

export interface SubjectMark {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
}

export interface StudentRecord {
  id: string;
  studentName: string;
  subjects: SubjectMark[];
  total: number;
  maxTotal: number;
  percentage: number;
  grade: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
}

export interface ContactValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function filterProjects(
  projects: ProjectItem[],
  category: ProjectCategory
): ProjectItem[] {
  if (category === 'all') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
}

export function filterSkillGroups(
  groups: SkillGroup[],
  category: SkillCategory
): SkillGroup[] {
  if (category === 'all') {
    return groups;
  }
  return groups.filter((group) => group.id === category);
}

export function computeLetterGrade(percentage: number): string {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
}

export function calculateMarksSummary(
  subjects: Pick<SubjectMark, 'score' | 'maxScore'>[]
): {
  total: number;
  maxTotal: number;
  percentage: number;
  grade: string;
} {
  if (subjects.length === 0) {
    return { total: 0, maxTotal: 0, percentage: 0, grade: 'N/A' };
  }

  let total = 0;
  let maxTotal = 0;

  for (const sub of subjects) {
    const safeMax = Number.isFinite(sub.maxScore) && sub.maxScore > 0 ? sub.maxScore : 100;
    const safeScore = Number.isFinite(sub.score)
      ? Math.min(Math.max(sub.score, 0), safeMax)
      : 0;
    total += safeScore;
    maxTotal += safeMax;
  }

  const percentage = maxTotal > 0 ? Math.round((total / maxTotal) * 1000) / 10 : 0;
  const grade = computeLetterGrade(percentage);

  return {
    total: Math.round(total * 10) / 10,
    maxTotal: Math.round(maxTotal * 10) / 10,
    percentage,
    grade,
  };
}

function escapeCsvCell(value: string | number): string {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function generateMarksCsv(records: StudentRecord[]): string {
  const header = ['Student Name', 'Subjects Count', 'Total Score', 'Max Score', 'Percentage', 'Grade'];
  const rows = records.map((record) => [
    escapeCsvCell(record.studentName),
    escapeCsvCell(record.subjects.length),
    escapeCsvCell(record.total),
    escapeCsvCell(record.maxTotal),
    escapeCsvCell(`${record.percentage}%`),
    escapeCsvCell(record.grade),
  ]);

  return [header.join(','), ...rows.map((row) => row.join(','))].join('\n');
}

export function validateContactForm(input: ContactFormInput): {
  valid: boolean;
  errors: ContactValidationErrors;
} {
  const errors: ContactValidationErrors = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (trimmedMessage.length < 10) {
    errors.message = 'Please write a short message (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
