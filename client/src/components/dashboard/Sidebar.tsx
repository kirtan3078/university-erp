import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { CreditCard, LayoutGrid, Settings, ShieldCheck, Search } from "lucide-react";

type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/student/dashboard", icon: LayoutGrid },
  { label: "My Profile", to: "/student/profile", icon: ShieldCheck },
  { label: "Attendance", to: "/student/attendance", icon: Search },
  { label: "Timetable", to: "/student/timetable", icon: Search },
  { label: "Courses", to: "/student/courses", icon: Search },
  { label: "Assignments", to: "/student/assignments", icon: Search },
  { label: "Examination", to: "/student/examination", icon: Search },
  { label: "Results", to: "/student/results", icon: Search },
  { label: "Fee Payment", to: "/student/fees", icon: CreditCard },
  { label: "Hall Ticket", to: "/student/hall-ticket", icon: Search },
  { label: "Certificates", to: "/student/certificates", icon: Search },
  { label: "Notices", to: "/student/notices", icon: Search },
  { label: "Library", to: "/student/library", icon: Search },
  { label: "Settings", to: "/student/settings", icon: Settings },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={`${isOpen ? "block" : "hidden"} w-full rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-4 shadow-[0_16px_60px_rgba(2,6,23,0.35)] backdrop-blur-xl lg:sticky lg:top-24 lg:block lg:h-fit lg:w-72`}>
      <div className="mb-4 rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-4">
        <p className="text-sm text-slate-400">Academic status</p>
        <p className="mt-2 text-lg font-semibold text-white">Semester 6 • B.Tech</p>
      </div>

      <nav className="space-y-1">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end={label === "Dashboard"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                isActive ? "bg-gradient-to-r from-sky-500/20 via-cyan-400/15 to-fuchsia-500/20 text-white shadow-[0_10px_30px_rgba(34,211,238,0.12)]" : "text-slate-300 hover:bg-white/10 hover:text-white"
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
