const Fee = require("../models/Fee");
const User = require("../models/User");

// =====================================
// CREATE FEE
// =====================================
exports.createFee = async (req, res, next) => {
  try {
 const {
  student,

  templateId,

  academicYear,

  tuitionFee,
  examFee,
  libraryFee,
  developmentFee,
  sportsFee,
  hostelFee,
  transportFee,
  otherFee,

  paidAmount,

  paymentStatus,
  paymentMethod,
  transactionId,
  paymentDate,

  remarks,
} = req.body;

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Student is required.",
      });
    }
    if (!templateId) {
  return res.status(400).json({
    success: false,
    message: "Fee template is required.",
  });
}

    const studentData = await User.findById(student);

    if (!studentData) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    const existingFee = await Fee.findOne({
      student,
      semester: studentData.semester,
    });

    if (existingFee) {
      return res.status(400).json({
        success: false,
        message: "Fee already created for this semester.",
      });
    }

const totalFee =
  Number(tuitionFee || 0) +
  Number(examFee || 0) +
  Number(libraryFee || 0) +
  Number(developmentFee || 0) +
  Number(sportsFee || 0) +
  Number(hostelFee || 0) +
  Number(transportFee || 0) +
  Number(otherFee || 0);

    const paid = Number(paidAmount || 0);
    const dueAmount = totalFee - paid;

    let status = "Pending";

    if (dueAmount <= 0) {
      status = "Paid";
    } else if (paid > 0) {
      status = "Partially Paid";
    }

const count = await Fee.countDocuments();

const year = new Date().getFullYear();

const receiptNumber = `UNI-ERP-${year}-${String(
  count + 1
).padStart(6, "0")}`;

    const fee = await Fee.create({
      student,
      enrollmentNumber:
        studentData.enrollmentNumber,
      studentName:
        studentData.fullName,
      department:
        studentData.department,
      course: studentData.course,
      semester:
        studentData.semester,

    academicYear,
    feeTemplate: templateId,

tuitionFee,
examFee,
libraryFee,
developmentFee,
sportsFee,
hostelFee,
transportFee,
otherFee,

totalFee,

paidAmount,
dueAmount,

paymentStatus,
paymentMethod,
transactionId,
paymentDate,

receiptNumber,

remarks,

createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Fee created successfully.",
      fee,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET ALL FEES
// =====================================
exports.getAllFees = async (req, res, next) => {
  try {
    const fees = await Fee.find()
      .populate(
        "student",
        "fullName enrollmentNumber"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: fees.length,
      fees,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================
// GET SINGLE FEE
// =====================================
exports.getFeeById = async (req, res, next) => {
  try {
 const fee = await Fee.findById(req.params.id)
  .populate(
    "student",
    "fullName enrollmentNumber"
  )
  .populate(
    "feeTemplate"
  )
  .populate(
    "createdBy",
    "fullName role"
  );

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found.",
      });
    }

    res.status(200).json({
      success: true,
      fee,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================
// UPDATE FEE
// =====================================
exports.updateFee = async (req, res, next) => {
  try {
   const {
  academicYear,

  tuitionFee,
  examFee,
  libraryFee,
  developmentFee,
  sportsFee,
  hostelFee,
 transportFee,
  otherFee,

  paidAmount,

  paymentStatus,
  paymentMethod,
  transactionId,
  paymentDate,

  remarks,
} = req.body;
    const fee = await Fee.findById(
      req.params.id
    );

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found.",
      });
    }

const totalFee =
Number(tuitionFee || 0)+
Number(examFee || 0)+
Number(libraryFee || 0)+
Number(developmentFee || 0)+
Number(sportsFee || 0)+
Number(hostelFee || 0)+
Number(transportFee || 0)+
Number(otherFee || 0);

    const paid = Number(paidAmount || 0);

    const dueAmount = totalFee - paid;

    let status = "Pending";

    if (dueAmount <= 0) {
      status = "Paid";
    } else if (paid > 0) {
      status = "Partially Paid";
    }

 fee.academicYear = academicYear;
fee.feeTemplate = req.body.feeTemplate;
fee.tuitionFee = tuitionFee;
fee.examFee = examFee;
fee.libraryFee = libraryFee;
fee.developmentFee = developmentFee;
fee.sportsFee = sportsFee;
fee.hostelFee = hostelFee;
fee.transportFee = transportFee;
fee.otherFee = otherFee;

fee.totalFee = totalFee;
fee.paidAmount = paidAmount;
fee.dueAmount = dueAmount;

fee.paymentStatus = status;
fee.paymentMethod = paymentMethod;
fee.transactionId = transactionId;
fee.paymentDate = paymentDate;

fee.remarks = remarks;

    await fee.save();

    res.status(200).json({
      success: true,
      message: "Fee updated successfully.",
      fee,
    });
  } catch (error) {
    next(error);
  }
};

// =====================================
// DELETE FEE
// =====================================
exports.deleteFee = async (req, res, next) => {
  try {
    const fee = await Fee.findById(
      req.params.id
    );

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee record not found.",
      });
    }

    await fee.deleteOne();

    res.status(200).json({
      success: true,
      message: "Fee deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// =====================================
// FEE STATISTICS
// =====================================
exports.getFeeStats = async (req, res, next) => {
  try {
    const totalFees =
      await Fee.countDocuments();

    const paid =
      await Fee.countDocuments({
        PaymentStatus: "Paid",
      });

    const pending =
      await Fee.countDocuments({
        PaymentStatus: "Pending",
      });

    const collection =
      await Fee.aggregate([
        {
          $group: {
            _id: null,
            totalCollection: {
              $sum: "$paidAmount",
            },
          },
        },
      ]);

    res.status(200).json({
      success: true,
      stats: {
        totalFees,
        paid,
        pending,
        totalCollection:
          collection[0]?.totalCollection || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};