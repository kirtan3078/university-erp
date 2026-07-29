import { Eye } from "lucide-react";

interface Student {
  _id: string;
  fullName: string;
  enrollmentNumber: string;
  course: string;
  semester: number;
  department: string;
}

interface RecentStudentsProps {
  students: Student[];
}

export default function RecentStudents({
  students,
}: RecentStudentsProps) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">
          Recent Students
        </h2>

        <button className="text-cyan-400 hover:text-cyan-300">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {students.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-6 text-center text-slate-400">
            No students found.
          </div>
        ) : (
          students.map((student) => (
            <div
              key={student._id}
              className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4"
            >
              <div>
                <h3 className="font-semibold text-white">
                  {student.fullName}
                </h3>

                <p className="text-sm text-slate-400">
                  {student.enrollmentNumber || "N/A"}
                </p>

                <p className="text-xs text-slate-500">
                  {student.course || "No Course"} • Semester{" "}
                  {student.semester}
                </p>

                <p className="mt-1 text-xs text-cyan-400">
                  {student.department || "No Department"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                  Active
                </span>

                <button className="rounded-lg bg-cyan-500 p-2 transition hover:bg-cyan-400">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}