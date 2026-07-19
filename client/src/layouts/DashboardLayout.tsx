import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#020617] text-white" : "bg-slate-50 text-slate-900"}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-10 h-72 w-72 rounded-full bg-sky-500/15 blur-[140px]" />
        <div className="absolute bottom-[-8%] right-[-4%] h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[140px]" />
      </div>

      <Topbar isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} onToggleSidebar={() => setIsOpen((prev) => !prev)} />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

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
