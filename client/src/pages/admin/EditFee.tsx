import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  ArrowLeft,
  Loader2,
  Save,
  User,
  GraduationCap,
  Building2,
  BookOpen,
  Calendar,
  IndianRupee,
  CreditCard,
  Wallet,
  FileText,
} from "lucide-react";

import toast from "react-hot-toast";

import api from "../../services/api";
// ========================================
// Student Interface
// ========================================

interface Student {
  _id: string;
  fullName: string;
  enrollmentNumber: string;
  department: string;
  course: string;
  semester: number;
}

// ========================================
// Fee Template Interface
// ========================================

interface FeeTemplate {
  _id: string;

  templateName: string;

  department: string;

  course: string;

  semester: number;

  academicYear: string;

  tuitionFee: number;

  examFee: number;

  libraryFee: number;

  developmentFee: number;

  sportsFee: number;

  hostelFee: number;

  transportFee: number;

  otherFee: number;

  totalFee: number;
}
export default function EditFee() {

  const navigate = useNavigate();

  const { id } = useParams();

  const token = localStorage.getItem("authToken");

  // ========================================
  // Loading
  // ========================================

  const [loading, setLoading] =
    useState(false);

  // ========================================
  // Collections
  // ========================================

  const [students, setStudents] =
    useState<Student[]>([]);

  const [feeTemplates, setFeeTemplates] =
    useState<FeeTemplate[]>([]);

  // ========================================
  // Student
  // ========================================

  const [student, setStudent] =
    useState("");

  const [studentName, setStudentName] =
    useState("");

  const [enrollmentNumber, setEnrollmentNumber] =
    useState("");

  const [department, setDepartment] =
    useState("");

  const [course, setCourse] =
    useState("");

  const [semester, setSemester] =
    useState(1);

  // ========================================
  // Fee Template
  // ========================================

  const [selectedTemplate, setSelectedTemplate] =
    useState("");

  const [academicYear, setAcademicYear] =
    useState("2026-27");

  // ========================================
  // Fee Heads
  // ========================================

  const [tuitionFee, setTuitionFee] =
    useState(0);

  const [examFee, setExamFee] =
    useState(0);

  const [libraryFee, setLibraryFee] =
    useState(0);

  const [developmentFee, setDevelopmentFee] =
    useState(0);

  const [sportsFee, setSportsFee] =
    useState(0);

  const [hostelFee, setHostelFee] =
    useState(0);

  const [transportFee, setTransportFee] =
    useState(0);

  const [otherFee, setOtherFee] =
    useState(0);

  // ========================================
  // Payment
  // ========================================

  const [paidAmount, setPaidAmount] =
    useState(0);

  const [paymentStatus, setPaymentStatus] =
    useState("Pending");

  const [paymentMethod, setPaymentMethod] =
    useState("");

  const [transactionId, setTransactionId] =
    useState("");

  const [paymentDate, setPaymentDate] =
    useState("");

  const [remarks, setRemarks] =
    useState("");

  // ========================================
  // Initial Load
  // ========================================

  useEffect(() => {
    fetchStudents();
    fetchFeeTemplates();
  }, []);

  useEffect(() => {
    if (
      students.length > 0 &&
      feeTemplates.length > 0
    ) {
      fetchFee();
    }
  }, [students, feeTemplates]);

  // ========================================
  // Fetch Students
  // ========================================

  const fetchStudents = async () => {
    try {
      const res = await api.get(
        "/api/admin/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(res.data.students);

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ??
          "Unable to load students."
      );

    }
  };

  // ========================================
  // Fetch Fee Templates
  // ========================================

  const fetchFeeTemplates = async () => {
    try {

      const res = await api.get(
        "/api/admin/fee-templates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeeTemplates(
        res.data.templates
      );

    } catch (err: any) {

      toast.error(
        "Unable to load fee templates."
      );

    }
  };

  // ========================================
  // Fetch Existing Fee
  // ========================================

  const fetchFee = async () => {
    try {

      const res = await api.get(
        `/api/admin/fees/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fee = res.data.fee;

      setStudent(
        typeof fee.student === "string"
          ? fee.student
          : fee.student._id
      );

      setStudentName(
        fee.studentName
      );

      setEnrollmentNumber(
        fee.enrollmentNumber
      );

      setDepartment(
        fee.department
      );

      setCourse(
        fee.course
      );

      setSemester(
        fee.semester
      );

      setAcademicYear(
        fee.academicYear
      );

      // Template
      if (fee.feeTemplate?._id) {
        setSelectedTemplate(
          fee.feeTemplate._id
        );
      }

      // Fee Heads
      setTuitionFee(
        fee.tuitionFee
      );

      setExamFee(
        fee.examFee
      );

      setLibraryFee(
        fee.libraryFee
      );

      setDevelopmentFee(
        fee.developmentFee
      );

      setSportsFee(
        fee.sportsFee
      );

      setHostelFee(
        fee.hostelFee
      );

      setTransportFee(
        fee.transportFee
      );

      setOtherFee(
        fee.otherFee
      );

      // Payment
      setPaidAmount(
        fee.paidAmount
      );

      setPaymentStatus(
        fee.paymentStatus
      );

      setPaymentMethod(
        fee.paymentMethod
      );

      setTransactionId(
        fee.transactionId
      );

      setPaymentDate(
        fee.paymentDate
          ? fee.paymentDate
              .substring(0, 10)
          : ""
      );

      setRemarks(
        fee.remarks
      );

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ??
          "Unable to load fee."
      );

      navigate("/admin/fees");

    }
  };

    // ========================================
  // Student Auto Fill
  // ========================================

  useEffect(() => {

    if (!student) return;

    const selectedStudent = students.find(
      (s) => s._id === student
    );

    if (!selectedStudent) return;

    setStudentName(
      selectedStudent.fullName
    );

    setEnrollmentNumber(
      selectedStudent.enrollmentNumber
    );

    setDepartment(
      selectedStudent.department
    );

    setCourse(
      selectedStudent.course
    );

    setSemester(
      selectedStudent.semester
    );

  }, [student, students]);

  // ========================================
  // Available Templates
  // ========================================

  const availableTemplates = useMemo(() => {

    return feeTemplates.filter(
      (template) =>
        template.course === course &&
        template.department === department &&
        Number(template.semester) ===
          Number(semester)
    );

  }, [
    feeTemplates,
    course,
    department,
    semester,
  ]);

  // ========================================
  // Load Template Values
  // ========================================

  useEffect(() => {

    if (!selectedTemplate) return;

    const template = feeTemplates.find(
      (t) => t._id === selectedTemplate
    );

    if (!template) return;

    setAcademicYear(
      template.academicYear
    );

    setTuitionFee(
      template.tuitionFee
    );

    setExamFee(
      template.examFee
    );

    setLibraryFee(
      template.libraryFee
    );

    setDevelopmentFee(
      template.developmentFee
    );

    setSportsFee(
      template.sportsFee
    );

    setHostelFee(
      template.hostelFee
    );

    setTransportFee(
      template.transportFee
    );

    setOtherFee(
      template.otherFee
    );

  }, [
    selectedTemplate,
    feeTemplates,
  ]);

  // ========================================
  // Total Fee
  // ========================================

  const totalFee = useMemo(() => {

    return (
      Number(tuitionFee) +
      Number(examFee) +
      Number(libraryFee) +
      Number(developmentFee) +
      Number(sportsFee) +
      Number(hostelFee) +
      Number(transportFee) +
      Number(otherFee)
    );

  }, [
    tuitionFee,
    examFee,
    libraryFee,
    developmentFee,
    sportsFee,
    hostelFee,
    transportFee,
    otherFee,
  ]);

  // ========================================
  // Due Amount
  // ========================================

  const dueAmount = useMemo(() => {

    return Math.max(
      totalFee - Number(paidAmount),
      0
    );

  }, [
    totalFee,
    paidAmount,
  ]);
  // ========================================
// Update Fee
// ========================================

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {

  e.preventDefault();

  if (!student) {
    toast.error(
      "Please select a student."
    );
    return;
  }

  if (!selectedTemplate) {
    toast.error(
      "Please select a fee template."
    );
    return;
  }

  try {

    setLoading(true);

    await api.put(
      `/api/admin/fees/${id}`,
      {
        feeTemplate: selectedTemplate,

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

        paidAmount,
        dueAmount,

        paymentStatus,
        paymentMethod,
        transactionId,
        paymentDate,

        remarks,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success(
      "Fee updated successfully."
    );

    navigate("/admin/fees");

  } catch (err: any) {

    toast.error(
      err.response?.data?.message ??
      "Unable to update fee."
    );

  } finally {

    setLoading(false);

  }

};
return (

  <form
    onSubmit={handleSubmit}
    className="mx-auto max-w-7xl space-y-8 animate-in fade-in duration-500"
  >

    {/* ========================= */}
    {/* Header */}
    {/* ========================= */}

    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Edit Fee Record
        </h1>

        <p className="mt-2 text-slate-400">
          Update student fee details using the assigned fee template.
        </p>

      </div>

      <button
        type="button"
        onClick={() =>
          navigate("/admin/fees")
        }
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-700
          bg-slate-800
          px-5
          py-3
          text-white
          transition
          hover:bg-slate-700
        "
      >

        <ArrowLeft size={18} />

        Back

      </button>

    </div>
        {/* ========================= */}
    {/* Student Information */}
    {/* ========================= */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

      <div className="border-b border-slate-700 px-8 py-6">

        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">

          <User className="text-cyan-400" />

          Student Information

        </h2>

      </div>

      <div className="grid gap-6 p-8 md:grid-cols-2">

        {/* Enrollment */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Enrollment Number
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">

            <GraduationCap
              size={18}
              className="text-cyan-400"
            />

            <input
              readOnly
              value={enrollmentNumber}
              className="w-full bg-transparent text-white outline-none"
            />

          </div>

        </div>

        {/* Student Name */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Student Name
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">

            <User
              size={18}
              className="text-cyan-400"
            />

            <input
              readOnly
              value={studentName}
              className="w-full bg-transparent text-white outline-none"
            />

          </div>

        </div>

        {/* Department */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Department
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">

            <Building2
              size={18}
              className="text-cyan-400"
            />

            <input
              readOnly
              value={department}
              className="w-full bg-transparent text-white outline-none"
            />

          </div>

        </div>

        {/* Course */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Course
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">

            <BookOpen
              size={18}
              className="text-cyan-400"
            />

            <input
              readOnly
              value={course}
              className="w-full bg-transparent text-white outline-none"
            />

          </div>

        </div>

        {/* Semester */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Semester
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">

            <Calendar
              size={18}
              className="text-cyan-400"
            />

            <input
              readOnly
              value={
                semester
                  ? `Semester ${semester}`
                  : ""
              }
              className="w-full bg-transparent text-white outline-none"
            />

          </div>

        </div>

        {/* Academic Year */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Academic Year
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3">

            <Calendar
              size={18}
              className="text-cyan-400"
            />

            <input
              readOnly
              value={academicYear}
              className="w-full bg-transparent text-white outline-none"
            />

          </div>

        </div>

      </div>

    </div>
        {/* ========================= */}
    {/* Fee Template */}
    {/* ========================= */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

      <div className="border-b border-slate-700 px-8 py-6">

        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">

          <FileText className="text-yellow-400" />

          Fee Template

        </h2>

        <p className="mt-2 text-slate-400">
          Change the fee template if a different fee structure should be applied.
        </p>

      </div>

      <div className="grid gap-6 p-8 md:grid-cols-2">

        {/* Fee Template */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Fee Template
          </label>

          <select
            value={selectedTemplate}
            onChange={(e) =>
              setSelectedTemplate(e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-cyan-500
            "
          >

            <option value="">
              Select Fee Template
            </option>

            {availableTemplates.map((template) => (

              <option
                key={template._id}
                value={template._id}
              >
                {template.templateName}
              </option>

            ))}

          </select>

        </div>

        {/* Academic Year */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Academic Year
          </label>

          <input
            readOnly
            value={academicYear}
            className="
              w-full
              rounded-xl
              border
              border-slate-700
              bg-slate-800
              px-4
              py-3
              text-white
              outline-none
            "
          />

        </div>

      </div>

    </div>
        {/* ========================= */}
    {/* Fee Breakdown */}
    {/* ========================= */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

      <div className="border-b border-slate-700 px-8 py-6">

        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">

          <IndianRupee className="text-green-400" />

          Fee Breakdown

        </h2>

        <p className="mt-2 text-slate-400">
          Fee amounts are automatically loaded from the selected fee template.
        </p>

      </div>

      {!selectedTemplate ? (

        <div className="p-10 text-center text-slate-400">

          Please select a{" "}
          <span className="font-semibold text-cyan-400">
            Fee Template
          </span>{" "}
          to load the fee structure.

        </div>

      ) : (

        <div className="grid gap-6 p-8 md:grid-cols-2">

          {/* Tuition Fee */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Tuition Fee
            </label>

            <input
              readOnly
              value={`₹ ${tuitionFee.toLocaleString()}`}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />

          </div>

          {/* Exam Fee */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Exam Fee
            </label>

            <input
              readOnly
              value={`₹ ${examFee.toLocaleString()}`}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />

          </div>

          {/* Library Fee */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Library Fee
            </label>

            <input
              readOnly
              value={`₹ ${libraryFee.toLocaleString()}`}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />

          </div>

          {/* Development Fee */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Development Fee
            </label>

            <input
              readOnly
              value={`₹ ${developmentFee.toLocaleString()}`}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />

          </div>

          {/* Sports Fee */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Sports Fee
            </label>

            <input
              readOnly
              value={`₹ ${sportsFee.toLocaleString()}`}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />

          </div>

          {/* Hostel Fee */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Hostel Fee
            </label>

            <input
              readOnly
              value={`₹ ${hostelFee.toLocaleString()}`}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />

          </div>

          {/* Transport Fee */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Transport Fee
            </label>

            <input
              readOnly
              value={`₹ ${transportFee.toLocaleString()}`}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />

          </div>

          {/* Other Fee */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Other Fee
            </label>

            <input
              readOnly
              value={`₹ ${otherFee.toLocaleString()}`}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />

          </div>

          {/* Total Fee */}

          <div className="md:col-span-2">

            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6">

              <div className="flex items-center justify-between">

                <span className="text-lg font-semibold text-white">
                  Total Fee
                </span>

                <span className="text-3xl font-bold text-cyan-400">
                  ₹ {totalFee.toLocaleString()}
                </span>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
        {/* ========================= */}
    {/* Payment Details */}
    {/* ========================= */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

      <div className="border-b border-slate-700 px-8 py-6">

        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">

          <CreditCard className="text-cyan-400" />

          Payment Details

        </h2>

        <p className="mt-2 text-slate-400">
          Update payment information for this fee record.
        </p>

      </div>

      <div className="grid gap-6 p-8 md:grid-cols-2">

        {/* Payment Status */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Payment Status
          </label>

          <select
            value={paymentStatus}
            onChange={(e) => {
              const status = e.target.value;

              setPaymentStatus(status);

              if (status === "Pending") {
                setPaidAmount(0);
                setPaymentMethod("");
                setTransactionId("");
                setPaymentDate("");
              }

              if (status === "Paid") {
                setPaidAmount(totalFee);
              }
            }}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          >

            <option value="Pending">
              Pending
            </option>

            <option value="Partially Paid">
              Partially Paid
            </option>

            <option value="Paid">
              Paid
            </option>

          </select>

        </div>

        {/* Paid Amount */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Paid Amount
          </label>

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800">

            <span className="px-4 text-green-400">
              ₹
            </span>

            <input
              type="number"
              value={paidAmount}
              readOnly={paymentStatus === "Paid"}
              onChange={(e) =>
                setPaidAmount(Number(e.target.value))
              }
              className="w-full bg-transparent py-3 pr-4 text-white outline-none"
            />

          </div>

        </div>

        {/* Due Amount */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Due Amount
          </label>

          <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800">

            <span className="px-4 text-red-400">
              ₹
            </span>

            <input
              readOnly
              value={dueAmount}
              className="w-full bg-transparent py-3 pr-4 text-white outline-none"
            />

          </div>

        </div>

        {/* Payment Method */}

        {(paymentStatus === "Paid" ||
          paymentStatus === "Partially Paid") && (

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Payment Method
            </label>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            >

              <option value="">
                Select Method
              </option>

              <option value="Cash">
                💵 Cash
              </option>

              <option value="UPI">
                📱 UPI
              </option>

              <option value="Credit Card">
                💳 Credit Card
              </option>

              <option value="Debit Card">
                💳 Debit Card
              </option>

              <option value="Net Banking">
                🏦 Net Banking
              </option>

              <option value="Cheque">
                🧾 Cheque
              </option>

            </select>

          </div>

        )}

        {/* Payment Date */}

        {(paymentStatus === "Paid" ||
          paymentStatus === "Partially Paid") && (

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Payment Date
            </label>

            <input
              type="date"
              value={paymentDate}
              onChange={(e) =>
                setPaymentDate(e.target.value)
              }
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />

          </div>

        )}

        {/* Transaction ID */}

        {(paymentMethod === "UPI" ||
          paymentMethod === "Credit Card" ||
          paymentMethod === "Debit Card" ||
          paymentMethod === "Net Banking") && (

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Transaction ID
            </label>

            <input
              type="text"
              value={transactionId}
              onChange={(e) =>
                setTransactionId(e.target.value)
              }
              placeholder="Enter Transaction ID"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
            />

          </div>

        )}

        {/* Remarks */}

        <div className="md:col-span-2">

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Remarks
          </label>

          <textarea
            rows={4}
            value={remarks}
            onChange={(e) =>
              setRemarks(e.target.value)
            }
            placeholder="Optional remarks..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

        </div>

      </div>

    </div>
        {/* ========================= */}
    {/* Fee Summary */}
    {/* ========================= */}

    <div className="rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">

      <div className="border-b border-slate-700 px-8 py-6">

        <h2 className="flex items-center gap-3 text-2xl font-bold text-white">

          <Wallet className="text-green-400" />

          Fee Summary

        </h2>

      </div>

      <div className="grid gap-6 p-8 md:grid-cols-4">

        {/* Total Fee */}

        <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-slate-900 p-6">

          <p className="text-sm text-slate-400">
            Total Fee
          </p>

          <h2 className="mt-4 text-3xl font-bold text-cyan-400">
            ₹ {totalFee.toLocaleString()}
          </h2>

        </div>

        {/* Paid Amount */}

        <div className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-slate-900 p-6">

          <p className="text-sm text-slate-400">
            Paid Amount
          </p>

          <h2 className="mt-4 text-3xl font-bold text-green-400">
            ₹ {paidAmount.toLocaleString()}
          </h2>

        </div>

        {/* Due Amount */}

        <div className="rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-slate-900 p-6">

          <p className="text-sm text-slate-400">
            Due Amount
          </p>

          <h2 className="mt-4 text-3xl font-bold text-red-400">
            ₹ {dueAmount.toLocaleString()}
          </h2>

        </div>

        {/* Payment Status */}

        <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-slate-900 p-6">

          <p className="text-sm text-slate-400">
            Payment Status
          </p>

          <h2
            className={`mt-4 text-xl font-bold ${
              paymentStatus === "Paid"
                ? "text-green-400"
                : paymentStatus === "Pending"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {paymentStatus}
          </h2>

        </div>

      </div>

    </div>
        {/* ========================= */}
    {/* Action Buttons */}
    {/* ========================= */}

    <div className="flex justify-end gap-4">

      {/* Cancel */}

      <button
        type="button"
        onClick={() => navigate("/admin/fees")}
        className="
          rounded-xl
          border
          border-slate-700
          bg-slate-800
          px-8
          py-4
          font-semibold
          text-white
          transition
          hover:bg-slate-700
        "
      >
        Cancel
      </button>

      {/* Update */}

      <button
        type="submit"
        disabled={
          loading ||
          !selectedTemplate
        }
        className="
          flex
          items-center
          gap-3
          rounded-xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          px-8
          py-4
          font-semibold
          text-white
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:from-cyan-400
          hover:to-blue-500
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >

        {loading ? (

          <Loader2
            size={20}
            className="animate-spin"
          />

        ) : (

          <Save size={20} />

        )}

        {loading
          ? "Updating..."
          : "Update Fee Record"}

      </button>

    </div>
      </form>

);
}