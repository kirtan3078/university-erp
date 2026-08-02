import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  Loader2,
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

  totalFee: number;

  isActive: boolean;
}

export default function FeeTemplates() {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  const [loading, setLoading] =
    useState(true);

  const [templates, setTemplates] =
    useState<FeeTemplate[]>([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);

      const res = await api.get(
        "/api/admin/fee-templates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTemplates(res.data.templates);

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ??
          "Unable to load fee templates."
      );

    } finally {

      setLoading(false);

    }
  };

  const deleteTemplate = async (
    id: string
  ) => {

    if (
      !window.confirm(
        "Delete this fee template?"
      )
    )
      return;

    try {

      await api.delete(
        `/api/admin/fee-templates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Fee template deleted."
      );

      fetchTemplates();

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ??
          "Unable to delete template."
      );

    }
  };

  const filteredTemplates =
    templates.filter((t) => {

      const q = search.toLowerCase();

      return (
        t.templateName
          .toLowerCase()
          .includes(q) ||

        t.course
          .toLowerCase()
          .includes(q) ||

        t.department
          .toLowerCase()
          .includes(q)
      );
    });

  const totalTemplates =
    templates.length;

  const activeTemplates =
    templates.filter(
      (t) => t.isActive
    ).length;

  const inactiveTemplates =
    templates.filter(
      (t) => !t.isActive
    ).length;

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
    <div className="mx-auto max-w-7xl space-y-8 animate-in fade-in duration-500">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">

            Fee Templates

          </h1>

          <p className="mt-2 text-slate-400">

            Manage reusable fee structures.

          </p>

        </div>

        <button
          onClick={() =>
            navigate(
              "/admin/fee-templates/create"
            )
          }
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500"
        >

          <Plus size={20} />

          Create Template

        </button>

      </div>

      {/* Dashboard */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-slate-900 p-6">

          <FileSpreadsheet
            className="mb-3 text-cyan-400"
            size={34}
          />

          <p className="text-slate-400">
            Total Templates
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {totalTemplates}
          </h2>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <CheckCircle2
            className="mb-3 text-green-400"
            size={34}
          />

          <p className="text-slate-400">
            Active
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-400">
            {activeTemplates}
          </h2>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6">

          <XCircle
            className="mb-3 text-red-400"
            size={34}
          />

          <p className="text-slate-400">
            Inactive
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-400">
            {inactiveTemplates}
          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          className="absolute left-4 top-3.5 text-slate-400"
          size={20}
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search fee templates..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none focus:border-cyan-500"
        />

      </div>
            {/* ========================= */}
      {/* Templates Table */}
      {/* ========================= */}

      <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="border-b border-slate-700 bg-slate-800">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Template
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Department
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Course
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                  Semester
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                  Academic Year
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-300">
                  Total Fee
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredTemplates.length === 0 ? (

                <tr>

                  <td
                    colSpan={8}
                    className="py-14 text-center text-slate-400"
                  >
                    No Fee Templates Found.
                  </td>

                </tr>

              ) : (

                filteredTemplates.map((template) => (

                  <tr
                    key={template._id}
                    className="border-b border-slate-800 transition hover:bg-slate-800/50"
                  >

                    {/* Template */}

                    <td className="px-6 py-5">

                      <div>

                        <h3 className="font-semibold text-white">
                          {template.templateName}
                        </h3>

                      </div>

                    </td>

                    {/* Department */}

                    <td className="px-6 py-5 text-slate-300">
                      {template.department}
                    </td>

                    {/* Course */}

                    <td className="px-6 py-5 text-slate-300">
                      {template.course}
                    </td>

                    {/* Semester */}

                    <td className="px-6 py-5 text-center text-white">
                      {template.semester}
                    </td>

                    {/* Academic Year */}

                    <td className="px-6 py-5 text-center text-slate-300">
                      {template.academicYear}
                    </td>

                    {/* Total */}

                    <td className="px-6 py-5 text-right font-semibold text-green-400">
                      ₹{template.totalFee.toLocaleString()}
                    </td>

                    {/* Status */}

                    <td className="px-6 py-5 text-center">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          template.isActive
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {template.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">

                      <div className="flex items-center justify-center gap-2">

                        <button
                          onClick={() =>
                            navigate(
                              `/admin/fee-templates/view/${template._id}`
                            )
                          }
                          className="rounded-lg bg-cyan-500/20 p-2 text-cyan-400 transition hover:bg-cyan-500 hover:text-white"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() =>
                            navigate(
                              `/admin/fee-templates/edit/${template._id}`
                            )
                          }
                          className="rounded-lg bg-yellow-500/20 p-2 text-yellow-400 transition hover:bg-yellow-500 hover:text-white"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            deleteTemplate(template._id)
                          }
                          className="rounded-lg bg-red-500/20 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}