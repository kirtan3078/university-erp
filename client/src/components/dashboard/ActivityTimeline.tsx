import { Clock3 } from "lucide-react";

const activities = [
  { title: "Attendance submitted", time: "09:20 AM" },
  { title: "Assignment uploaded", time: "11:45 AM" },
  { title: "Fee reminder viewed", time: "02:10 PM" },
];

export default function ActivityTimeline() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_10px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
      <div className="mt-4 space-y-3">
        {activities.map((activity) => (
          <div key={activity.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3">
            <div>
              <p className="font-medium text-white">{activity.title}</p>
              <p className="text-sm text-slate-400">{activity.time}</p>
            </div>
            <Clock3 size={16} className="text-cyan-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
