import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMarksSummary,
  computeLetterGrade,
  filterProjects,
  filterSkillGroups,
  generateMarksCsv,
  validateContactForm,
} from './portfolio';
import { PROJECTS, SKILL_GROUPS } from '../data/resume';

test('filterProjects returns all projects or filters by category', () => {
  assert.equal(filterProjects(PROJECTS, 'all').length, 4);

  const fullstack = filterProjects(PROJECTS, 'fullstack');
  assert.equal(fullstack.length, 2);
  assert.ok(fullstack.some((p) => p.id === 'talenthubb'));
  assert.ok(fullstack.some((p) => p.id === 'sprintboard-rest-workspace'));

  const pythonBackend = filterProjects(PROJECTS, 'python-backend');
  assert.equal(pythonBackend.length, 2);
  assert.ok(pythonBackend.some((p) => p.id === 'student-marks-analysis'));
  assert.ok(pythonBackend.some((p) => p.id === 'expense-ledger-api'));
});

test('filterSkillGroups filters cleanly by category', () => {
  assert.equal(filterSkillGroups(SKILL_GROUPS, 'all').length, SKILL_GROUPS.length);
  const backend = filterSkillGroups(SKILL_GROUPS, 'backend');
  assert.equal(backend.length, 1);
  assert.ok(backend[0].items.includes('Node.js'));

  const tools = filterSkillGroups(SKILL_GROUPS, 'tools');
  assert.equal(tools.length, 1);
  assert.ok(tools[0].items.includes('Postman'));
});

test('computeLetterGrade maps percentages to standard grades', () => {
  assert.equal(computeLetterGrade(95), 'A+');
  assert.equal(computeLetterGrade(82), 'A');
  assert.equal(computeLetterGrade(74), 'B+');
  assert.equal(computeLetterGrade(61), 'B');
  assert.equal(computeLetterGrade(53), 'C');
  assert.equal(computeLetterGrade(40), 'D');
  assert.equal(computeLetterGrade(28), 'F');
});

test('calculateMarksSummary computes totals, percentage, and clamps bounds', () => {
  assert.deepEqual(calculateMarksSummary([]), {
    total: 0,
    maxTotal: 0,
    percentage: 0,
    grade: 'N/A',
  });

  const summary = calculateMarksSummary([
    { score: 88, maxScore: 100 },
    { score: 92, maxScore: 100 },
    { score: 75, maxScore: 100 },
  ]);

  assert.equal(summary.total, 255);
  assert.equal(summary.maxTotal, 300);
  assert.equal(summary.percentage, 85);
  assert.equal(summary.grade, 'A');
});

test('generateMarksCsv formats headers and escapes commas/quotes safely', () => {
  const csv = generateMarksCsv([
    {
      id: '1',
      studentName: 'Kumar, Saurav',
      subjects: [{ id: 's1', subject: 'DBMS', score: 90, maxScore: 100 }],
      total: 90,
      maxTotal: 100,
      percentage: 90,
      grade: 'A+',
    },
  ]);

  const lines = csv.split('\n');
  assert.equal(lines.length, 2);
  assert.equal(lines[0], 'Student Name,Subjects Count,Total Score,Max Score,Percentage,Grade');
  assert.equal(lines[1], '"Kumar, Saurav",1,90,100,90%,A+');
});

test('validateContactForm rejects invalid fields and accepts valid input', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: 'not-an-email',
    message: 'Hi',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Hiring Manager',
    email: 'team@company.com',
    message: 'We would love to interview you for our software engineer role.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
