import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Save,
  IndianRupee,
  BookOpen,
  Building2,
  GraduationCap,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function EditFeeTemplate() {
  const navigate = useNavigate();

  const { id } = useParams();

  const token = localStorage.getItem("authToken");

  const [loading, setLoading] = useState(true);

  // ===========================
  // Template Details
  // ===========================

  const [templateName, setTemplateName] = useState("");

  const [department, setDepartment] = useState("");

  const [course, setCourse] = useState("");

  const [semester, setSemester] = useState(1);

  const [academicYear, setAcademicYear] =
    useState("2026-27");

  const [description, setDescription] =
    useState("");

  const [isActive, setIsActive] =
    useState(true);

  // ===========================
  // Fee Breakdown
  // ===========================

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

  // ===========================
  // Total
  // ===========================

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

  // ===========================
  // Fetch Template
  // ===========================

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {

    try {

      const res = await api.get(
        `/api/admin/fee-templates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const t = res.data.template;

      setTemplateName(t.templateName);
      setDepartment(t.department);
      setCourse(t.course);
      setSemester(t.semester);
      setAcademicYear(t.academicYear);

      setTuitionFee(t.tuitionFee);
      setExamFee(t.examFee);
      setLibraryFee(t.libraryFee);
      setDevelopmentFee(t.developmentFee);
      setSportsFee(t.sportsFee);
      setHostelFee(t.hostelFee);
      setTransportFee(t.transportFee);
      setOtherFee(t.otherFee);

      setDescription(t.description);

      setIsActive(t.isActive);

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ??
          "Unable to load template."
      );

      navigate("/admin/fee-templates");

    } finally {

      setLoading(false);

    }

  };

  // ===========================
  // Update Template
  // ===========================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.put(
        `/api/admin/fee-templates/${id}`,
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

          isActive,

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Fee Template Updated Successfully."
      );

      navigate("/admin/fee-templates");

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ??
          "Unable to update template."
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <Loader2
          className="animate-spin text-cyan-400"
          size={45}
        />

      </div>

    );

  }
  return (
  <form
    onSubmit={handleSubmit}
    className="mx-auto max-w-7xl space-y-8 animate-in fade-in duration-500"
  >
    {/* ========================= */}
    {/* Header */}
    {/* ========================= */}

    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Edit Fee Template
        </h1>

        <p className="mt-2 text-slate-400">
          Update the fee template details.
        </p>

      </div>

      <button
        type="button"
        onClick={() => navigate("/admin/fee-templates")}
        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700"
      >
        <ArrowLeft size={18} />
        Back
      </button>

    </div>

    {/* ========================= */}
    {/* Template Information */}
    {/* ========================= */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

      <div className="border-b border-slate-700 px-8 py-6">

        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">

          <BookOpen className="text-cyan-400" />

          Template Information

        </h2>

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
            onChange={(e) => setTemplateName(e.target.value)}
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
            onChange={(e) => setAcademicYear(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Department */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Department
          </label>

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800">

            <Building2
              size={18}
              className="ml-4 text-cyan-400"
            />

            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full bg-transparent px-4 py-3 text-white outline-none"
            />

          </div>

        </div>

        {/* Course */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Course
          </label>

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800">

            <GraduationCap
              size={18}
              className="ml-4 text-cyan-400"
            />

            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full bg-transparent px-4 py-3 text-white outline-none"
            />

          </div>

        </div>

        {/* Semester */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Semester
          </label>

          <input
            type="number"
            min={1}
            max={12}
            value={semester}
            onChange={(e) =>
              setSemester(Number(e.target.value))
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {/* Status */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Status
          </label>

          <select
            value={isActive ? "true" : "false"}
            onChange={(e) =>
              setIsActive(e.target.value === "true")
            }
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
          >
            <option value="true">
              Active
            </option>

            <option value="false">
              Inactive
            </option>

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
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
          />

        </div>

      </div>

    </div>
        {/* ========================= */}
    {/* Fee Breakdown */}
    {/* ========================= */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

      <div className="border-b border-slate-700 px-8 py-6">

        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">

          <IndianRupee className="text-green-400" />

          Fee Breakdown

        </h2>

        <p className="mt-2 text-slate-400">
          Update the fee structure for this template.
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
              onChange={(e) => setTuitionFee(Number(e.target.value))}
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
              onChange={(e) => setExamFee(Number(e.target.value))}
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
              onChange={(e) => setLibraryFee(Number(e.target.value))}
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
              onChange={(e) => setDevelopmentFee(Number(e.target.value))}
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
              onChange={(e) => setSportsFee(Number(e.target.value))}
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
              onChange={(e) => setHostelFee(Number(e.target.value))}
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
              onChange={(e) => setTransportFee(Number(e.target.value))}
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
              onChange={(e) => setOtherFee(Number(e.target.value))}
              className="w-full bg-transparent py-3 pr-4 text-white outline-none"
            />
          </div>
        </div>

      </div>

    </div>
        {/* ========================= */}
    {/* Template Summary */}
    {/* ========================= */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

      <div className="border-b border-slate-700 px-8 py-6">

        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">

          <FileText className="text-cyan-400" />

          Template Summary

        </h2>

        <p className="mt-2 text-slate-400">
          Review the updated fee template before saving.
        </p>

      </div>

      <div className="grid gap-6 p-8 md:grid-cols-5">

        {/* Total Fee */}

        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-slate-900 p-6">

          <p className="text-sm text-slate-400">
            Total Fee
          </p>

          <h2 className="mt-4 text-3xl font-bold text-cyan-400">
            ₹{totalFee.toLocaleString()}
          </h2>

        </div>

        {/* Department */}

        <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-slate-900 p-6">

          <p className="text-sm text-slate-400">
            Department
          </p>

          <h2 className="mt-4 text-lg font-bold text-indigo-400">
            {department || "--"}
          </h2>

        </div>

        {/* Course */}

        <div className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-slate-900 p-6">

          <p className="text-sm text-slate-400">
            Course
          </p>

          <h2 className="mt-4 text-lg font-bold text-green-400">
            {course || "--"}
          </h2>

        </div>

        {/* Semester */}

        <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-slate-900 p-6">

          <p className="text-sm text-slate-400">
            Semester
          </p>

          <h2 className="mt-4 text-3xl font-bold text-yellow-400">
            {semester}
          </h2>

        </div>

        {/* Status */}

        <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-slate-900 p-6">

          <p className="text-sm text-slate-400">
            Status
          </p>

          <h2
            className={`mt-4 text-xl font-bold ${
              isActive
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </h2>

        </div>

      </div>

    </div>

    {/* ========================= */}
    {/* Action Buttons */}
    {/* ========================= */}

    <div className="flex justify-end gap-4">

      <button
        type="button"
        onClick={() =>
          navigate("/admin/fee-templates")
        }
        className="rounded-xl border border-slate-700 bg-slate-800 px-8 py-4 font-semibold text-white transition hover:bg-slate-700"
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-yellow-400 hover:to-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
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
          ? "Updating Template..."
          : "Update Template"}

      </button>

    </div>

  </form>
);
}