import { useEffect, useState } from "react";
import api from "../../services/api";

interface UserProfile {
  fullName: string;
  email: string;
  enrollmentNumber: string;
  mobileNumber: string;
  department: string;
  course: string;
  semester: number;
  role: string;
  isActivated: boolean;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const res = await api.get("/api/auth/student/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
      } catch (err: any) {
        setError(
          err.response?.data?.message || "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 text-xl font-semibold">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 text-red-500 text-lg">
        {error}
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold">
              {user.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                {user.fullName}
              </h1>

              <p className="opacity-90">
                {user.role.toUpperCase()}
              </p>
            </div>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6 p-8">

          <InfoCard
            title="Email"
            value={user.email}
          />

          <InfoCard
            title="Enrollment Number"
            value={user.enrollmentNumber}
          />

          <InfoCard
            title="Department"
            value={user.department}
          />

          <InfoCard
            title="Course"
            value={user.course}
          />

          <InfoCard
            title="Semester"
            value={String(user.semester)}
          />

          <InfoCard
            title="Mobile Number"
            value={user.mobileNumber}
          />

          <InfoCard
            title="Account Status"
            value={user.isActivated ? "Activated ✅" : "Not Activated"}
          />

        </div>

      </div>
    </div>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
<div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition">
      <p className="text-sm font-medium text-gray-600 mb-2">
        {title}
      </p>

      <p className="text-lg font-semibold text-gray-900">
        {value || "-"}
      </p>

    </div>
  );
}