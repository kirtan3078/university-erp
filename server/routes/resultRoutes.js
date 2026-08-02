const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createResult,
  getAllResults,
  getResultById,
  updateResult,
  deleteResult,
  getResultStats,
} = require("../controllers/resultController");

// Get Result Statistics
router.get("/stats", authMiddleware, getResultStats);

// Get All Results
router.get("/", authMiddleware, getAllResults);

// Get Single Result
router.get("/:id", authMiddleware, getResultById);

// Create Result
router.post("/", authMiddleware, createResult);

// Update Result
router.put("/:id", authMiddleware, updateResult);

// Delete Result
router.delete("/:id", authMiddleware, deleteResult);

module.exports = router;