import { Megaphone } from "lucide-react";

const notices = [
  "Mid-semester results will be published on 22 July.",
  "Library access extended for evening scholars.",
  "Campus transport update for semester exams.",
];

export default function NoticeBoard() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_10px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Latest Notices</h2>
      <ul className="mt-4 space-y-3">
        {notices.map((notice) => (
          <li key={notice} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-slate-300">
            <Megaphone size={16} className="mt-0.5 text-cyan-300" />
            <span>{notice}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
