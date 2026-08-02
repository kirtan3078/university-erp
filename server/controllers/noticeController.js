const Notice = require("../models/Notice");

// =====================================
// Create Notice
// =====================================

exports.createNotice = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      category,
      description,
      content,

      audience,
      department,
      course,
      semester,

      priority,
      publishDate,
      expiryDate,

      status,
      isPinned,
      isActive,
    } = req.body;

    const notice =
      await Notice.create({
        title,
        category,
        description,
        content,

        audience,
        department,
        course,
        semester,

        priority,

        publishDate,
        expiryDate,

        status,
        isPinned,
        isActive,

        attachments: [],

        createdBy: req.user.id,
      });

    res.status(201).json({
      success: true,
      message:
        "Notice created successfully.",
      notice,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================
// Get All Notices
// =====================================

exports.getAllNotices = async (
  req,
  res,
  next
) => {
  try {
    const notices =
      await Notice.find()
        .populate(
          "createdBy",
          "name email"
        )
        .sort({
          isPinned: -1,
          publishDate: -1,
        });

    res.status(200).json({
      success: true,
      count: notices.length,
      notices,
    });
  } catch (error) {
    next(error);
  }
};
// =====================================
// Get Single Notice
// =====================================

exports.getNoticeById = async (
  req,
  res,
  next
) => {
  try {
    const notice =
      await Notice.findById(
        req.params.id
      ).populate(
        "createdBy",
        "name email"
      );

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    // Increase View Count
    notice.viewCount += 1;
    await notice.save();

    res.status(200).json({
      success: true,
      notice,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================
// Update Notice
// =====================================

exports.updateNotice = async (
  req,
  res,
  next
) => {
  try {
    const {
      title,
      category,
      description,
      content,

      audience,
      department,
      course,
      semester,

      priority,
      publishDate,
      expiryDate,

      status,
      isPinned,
      isActive,
    } = req.body;

    const updatedNotice =
      await Notice.findByIdAndUpdate(
        req.params.id,
        {
          title,
          category,
          description,
          content,

          audience,
          department,
          course,
          semester,

          priority,
          publishDate,
          expiryDate,

          status,
          isPinned,
          isActive,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedNotice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Notice updated successfully.",
      notice: updatedNotice,
    });
  } catch (error) {
    console.error(error);

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
// =====================================
// Delete Notice
// =====================================

exports.deleteNotice = async (
  req,
  res,
  next
) => {
  try {
    const notice =
      await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    await notice.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Notice deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// =====================================
// Pin / Unpin Notice
// =====================================

exports.togglePinNotice = async (
  req,
  res,
  next
) => {
  try {
    const notice =
      await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    notice.isPinned = !notice.isPinned;

    await notice.save();

    res.status(200).json({
      success: true,
      message: notice.isPinned
        ? "Notice pinned successfully."
        : "Notice unpinned successfully.",
      notice,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================
// Publish / Draft / Archive Notice
// =====================================

exports.changeNoticeStatus = async (
  req,
  res,
  next
) => {
  try {
    const { status } = req.body;

    if (
      ![
        "Draft",
        "Published",
        "Archived",
      ].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const notice =
      await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found.",
      });
    }

    notice.status = status;

    await notice.save();

    res.status(200).json({
      success: true,
      message: `Notice ${status.toLowerCase()} successfully.`,
      notice,
    });
  } catch (error) {
    next(error);
  }
};
// =====================================
// Get Published Notices
// (Student / Faculty)
// =====================================

exports.getPublishedNotices = async (
  req,
  res,
  next
) => {
  try {
    const today = new Date();

    const notices = await Notice.find({
      status: "Published",
      isActive: true,
      $or: [
        {
          expiryDate: null,
        },
        {
          expiryDate: {
            $gte: today,
          },
        },
      ],
    })
      .populate(
        "createdBy",
        "name"
      )
      .sort({
        isPinned: -1,
        publishDate: -1,
      });

    res.status(200).json({
      success: true,
      count: notices.length,
      notices,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================
// Notice Statistics
// =====================================

exports.getNoticeStats = async (
  req,
  res,
  next
) => {
  try {
    const total =
      await Notice.countDocuments();

    const published =
      await Notice.countDocuments({
        status: "Published",
      });

    const draft =
      await Notice.countDocuments({
        status: "Draft",
      });

    const archived =
      await Notice.countDocuments({
        status: "Archived",
      });

    const pinned =
      await Notice.countDocuments({
        isPinned: true,
      });

    const active =
      await Notice.countDocuments({
        isActive: true,
      });

    const expired =
      await Notice.countDocuments({
        expiryDate: {
          $lt: new Date(),
        },
      });

    res.status(200).json({
      success: true,
      stats: {
        total,
        published,
        draft,
        archived,
        pinned,
        active,
        expired,
      },
    });
  } catch (error) {
    next(error);
  }
};