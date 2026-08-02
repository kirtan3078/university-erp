const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createFee,
  getAllFees,
  getFeeById,
  updateFee,
  deleteFee,
  getFeeStats,
} = require("../controllers/feeController");

// =====================================
// Fee Statistics
// =====================================

router.get(
  "/stats",
  authMiddleware,
  getFeeStats
);

// =====================================
// Get All Fees
// =====================================

router.get(
  "/",
  authMiddleware,
  getAllFees
);

// =====================================
// Get Single Fee
// =====================================

router.get(
  "/:id",
  authMiddleware,
  getFeeById
);

// =====================================
// Create Fee
// =====================================

router.post(
  "/",
  authMiddleware,
  createFee
);

// =====================================
// Update Fee
// =====================================

router.put(
  "/:id",
  authMiddleware,
  updateFee
);

// =====================================
// Delete Fee
// =====================================

router.delete(
  "/:id",
  authMiddleware,
  deleteFee
);

module.exports = router;