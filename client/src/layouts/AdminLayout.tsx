import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import AdminFooter from "../components/admin/AdminFooter";

export default function AdminLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* Background Decorations */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      </div>

      <div className="relative z-10 flex min-h-screen flex-col md:flex-row">

        {/* Sidebar */}

        <AdminSidebar />

        {/* Main */}

        <div className="flex min-w-0 flex-1 flex-col">

          <AdminTopbar />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

            <div className="mx-auto w-full max-w-7xl animate-in fade-in duration-500">

              <Outlet />

              <AdminFooter />

            </div>

          </main>

        </div>

      </div>

    </div>
  );
}