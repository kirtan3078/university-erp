const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createNotice,
  getAllNotices,
  getPublishedNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
  togglePinNotice,
  changeNoticeStatus,
  getNoticeStats,
} = require("../controllers/noticeController");

// =====================================
// Notice Statistics
// =====================================

router.get(
  "/stats",
  authMiddleware,
  getNoticeStats
);

// =====================================
// Published Notices
// (Student / Faculty)
// =====================================

router.get(
  "/published",
  authMiddleware,
  getPublishedNotices
);

// =====================================
// Get All Notices
// =====================================

router.get(
  "/",
  authMiddleware,
  getAllNotices
);

// =====================================
// Get Single Notice
// =====================================

router.get(
  "/:id",
  authMiddleware,
  getNoticeById
);

// =====================================
// Create Notice
// =====================================

router.post(
  "/",
  authMiddleware,
  createNotice
);
// =====================================
// Update Notice
// =====================================

router.put(
  "/:id",
  authMiddleware,
  updateNotice
);

// =====================================
// Delete Notice
// =====================================

router.delete(
  "/:id",
  authMiddleware,
  deleteNotice
);

// =====================================
// Pin / Unpin Notice
// =====================================

router.patch(
  "/:id/pin",
  authMiddleware,
  togglePinNotice
);

// =====================================
// Change Notice Status
// =====================================

router.patch(
  "/:id/status",
  authMiddleware,
  changeNoticeStatus
);

// =====================================
// Export Router
// =====================================

module.exports = router;