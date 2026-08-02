import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Loader2,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Megaphone,
  Pin,
  CheckCircle2,
  FileText,
  Archive,
} from "lucide-react";

import toast from "react-hot-toast";

import noticeService from "../../services/noticeService";

interface Notice {
  _id: string;

  title: string;

  description: string;

  category: string;

  audience: string;

  priority: string;

  status: string;

  publishDate: string;

  isPinned: boolean;
}

export default function Notices() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [notices, setNotices] =
    useState<Notice[]>([]);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("");

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedNotice, setSelectedNotice] =
    useState<Notice | null>(null);

  // =============================
  // Fetch Notices
  // =============================

  const fetchNotices = async () => {
    try {
      const res =
        await noticeService.getAllNotices();

      setNotices(res.notices);

    } catch (err: any) {

      console.error(err);

      toast.error(
        err?.response?.data?.message ??
          "Unable to fetch notices."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // =============================
  // Filter
  // =============================

  const filteredNotices =
    useMemo(() => {

      return notices.filter(
        (notice) => {

          const matchesSearch =

            notice.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||

            notice.description
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesCategory =

            categoryFilter === "" ||

            notice.category ===
              categoryFilter;

          const matchesStatus =

            statusFilter === "" ||

            notice.status ===
              statusFilter;

          return (

            matchesSearch &&

            matchesCategory &&

            matchesStatus

          );

        }
      );

    }, [

      notices,

      search,

      categoryFilter,

      statusFilter,

    ]);

  // =============================
  // Statistics
  // =============================

  const totalNotices =
    notices.length;

  const published =
    notices.filter(
      (n) =>
        n.status ===
        "Published"
    ).length;

  const draft =
    notices.filter(
      (n) =>
        n.status ===
        "Draft"
    ).length;

  const archived =
    notices.filter(
      (n) =>
        n.status ===
        "Archived"
    ).length;

  // =============================
  // Delete
  // =============================

  const deleteNotice =
    async () => {

      if (!selectedNotice) return;

      try {

        await noticeService.deleteNotice(
          selectedNotice._id
        );

        setNotices((prev) =>
          prev.filter(
            (n) =>
              n._id !==
              selectedNotice._id
          )
        );

        toast.success(
          "Notice deleted successfully."
        );

        setDeleteModal(false);

        setSelectedNotice(null);

      } catch (err: any) {

        toast.error(
          err?.response?.data?.message ??
            "Unable to delete notice."
        );

      }

    };
      return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold tracking-tight text-white">
            Notice Management
          </h1>

          <p className="mt-2 text-slate-400">
            Manage university announcements and notifications.
          </p>

        </div>

        <button
          onClick={() =>
            navigate("/admin/notices/create")
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30"
        >
          <Plus size={18} />

          Create Notice

        </button>

      </div>

      {/* ========================= */}
      {/* Statistics */}
      {/* ========================= */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">

        {/* Total */}

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Total Notices
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                {totalNotices}
              </h2>

            </div>

            <div className="rounded-xl bg-cyan-500/10 p-4">

              <Megaphone
                size={28}
                className="text-cyan-400"
              />

            </div>

          </div>

        </div>

        {/* Published */}

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Published
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-400">
                {published}
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

        {/* Draft */}

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Draft
              </p>

              <h2 className="mt-2 text-3xl font-bold text-yellow-400">
                {draft}
              </h2>

            </div>

            <div className="rounded-xl bg-yellow-500/10 p-4">

              <FileText
                size={28}
                className="text-yellow-400"
              />

            </div>

          </div>

        </div>

        {/* Archived */}

        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-400">
                Archived
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-400">
                {archived}
              </h2>

            </div>

            <div className="rounded-xl bg-red-500/10 p-4">

              <Archive
                size={28}
                className="text-red-400"
              />

            </div>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* Search & Filters */}
      {/* ========================= */}

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
              placeholder="Search notices..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 transition focus:border-cyan-500 focus:outline-none"
            />

          </div>

          {/* Category */}

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition focus:border-cyan-500 focus:outline-none"
          >

            <option value="">
              All Categories
            </option>

            <option value="Academic">
              Academic
            </option>

            <option value="Exam">
              Exam
            </option>

            <option value="Fee">
              Fee
            </option>

            <option value="Holiday">
              Holiday
            </option>

            <option value="Event">
              Event
            </option>

            <option value="Placement">
              Placement
            </option>

            <option value="Scholarship">
              Scholarship
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Library">
              Library
            </option>

            <option value="Hostel">
              Hostel
            </option>

            <option value="General">
              General
            </option>

          </select>

          {/* Status */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white transition focus:border-cyan-500 focus:outline-none"
          >

            <option value="">
              All Status
            </option>

            <option value="Published">
              Published
            </option>

            <option value="Draft">
              Draft
            </option>

            <option value="Archived">
              Archived
            </option>

          </select>

        </div>

      </div>
            {/* ========================= */}
      {/* Notice Table */}
      {/* ========================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/80 shadow-xl backdrop-blur-xl">

        {loading ? (

          <div className="flex h-72 items-center justify-center">

            <Loader2
              size={42}
              className="animate-spin text-cyan-400"
            />

          </div>

        ) : filteredNotices.length === 0 ? (

          <div className="flex h-72 flex-col items-center justify-center">

            <Megaphone
              size={52}
              className="mb-4 text-slate-600"
            />

            <h3 className="text-xl font-semibold text-white">
              No Notices Found
            </h3>

            <p className="mt-2 text-slate-400">
              Create your first notice to get started.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="border-b border-slate-700 bg-slate-800/80">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Notice
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Category
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Audience
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Priority
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Date
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-300">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredNotices.map((notice) => (

                  <tr
                    key={notice._id}
                    className="border-b border-slate-800 transition hover:bg-slate-800/60"
                  >

                    {/* Notice */}

                    <td className="px-6 py-5">

                      <div className="flex items-start gap-3">

                        {notice.isPinned && (

                          <Pin
                            size={18}
                            className="mt-1 text-yellow-400 fill-yellow-400"
                          />

                        )}

                        <div>

                          <p className="font-semibold text-white">

                            {notice.title}

                          </p>

                          <p className="mt-1 line-clamp-2 text-sm text-slate-400">

                            {notice.description}

                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Category */}

                    <td className="px-6 py-5">

                      <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm font-medium text-cyan-400">

                        {notice.category}

                      </span>

                    </td>

                    {/* Audience */}

                    <td className="px-6 py-5 text-center text-slate-300">

                      {notice.audience}

                    </td>

                    {/* Priority */}

                    <td className="px-6 py-5 text-center">

                      {notice.priority === "Urgent" ? (

                        <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm font-medium text-red-400">
                          Urgent
                        </span>

                      ) : notice.priority === "High" ? (

                        <span className="rounded-full bg-orange-500/15 px-3 py-1 text-sm font-medium text-orange-400">
                          High
                        </span>

                      ) : notice.priority === "Medium" ? (

                        <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-sm font-medium text-yellow-400">
                          Medium
                        </span>

                      ) : (

                        <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
                          Low
                        </span>

                      )}

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5 text-center">

                      {notice.status === "Published" ? (

                        <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-medium text-green-400">
                          Published
                        </span>

                      ) : notice.status === "Draft" ? (

                        <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-sm font-medium text-yellow-400">
                          Draft
                        </span>

                      ) : (

                        <span className="rounded-full bg-red-500/15 px-3 py-1 text-sm font-medium text-red-400">
                          Archived
                        </span>

                      )}

                    </td>

                    {/* Publish Date */}

                    <td className="px-6 py-5 text-center text-slate-300">

                      {new Date(
                        notice.publishDate
                      ).toLocaleDateString()}

                    </td>

                    {/* Actions */}
                                        <td className="px-6 py-5">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() =>
                            navigate(
                              `/admin/notices/view/${notice._id}`
                            )
                          }
                          className="rounded-lg bg-cyan-600 p-2 text-white transition hover:bg-cyan-500"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() =>
                            navigate(
                              `/admin/notices/edit/${notice._id}`
                            )
                          }
                          className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-500"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedNotice(
                              notice
                            );
                            setDeleteModal(
                              true
                            );
                          }}
                          className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-500"
                          title="Delete"
                        >
                          <Trash2 size={18} />
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

      {/* ========================= */}
      {/* Delete Modal */}
      {/* ========================= */}

      {deleteModal &&
        selectedNotice && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

              <h2 className="text-center text-2xl font-bold text-white">
                Delete Notice
              </h2>

              <p className="mt-4 text-center text-slate-400">

                Delete

                <span className="font-semibold text-white">
                  {" "}
                  {selectedNotice.title}
                </span>

                ?

              </p>

              <div className="mt-8 flex gap-4">

                <button
                  onClick={() => {
                    setDeleteModal(
                      false
                    );
                    setSelectedNotice(
                      null
                    );
                  }}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-800 py-3 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    deleteNotice
                  }
                  className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-500"
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
