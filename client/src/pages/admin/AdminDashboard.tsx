import { Link } from "react-router-dom";

const cards = [
  {
    title: "Students",
    description: "Manage student records",
    value: "Students",
    color: "from-blue-500 to-cyan-500",
    link: "/admin/students",
  },
  {
    title: "Faculty",
    description: "Manage faculty members",
    value: "Faculty",
    color: "from-purple-500 to-pink-500",
    link: "#",
  },
  {
    title: "Attendance",
    description: "Attendance management",
    value: "Attendance",
    color: "from-green-500 to-emerald-500",
    link: "#",
  },
  {
    title: "Results",
    description: "Manage examination results",
    value: "Results",
    color: "from-orange-500 to-red-500",
    link: "#",
  },
  {
    title: "Fees",
    description: "Fee management",
    value: "Fees",
    color: "from-yellow-500 to-amber-500",
    link: "#",
  },
  {
    title: "Notices",
    description: "Publish notices",
    value: "Notices",
    color: "from-indigo-500 to-violet-500",
    link: "#",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome to the University ERP Administration Panel.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Total Students</p>
          <h2 className="mt-2 text-4xl font-bold text-cyan-400">--</h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Faculty Members</p>
          <h2 className="mt-2 text-4xl font-bold text-purple-400">--</h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Departments</p>
          <h2 className="mt-2 text-4xl font-bold text-green-400">--</h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Active Users</p>
          <h2 className="mt-2 text-4xl font-bold text-orange-400">--</h2>
        </div>
      </div>

      {/* Modules */}
      <div>
        <h2 className="mb-5 text-2xl font-semibold text-white">
          ERP Modules
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-900 transition hover:border-cyan-500 hover:-translate-y-1"
            >
              <div
                className={`h-2 bg-gradient-to-r ${card.color}`}
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  {card.description}
                </p>

                <button className="mt-6 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black transition group-hover:bg-cyan-400">
                  Open
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}