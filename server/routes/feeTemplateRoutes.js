const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
  getTemplateStats,
} = require("../controllers/feeTemplateController");

// =====================================
// Template Statistics
// =====================================

router.get(
  "/stats",
  authMiddleware,
  getTemplateStats
);

// =====================================
// Get All Templates
// =====================================

router.get(
  "/",
  authMiddleware,
  getAllTemplates
);

// =====================================
// Get Single Template
// =====================================

router.get(
  "/:id",
  authMiddleware,
  getTemplateById
);

// =====================================
// Create Template
// =====================================

router.post(
  "/",
  authMiddleware,
  createTemplate
);

// =====================================
// Update Template
// =====================================

router.put(
  "/:id",
  authMiddleware,
  updateTemplate
);

// =====================================
// Delete Template
// =====================================

router.delete(
  "/:id",
  authMiddleware,
  deleteTemplate
);

module.exports = router;