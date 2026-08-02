import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Save,
  IndianRupee,
  BookOpen,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

import {
  departments,
  semesters,
} from "../../data/academicData";

export default function CreateFeeTemplate() {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const [loading, setLoading] = useState(false);

  // =====================================
  // Template Information
  // =====================================

    const [course, setCourse] =
    useState("");

  const [templateName, setTemplateName] =
    useState("");

 const department = useMemo(() => {
  const dept = departments.find((d) =>
    d.courses.some((c) => c.name === course)
  );

  return dept?.name ?? "";
}, [course]);



  const [semester, setSemester] =
    useState(1);

  const [academicYear, setAcademicYear] =
    useState("2026-27");

  const [description, setDescription] =
    useState("");

  // =====================================
  // Fee Breakdown
  // =====================================

  const [tuitionFee, setTuitionFee] =
    useState(0);

  const [examFee, setExamFee] =
    useState(0);

  const [libraryFee, setLibraryFee] =
    useState(0);

  const [developmentFee, setDevelopmentFee] =
    useState(0);

  const [sportsFee, setSportsFee] =
    useState(0);

  const [hostelFee, setHostelFee] =
    useState(0);

  const [transportFee, setTransportFee] =
    useState(0);

  const [otherFee, setOtherFee] =
    useState(0);

  // =====================================
  // Calculate Total
  // =====================================

  const totalFee = useMemo(() => {
    return (
      Number(tuitionFee) +
      Number(examFee) +
      Number(libraryFee) +
      Number(developmentFee) +
      Number(sportsFee) +
      Number(hostelFee) +
      Number(transportFee) +
      Number(otherFee)
    );
  }, [
    tuitionFee,
    examFee,
    libraryFee,
    developmentFee,
    sportsFee,
    hostelFee,
    transportFee,
    otherFee,
  ]);

  // =====================================
  // Create Template
  // =====================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !templateName ||
      !department ||
      !course
    ) {
      toast.error(
        "Please fill all required fields."
      );
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "/api/admin/fee-templates",
        {
          templateName,
          department,
          course,
          semester,
          academicYear,

          tuitionFee,
          examFee,
          libraryFee,
          developmentFee,
          sportsFee,
          hostelFee,
          transportFee,
          otherFee,

          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Fee Template Created Successfully"
      );

      navigate("/admin/fee-templates");

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ??
          "Unable to create template."
      );

    } finally {

      setLoading(false);

    }
  };
    return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-7xl space-y-8 animate-in fade-in duration-500"
    >
      {/* ===================================== */}
      {/* Header */}
      {/* ===================================== */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Create Fee Template
          </h1>

          <p className="mt-2 text-slate-400">
            Create reusable fee structures for your university.
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/admin/fee-templates")
          }
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700"
        >
          <ArrowLeft size={18} />

          Back
        </button>

      </div>

      {/* ===================================== */}
      {/* Template Information */}
      {/* ===================================== */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

        <div className="border-b border-slate-700 px-8 py-6">

          <h2 className="flex items-center gap-3 text-2xl font-bold text-white">

            <BookOpen className="text-cyan-400" />

            Template Information

          </h2>

          <p className="mt-2 text-slate-400">
            Basic information about this fee template.
          </p>

        </div>

        <div className="grid gap-6 p-8 md:grid-cols-2">

          {/* Template Name */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Template Name
            </label>

            <input
              type="text"
              value={templateName}
              onChange={(e) =>
                setTemplateName(e.target.value)
              }
              placeholder="e.g. B.Sc IT Semester 5 Regular"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* Academic Year */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Academic Year
            </label>

            <input
              type="text"
              value={academicYear}
              onChange={(e) =>
                setAcademicYear(e.target.value)
              }
              placeholder="2026-27"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />

          </div>

          {/* Department */}

          {/* Department */}

<div>

<label className="mb-2 block text-sm font-medium text-slate-300">
Department
</label>

<div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white">

{department || "Select Course First"}

</div>

</div>

          {/* Course */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Course
            </label>

            <select
              value={course}
              onChange={(e) =>
                setCourse(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-cyan-500"
            >

              <option value="">
                Select Course
              </option>

        {departments.flatMap((department) =>
  department.courses.map((course) => (
    <option
      key={course.code}
      value={course.name}
    >
      {course.name}
    </option>
  ))
)}
            </select>

          </div>

          {/* Semester */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Semester
            </label>

            <select
              value={semester}
              onChange={(e) =>
                setSemester(Number(e.target.value))
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            >

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

          {/* Description */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Optional description..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />

          </div>

        </div>

      </div>
            {/* ===================================== */}
      {/* Fee Breakdown */}
      {/* ===================================== */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

        <div className="border-b border-slate-700 px-8 py-6">

          <h2 className="flex items-center gap-3 text-2xl font-bold text-white">

            <IndianRupee className="text-green-400" />

            Fee Breakdown

          </h2>

          <p className="mt-2 text-slate-400">
            Configure all fee heads for this template.
          </p>

        </div>

        <div className="grid gap-6 p-8 md:grid-cols-2">

          {/* Tuition Fee */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Tuition Fee
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800">
              <span className="px-4 text-green-400">₹</span>

              <input
                type="number"
                min={0}
                value={tuitionFee}
                onChange={(e) =>
                  setTuitionFee(Number(e.target.value))
                }
                placeholder="0"
                className="w-full bg-transparent py-3 pr-4 text-white outline-none"
              />
            </div>
          </div>

          {/* Exam Fee */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Exam Fee
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800">
              <span className="px-4 text-green-400">₹</span>

              <input
                type="number"
                min={0}
                value={examFee}
                onChange={(e) =>
                  setExamFee(Number(e.target.value))
                }
                placeholder="0"
                className="w-full bg-transparent py-3 pr-4 text-white outline-none"
              />
            </div>
          </div>

          {/* Library Fee */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Library Fee
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800">
              <span className="px-4 text-green-400">₹</span>

              <input
                type="number"
                min={0}
                value={libraryFee}
                onChange={(e) =>
                  setLibraryFee(Number(e.target.value))
                }
                placeholder="0"
                className="w-full bg-transparent py-3 pr-4 text-white outline-none"
              />
            </div>
          </div>

          {/* Development Fee */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Development Fee
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800">
              <span className="px-4 text-green-400">₹</span>

              <input
                type="number"
                min={0}
                value={developmentFee}
                onChange={(e) =>
                  setDevelopmentFee(Number(e.target.value))
                }
                placeholder="0"
                className="w-full bg-transparent py-3 pr-4 text-white outline-none"
              />
            </div>
          </div>

          {/* Sports Fee */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Sports Fee
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800">
              <span className="px-4 text-green-400">₹</span>

              <input
                type="number"
                min={0}
                value={sportsFee}
                onChange={(e) =>
                  setSportsFee(Number(e.target.value))
                }
                placeholder="0"
                className="w-full bg-transparent py-3 pr-4 text-white outline-none"
              />
            </div>
          </div>

          {/* Hostel Fee */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Hostel Fee
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800">
              <span className="px-4 text-green-400">₹</span>

              <input
                type="number"
                min={0}
                value={hostelFee}
                onChange={(e) =>
                  setHostelFee(Number(e.target.value))
                }
                placeholder="0"
                className="w-full bg-transparent py-3 pr-4 text-white outline-none"
              />
            </div>
          </div>

          {/* Transport Fee */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Transport Fee
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800">
              <span className="px-4 text-green-400">₹</span>

              <input
                type="number"
                min={0}
                value={transportFee}
                onChange={(e) =>
                  setTransportFee(Number(e.target.value))
                }
                placeholder="0"
                className="w-full bg-transparent py-3 pr-4 text-white outline-none"
              />
            </div>
          </div>

          {/* Other Fee */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Other Fee
            </label>

            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800">
              <span className="px-4 text-green-400">₹</span>

              <input
                type="number"
                min={0}
                value={otherFee}
                onChange={(e) =>
                  setOtherFee(Number(e.target.value))
                }
                placeholder="0"
                className="w-full bg-transparent py-3 pr-4 text-white outline-none"
              />
            </div>
          </div>

        </div>

      </div>
            {/* ===================================== */}
      {/* Template Summary */}
      {/* ===================================== */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

        <div className="border-b border-slate-700 px-8 py-6">

          <h2 className="flex items-center gap-3 text-2xl font-bold text-white">

            <FileText className="text-cyan-400" />

            Template Summary

          </h2>

          <p className="mt-2 text-slate-400">
            Review the template before creating it.
          </p>

        </div>

        <div className="grid gap-6 p-8 md:grid-cols-5">

          {/* Total Fee */}

          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Total Fee
            </p>

            <h2 className="mt-3 text-3xl font-bold text-cyan-400">
              ₹{totalFee.toLocaleString()}
            </h2>

          </div>

          {/* Department */}

          <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Department
            </p>

            <h2 className="mt-3 text-lg font-bold text-indigo-400">
              {department || "--"}
            </h2>

          </div>

          {/* Course */}

          <div className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Course
            </p>

            <h2 className="mt-3 text-lg font-bold text-green-400">
              {course || "--"}
            </h2>

          </div>

          {/* Semester */}

          <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Semester
            </p>

            <h2 className="mt-3 text-3xl font-bold text-yellow-400">
              {semester}
            </h2>

          </div>

          {/* Academic Year */}

          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Academic Year
            </p>

            <h2 className="mt-3 text-lg font-bold text-purple-400">
              {academicYear}
            </h2>

          </div>

        </div>

      </div>

      {/* ===================================== */}
      {/* Action Buttons */}
      {/* ===================================== */}

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={() => navigate("/admin/fee-templates")}
          className="rounded-xl border border-slate-700 bg-slate-800 px-8 py-4 font-semibold text-white transition hover:bg-slate-700"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {loading ? (
            <Loader2
              size={20}
              className="animate-spin"
            />
          ) : (
            <Save size={20} />
          )}

          {loading
            ? "Creating..."
            : "Create Fee Template"}

        </button>

      </div>

    </form>
  );
}