import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

interface Student {
  _id: string;
  fullName: string;
  enrollmentNumber: string;
  department: string;
  course: string;
  semester: number;
}

export default function EditFee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("authToken");

  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState<Student[]>([]);

  const [student, setStudent] = useState("");

  const [studentName, setStudentName] = useState("");
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState(1);

  const [tuitionFee, setTuitionFee] = useState(0);
  const [examFee, setExamFee] = useState(0);
  const [libraryFee, setLibraryFee] = useState(0);
  const [otherFee, setOtherFee] = useState(0);

  const [paidAmount, setPaidAmount] = useState(0);

  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      fetchFee();
    }
  }, [students]);

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
          "Unable to fetch students."
      );

    }
  };

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

      const studentId =
        typeof fee.student === "string"
          ? fee.student
          : fee.student._id;

      setStudent(studentId);

      setStudentName(fee.studentName);
      setEnrollmentNumber(fee.enrollmentNumber);
      setDepartment(fee.department);
      setCourse(fee.course);
      setSemester(fee.semester);

      setTuitionFee(fee.tuitionFee);
      setExamFee(fee.examFee);
      setLibraryFee(fee.libraryFee);
      setOtherFee(fee.otherFee);

      setPaidAmount(fee.paidAmount);

      setRemarks(fee.remarks);

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ??
          "Unable to fetch fee."
      );

      navigate("/admin/fees");

    }
  };

  useEffect(() => {

    if (!student) return;

    const selected = students.find(
      (s) => s._id === student
    );

    if (!selected) return;

    setStudentName(selected.fullName);
    setEnrollmentNumber(selected.enrollmentNumber);
    setDepartment(selected.department);
    setCourse(selected.course);
    setSemester(selected.semester);

  }, [student, students]);

  const totalFee = useMemo(() => {

    return (
      Number(tuitionFee) +
      Number(examFee) +
      Number(libraryFee) +
      Number(otherFee)
    );

  }, [
    tuitionFee,
    examFee,
    libraryFee,
    otherFee,
  ]);

  const dueAmount = useMemo(() => {

    return totalFee - Number(paidAmount);

  }, [totalFee, paidAmount]);

  const status = useMemo(() => {

    if (dueAmount <= 0)
      return "Paid";

    if (paidAmount > 0)
      return "Partially Paid";

    return "Pending";

  }, [dueAmount, paidAmount]);
    const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!student) {
      toast.error("Please select a student.");
      return;
    }

    try {
      setLoading(true);

      await api.put(
        `/api/admin/fees/${id}`,
        {
          tuitionFee,
          examFee,
          libraryFee,
          otherFee,
          paidAmount,
          remarks,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Fee updated successfully.");

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

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Edit Fee
          </h1>

          <p className="mt-2 text-slate-400">
            Update student fee details.
          </p>

        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/fees")}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white hover:bg-slate-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* Student Information */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">

        <h2 className="mb-6 text-2xl font-semibold text-white">
          Student Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <input
            readOnly
            value={studentName}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            readOnly
            value={enrollmentNumber}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            readOnly
            value={department}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            readOnly
            value={course}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            readOnly
            value={`Semester ${semester}`}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

        </div>

      </div>

      {/* Fee Details */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">

        <h2 className="mb-6 text-2xl font-semibold text-white">
          Fee Details
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <input
            type="number"
            value={tuitionFee}
            onChange={(e) =>
              setTuitionFee(Number(e.target.value))
            }
            placeholder="Tuition Fee"
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            type="number"
            value={examFee}
            onChange={(e) =>
              setExamFee(Number(e.target.value))
            }
            placeholder="Exam Fee"
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            type="number"
            value={libraryFee}
            onChange={(e) =>
              setLibraryFee(Number(e.target.value))
            }
            placeholder="Library Fee"
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            type="number"
            value={otherFee}
            onChange={(e) =>
              setOtherFee(Number(e.target.value))
            }
            placeholder="Other Fee"
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            type="number"
            value={paidAmount}
            onChange={(e) =>
              setPaidAmount(Number(e.target.value))
            }
            placeholder="Paid Amount"
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
          />

          <input
            readOnly
            value={status}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-semibold text-cyan-400"
          />

        </div>

        <textarea
          rows={4}
          value={remarks}
          onChange={(e) =>
            setRemarks(e.target.value)
          }
          placeholder="Remarks..."
          className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
        />

      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-slate-900 p-6 text-center">

          <p className="text-slate-400">
            Total Fee
          </p>

          <h3 className="mt-3 text-3xl font-bold text-white">
            ₹{totalFee}
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-center">

          <p className="text-slate-400">
            Due Amount
          </p>

          <h3 className="mt-3 text-3xl font-bold text-red-400">
            ₹{dueAmount}
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-center">

          <p className="text-slate-400">
            Status
          </p>

          <h3 className="mt-3 text-3xl font-bold text-cyan-400">
            {status}
          </h3>

        </div>

      </div>

      {/* Update Button */}

      <div className="flex justify-end">

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-8 py-4 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
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
            : "Update Fee"}

        </button>

      </div>

    </form>
  );
}