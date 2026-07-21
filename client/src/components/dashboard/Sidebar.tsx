import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  CreditCard,
  LayoutGrid,
  Settings,
  ShieldCheck,
  Search,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user } = useAuth();

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      to: "/student/dashboard",
      icon: LayoutGrid,
    },
    {
      label: "My Profile",
      to: "/student/dashboard/profile",
      icon: ShieldCheck,
    },
    {
      label: "Attendance",
      to: "/student/dashboard/attendance",
      icon: Search,
    },
    {
      label: "Timetable",
      to: "/student/dashboard/timetable",
      icon: Search,
    },
    {
      label: "Courses",
      to: "/student/dashboard/courses",
      icon: Search,
    },
    {
      label: "Assignments",
      to: "/student/dashboard/assignments",
      icon: Search,
    },
    {
      label: "Examination",
      to: "/student/dashboard/examination",
      icon: Search,
    },
    {
      label: "Results",
      to: "/student/dashboard/results",
      icon: Search,
    },
    {
      label: "Fee Payment",
      to: "/student/dashboard/fees",
      icon: CreditCard,
    },
    {
      label: "Hall Ticket",
      to: "/student/dashboard/hall-ticket",
      icon: Search,
    },
    {
      label: "Certificates",
      to: "/student/dashboard/certificates",
      icon: Search,
    },
    {
      label: "Notices",
      to: "/student/dashboard/notices",
      icon: Search,
    },
    {
      label: "Library",
      to: "/student/dashboard/library",
      icon: Search,
    },
    {
      label: "Settings",
      to: "/student/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? "block" : "hidden"
      } w-full rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-4 shadow-[0_16px_60px_rgba(2,6,23,0.35)] backdrop-blur-xl lg:sticky lg:top-24 lg:block lg:h-fit lg:w-72`}
    >
      {/* Academic Card */}
      <div className="mb-4 rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4">
        <p className="text-sm text-slate-400">Academic Status</p>

        <p className="mt-2 text-lg font-semibold text-white">
          Semester {user?.semester ?? "-"} •{" "}
          {user?.course || user?.department || "Student"}
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end={label === "Dashboard"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-sky-500/20 via-cyan-400/15 to-fuchsia-500/20 text-white shadow-[0_10px_30px_rgba(34,211,238,0.12)]"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}