const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  // Student
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,

  // Faculty
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
} = require("../controllers/adminController");

router.use(authMiddleware);
router.use(adminMiddleware);

// =====================================
// Student Routes
// =====================================
router.post("/students", createStudent);
router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

// =====================================
// Faculty Routes
// =====================================
router.post("/faculties", createFaculty);
router.get("/faculties", getAllFaculties);
router.get("/faculties/:id", getFacultyById);
router.put("/faculties/:id", updateFaculty);
router.delete("/faculties/:id", deleteFaculty);

module.exports = router;