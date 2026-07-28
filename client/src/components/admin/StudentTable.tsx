import React from 'react';
import { Loader2, Users, Pencil, Trash2, UserCheck, UserX } from 'lucide-react';
import StudentCard, { Student } from './StudentCard';

export default function StudentTable({
  loading,
  students,
  onEdit,
  onRequestDelete,
}: {
  loading: boolean;
  students: Student[];
  onEdit: (id: string) => void;
  onRequestDelete: (student: Student) => void;
}) {
  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center">
        <Loader2 size={42} className="animate-spin text-cyan-400" />
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="flex h-72 flex-col items-center justify-center">
        <Users size={52} className="mb-4 text-slate-600" />
        <h3 className="text-xl font-semibold text-white">No Students Found</h3>
        <p className="mt-2 text-slate-400">Try changing your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="border-b border-slate-700 bg-slate-800/80">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">Student</th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">Enrollment</th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">Department</th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">Course</th>
            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">Semester</th>
            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">Status</th>
            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="border-b border-slate-800 transition-all duration-300 hover:bg-slate-800/60">
              <td className="px-6 py-5">
                <StudentCard student={student} />
              </td>

              <td className="px-6 py-5 text-slate-300">{student.enrollmentNumber}</td>

              <td className="px-6 py-5 text-slate-300">{student.department}</td>

              <td className="px-6 py-5 text-slate-300">{student.course}</td>

              <td className="px-6 py-5 text-slate-300">Semester {student.semester}</td>

              <td className="px-6 py-5 text-center">
                {student.isActivated ? (
                  <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">Active</span>
                ) : (
                  <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-sm font-medium text-yellow-400">Pending</span>
                )}
              </td>

              <td className="px-6 py-5">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(student._id)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-500"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => onRequestDelete(student)}
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-red-500"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
