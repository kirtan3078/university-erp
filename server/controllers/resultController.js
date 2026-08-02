const Result = require("../models/Result");
const User = require("../models/User");

// ===============================
// CREATE RESULT
// ===============================
exports.createResult = async (req, res, next) => {
  try {
    const { student, subjects} = req.body;

    if (!student || !subjects || subjects.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Student and subjects are required.",
      });
    }

    const studentData = await User.findById(student);

    if (!studentData) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    let totalMarks = 0;
    let obtainedMarks = 0;

    subjects.forEach((sub) => {
      totalMarks += Number(sub.totalMarks);
      obtainedMarks += Number(sub.marksObtained);
    });

    const percentage = Number(
      ((obtainedMarks / totalMarks) * 100).toFixed(2)
    );
    // Calculate SGPA (10-point scale)
    const sgpa = Number((percentage / 10).toFixed(2));
    const status = subjects.some(
      (sub) => Number(sub.marksObtained) < Number(sub.totalMarks) * 0.35
    )
      ? "Fail"
      : "Pass";

    const existingResult = await Result.findOne({
      student,
      semester: studentData.semester,
    });

    if (existingResult) {
      return res.status(400).json({
        success: false,
        message: "Result already exists for this semester.",
      });
    }

    const result = await Result.create({
      student,
      enrollmentNumber: studentData.enrollmentNumber,
      studentName: studentData.fullName,
      department: studentData.department,
      course: studentData.course,
      semester: studentData.semester,
      subjects,
      totalMarks,
      obtainedMarks,
      percentage,
      sgpa,
      status,
      publishedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Result created successfully.",
      result,
    });
  } catch (error) {
    next(error);
  }
};

// ===============================
// GET ALL RESULTS
// ===============================
exports.getAllResults = async (req, res, next) => {
  try {
    const results = await Result.find()
      .populate("student", "fullName enrollmentNumber")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: results.length,
      results,
    });
  } catch (error) {
    next(error);
  }
};

// ===============================
// GET SINGLE RESULT
// ===============================
exports.getResultById = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id)
  .populate("student", "fullName enrollmentNumber")
  .populate("publishedBy", "fullName role");

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found.",
      });
    }

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// ===============================
// UPDATE RESULT
// ===============================
exports.updateResult = async (req, res, next) => {
  try {
    const { subjects } = req.body;

    const result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found.",
      });
    }

    let totalMarks = 0;
    let obtainedMarks = 0;

    subjects.forEach((sub) => {
      totalMarks += Number(sub.totalMarks);
      obtainedMarks += Number(sub.marksObtained);
    });

    const percentage = Number(
      ((obtainedMarks / totalMarks) * 100).toFixed(2)
    );
    const sgpa = Number((percentage / 10).toFixed(2));
    const status = subjects.some(
      (sub) => Number(sub.marksObtained) < Number(sub.totalMarks) * 0.35
    )
      ? "Fail"
      : "Pass";

    result.subjects = subjects;
    result.totalMarks = totalMarks;
    result.obtainedMarks = obtainedMarks;
    result.percentage = percentage;
    result.sgpa = sgpa;
    result.status = status;

    await result.save();

    res.status(200).json({
      success: true,
      message: "Result updated successfully.",
      result,
    });
  } catch (error) {
    next(error);
  }
};

// ===============================
// DELETE RESULT
// ===============================
exports.deleteResult = async (req, res, next) => {
  try {
    const result = await Result.findById(req.params.id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Result not found.",
      });
    }

    await result.deleteOne();

    res.status(200).json({
      success: true,
      message: "Result deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// ===============================
// DASHBOARD STATS
// ===============================
exports.getResultStats = async (req, res, next) => {
  try {
    const totalResults = await Result.countDocuments();
    const pass = await Result.countDocuments({ status: "Pass" });
    const fail = await Result.countDocuments({ status: "Fail" });

    const avg = await Result.aggregate([
      {
        $group: {
          _id: null,
          averagePercentage: {
            $avg: "$percentage",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalResults,
        pass,
        fail,
        averagePercentage: avg[0]
          ? Number(avg[0].averagePercentage.toFixed(2))
          : 0,
      },
    });
  } catch (error) {
    next(error);
  }
};