import { CalendarDays, FileText, Wallet } from "lucide-react";

type Action = {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const actions: Action[] = [
  { label: "View Results", icon: FileText },
  { label: "Pay Fees", icon: Wallet },
  { label: "Download Hall Ticket", icon: FileText },
  { label: "View Timetable", icon: CalendarDays },
];

export default function QuickActions() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_10px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {actions.map(({ label, icon: Icon }) => (
          <button key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/40 hover:bg-slate-700/70">
            <span>{label}</span>
            <Icon size={16} className="text-cyan-300" />
          </button>
        ))}
      </div>
    </div>
  );
}
