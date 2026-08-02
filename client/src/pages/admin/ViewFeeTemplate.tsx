import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  FileText,
  Building2,
  GraduationCap,
  Calendar,
  IndianRupee,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

interface FeeTemplate {
  _id: string;
  templateName: string;
  department: string;
  course: string;
  semester: number;
  academicYear: string;

  tuitionFee: number;
  examFee: number;
  libraryFee: number;
  developmentFee: number;
  sportsFee: number;
  hostelFee: number;
  transportFee: number;
  otherFee: number;

  totalFee: number;

  description: string;

  isActive: boolean;

  createdAt: string;
}

export default function ViewFeeTemplate() {
  const navigate = useNavigate();

  const { id } = useParams();

  const token = localStorage.getItem("authToken");

  const [loading, setLoading] = useState(true);

  const [template, setTemplate] =
    useState<FeeTemplate | null>(null);

  useEffect(() => {
    fetchTemplate();
  }, []);

  const fetchTemplate = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        `/api/admin/fee-templates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTemplate(res.data.template);

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

  if (!template) return null;
    return (
    <div className="mx-auto max-w-7xl space-y-8 animate-in fade-in duration-500">

      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            View Fee Template
          </h1>

          <p className="mt-2 text-slate-400">
            View complete fee template information.
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/admin/fee-templates")
          }
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

            <FileText className="text-cyan-400" />

            Template Information

          </h2>

        </div>

        <div className="grid gap-6 p-8 md:grid-cols-2">

          {/* Template Name */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">
              Template Name
            </label>

            <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white">

              {template.templateName}

            </div>

          </div>

          {/* Academic Year */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">
              Academic Year
            </label>

            <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white">

              {template.academicYear}

            </div>

          </div>

          {/* Department */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">
              Department
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">

              <Building2
                size={18}
                className="text-cyan-400"
              />

              <span className="text-white">

                {template.department}

              </span>

            </div>

          </div>

          {/* Course */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">
              Course
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">

              <GraduationCap
                size={18}
                className="text-cyan-400"
              />

              <span className="text-white">

                {template.course}

              </span>

            </div>

          </div>

          {/* Semester */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">
              Semester
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">

              <Calendar
                size={18}
                className="text-cyan-400"
              />

              <span className="text-white">

                Semester {template.semester}

              </span>

            </div>

          </div>

          {/* Status */}

          <div>

            <label className="mb-2 block text-sm text-slate-400">
              Status
            </label>

            <div>

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  template.isActive
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {template.isActive
                  ? "Active"
                  : "Inactive"}
              </span>

            </div>

          </div>

          {/* Description */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm text-slate-400">
              Description
            </label>

            <div className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-4 text-white min-h-[120px]">

              {template.description || "No description provided."}

            </div>

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

        </div>

        <div className="grid gap-6 p-8 md:grid-cols-2">

          <div className="flex items-center justify-between rounded-xl bg-slate-800 px-5 py-4">
            <span className="text-slate-300">Tuition Fee</span>
            <span className="font-bold text-white">
              ₹{template.tuitionFee.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-800 px-5 py-4">
            <span className="text-slate-300">Exam Fee</span>
            <span className="font-bold text-white">
              ₹{template.examFee.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-800 px-5 py-4">
            <span className="text-slate-300">Library Fee</span>
            <span className="font-bold text-white">
              ₹{template.libraryFee.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-800 px-5 py-4">
            <span className="text-slate-300">Development Fee</span>
            <span className="font-bold text-white">
              ₹{template.developmentFee.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-800 px-5 py-4">
            <span className="text-slate-300">Sports Fee</span>
            <span className="font-bold text-white">
              ₹{template.sportsFee.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-800 px-5 py-4">
            <span className="text-slate-300">Hostel Fee</span>
            <span className="font-bold text-white">
              ₹{template.hostelFee.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-800 px-5 py-4">
            <span className="text-slate-300">Transport Fee</span>
            <span className="font-bold text-white">
              ₹{template.transportFee.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-800 px-5 py-4">
            <span className="text-slate-300">Other Fee</span>
            <span className="font-bold text-white">
              ₹{template.otherFee.toLocaleString()}
            </span>
          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* Summary */}
      {/* ========================= */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-slate-900 p-8">

          <p className="text-slate-400">
            Total Fee
          </p>

          <h2 className="mt-4 text-4xl font-bold text-cyan-400">

            ₹{template.totalFee.toLocaleString()}

          </h2>

        </div>

        <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-slate-900 p-8">

          <p className="text-slate-400">
            Created On
          </p>

          <h2 className="mt-4 text-xl font-bold text-white">

            {new Date(template.createdAt).toLocaleDateString()}

          </h2>

        </div>

      </div>

      {/* ========================= */}
      {/* Action Buttons */}
      {/* ========================= */}

      <div className="flex justify-end gap-4">

        <button
          onClick={() =>
            navigate("/admin/fee-templates")
          }
          className="rounded-xl border border-slate-700 bg-slate-800 px-8 py-4 font-semibold text-white transition hover:bg-slate-700"
        >
          Back
        </button>

        <button
          onClick={() =>
            navigate(
              `/admin/fee-templates/edit/${template._id}`
            )
          }
          className="rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-white transition hover:from-yellow-400 hover:to-orange-400"
        >
          Edit Template
        </button>

      </div>

    </div>
  );
}