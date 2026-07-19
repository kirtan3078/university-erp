import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Bell, CreditCard, LayoutGrid, Menu, MoonStar, Search, Settings, ShieldCheck, SunMedium, X } from "lucide-react";

type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "Dashboard", to: "dashboard", icon: LayoutGrid },
  { label: "My Profile", to: "profile", icon: ShieldCheck },
  { label: "Attendance", to: "attendance", icon: Search },
  { label: "Timetable", to: "timetable", icon: Search },
  { label: "Courses", to: "courses", icon: Search },
  { label: "Assignments", to: "assignments", icon: Search },
  { label: "Examination", to: "examination", icon: Search },
  { label: "Results", to: "results", icon: Search },
  { label: "Fee Payment", to: "fees", icon: CreditCard },
  { label: "Hall Ticket", to: "hall-ticket", icon: Search },
  { label: "Certificates", to: "certificates", icon: Search },
  { label: "Notices", to: "notices", icon: Search },
  { label: "Library", to: "library", icon: Search },
  { label: "Settings", to: "settings", icon: Settings },
];

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#020617] text-white" : "bg-slate-50 text-slate-900"}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-10 h-72 w-72 rounded-full bg-sky-500/15 blur-[140px]" />
        <div className="absolute bottom-[-8%] right-[-4%] h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[140px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 lg:hidden"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <Link to="/student/dashboard" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500 text-lg">
                🎓
              </div>
              <div>
                <p className="text-sm text-slate-400">University ERP</p>
                <p className="font-semibold text-white">Student Portal</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/10">
              <Bell size={18} />
            </button>
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/10"
            >
              {isDark ? <SunMedium size={18} /> : <MoonStar size={18} />}
            </button>
            <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500 font-semibold text-white">
                AV
              </div>
              <div>
                <p className="text-sm font-medium text-white">Aarav Vyas</p>
                <p className="text-xs text-slate-400">Student</p>
              </div>
            </div>
            <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/10">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
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

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      <footer className="border-t border-white/10 bg-slate-950/60 px-4 py-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 UniERP. All rights reserved.</span>
          <span>Version 1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
