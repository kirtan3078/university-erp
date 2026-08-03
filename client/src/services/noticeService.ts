import api from "./api";

const API = "/api/admin/notices";

// =======================================
// Create Notice
// =======================================

export const createNotice = async (data: any) => {
  const response = await api.post(API, data);
  return response.data;
};

// =======================================
// Get All Notices
// =======================================

export const getAllNotices = async () => {
  const response = await api.get(API);
  return response.data;
};

// =======================================
// Get Notice By ID
// =======================================

export const getNoticeById = async (id: string) => {
  const response = await api.get(`${API}/${id}`);
  return response.data;
};

// =======================================
// Update Notice
// =======================================

export const updateNotice = async (
  id: string,
  data: any
) => {
  const response = await api.put(
    `${API}/${id}`,
    data
  );

  return response.data;
};

// =======================================
// Delete Notice
// =======================================

export const deleteNotice = async (
  id: string
) => {
  const response = await api.delete(
    `${API}/${id}`
  );

  return response.data;
};

// =======================================
// Pin / Unpin Notice
// =======================================

export const togglePinNotice = async (
  id: string
) => {
  const response = await api.patch(
    `${API}/${id}/pin`
  );

  return response.data;
};

// =======================================
// Change Notice Status
// =======================================

export const changeNoticeStatus = async (
  id: string,
  status: string
) => {
  const response = await api.patch(
    `${API}/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};

// =======================================
// Get Notice Statistics
// =======================================

export const getNoticeStats = async () => {
  const response = await api.get(
    `${API}/stats`
  );

  return response.data;
};

// =======================================
// Get Published Notices
// =======================================

export const getPublishedNotices =
  async () => {
    const response = await api.get(
      `${API}/published`
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