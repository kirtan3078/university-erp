import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  User,
  GraduationCap,
  Building2,
  BookOpen,
  Receipt,
  Wallet,
  Calendar,
  BadgeCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

interface CreatedBy {
  fullName: string;
  role: string;
}

interface Fee {
  _id: string;

  studentName: string;
  enrollmentNumber: string;

  department: string;
  course: string;
  semester: number;

  tuitionFee: number;
  examFee: number;
  libraryFee: number;
  otherFee: number;

  totalFee: number;
  paidAmount: number;
  dueAmount: number;

  status: string;

  paymentDate: string;

  receiptNumber: string;

  remarks: string;

  createdBy?: CreatedBy;
}

export default function ViewFee() {
  const navigate = useNavigate();

  const { id } = useParams();

  const token = localStorage.getItem("authToken");

  const [loading, setLoading] = useState(true);

  const [fee, setFee] = useState<Fee | null>(null);

  useEffect(() => {
    fetchFee();
  }, []);

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

      setFee(res.data.fee);

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ??
          "Unable to fetch fee."
      );

      navigate("/admin/fees");

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2
          size={45}
          className="animate-spin text-cyan-400"
        />
      </div>
    );
  }

  if (!fee) return null;

  return (
    <div className="mx-auto max-w-7xl space-y-8 animate-in fade-in duration-500">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Fee Receipt
          </h1>

          <p className="mt-2 text-slate-400">
            Complete fee payment details.
          </p>

        </div>

        <button
          onClick={() => navigate("/admin/fees")}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white hover:bg-slate-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* Student */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">

        <h2 className="mb-6 text-2xl font-semibold text-white">
          Student Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <InfoRow
            icon={<User size={20} />}
            label="Student"
            value={fee.studentName}
          />

          <InfoRow
            icon={<GraduationCap size={20} />}
            label="Enrollment"
            value={fee.enrollmentNumber}
          />

          <InfoRow
            icon={<Building2 size={20} />}
            label="Department"
            value={fee.department}
          />

          <InfoRow
            icon={<BookOpen size={20} />}
            label="Course"
            value={fee.course}
          />

          <InfoRow
            icon={<Calendar size={20} />}
            label="Semester"
            value={`Semester ${fee.semester}`}
          />

        </div>

      </div>
            {/* Fee Breakdown */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">

        <h2 className="mb-6 text-2xl font-semibold text-white">
          Fee Breakdown
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <InfoRow
            icon={<Wallet size={20} />}
            label="Tuition Fee"
            value={`₹${fee.tuitionFee}`}
          />

          <InfoRow
            icon={<Wallet size={20} />}
            label="Exam Fee"
            value={`₹${fee.examFee}`}
          />

          <InfoRow
            icon={<Wallet size={20} />}
            label="Library Fee"
            value={`₹${fee.libraryFee}`}
          />

          <InfoRow
            icon={<Wallet size={20} />}
            label="Other Fee"
            value={`₹${fee.otherFee}`}
          />

        </div>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-slate-900 p-6 text-center">

          <p className="text-slate-400">
            Total Fee
          </p>

          <h3 className="mt-3 text-3xl font-bold text-white">
            ₹{fee.totalFee}
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-center">

          <p className="text-slate-400">
            Paid Amount
          </p>

          <h3 className="mt-3 text-3xl font-bold text-green-400">
            ₹{fee.paidAmount}
          </h3>

        </div>

        <div className="rounded-2xl bg-slate-900 p-6 text-center">

          <p className="text-slate-400">
            Due Amount
          </p>

          <h3 className="mt-3 text-3xl font-bold text-red-400">
            ₹{fee.dueAmount}
          </h3>

        </div>

      </div>

      {/* Receipt */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8">

        <h2 className="mb-6 text-2xl font-semibold text-white">
          Receipt Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <InfoRow
            icon={<Receipt size={20} />}
            label="Receipt Number"
            value={fee.receiptNumber}
          />

          <InfoRow
            icon={<BadgeCheck size={20} />}
            label="Payment Status"
            value={fee.status}
          />

          <InfoRow
            icon={<Calendar size={20} />}
            label="Payment Date"
            value={new Date(
              fee.paymentDate
            ).toLocaleDateString()}
          />

          <InfoRow
            icon={<User size={20} />}
            label="Created By"
            value={
              fee.createdBy
                ? `${fee.createdBy.fullName} (${fee.createdBy.role})`
                : "-"
            }
          />

        </div>

        {fee.remarks && (

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800 p-6">

            <h3 className="mb-3 text-lg font-semibold text-white">
              Remarks
            </h3>

            <p className="leading-7 text-slate-300">
              {fee.remarks}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({
  icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-slate-800 p-4">

      <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
        {icon}
      </div>

      <div>

        <p className="text-sm text-slate-400">
          {label}
        </p>

        <p className="mt-1 font-semibold text-white">
          {value}
        </p>

      </div>

    </div>
  );
}