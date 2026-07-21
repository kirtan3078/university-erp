import { Bell, Menu, MoonStar, SunMedium } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type TopbarProps = {
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
};

export default function Topbar({
  isDark,
  onToggleTheme,
  onToggleSidebar,
}: TopbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials =
    user?.fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase() || "ST";

  const handleLogout = () => {
    logout();
    navigate("/login/student");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 lg:hidden"
          >
            <Menu size={18} />
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
            onClick={onToggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/10"
          >
            {isDark ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </button>

          <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500 font-semibold text-white">
              {initials}
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                {user?.fullName ?? "Student"}
              </p>

              <p className="text-xs capitalize text-slate-400">
                {user?.role ?? "Student"}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}