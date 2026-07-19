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
} = require("../controllers/authController");

const router = express.Router();

router.post("/student/login", studentLogin);
router.post("/faculty/login", facultyLogin);
router.post("/admin/login", adminLogin);
router.post("/logout", logout);
router.post("/activate", activate);
router.post("/forgot-password", forgotPassword);
router.post("/student/register", studentRegister);
router.post("/create-test-student", createTestStudent);

module.exports = router;
