import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import NoticeForm from "../../components/admin/NoticeForm";
import type { NoticeFormData } from "../../components/admin/NoticeForm";
import { ArrowLeft } from "lucide-react";
import noticeService from "../../services/noticeService";

export default function EditNotice() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [initialValues, setInitialValues] =
    useState<NoticeFormData | null>(null);

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

     setInitialValues({
  title: res.notice.title,

  category: res.notice.category,

  description: res.notice.description,

  content: res.notice.content,

  audience: res.notice.audience,

  department:
    res.notice.department || "",

  course:
    res.notice.course || "",

  semester:
    res.notice.semester
      ? Number(res.notice.semester)
      : "",

  priority:
    res.notice.priority,

  publishDate:
    res.notice.publishDate
      ? res.notice.publishDate.split(
          "T"
        )[0]
      : "",

  expiryDate:
    res.notice.expiryDate
      ? res.notice.expiryDate.split(
          "T"
        )[0]
      : "",

  status: res.notice.status,

  isPinned:
    res.notice.isPinned,

  isActive:
    res.notice.isActive,
});

    } catch (error) {
      console.error(error);
      alert("Failed to load notice.");
    }
  };

  const handleSubmit = async (
    values: NoticeFormData
  ) => {
    try {
      setLoading(true);

      await noticeService.updateNotice(
        id!,
        values
      );

      alert(
        "Notice updated successfully."
      );

      navigate("/admin/notices");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to update notice."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!initialValues) {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2
        size={40}
        className="animate-spin text-cyan-400"
      />
    </div>
  );
}

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

     <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

  <div>

    <button
      onClick={() => navigate("/admin/notices")}
      className="mb-4 flex items-center gap-2 text-slate-400 transition hover:text-cyan-400"
    >
      <ArrowLeft size={18} />
      Back to Notices
    </button>

    <h1 className="text-4xl font-bold tracking-tight text-white">
      Edit Notice
    </h1>

    <p className="mt-2 text-slate-400">
      Update the notice details.
    </p>

  </div>

</div>

      <NoticeForm
        initialValues={initialValues}
        loading={loading}
        submitLabel="Update Notice"
        onSubmit={handleSubmit}
      />

    </div>
  );
}