const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
      trim: true,
    },
    marksObtained: {
      type: Number,
      required: true,
      min: 0,
    },
    totalMarks: {
      type: Number,
      required: true,
      min: 1,
    },
    grade: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const resultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    enrollmentNumber: {
      type: String,
      required: true,
      trim: true,
    },

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
    },

    subjects: {
      type: [subjectSchema],
      validate: [(arr) => arr.length > 0, "At least one subject is required"],
    },

    totalMarks: {
      type: Number,
      required: true,
      default: 0,
    },

    obtainedMarks: {
      type: Number,
      required: true,
      default: 0,
    },

    percentage: {
      type: Number,
      required: true,
      default: 0,
    },

    sgpa: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Pass", "Fail"],
      default: "Pass",
    },

    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    publishedDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate results for the same semester
resultSchema.index(
  {
    student: 1,
    semester: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Result", resultSchema);