import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Trophy,
  CheckCircle2,
  XCircle,
  Percent,
  GraduationCap,
} from "lucide-react";
import toast from "react-hot-toast";

import api from "../../services/api";
import {
  departments,
  semesters,
  courses,
} from "../../data/academicData";

interface Result {
  _id: string;

  student: {
    _id: string;
    fullName: string;
    enrollmentNumber: string;
  };

  department: string;
  course: string;
  semester: number;

  obtainedMarks: number;
  totalMarks: number;
  percentage: number;
  sgpa: number;

  status: "Pass" | "Fail";

  publishedDate: string;
}

export default function Results() {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedResult, setSelectedResult] =
    useState<Result | null>(null);

  const fetchResults = async () => {
    try {
      const res = await api.get(
        "/api/admin/results",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(res.data.results);
    } catch (err: any) {
      console.error(err);

      toast.error(
        err.response?.data?.message ??
          "Unable to fetch results."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const filteredResults = useMemo(() => {
    return results.filter((item) => {
      const matchesSearch =
        item.student.fullName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.student.enrollmentNumber
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDepartment =
        departmentFilter === "" ||
        item.department === departmentFilter;

      const matchesCourse =
        courseFilter === "" ||
        item.course === courseFilter;

      const matchesSemester =
        semesterFilter === "" ||
        item.semester === Number(semesterFilter);

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesCourse &&
        matchesSemester
      );
    });
  }, [
    results,
    search,
    departmentFilter,
    courseFilter,
    semesterFilter,
  ]);

  const totalResults = results.length;

  const totalPass = results.filter(
    (r) => r.status === "Pass"
  ).length;

  const totalFail = results.filter(
    (r) => r.status === "Fail"
  ).length;

  const averagePercentage =
    results.length > 0
      ? Number(
          (
            results.reduce(
              (sum, r) => sum + r.percentage,
              0
            ) / results.length
          ).toFixed(2)
        )
      : 0;

  const highestPercentage =
    results.length > 0
      ? Math.max(
          ...results.map(
            (r) => r.percentage
          )
        )
      : 0;

  const handleDelete = async () => {
    if (!selectedResult) return;

    try {
      await api.delete(
        `/api/admin/results/${selectedResult._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults((prev) =>
        prev.filter(
          (item) =>
            item._id !== selectedResult._id
        )
      );

      toast.success(
        "Result deleted successfully."
      );

      setDeleteModal(false);
      setSelectedResult(null);
    } catch (err: any) {
      console.error(err);

      toast.error(
        err.response?.data?.message ??
          "Unable to delete result."
      );
    }
  };

  const getStatusBadge = (
    status: Result["status"]
  ) => {
    if (status === "Pass") {
      return (
        <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
          Pass
        </span>
      );
    }

    return (
      <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm font-medium text-red-400">
        Fail
      </span>
    );
  };

  return (
        <div className="space-y-8 animate-in fade-in duration-500">

      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Result Management
          </h1>

          <p className="mt-2 text-slate-400">
            View, manage and publish student examination results.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/results/create")}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30"
        >
          <Plus size={18} />
          Publish Result
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

        {/* Total Results */}
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Total Results
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {totalResults}
              </h2>
            </div>

            <div className="rounded-xl bg-cyan-500/10 p-4">
              <Trophy
                size={28}
                className="text-cyan-400"
              />
            </div>

          </div>
        </div>

        {/* Pass */}
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Pass
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-400">
                {totalPass}
              </h2>
            </div>

            <div className="rounded-xl bg-green-500/10 p-4">
              <CheckCircle2
                size={28}
                className="text-green-400"
              />
            </div>

          </div>
        </div>

        {/* Fail */}
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Fail
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-400">
                {totalFail}
              </h2>
            </div>

            <div className="rounded-xl bg-red-500/10 p-4">
              <XCircle
                size={28}
                className="text-red-400"
              />
            </div>

          </div>
        </div>

        {/* Average */}
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Average %
              </p>

              <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                {averagePercentage}%
              </h2>
            </div>

            <div className="rounded-xl bg-yellow-500/10 p-4">
              <Percent
                size={28}
                className="text-yellow-400"
              />
            </div>

          </div>
        </div>

        {/* Highest */}
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Highest %
              </p>

              <h2 className="mt-2 text-3xl font-bold text-blue-400">
                {highestPercentage}%
              </h2>
            </div>

            <div className="rounded-xl bg-blue-500/10 p-4">
              <GraduationCap
                size={28}
                className="text-blue-400"
              />
            </div>

          </div>
        </div>

      </div>

      {/* Search & Filters */}
      <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none"
            />

          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
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

          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          >
            <option value="">
              All Courses
            </option>

            {courses.map((course) => (
              <option
                key={course.code}
                value={course.name}
              >
                {course.name}
              </option>
            ))}

          </select>

          <select
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
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
            {/* Results Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/80 shadow-xl backdrop-blur-xl">

        {loading ? (

          <div className="flex h-72 items-center justify-center">

            <Loader2
              size={42}
              className="animate-spin text-cyan-400"
            />

          </div>

        ) : filteredResults.length === 0 ? (

          <div className="flex h-72 flex-col items-center justify-center">

            <Trophy
              size={52}
              className="mb-4 text-slate-600"
            />

            <h3 className="text-xl font-semibold text-white">
              No Results Found
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
                    Department
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Course
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Semester
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Percentage
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    SGPA
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Published
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredResults.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b border-slate-800 transition-all duration-300 hover:bg-slate-800/60"
                  >

                    <td className="px-6 py-5">

                      <div>

                        <p className="font-semibold text-white">
                          {item.student.fullName}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          {item.student.enrollmentNumber}
                        </p>

                      </div>

                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {item.department}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      {item.course}
                    </td>

                    <td className="px-6 py-5 text-slate-300">
                      Semester {item.semester}
                    </td>

                    <td className="px-6 py-5 text-center font-semibold text-cyan-400">
                      {item.percentage}%
                    </td>

                    <td className="px-6 py-5 text-center font-semibold text-yellow-400">
                      {item.sgpa}
                    </td>

                    <td className="px-6 py-5 text-center">
                      {getStatusBadge(item.status)}
                    </td>

                    <td className="px-6 py-5 text-center text-slate-300">
                      {new Date(item.publishedDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">

                     <div className="flex justify-center gap-3">

  <button
    onClick={() =>
      navigate(`/admin/results/view/${item._id}`)
    }
    className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-cyan-500"
  >
    <Eye size={16} />
    View
  </button>

  <button
    onClick={() =>
      navigate(`/admin/results/edit/${item._id}`)
    }
    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-500"
  >
    <Pencil size={16} />
    Edit
  </button>

  <button
    onClick={() => {
      setSelectedResult(item);
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
            {/* Delete Modal */}
      {deleteModal && selectedResult && (
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
              Delete Result
            </h2>

            <p className="mt-3 text-center text-slate-400">
              Are you sure you want to delete this result?
            </p>

            <p className="mt-2 text-center text-sm text-red-400">
              This action cannot be undone.
            </p>

            <div className="mt-8 flex gap-4">

              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedResult(null);
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
