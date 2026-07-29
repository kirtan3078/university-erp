import {
  UserPlus,
  GraduationCap,
  Bell,
  FileText,
} from "lucide-react";

const actions = [
  {
    title: "Add Student",
    icon: UserPlus,
    color: "bg-blue-500",
  },
  {
    title: "Add Faculty",
    icon: GraduationCap,
    color: "bg-purple-500",
  },
  {
    title: "Publish Notice",
    icon: Bell,
    color: "bg-orange-500",
  },
  {
    title: "Generate Report",
    icon: FileText,
    color: "bg-green-500",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <h2 className="mb-5 text-xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="group rounded-2xl border border-slate-800 bg-slate-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500"
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${action.color}`}
              >
                <Icon className="text-white" size={26} />
              </div>

              <p className="mt-4 text-sm font-semibold text-white">
                {action.title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}