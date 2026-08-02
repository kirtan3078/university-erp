const mongoose = require("mongoose");

const feeTemplateSchema = new mongoose.Schema(
  {
    templateName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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

    academicYear: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // Fee Breakdown
    // =========================

    tuitionFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    examFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    libraryFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    developmentFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    sportsFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    hostelFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    transportFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    otherFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalFee: {
      type: Number,
      required: true,
      default: 0,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate templates for the same course & semester
feeTemplateSchema.index(
  {
    department: 1,
    course: 1,
    semester: 1,
    academicYear: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "FeeTemplate",
  feeTemplateSchema
);