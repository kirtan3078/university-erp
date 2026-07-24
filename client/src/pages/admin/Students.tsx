import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/api";
import { departments, semesters } from "../../data/academicData";

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

  const token = localStorage.getItem("authToken");

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedStudent, setSelectedStudent] =
    useState<Student | null>(null);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/api/admin/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(res.data.students);
    } catch (err: any) {
      console.error(err);

      toast.error(
        err.response?.data?.message ??
          "Unable to fetch students."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.fullName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.enrollmentNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        student.email
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "" ||
        student.department === departmentFilter;

      const matchesSemester =
        semesterFilter === "" ||
        student.semester === Number(semesterFilter);

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesSemester
      );
    });
  }, [
    students,
    search,
    departmentFilter,
    semesterFilter,
  ]);

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.isActivated
  ).length;

  const pendingStudents = students.filter(
    (student) => !student.isActivated
  ).length;

  const handleDelete = async () => {
    if (!selectedStudent) return;

    try {
      await api.delete(
        `/api/admin/students/${selectedStudent._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents((prev) =>
        prev.filter(
          (student) =>
            student._id !== selectedStudent._id
        )
      );

      toast.success("Student deleted successfully.");

      setDeleteModal(false);
      setSelectedStudent(null);
    } catch (err: any) {
      console.error(err);

      toast.error(
        err.response?.data?.message ??
          "Unable to delete student."
      );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Student Management
          </h1>

          <p className="mt-2 text-slate-400">
            View, search and manage all registered students.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/students/create")}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30"
        >
          <Plus size={18} />
          Add Student
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Total Students
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {totalStudents}
              </h2>
            </div>

            <div className="rounded-xl bg-cyan-500/10 p-4">
              <Users
                size={28}
                className="text-cyan-400"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Active Students
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {activeStudents}
              </h2>
            </div>

            <div className="rounded-xl bg-green-500/10 p-4">
              <UserCheck
                size={28}
                className="text-green-400"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Pending Students
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {pendingStudents}
              </h2>
            </div>

            <div className="rounded-xl bg-yellow-500/10 p-4">
              <UserX
                size={28}
                className="text-yellow-400"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Search & Filters */}
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">

          {/* Search */}
          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search by name, enrollment or email..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            />

          </div>

          {/* Department Filter */}
          <select
            value={departmentFilter}
            onChange={(e) =>
              setDepartmentFilter(e.target.value)
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          >
            <option value="">
              All Departments
            </option>

            {departments.map((department) => (
              <option
                key={department.code}
                value={department.name}
              >
                {department.code} - {department.name}
              </option>
            ))}
          </select>

          {/* Semester Filter */}
          <select
            value={semesterFilter}
            onChange={(e) =>
              setSemesterFilter(e.target.value)
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition-all duration-300 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          >
            <option value="">
              All Semesters
            </option>

            {semesters.map((semester) => (
              <option
                key={semester.value}
                value={semester.value}
              >
                {semester.label}
              </option>
            ))}
          </select>

        </div>

      </div>
            {/* Students Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/80 shadow-xl backdrop-blur-xl">

        {loading ? (

          <div className="flex h-72 items-center justify-center">

            <Loader2
              size={42}
              className="animate-spin text-cyan-400"
            />

          </div>

        ) : filteredStudents.length === 0 ? (

          <div className="flex h-72 flex-col items-center justify-center">

            <Users
              size={52}
              className="mb-4 text-slate-600"
            />

            <h3 className="text-xl font-semibold text-white">
              No Students Found
            </h3>

            <p className="mt-2 text-slate-400">
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="border-b border-slate-700 bg-slate-800/80">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Student
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Enrollment
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Department
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Course
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Semester
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredStudents.map((student) => (

                  <tr
                    key={student._id}
                    className="border-b border-slate-800 transition-all duration-300 hover:bg-slate-800/60"
                  >

                    <td className="px-6 py-5">

                      <div>

                        <p className="font-semibold text-white">
                          {student.fullName}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          {student.email}
                        </p>

                      </div>

                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {student.enrollmentNumber}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {student.department}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {student.course}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      Semester {student.semester}
                    </td>

                    <td className="px-6 py-5 text-center">

                      {student.isActivated ? (

                        <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
                          Active
                        </span>

                      ) : (

                        <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-sm font-medium text-yellow-400">
                          Pending
                        </span>

                      )}

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            navigate(
                              `/admin/students/edit/${student._id}`
                            )
                          }
                          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-500"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setDeleteModal(true);
                          }}
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

        )}

      </div>
            {/* Delete Confirmation Modal */}
      {deleteModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

            <div className="flex justify-center">

              <div className="rounded-full bg-red-500/15 p-4">
                <Trash2
                  size={36}
                  className="text-red-400"
                />
              </div>

            </div>

            <h2 className="mt-6 text-center text-2xl font-bold text-white">
              Delete Student
            </h2>

            <p className="mt-3 text-center text-slate-400">
              Are you sure you want to delete
              <span className="font-semibold text-white">
                {" "}
                {selectedStudent.fullName}
              </span>
              ?
            </p>

            <p className="mt-2 text-center text-sm text-red-400">
              This action cannot be undone.
            </p>

            <div className="mt-8 flex gap-4">

              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedStudent(null);
                }}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 font-medium text-slate-300 transition-all duration-300 hover:border-slate-500 hover:bg-slate-700 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-500"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}