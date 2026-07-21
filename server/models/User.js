const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullName is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    enrollmentNumber: {
      type: String,
      trim: true,
      default: "",
    },

    employeeId: {
      type: String,
      trim: true,
      default: "",
    },

    mobileNumber: {
      type: String,
      trim: true,
      default: "",
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
      default: 1,
    },

    profileImage: {
      type: String,
      default: "",
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    role: {
      type: String,
      enum: ["student", "faculty", "admin"],
      default: "student",
    },

    isActivated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);