import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-slate-950">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopbar />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}