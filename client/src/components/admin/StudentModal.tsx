import React from 'react';
import { Trash2 } from 'lucide-react';
import type { Student } from './StudentCard';

export default function StudentModal({
  open,
  student,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  student: Student | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

        <div className="flex justify-center">

          <div className="rounded-full bg-red-500/15 p-4">
            <Trash2 size={36} className="text-red-400" />
          </div>

        </div>

        <h2 className="mt-6 text-center text-2xl font-bold text-white">Delete Student</h2>

        <p className="mt-3 text-center text-slate-400">
          Are you sure you want to delete
          <span className="font-semibold text-white"> {student.fullName}</span>?
        </p>

        <p className="mt-2 text-center text-sm text-red-400">This action cannot be undone.</p>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 font-medium text-slate-300 transition-all duration-300 hover:border-slate-500 hover:bg-slate-700 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-500"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}
