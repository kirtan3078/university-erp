const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

// Create Attendance
router.post("/", authMiddleware, createAttendance);

// Get All Attendance
router.get("/", authMiddleware, getAllAttendance);

// Get Attendance By ID
router.get("/:id", authMiddleware, getAttendanceById);

// Update Attendance
router.put("/:id", authMiddleware, updateAttendance);

// Delete Attendance
router.delete("/:id", authMiddleware, deleteAttendance);

module.exports = router;