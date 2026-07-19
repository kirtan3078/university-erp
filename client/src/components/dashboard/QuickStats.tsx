import { GraduationCap, Landmark, Sparkles, Wallet } from "lucide-react";

const stats = [
  { label: "Attendance", value: "92%", detail: "Consistent this semester", icon: GraduationCap },
  { label: "Semester", value: "6th", detail: "Current active term", icon: Landmark },
  { label: "CGPA", value: "8.7", detail: "Top 15% of batch", icon: Sparkles },
  { label: "Pending Fees", value: "₹18,500", detail: "Due by 25 Jul", icon: Wallet },
];

export default function QuickStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, detail, icon: Icon }) => (
        <div key={label} className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-4 shadow-[0_10px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">{label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-cyan-300">
              <Icon size={18} />
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-500">{detail}</p>
        </div>
      ))}
    </div>
  );
}
