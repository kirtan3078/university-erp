const Attendance = require("../models/Attendance");
const User = require("../models/User");

/* ===========================
   Create Attendance
=========================== */
const createAttendance = async (req, res) => {
  try {
    const { student, date, status, remarks } = req.body;

    const studentData = await User.findById(student);

    if (!studentData || studentData.role !== "student") {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    const existing = await Attendance.findOne({
      student,
      date,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Attendance already marked for this student today.",
      });
    }

    const attendance = await Attendance.create({
      student,
      markedBy: req.user.id,
      department: studentData.department,
      course: studentData.course,
      semester: studentData.semester,
      date,
      status,
      remarks,
    });

    res.status(201).json({
      success: true,
      message: "Attendance created successfully.",
      attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to create attendance.",
    });
  }
};

/* ===========================
   Get All Attendance
=========================== */
const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("student", "fullName enrollmentNumber")
      .populate("markedBy", "fullName role")
      .sort({
        date: -1,
        createdAt: -1,
      });

    res.json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch attendance.",
    });
  }
};

/* ===========================
   Get Attendance By ID
=========================== */
const getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate(
        "student",
        "fullName enrollmentNumber department course semester"
      )
      .populate("markedBy", "fullName role");

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found.",
      });
    }

    res.json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch attendance.",
    });
  }
};

/* ===========================
   Update Attendance
=========================== */
const updateAttendance = async (req, res) => {
  try {
    const { status, remarks } = req.body;

    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found.",
      });
    }

    attendance.status = status || attendance.status;
    attendance.remarks = remarks || attendance.remarks;
    attendance.markedBy = req.user.id;

    await attendance.save();

    res.json({
      success: true,
      message: "Attendance updated successfully.",
      attendance,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to update attendance.",
    });
  }
};

/* ===========================
   Delete Attendance
=========================== */
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found.",
      });
    }

    await attendance.deleteOne();

    res.json({
      success: true,
      message: "Attendance deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to delete attendance.",
    });
  }
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};