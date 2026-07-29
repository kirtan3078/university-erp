const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getDashboardSummary = catchAsync(async (req, res) => {
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalFaculty = await User.countDocuments({ role: "faculty" });
  const totalAdmins = await User.countDocuments({ role: "admin" });

  const departments = await User.distinct("department", {
    department: { $ne: "" },
  });

  const recentStudents = await User.find({ role: "student" })
    .sort({ createdAt: -1 })
    .limit(5)
    .select(
      "fullName enrollmentNumber department course semester createdAt"
    );

  const growth = await User.aggregate([
    {
      $match: {
        role: "student",
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        students: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  const monthNames = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const studentGrowth = growth.map((item) => ({
    month: monthNames[item._id.month],
    students: item.students,
  }));

  res.status(200).json({
    success: true,

    summary: {
      totalStudents,
      totalFaculty,
      totalAdmins,
      departments: departments.length,
    },

    recentStudents,
    studentGrowth,
  });
});