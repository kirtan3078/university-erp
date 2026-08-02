import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoticeForm from "../../components/admin/NoticeForm";
import type { NoticeFormData } from "../../components/admin/NoticeForm";

import noticeService from "../../services/noticeService";

export default function CreateNotice() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    values: NoticeFormData
  ) => {
    try {
      setLoading(true);

      await noticeService.createNotice(
        values
      );

      alert(
        "Notice created successfully."
      );

      navigate("/admin/notices");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to create notice."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">

      {/* Header */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Create Notice
        </h1>

        <p className="text-gray-500 mt-2">
          Create a new university notice.
        </p>

      </div>

      {/* Form */}

      <NoticeForm
        loading={loading}
        submitLabel="Create Notice"
        onSubmit={handleSubmit}
      />

    </div>
  );
}