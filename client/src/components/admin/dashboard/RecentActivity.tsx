import {
  UserPlus,
  BookOpen,
  Bell,
  CreditCard,
} from "lucide-react";

const activities = [
  {
    title: "New student registered",
    time: "5 min ago",
    icon: UserPlus,
  },
  {
    title: "Attendance uploaded",
    time: "15 min ago",
    icon: BookOpen,
  },
  {
    title: "Fee payment received",
    time: "35 min ago",
    icon: CreditCard,
  },
  {
    title: "Notice published",
    time: "1 hour ago",
    icon: Bell,
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <h2 className="mb-5 text-xl font-bold text-white">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4"
            >
              <div className="rounded-xl bg-cyan-500/20 p-3 text-cyan-400">
                <Icon size={20} />
              </div>

              <div className="flex-1">
                <p className="font-medium text-white">
                  {item.title}
                </p>

                <p className="text-sm text-slate-500">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}