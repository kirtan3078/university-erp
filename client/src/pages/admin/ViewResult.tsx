import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Pencil,
  Printer,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

interface Subject {
  subjectName: string;
  totalMarks: number;
  marksObtained: number;
  grade: string;
}

interface PublishedBy {
  fullName: string;
  role: string;
}

interface Result {
  _id: string;
  studentName: string;
  enrollmentNumber: string;
  department: string;
  course: string;
  semester: number;
  subjects: Subject[];
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  sgpa: number;
  status: string;
  publishedDate: string;
  publishedBy?: PublishedBy;
}

export default function ViewResult() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    fetchResult();
  }, []);

  const fetchResult = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/api/admin/results/${id}`);

      setResult(res.data.result);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load result.");

      navigate("/admin/results");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2
          size={42}
          className="animate-spin text-cyan-400"
        />
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 animate-in fade-in duration-500">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Result Details
          </h1>

          <p className="mt-2 text-slate-400">
            View published student result.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => navigate("/admin/results")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={() =>
              navigate(`/admin/results/edit/${id}`)
            }
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-400"
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-500"
          >
            <Printer size={18} />
            Print
          </button>

        </div>

      </div>
            {/* Student Information */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

        <h2 className="mb-6 text-2xl font-semibold text-white">
          Student Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

          <div>
            <p className="text-sm text-slate-400">
              Student Name
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              {result.studentName}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Enrollment Number
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              {result.enrollmentNumber}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Department
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              {result.department}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Course
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              {result.course}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Semester
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              Semester {result.semester}
            </h3>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              Status
            </p>

            <span
              className={`mt-2 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                result.status === "Pass"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {result.status}
            </span>
          </div>

        </div>

      </div>

      {/* Subject Marks */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-semibold text-white">
            Subject Marks
          </h2>

          <div className="rounded-lg bg-cyan-500/10 px-4 py-2 text-cyan-400 font-semibold">
            {result.subjects.length} Subjects
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead>

              <tr className="border-b border-slate-700 text-left text-slate-300">

                <th className="px-4 py-3">
                  Subject
                </th>

                <th className="px-4 py-3 text-center">
                  Total Marks
                </th>

                <th className="px-4 py-3 text-center">
                  Obtained Marks
                </th>

                <th className="px-4 py-3 text-center">
                  Percentage
                </th>

                <th className="px-4 py-3 text-center">
                  Grade
                </th>

              </tr>

            </thead>

            <tbody>

              {result.subjects.map((subject, index) => {

                const subjectPercentage = (
                  (subject.marksObtained /
                    subject.totalMarks) *
                  100
                ).toFixed(2);

                return (

                  <tr
                    key={index}
                    className="border-b border-slate-800 hover:bg-slate-800/40"
                  >

                    <td className="px-4 py-4 font-medium text-white">
                      {subject.subjectName}
                    </td>

                    <td className="px-4 py-4 text-center text-slate-300">
                      {subject.totalMarks}
                    </td>

                    <td className="px-4 py-4 text-center text-slate-300">
                      {subject.marksObtained}
                    </td>

                    <td className="px-4 py-4 text-center text-cyan-400 font-semibold">
                      {subjectPercentage}%
                    </td>

                    <td className="px-4 py-4 text-center">

                      {subject.grade ? (

                        <span className="rounded-lg bg-indigo-500/20 px-3 py-1 text-indigo-400 font-semibold">
                          {subject.grade}
                        </span>

                      ) : (

                        <span className="text-slate-500">
                          --
                        </span>

                      )}

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      </div>
            {/* Result Summary */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

        <h2 className="mb-6 text-2xl font-semibold text-white">
          Result Summary
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">

          <div className="rounded-xl bg-slate-800 p-5">

            <p className="text-sm text-slate-400">
              Total Marks
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              {result.totalMarks}
            </h3>

          </div>

          <div className="rounded-xl bg-slate-800 p-5">

            <p className="text-sm text-slate-400">
              Obtained Marks
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
              {result.obtainedMarks}
            </h3>

          </div>

          <div className="rounded-xl bg-slate-800 p-5">

            <p className="text-sm text-slate-400">
              Percentage
            </p>

            <h3 className="mt-2 text-3xl font-bold text-cyan-400">
              {result.percentage}%
            </h3>

          </div>

          <div className="rounded-xl bg-slate-800 p-5">

            <p className="text-sm text-slate-400">
              SGPA
            </p>

            <h3 className="mt-2 text-3xl font-bold text-yellow-400">
              {result.sgpa}
            </h3>

          </div>

          <div className="rounded-xl bg-slate-800 p-5">

            <p className="text-sm text-slate-400">
              Final Status
            </p>

            <h3
              className={`mt-2 text-3xl font-bold ${
                result.status === "Pass"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {result.status}
            </h3>

          </div>

        </div>

      </div>

      {/* Publication Information */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

        <h2 className="mb-6 text-2xl font-semibold text-white">
          Publication Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>

            <p className="text-sm text-slate-400">
              Published By
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              {result.publishedBy?.fullName || "N/A"}
            </h3>

            <p className="text-sm text-slate-500">
              {result.publishedBy?.role || ""}
            </p>

          </div>

          <div>

            <p className="text-sm text-slate-400">
              Published Date
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              {new Date(result.publishedDate).toLocaleDateString()}
            </h3>

            <p className="text-sm text-slate-500">
              {new Date(result.publishedDate).toLocaleTimeString()}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}