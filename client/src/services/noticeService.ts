import axios from "axios";

const API =
  "/api/admin/notices";

// =======================================
// Create Notice
// =======================================

export const createNotice =
  async (data: any) => {
    const response =
      await axios.post(
        API,
        data,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

// =======================================
// Get All Notices
// =======================================

export const getAllNotices =
  async () => {
    const response =
      await axios.get(
        API,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

// =======================================
// Get Notice By ID
// =======================================

export const getNoticeById =
  async (id: string) => {
    const response =
      await axios.get(
        `${API}/${id}`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };
  // =======================================
// Update Notice
// =======================================

export const updateNotice =
  async (
    id: string,
    data: any
  ) => {
    const response =
      await axios.put(
        `${API}/${id}`,
        data,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

// =======================================
// Delete Notice
// =======================================

export const deleteNotice =
  async (id: string) => {
    const response =
      await axios.delete(
        `${API}/${id}`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

// =======================================
// Pin / Unpin Notice
// =======================================

export const togglePinNotice =
  async (id: string) => {
    const response =
      await axios.patch(
        `${API}/${id}/pin`,
        {},
        {
          withCredentials: true,
        }
      );

    return response.data;
  };
  // =======================================
// Change Notice Status
// =======================================

export const changeNoticeStatus =
  async (
    id: string,
    status: string
  ) => {
    const response =
      await axios.patch(
        `${API}/${id}/status`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

// =======================================
// Get Notice Statistics
// =======================================

export const getNoticeStats =
  async () => {
    const response =
      await axios.get(
        `${API}/stats`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

// =======================================
// Get Published Notices
// =======================================

export const getPublishedNotices =
  async () => {
    const response =
      await axios.get(
        `${API}/published`,
        {
          withCredentials: true,
        }
      );

    return response.data;
  };

// =======================================
// Default Export
// =======================================

const noticeService = {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
  togglePinNotice,
  changeNoticeStatus,
  getNoticeStats,
  getPublishedNotices,
};

export default noticeService;