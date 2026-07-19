import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Student Login", to: "/login/student" },
  { label: "Admissions", to: "/admissions" },
  { label: "Examination", to: "/examination" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-3 shadow-[0_8px_35px_rgba(2,6,23,0.35)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold tracking-wide text-white transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-500 text-base shadow-lg shadow-cyan-500/20">
                🎓
              </span>
              <span>UniERP</span>
            </Link>

            <nav className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `group relative px-1 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? "text-white" : "text-slate-300 hover:text-white"
                    }`
                  }
                >
                  <span className="relative">
                    {item.label}
                    <span
                      className={`absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-fuchsia-400 transition-transform duration-300 ${
                        "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                    <span
                      className={`absolute left-0 -bottom-1 h-0.5 w-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-fuchsia-400 transition-transform duration-300 ${
                        "scale-x-100"
                      }`}
                    />
                  </span>
                </NavLink>
              ))}
            </nav>

            <div className="hidden md:flex md:items-center md:gap-3">
              <button
                onClick={() => navigate("/register")}
                className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/login/student")}
                className="rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Login
              </button>
            </div>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/10 md:hidden"
            >
              <div className="flex flex-col gap-1.5">
                <span className={`h-0.5 w-5 rounded-full bg-current transition-all ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`h-0.5 w-5 rounded-full bg-current transition-all ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
                <span className={`h-0.5 w-5 rounded-full bg-current transition-all ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>

          <div className={`overflow-hidden transition-all duration-300 md:hidden ${isMenuOpen ? "mt-3 max-h-64" : "max-h-0"}`}>
            <div className="rounded-2xl border border-white/10 bg-slate-950/80 p-3 backdrop-blur-xl">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-2 text-sm font-medium transition-all duration-300 ${
                        isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={() => navigate("/register")}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition-all duration-300"
                >
                  Register
                </button>
                <button
                  onClick={() => navigate("/login/student")}
                  className="w-full rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-fuchsia-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-all duration-300"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}