import { useState } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import {
  calculateMarksSummary,
  generateMarksCsv,
  type StudentRecord,
  type SubjectMark,
} from '../utils/portfolio';

const INITIAL_RECORDS: StudentRecord[] = [
  {
    id: 'rec-1',
    studentName: 'Aarav Sharma',
    subjects: [
      { id: 's1', subject: 'Data Structures', score: 88, maxScore: 100 },
      { id: 's2', subject: 'DBMS', score: 91, maxScore: 100 },
      { id: 's3', subject: 'Computer Networks', score: 84, maxScore: 100 },
    ],
    total: 263,
    maxTotal: 300,
    percentage: 87.7,
    grade: 'A',
  },
  {
    id: 'rec-2',
    studentName: 'Priya Nair',
    subjects: [
      { id: 's4', subject: 'Data Structures', score: 94, maxScore: 100 },
      { id: 's5', subject: 'DBMS', score: 96, maxScore: 100 },
      { id: 's6', subject: 'Computer Networks', score: 89, maxScore: 100 },
    ],
    total: 279,
    maxTotal: 300,
    percentage: 93,
    grade: 'A+',
  },
];

export function MarksDemoWidget() {
  const [records, setRecords] = useState<StudentRecord[]>(INITIAL_RECORDS);
  const [studentName, setStudentName] = useState('');
  const [subjects, setSubjects] = useState<SubjectMark[]>([
    { id: 'draft-1', subject: 'JavaScript & Web', score: 85, maxScore: 100 },
    { id: 'draft-2', subject: 'Database Systems', score: 90, maxScore: 100 },
  ]);
  const [formError, setFormError] = useState('');
  const [exportMessage, setExportMessage] = useState('');

  const liveSummary = calculateMarksSummary(subjects);

  const handleAddSubject = () => {
    setSubjects((prev) => [
      ...prev,
      {
        id: `draft-${Date.now()}`,
        subject: `Subject ${prev.length + 1}`,
        score: 75,
        maxScore: 100,
      },
    ]);
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubjectChange = (
    id: string,
    field: 'subject' | 'score' | 'maxScore',
    value: string
  ) => {
    setSubjects((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (field === 'subject') {
          return { ...item, subject: value };
        }
        const parsed = Number(value);
        return {
          ...item,
          [field]: Number.isFinite(parsed) ? parsed : 0,
        };
      })
    );
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    setExportMessage('');

    if (studentName.trim().length < 2) {
      setFormError('Enter a student name (at least 2 characters) to save a record.');
      return;
    }
    if (subjects.length === 0) {
      setFormError('Add at least one subject before saving.');
      return;
    }

    setFormError('');
    const summary = calculateMarksSummary(subjects);
    const newRecord: StudentRecord = {
      id: `rec-${Date.now()}`,
      studentName: studentName.trim(),
      subjects: subjects.map((s) => ({ ...s })),
      ...summary,
    };

    setRecords((prev) => [newRecord, ...prev]);
    setStudentName('');
  };

  const handleDeleteRecord = (id: string) => {
    setExportMessage('');
    setRecords((prev) => prev.filter((rec) => rec.id !== id));
  };

  const handleExportCsv = () => {
    if (records.length === 0) {
      setExportMessage('Add at least one student record before exporting.');
      return;
    }
    const csv = generateMarksCsv(records);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'student_marks_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setExportMessage(`Exported ${records.length} record${records.length === 1 ? '' : 's'} to CSV.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-200">
        <div>
          <h4 className="text-sm font-semibold text-[#111827]">
            Interactive Web Simulation
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time grade calculation for any number of subjects with CSV export.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCsv}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#111827] bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>

      {exportMessage && (
        <p role="status" className="text-xs font-medium text-[#2563EB]">
          {exportMessage}
        </p>
      )}

      {/* Entry Form */}
      <form onSubmit={handleAddRecord} className="space-y-4 bg-[#FAFAFA] border border-gray-200 rounded-xl p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div>
            <label
              htmlFor="marks-student-name"
              className="block text-xs font-semibold text-gray-700 mb-1.5"
            >
              Student Name
            </label>
            <input
              id="marks-student-name"
              type="text"
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                if (formError) setFormError('');
              }}
              placeholder="e.g. Rohan Verma"
              className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#2563EB]"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 py-2 px-3 bg-white border border-gray-200 rounded-lg">
            <div className="text-xs text-gray-500">Live Preview</div>
            <div className="font-mono text-sm font-semibold text-[#111827] tabular-nums">
              {liveSummary.total}/{liveSummary.maxTotal} · {liveSummary.percentage}% · Grade{' '}
              <span className="text-[#2563EB]">{liveSummary.grade}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Subjects */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700">
              Subjects ({subjects.length})
            </span>
            <button
              type="button"
              onClick={handleAddSubject}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Subject
            </button>
          </div>

          <div className="grid grid-cols-12 gap-2 text-[11px] font-medium text-gray-500 px-0.5">
            <div className="col-span-6">Subject Name</div>
            <div className="col-span-3">Obtained</div>
            <div className="col-span-2">Max</div>
            <div className="col-span-1" />
          </div>

          <div className="space-y-2">
            {subjects.map((sub, idx) => (
              <div key={sub.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-6">
                  <label className="sr-only" htmlFor={`sub-name-${sub.id}`}>
                    Subject {idx + 1} name
                  </label>
                  <input
                    id={`sub-name-${sub.id}`}
                    type="text"
                    value={sub.subject}
                    onChange={(e) => handleSubjectChange(sub.id, 'subject', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div className="col-span-3">
                  <label className="sr-only" htmlFor={`sub-score-${sub.id}`}>
                    Subject {idx + 1} marks obtained
                  </label>
                  <input
                    id={`sub-score-${sub.id}`}
                    type="number"
                    min={0}
                    max={sub.maxScore}
                    value={sub.score}
                    onChange={(e) => handleSubjectChange(sub.id, 'score', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono tabular-nums bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div className="col-span-2">
                  <label className="sr-only" htmlFor={`sub-max-${sub.id}`}>
                    Subject {idx + 1} max marks
                  </label>
                  <input
                    id={`sub-max-${sub.id}`}
                    type="number"
                    min={1}
                    value={sub.maxScore}
                    onChange={(e) => handleSubjectChange(sub.id, 'maxScore', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs font-mono tabular-nums bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleRemoveSubject(sub.id)}
                    aria-label={`Remove ${sub.subject}`}
                    disabled={subjects.length <= 1}
                    className="p-1.5 text-gray-400 hover:text-red-600 disabled:opacity-30 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {formError && (
          <p role="alert" className="text-xs font-medium text-red-600">
            {formError}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors cursor-pointer"
          >
            Add Student Record
          </button>
        </div>
      </form>

      {/* Saved Records Table */}
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-700">
            Stored Records ({records.length})
          </span>
        </div>

        {records.length === 0 ? (
          <div className="p-6 text-center text-xs text-gray-500">
            No student records yet. Add one above to see real-time grading.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-200 text-gray-500">
                <tr>
                  <th className="py-2.5 px-4 font-medium">Student</th>
                  <th className="py-2.5 px-3 font-medium text-right">Subjects</th>
                  <th className="py-2.5 px-3 font-medium text-right">Total</th>
                  <th className="py-2.5 px-3 font-medium text-right">Percent</th>
                  <th className="py-2.5 px-3 font-medium text-right">Grade</th>
                  <th className="py-2.5 px-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {records.map((rec) => (
                  <tr key={rec.id} className="hover:bg-gray-50/60">
                    <td className="py-2.5 px-4 font-medium text-[#111827]">
                      {rec.studentName}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-gray-600">
                      {rec.subjects.length}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-gray-700">
                      {rec.total}/{rec.maxTotal}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums text-gray-700">
                      {rec.percentage}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-[#2563EB]">
                      {rec.grade}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDeleteRecord(rec.id)}
                        aria-label={`Delete record for ${rec.studentName}`}
                        className="text-xs font-medium text-gray-500 hover:text-red-600 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
