const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
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
    },

    academicYear: {
      type: String,
      required: true,
      default: "2026-27",
    },

    // ==========================
    // Fee Breakdown
    // ==========================

    tuitionFee: {
      type: Number,
      default: 0,
    },

    examFee: {
      type: Number,
      default: 0,
    },

    libraryFee: {
      type: Number,
      default: 0,
    },

    developmentFee: {
      type: Number,
      default: 0,
    },

    sportsFee: {
      type: Number,
      default: 0,
    },

    hostelFee: {
      type: Number,
      default: 0,
    },

    transportFee: {
      type: Number,
      default: 0,
    },

    otherFee: {
      type: Number,
      default: 0,
    },

    totalFee: {
      type: Number,
      required: true,
    },

    // ==========================
    // Payment
    // ==========================

    paidAmount: {
      type: Number,
      default: 0,
    },

    dueAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      enum: [
        "Paid",
        "Partially Paid",
        "Pending",
      ],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: [
        "",
        "Cash",
        "UPI",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "Cheque",
      ],
      default: "",
    },

    transactionId: {
      type: String,
      default: "",
      trim: true,
    },

    paymentDate: {
      type: Date,
    },

    // ==========================
    // Receipt
    // ==========================

    receiptNumber: {
      type: String,
      required: true,
      unique: true,
    },

    remarks: {
      type: String,
      default: "",
      trim: true,
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

// Prevent duplicate fee records for the same student and semester

feeSchema.index(
  {
    student: 1,
    semester: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Fee", feeSchema);