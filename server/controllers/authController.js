const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET || "unierp-secret",
    { expiresIn: "7d" }
  );
};

const sendAuthResponse = (res, user, statusCode = 200) => {
  const token = signToken(user);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    success: true,
    message: "Authentication successful",
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      enrollmentNumber: user.enrollmentNumber,
      employeeId: user.employeeId,
      mobileNumber: user.mobileNumber,
      department: user.department,
      course: user.course,
      semester: user.semester,
      profileImage: user.profileImage,
      role: user.role,
      isActivated: user.isActivated,
    },
  });
};

const getLoginIdentifier = (body) => body.email || body.enrollmentNumber || body.employeeId || body.identifier || "";

exports.studentLogin = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const identifier = getLoginIdentifier(req.body);

  if (!identifier || !password) {
    return next(new AppError("Enrollment number and password are required", 400));
  }

  const user = await User.findOne({
    role: "student",
    $or: [{ email: identifier }, { enrollmentNumber: identifier }],
  });

  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  if (!user.isActivated) {
    return next(new AppError("Account is not activated yet", 403));
  }

  sendAuthResponse(res, user, 200);
});

exports.facultyLogin = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const identifier = getLoginIdentifier(req.body);

  if (!identifier || !password) {
    return next(new AppError("Employee ID and password are required", 400));
  }

  const user = await User.findOne({
    role: "faculty",
    $or: [{ email: identifier }, { employeeId: identifier }],
  });

  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  if (!user.isActivated) {
    return next(new AppError("Account is not activated yet", 403));
  }

  sendAuthResponse(res, user, 200);
});

exports.adminLogin = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const identifier = getLoginIdentifier(req.body);

  if (!identifier || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  const user = await User.findOne({ role: "admin", email: identifier });

  if (!user) {
    return next(new AppError("Invalid credentials", 401));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Invalid credentials", 401));
  }

  if (!user.isActivated) {
    return next(new AppError("Account is not activated yet", 403));
  }

  sendAuthResponse(res, user, 200);
});

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
});

exports.activate = catchAsync(async (req, res, next) => {
  const { email, activationCode } = req.body;

  if (!email || !activationCode) {
    return next(new AppError("Email and activation code are required", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (user.isActivated) {
    return res.status(200).json({ success: true, message: "Account already activated" });
  }

  if (activationCode !== process.env.ACTIVATION_CODE) {
    return next(new AppError("Invalid activation code", 401));
  }

  user.isActivated = true;
  await user.save();

  res.status(200).json({ success: true, message: "Account activated successfully" });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const tempPassword = Math.random().toString(36).slice(-8);
  user.password = await bcrypt.hash(tempPassword, 10);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Temporary password generated successfully",
    tempPassword,
  });
});

exports.studentRegister = catchAsync(async (req, res, next) => {

  console.log("===== REGISTER REQUEST =====");
  console.log(req.body);
  console.log("============================");

  const {
    fullName,
    enrollmentNumber,
    email,
    mobileNumber,
    department,
    course,
    semester,
    password,
    confirmPassword,
  } = req.body;

  if (!fullName || !enrollmentNumber || !email || !mobileNumber || !department || !course || !semester || !password || !confirmPassword) {
    return next(new AppError("All fields are required", 400));
  }

  if (password.length < 6) {
    return next(new AppError("Password must be at least 6 characters", 400));
  }

  if (password !== confirmPassword) {
    return next(new AppError("Passwords do not match", 400));
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { enrollmentNumber }],
  });

  if (existingUser) {
    return next(new AppError("A student with this email or enrollment number already exists", 409));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    enrollmentNumber,
    employeeId: "",
    password: hashedPassword,
    role: "student",
    isActivated: true,
    mobileNumber,
    department,
    course,
    semester,
  });

  res.status(201).json({
    success: true,
    message: "Student registered successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      enrollmentNumber: user.enrollmentNumber,
      role: user.role,
      isActivated: user.isActivated,
    },
  });
});

exports.createTestStudent = catchAsync(async (req, res, next) => {
  const testStudent = {
    fullName: "Kirtan Vavadiya",
    email: "kirtan@example.com",
    enrollmentNumber: "20250001",
    employeeId: "",
    password: await bcrypt.hash("123456", 10),
    role: "student",
    isActivated: true,
  };

  const existingUser = await User.findOne({
    $or: [{ email: testStudent.email }, { enrollmentNumber: testStudent.enrollmentNumber }],
  });

  if (existingUser) {
    return res.status(200).json({
      success: true,
      message: "Test student already exists",
      user: {
        id: existingUser._id,
        fullName: existingUser.fullName,
        email: existingUser.email,
        enrollmentNumber: existingUser.enrollmentNumber,
      },
    });
  }

  const user = await User.create(testStudent);

  res.status(201).json({
    success: true,
    message: "Test student created successfully",
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      enrollmentNumber: user.enrollmentNumber,
      role: user.role,
      isActivated: user.isActivated,
    },
  });
});

exports.getStudentProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    return next(new AppError("Student not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});