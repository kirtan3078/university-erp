const express = require("express");
const {
  studentLogin,
  facultyLogin,
  adminLogin,
  logout,
  activate,
  forgotPassword,
  studentRegister,
  createTestStudent,
  getStudentProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================
// Student Routes
// ==========================
router.post("/student/register", studentRegister);
router.post("/student/login", studentLogin);
router.get("/student/profile", authMiddleware, getStudentProfile);

// ==========================
// Faculty Routes
// ==========================
router.post("/faculty/login", facultyLogin);

// ==========================
// Admin Routes
// ==========================
router.post("/admin/login", adminLogin);

// ==========================
// Common Routes
// ==========================
router.post("/logout", logout);
router.post("/activate", activate);
router.post("/forgot-password", forgotPassword);

// ==========================
// Development Route
// ==========================
router.post("/create-test-student", createTestStudent);

module.exports = router;