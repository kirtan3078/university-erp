import { NavLink } from "react-router-dom";

const menus = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    title: "Students",
    path: "/admin/students",
  },
  {
    title: "Faculty",
    path: "/admin/faculties",
  },
  {
    title: "Attendance",
    path: "/admin/attendance",
  },
  {
    title: "Results",
    path: "/admin/results",
  },
  {
  title: "Fee Templates",
  path: "/admin/fee-templates",
 },
  {
    title: "Fees",
    path: "/admin/fees",
  },
  {
    title: "Notices",
    path: "/admin/notices",
  },
];

export default function AdminSidebar() {
  return (
    <aside
  className="
    w-full
    md:w-72
    md:min-h-screen
    bg-slate-900
    border-r
    border-slate-800
    flex-shrink-0
  "
>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-cyan-400">
          University ERP
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Admin Panel
        </p>
      </div>

     <nav
  className="
    px-4
    pb-4
    flex
    gap-2
    overflow-x-auto
    md:block
    md:space-y-2
  "
>
        {menus.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
  `
    whitespace-nowrap
    block
    rounded-lg
    px-4
    py-3
    transition

    ${
      isActive
        ? "bg-cyan-500 text-black font-semibold"
        : "text-slate-300 hover:bg-slate-800"
    }
  `
}
          >
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}