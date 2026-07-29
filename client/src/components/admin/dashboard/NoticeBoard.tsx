import { Megaphone } from "lucide-react";

const notices = [
  {
    title: "Semester Examination Schedule Released",
    date: "Today",
    priority: "High",
  },
  {
    title: "Faculty Meeting at 3:00 PM",
    date: "Today",
    priority: "Medium",
  },
  {
    title: "Student Registration Ends Tomorrow",
    date: "Tomorrow",
    priority: "High",
  },
  {
    title: "Library Closed on Sunday",
    date: "29 Jul",
    priority: "Low",
  },
];

export default function NoticeBoard() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <div className="mb-5 flex items-center gap-3">
        <Megaphone className="text-cyan-400" />
        <h2 className="text-xl font-bold text-white">
          Latest Notices
        </h2>
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.title}
            className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">
                {notice.title}
              </h3>

              <span
                className={`rounded-full px-3 py-1 text-xs ${
                  notice.priority === "High"
                    ? "bg-red-500/20 text-red-400"
                    : notice.priority === "Medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {notice.priority}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              {notice.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}