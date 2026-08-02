import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  GraduationCap,
  BadgeCheck,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

interface Faculty {
  _id: string;
  fullName: string;
  employeeId: string;
  email: string;
  phone?: string;
  gender?: string;
  department: string;
  designation?: string;
  qualification?: string;
  status?: string;
  createdAt?: string;
}

export default function ViewFaculty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/api/admin/faculties/${id}`);

      setFaculty(res.data.faculty);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load faculty details.");
      navigate("/admin/faculties");
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

  if (!faculty) return null;

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in space-y-8 duration-500">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Faculty Profile
          </h1>

          <p className="mt-2 text-slate-400">
            View complete faculty information.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/faculties")}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-white transition hover:bg-slate-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* Profile */}

      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

        <div className="flex flex-col items-center">

          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-5xl font-bold text-white">
            {faculty.fullName.charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-5 text-3xl font-bold text-white">
            {faculty.fullName}
          </h2>

          <p className="mt-1 text-slate-400">
            {faculty.employeeId}
          </p>

        </div>

      </div>

      <div className="grid gap-8 md:grid-cols-2">

        {/* Personal */}

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

          <h2 className="mb-6 text-2xl font-semibold text-white">
            Personal Information
          </h2>

          <div className="space-y-5">

            <InfoRow
              icon={<User size={20} />}
              label="Full Name"
              value={faculty.fullName}
            />

            <InfoRow
              icon={<Mail size={20} />}
              label="Email"
              value={faculty.email}
            />

            <InfoRow
              icon={<Phone size={20} />}
              label="Phone"
              value={faculty.phone || "-"}
            />

            <InfoRow
              icon={<BadgeCheck size={20} />}
              label="Gender"
              value={faculty.gender || "-"}
            />

          </div>

        </div>

        {/* Professional */}

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-xl">

          <h2 className="mb-6 text-2xl font-semibold text-white">
            Professional Information
          </h2>

          <div className="space-y-5">

            <InfoRow
              icon={<Briefcase size={20} />}
              label="Employee ID"
              value={faculty.employeeId}
            />

            <InfoRow
              icon={<Building2 size={20} />}
              label="Department"
              value={faculty.department}
            />

            <InfoRow
              icon={<Briefcase size={20} />}
              label="Designation"
              value={faculty.designation || "-"}
            />

            <InfoRow
              icon={<GraduationCap size={20} />}
              label="Qualification"
              value={faculty.qualification || "-"}
            />

            <InfoRow
              icon={<BadgeCheck size={20} />}
              label="Status"
              value={faculty.status || "Active"}
            />

            <InfoRow
              icon={<Calendar size={20} />}
              label="Joined"
              value={
                faculty.createdAt
                  ? new Date(faculty.createdAt).toLocaleDateString()
                  : "-"
              }
            />

          </div>

        </div>

      </div>

    </div>
  );
}

interface RowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: RowProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-slate-800 p-4">
      <div className="text-cyan-400">{icon}</div>

      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="font-medium text-white">{value}</p>
      </div>
    </div>
  );
}