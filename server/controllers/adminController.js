const User = require("../models/User");
// =====================================
// Get All Students
// =====================================
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Get Single Student
// =====================================
exports.getStudentById = async (req, res) => {
  try {
    const student = await User.findOne({
      _id: req.params.id,
      role: "student",
    }).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =====================================
// Update Student
// =====================================
exports.updateStudent = async (req, res) => {
  try {
    const student = await User.findOne({
      _id: req.params.id,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const {
      fullName,
      email,
      enrollmentNumber,
      mobileNumber,
      department,
      course,
      semester,
      password,
    } = req.body;

    student.fullName = fullName;
    student.email = email;
    student.enrollmentNumber = enrollmentNumber;
    student.mobileNumber = mobileNumber;
    student.department = department;
    student.course = course;
    student.semester = semester;

    // Update password only if a new one is provided
    if (password && password.trim() !== "") {
      student.password = await bcrypt.hash(password, 10);
    }

    await student.save();

    const studentData = student.toObject();
    delete studentData.password;

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: studentData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =====================================
// Delete Student
// =====================================
exports.deleteStudent = async (req, res) => {
  try {
    const student = await User.findOneAndDelete({
      _id: req.params.id,
      role: "student",
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================
// Create Student (Admin)
// =====================================
const bcrypt = require("bcrypt");

exports.createStudent = async (req, res) => {
  try {
    const {
      fullName,
      email,
      enrollmentNumber,
      mobileNumber,
      department,
      course,
      semester,
      password,
    } = req.body;

    const existingStudent = await User.findOne({
      $or: [
        { email },
        { enrollmentNumber }
      ]
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await User.create({
      fullName,
      email,
      enrollmentNumber,
      mobileNumber,
      department,
      course,
      semester,
      password: hashedPassword,
      role: "student",
      isActivated: true,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};