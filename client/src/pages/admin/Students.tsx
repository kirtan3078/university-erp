import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

interface Student {
  _id: string;
  fullName: string;
  enrollmentNumber: string;
  email: string;
  department: string;
  course: string;
  semester: number;
  mobileNumber: string;
  isActivated: boolean;
}

export default function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("authToken");

  const fetchStudents = async () => {
    try {
      const res = await api.get("/api/admin/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data.students);
    } catch (err) {
      console.error(err);
      alert("Unable to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const deleteStudent = async (id: string) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await api.delete(`/api/admin/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (err) {
      console.error(err);
      alert("Unable to delete student.");
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(search.toLowerCase()) ||
      student.enrollmentNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Student Management
          </h1>

          <p className="mt-2 text-slate-400">
            View, search and manage all students.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/students/create")}
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-400"
        >
          + Add Student
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by Name or Enrollment Number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none"
      />

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        {loading ? (
          <div className="p-10 text-center text-slate-300">
            Loading students...
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-800 text-slate-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">
                  Enrollment
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Department
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Semester
                </th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-slate-400"
                  >
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr
                    key={student._id}
                    className="border-t border-slate-800 text-slate-200 transition hover:bg-slate-800"
                  >
                    <td className="px-6 py-4 font-medium">
                      {student.fullName}
                    </td>

                    <td className="px-6 py-4">
                      {student.enrollmentNumber}
                    </td>

                    <td className="px-6 py-4">
                      {student.department}
                    </td>

                    <td className="px-6 py-4">
                      Semester {student.semester}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          student.isActivated
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {student.isActivated ? "Active" : "Pending"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteStudent(student._id)}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}