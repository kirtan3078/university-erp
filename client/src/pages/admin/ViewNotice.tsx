import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  User,
  Eye,
  Pin,
} from "lucide-react";

import noticeService from "../../services/noticeService";

interface Notice {
  _id: string;

  title: string;

  category: string;

  description: string;

  content: string;

  audience: string;

  department: string;

  course: string;

  semester: number | "";

  priority: string;

  publishDate: string;

  expiryDate: string;

  status: string;

  isPinned: boolean;

  isActive: boolean;

  viewCount: number;

  createdBy?: {
    name: string;
  };
}

export default function ViewNotice() {
  const { id } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [notice, setNotice] =
    useState<Notice | null>(null);

  useEffect(() => {
    if (id) {
      loadNotice();
    }
  }, [id]);

  const loadNotice = async () => {
    try {
      const res =
        await noticeService.getNoticeById(
          id!
        );

      setNotice(res.notice);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="p-6">
        Notice not found.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <Link
        to="/admin/notices"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6"
      >
        <ArrowLeft size={18} />
        Back to Notices
      </Link>

      <div className="bg-white rounded-xl shadow-sm border p-8">

        <div className="flex items-start justify-between">

          <div>

            <div className="flex items-center gap-2">

              {notice.isPinned && (
                <Pin
                  className="text-yellow-500 fill-yellow-500"
                  size={18}
                />
              )}

              <h1 className="text-3xl font-bold">

                {notice.title}

              </h1>

            </div>

            <p className="text-gray-500 mt-2">

              {notice.description}

            </p>

          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold

            ${
              notice.priority === "Urgent"
                ? "bg-red-100 text-red-700"

              : notice.priority === "High"
                ? "bg-orange-100 text-orange-700"

              : notice.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"

              : "bg-green-100 text-green-700"
            }`}
          >
            {notice.priority}
          </span>

        </div>
                {/* ========================= */}
        {/* Notice Details */}
        {/* ========================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

          <div className="flex items-center gap-3">
            <CalendarDays
              size={20}
              className="text-indigo-600"
            />

            <div>

              <p className="text-sm text-gray-500">
                Publish Date
              </p>

              <p className="font-medium">
                {new Date(
                  notice.publishDate
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <User
              size={20}
              className="text-indigo-600"
            />

            <div>

              <p className="text-sm text-gray-500">
                Created By
              </p>

              <p className="font-medium">
                {notice.createdBy?.name ??
                  "Administrator"}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Eye
              size={20}
              className="text-indigo-600"
            />

            <div>

              <p className="text-sm text-gray-500">
                Total Views
              </p>

              <p className="font-medium">
                {notice.viewCount}
              </p>

            </div>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Status
            </p>

            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium

              ${
                notice.status ===
                "Published"
                  ? "bg-green-100 text-green-700"

                  : notice.status ===
                    "Draft"
                  ? "bg-yellow-100 text-yellow-700"

                  : "bg-red-100 text-red-700"
              }`}
            >
              {notice.status}
            </span>

          </div>

          {notice.department && (

            <div>

              <p className="text-sm text-gray-500">
                Department
              </p>

              <p className="font-medium">
                {notice.department}
              </p>

            </div>

          )}

          {notice.course && (

            <div>

              <p className="text-sm text-gray-500">
                Course
              </p>

              <p className="font-medium">
                {notice.course}
              </p>

            </div>

          )}

          {notice.semester && (

            <div>

              <p className="text-sm text-gray-500">
                Semester
              </p>

              <p className="font-medium">
                Semester {notice.semester}
              </p>

            </div>

          )}

          <div>

            <p className="text-sm text-gray-500">
              Audience
            </p>

            <p className="font-medium">
              {notice.audience}
            </p>

          </div>

          {notice.expiryDate && (

            <div>

              <p className="text-sm text-gray-500">
                Expiry Date
              </p>

              <p className="font-medium">
                {new Date(
                  notice.expiryDate
                ).toLocaleDateString()}
              </p>

            </div>

          )}

        </div>

        {/* ========================= */}
        {/* Content */}
        {/* ========================= */}

        <div className="mt-10">

          <h2 className="text-xl font-semibold mb-4">
            Notice Content
          </h2>

          <div className="border rounded-xl p-5 bg-gray-50 whitespace-pre-wrap leading-7">

            {notice.content}

          </div>

        </div>

        {/* ========================= */}
        {/* Attachments */}
        {/* ========================= */}

        <div className="mt-10">

          <h2 className="text-xl font-semibold mb-4">
            Attachments
          </h2>

          <div className="border rounded-xl p-6 bg-gray-50 text-gray-500">

            No attachments available.

          </div>

        </div>

      </div>

    </div>
  );
}