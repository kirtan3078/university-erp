const User = require("../models/User");
const bcrypt = require("bcrypt");

// =====================================
// Create Student (Admin)
// =====================================
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
      $or: [{ email }, { enrollmentNumber }],
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

    const studentData = student.toObject();
    delete studentData.password;

    res.status(201).json({
      success: true,
      message: "Student created successfully",
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
// Create Faculty (Admin)
// =====================================
exports.createFaculty = async (req, res) => {
  try {
    const {
      fullName,
      email,
      employeeId,
      mobileNumber,
      department,
      password,
      profileImage,
    } = req.body;

    const existingFaculty = await User.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (existingFaculty) {
      return res.status(400).json({
        success: false,
        message: "Faculty already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const faculty = await User.create({
      fullName,
      email,
      employeeId,
      mobileNumber,
      department,
      profileImage: profileImage || "",
      password: hashedPassword,
      role: "faculty",
      isActivated: true,
    });

    const facultyData = faculty.toObject();
    delete facultyData.password;

    res.status(201).json({
      success: true,
      message: "Faculty created successfully",
      faculty: facultyData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =====================================
// Get All Faculties
// =====================================
exports.getAllFaculties = async (req, res) => {
  try {
    const faculties = await User.find({ role: "faculty" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: faculties.length,
      faculties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =====================================
// Get Single Faculty
// =====================================
exports.getFacultyById = async (req, res) => {
  try {
    const faculty = await User.findOne({
      _id: req.params.id,
      role: "faculty",
    }).select("-password");

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    res.status(200).json({
      success: true,
      faculty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =====================================
// Update Faculty
// =====================================
exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await User.findOne({
      _id: req.params.id,
      role: "faculty",
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    const {
      fullName,
      email,
      employeeId,
      mobileNumber,
      department,
      profileImage,
      password,
    } = req.body;

    faculty.fullName = fullName;
    faculty.email = email;
    faculty.employeeId = employeeId;
    faculty.mobileNumber = mobileNumber;
    faculty.department = department;
    faculty.profileImage = profileImage || faculty.profileImage;

    // Update password only if a new one is provided
    if (password && password.trim() !== "") {
      faculty.password = await bcrypt.hash(password, 10);
    }

    await faculty.save();

    const facultyData = faculty.toObject();
    delete facultyData.password;

    res.status(200).json({
      success: true,
      message: "Faculty updated successfully",
      faculty: facultyData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// =====================================
// Delete Faculty
// =====================================
exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await User.findOneAndDelete({
      _id: req.params.id,
      role: "faculty",
    });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Faculty deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};