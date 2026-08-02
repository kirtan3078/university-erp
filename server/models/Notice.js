const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    // ===========================
    // Basic Information
    // ===========================

    title: {
      type: String,
      required: [true, "Notice title is required."],
      trim: true,
      maxlength: 200,
    },

    category: {
      type: String,
      required: [true, "Category is required."],
      enum: [
        "Academic",
        "Exam",
        "Fee",
        "Holiday",
        "Event",
        "Placement",
        "Scholarship",
        "Sports",
        "Library",
        "Hostel",
        "General",
      ],
    },

    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
      maxlength: 300,
    },

    content: {
      type: String,
      required: [true, "Notice content is required."],
      trim: true,
    },

    // ===========================
    // Target Audience
    // ===========================

    audience: {
      type: String,
      required: true,
      enum: [
        "Everyone",
        "Students",
        "Faculty",
        "Department",
        "Course",
        "Semester",
      ],
      default: "Everyone",
    },

    department: {
      type: String,
      trim: true,
      default: "",
    },

    course: {
      type: String,
      trim: true,
      default: "",
    },

    semester: {
      type: Number,
      min: 1,
      max: 8,
      default: null,
    },
        // ===========================
    // Notice Settings
    // ===========================

    priority: {
      type: String,
      enum: [
        "Low",
        "Medium",
        "High",
        "Urgent",
      ],
      default: "Medium",
    },

    status: {
      type: String,
      enum: [
        "Draft",
        "Published",
        "Archived",
      ],
      default: "Draft",
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    // ===========================
    // Publish Information
    // ===========================

    publishDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    expiryDate: {
      type: Date,
      default: null,
    },

    // ===========================
    // Attachments
    // ===========================

    attachments: [
      {
        fileName: {
          type: String,
          trim: true,
        },

        originalName: {
          type: String,
          trim: true,
        },

        fileUrl: {
          type: String,
          trim: true,
        },

        fileType: {
          type: String,
          trim: true,
        },

        fileSize: {
          type: Number,
          default: 0,
        },
      },
    ],
        // ===========================
    // Admin Information
    // ===========================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ===========================
    // Notice Analytics
    // ===========================

    viewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// ===========================
// Indexes
// ===========================

// Search by title
noticeSchema.index({
  title: "text",
});

// Frequently used filters
noticeSchema.index({
  category: 1,
});

noticeSchema.index({
  audience: 1,
});

noticeSchema.index({
  department: 1,
});

noticeSchema.index({
  course: 1,
});

noticeSchema.index({
  semester: 1,
});

noticeSchema.index({
  status: 1,
});

noticeSchema.index({
  priority: 1,
});

noticeSchema.index({
  publishDate: -1,
});

noticeSchema.index({
  expiryDate: 1,
});

noticeSchema.index({
  isPinned: -1,
  publishDate: -1,
});
// ===========================
// Validation
// ===========================

// Expiry date must be after publish date
noticeSchema.pre("validate", async function () {
  if (
    this.expiryDate &&
    this.publishDate &&
    this.expiryDate < this.publishDate
  ) {
    throw new Error(
      "Expiry date must be after publish date."
    );
  }
});

// ===========================
// Virtual Property
// ===========================

noticeSchema.virtual("isExpired").get(function () {
  if (!this.expiryDate) return false;

  return new Date() > this.expiryDate;
});

// Include virtuals in JSON
noticeSchema.set("toJSON", {
  virtuals: true,
});

noticeSchema.set("toObject", {
  virtuals: true,
});

// ===========================
// Export Model
// ===========================

module.exports = mongoose.model(
  "Notice",
  noticeSchema
);