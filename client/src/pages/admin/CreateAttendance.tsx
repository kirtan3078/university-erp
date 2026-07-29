import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Loader2,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

interface Student {
  _id: string;
  fullName: string;
  enrollmentNumber: string;
  department: string;
  course: string;
  semester: number;
}

export default function CreateAttendance() {
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    student: "",
    date: new Date().toISOString().split("T")[0],
    status: "Present",
    remarks: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/admin/students");

      setStudents(res.data.students || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load students.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!formData.student) {
      toast.error("Please select a student.");
      return;
    }

    try {
      setSaving(true);

      const selectedStudent = students.find(
        (s) => s._id === formData.student
      );

      if (!selectedStudent) {
        toast.error("Student not found.");
        return;
      }

      await api.post("/api/admin/attendance", {
        student: formData.student,
        department: selectedStudent.department,
        course: selectedStudent.course,
        semester: selectedStudent.semester,
        date: formData.date,
        status: formData.status,
        remarks: formData.remarks,
      });

      toast.success("Attendance marked successfully.");

      navigate("/admin/attendance");

    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save attendance."
      );
    } finally {
      setSaving(false);
    }
  };
    if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 size={42} className="animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Mark Attendance
          </h1>

          <p className="mt-2 text-slate-400">
            Create a new attendance record.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/attendance")}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl"
      >

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          {/* Student */}
          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Student
            </label>

            <select
              name="student"
              value={formData.student}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              required
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student._id}
                  value={student._id}
                >
                  {student.fullName} ({student.enrollmentNumber})
                </option>
              ))}
            </select>

          </div>

          {/* Date */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Date
            </label>

            <div className="relative">

              <CalendarDays
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white focus:border-cyan-500 focus:outline-none"
                required
              />

            </div>

          </div>

          {/* Status */}
          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="Present">
                Present
              </option>

              <option value="Absent">
                Absent
              </option>

              <option value="Late">
                Late
              </option>

              <option value="Leave">
                Leave
              </option>
            </select>

          </div>

          {/* Remarks */}
          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Remarks (Optional)
            </label>

            <textarea
              rows={4}
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Enter remarks..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
            />

          </div>

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            type="button"
            onClick={() => navigate("/admin/attendance")}
            className="rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 font-medium text-white transition hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Attendance
              </>
            )}
          </button>

        </div>

      </form>

    </div>
  );
}