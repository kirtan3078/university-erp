import { useAuth } from "../../context/AuthContext";

export default function AdminTopbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-8">
      <h2 className="text-xl font-semibold text-white">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-bold text-black">
          {user?.fullName?.charAt(0).toUpperCase() || "A"}
        </div>

        <div>
          <p className="text-white">{user?.fullName}</p>
          <p className="text-sm text-slate-400">Administrator</p>
        </div>
      </div>
    </header>
  );
}