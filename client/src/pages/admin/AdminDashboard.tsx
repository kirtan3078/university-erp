import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

import StudentGrowthChart from "../../components/admin/dashboard/StudentGrowthChart";
import AttendanceChart from "../../components/admin/dashboard/AttendanceChart";
import RecentStudents from "../../components/admin/dashboard/RecentStudents";
import RecentActivity from "../../components/admin/dashboard/RecentActivity";
import NoticeBoard from "../../components/admin/dashboard/NoticeBoard";
import QuickActions from "../../components/admin/dashboard/QuickActions";

interface Student {
  _id: string;
  fullName: string;
  enrollmentNumber: string;
  course: string;
  semester: number;
  department: string;
}

interface GrowthData {
  month: string;
  students: number;
}

const cards = [
  {
    title: "Students",
    description: "Manage student records",
    color: "from-blue-500 to-cyan-500",
    link: "/admin/students",
  },
  {
    title: "Faculty",
    description: "Manage faculty members",
    color: "from-purple-500 to-pink-500",
    link: "#",
  },
  {
    title: "Attendance",
    description: "Attendance management",
    color: "from-green-500 to-emerald-500",
    link: "#",
  },
  {
    title: "Results",
    description: "Manage examination results",
    color: "from-orange-500 to-red-500",
    link: "#",
  },
  {
    title: "Fees",
    description: "Fee management",
    color: "from-yellow-500 to-amber-500",
    link: "#",
  },
  {
    title: "Notices",
    description: "Publish notices",
    color: "from-indigo-500 to-violet-500",
    link: "#",
  },
];

export default function AdminDashboard() {
  const [summary, setSummary] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalAdmins: 0,
    departments: 0,
  });

  const [studentGrowth, setStudentGrowth] = useState<GrowthData[]>([]);
  const [recentStudents, setRecentStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const { data } = await api.get("/api/dashboard/summary");

        setSummary(data.summary);
        setRecentStudents(data.recentStudents);
        setStudentGrowth(data.studentGrowth);
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const stats = [
    {
      title: "Students",
      value: summary.totalStudents,
      color: "text-cyan-400",
      icon: "🎓",
    },
    {
      title: "Faculty",
      value: summary.totalFaculty,
      color: "text-violet-400",
      icon: "👨‍🏫",
    },
    {
      title: "Departments",
      value: summary.departments,
      color: "text-green-400",
      icon: "🏢",
    },
    {
      title: "Admins",
      value: summary.totalAdmins,
      color: "text-orange-400",
      icon: "👑",
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-2xl font-semibold text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg text-blue-100">👋 Welcome Back</p>

            <h1 className="mt-2 text-4xl font-bold text-white">
              University ERP Admin
            </h1>

            <p className="mt-3 max-w-2xl text-blue-100">
              Manage students, faculty, departments, attendance,
              examinations, fees and notices from one centralized
              dashboard.
            </p>
          </div>

          <div className="hidden text-7xl lg:block">🎓</div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400">{item.title}</p>

                <h2 className={`mt-2 text-4xl font-bold ${item.color}`}>
                  {item.value}
                </h2>
              </div>

              <div className="text-5xl">{item.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <StudentGrowthChart data={studentGrowth} />
        <AttendanceChart />
      </div>
            {/* Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentStudents students={recentStudents} />
        <RecentActivity />
      </div>

      {/* Notices */}
      <div className="grid gap-6 lg:grid-cols-2">
        <NoticeBoard />
        <QuickActions />
      </div>

      {/* ERP Modules */}
      <div>
        <h2 className="mb-5 text-2xl font-semibold text-white">
          ERP Modules
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:shadow-xl"
            >
              <div className={`h-2 bg-gradient-to-r ${card.color}`} />

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {card.description}
                </p>

                <button
                  className={`mt-6 rounded-lg px-4 py-2 font-semibold transition ${
                    card.link === "#"
                      ? "cursor-not-allowed bg-slate-700 text-slate-400"
                      : "bg-cyan-500 text-black hover:bg-cyan-400"
                  }`}
                  disabled={card.link === "#"}
                >
                  {card.link === "#" ? "Coming Soon" : "Open"}
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}