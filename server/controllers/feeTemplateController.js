const FeeTemplate = require("../models/FeeTemplate");

// =======================================
// CREATE TEMPLATE
// =======================================
exports.createTemplate = async (req, res, next) => {
  try {
    const {
      templateName,
      department,
      course,
      semester,
      academicYear,

      tuitionFee,
      examFee,
      libraryFee,
      developmentFee,
      sportsFee,
      hostelFee,
      transportFee,
      otherFee,

      description,
    } = req.body;

    const totalFee =
      Number(tuitionFee || 0) +
      Number(examFee || 0) +
      Number(libraryFee || 0) +
      Number(developmentFee || 0) +
      Number(sportsFee || 0) +
      Number(hostelFee || 0) +
      Number(transportFee || 0) +
      Number(otherFee || 0);

    const exists = await FeeTemplate.findOne({
      department,
      course,
      semester,
      academicYear,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message:
          "Template already exists for this course and semester.",
      });
    }

    const template = await FeeTemplate.create({
      templateName,
      department,
      course,
      semester,
      academicYear,

      tuitionFee,
      examFee,
      libraryFee,
      developmentFee,
      sportsFee,
      hostelFee,
      transportFee,
      otherFee,

      totalFee,

      description,

      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Fee template created successfully.",
      template,
    });
  } catch (error) {
    next(error);
  }
};

// =======================================
// GET ALL TEMPLATES
// =======================================
exports.getAllTemplates = async (req, res, next) => {
  try {
    const templates = await FeeTemplate.find()
      .populate("createdBy", "fullName")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: templates.length,
      templates,
    });
  } catch (error) {
    next(error);
  }
};

// =======================================
// GET TEMPLATE BY ID
// =======================================
exports.getTemplateById = async (
  req,
  res,
  next
) => {
  try {
    const template =
      await FeeTemplate.findById(req.params.id)
        .populate(
          "createdBy",
          "fullName role"
        );

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found.",
      });
    }

    res.status(200).json({
      success: true,
      template,
    });
  } catch (error) {
    next(error);
  }
};

// =======================================
// UPDATE TEMPLATE
// =======================================
exports.updateTemplate = async (
  req,
  res
) => {
  try {
    const {
      templateName,
      department,
      course,
      semester,
      academicYear,

      tuitionFee,
      examFee,
      libraryFee,
      developmentFee,
      sportsFee,
      hostelFee,
      transportFee,
      otherFee,

      description,
      isActive,
    } = req.body;

    // ==========================
    // Calculate Total Fee
    // ==========================

    const totalFee =
      Number(tuitionFee || 0) +
      Number(examFee || 0) +
      Number(libraryFee || 0) +
      Number(developmentFee || 0) +
      Number(sportsFee || 0) +
      Number(hostelFee || 0) +
      Number(transportFee || 0) +
      Number(otherFee || 0);

    // ==========================
    // Update Template
    // ==========================

    const updatedTemplate =
      await FeeTemplate.findByIdAndUpdate(
        req.params.id,
        {
          templateName,
          department,
          course,
          semester,
          academicYear,

          tuitionFee,
          examFee,
          libraryFee,
          developmentFee,
          sportsFee,
          hostelFee,
          transportFee,
          otherFee,

          totalFee,

          description,
          isActive,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedTemplate) {
      return res.status(404).json({
        success: false,
        message: "Template not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Fee template updated successfully.",
      template: updatedTemplate,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "A template with the same Course, Semester, Academic Year or Template Name already exists.",
        duplicate: error.keyValue,
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
        errors: error.errors,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// DELETE TEMPLATE
// =======================================
exports.deleteTemplate = async (
  req,
  res,
  next
) => {
  try {
    const template =
      await FeeTemplate.findById(req.params.id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found.",
      });
    }

    await template.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Fee template deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// =======================================
// TEMPLATE STATS
// =======================================
exports.getTemplateStats = async (
  req,
  res,
  next
) => {
  try {
    const totalTemplates =
      await FeeTemplate.countDocuments();

    const activeTemplates =
      await FeeTemplate.countDocuments({
        isActive: true,
      });

    const inactiveTemplates =
      await FeeTemplate.countDocuments({
        isActive: false,
      });

    res.status(200).json({
      success: true,
      stats: {
        totalTemplates,
        activeTemplates,
        inactiveTemplates,
      },
    });
  } catch (error) {
  console.log("========== UPDATE TEMPLATE ERROR ==========");
  console.log(error);
  console.log(error.message);
  console.log(error.errors);

  return res.status(400).json({
    success: false,
    message: error.message,
    errors: error.errors,
  });
}
};  