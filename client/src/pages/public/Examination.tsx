import ModuleCard from "../../components/common/ModuleCard";
import PageShell from "../../components/common/PageShell";

const modules = [
  {
    title: "Examination Schedule",
    description: "View semester exam dates, room allocation and subject codes clearly organized by department.",
    badge: "Schedule",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    title: "Hall Ticket",
    description: "Download your examination pass and verify your eligibility before appearing for a paper.",
    badge: "Access",
    accent: "from-fuchsia-500 to-violet-500",
  },
  {
    title: "Results",
    description: "Check mark sheets, grade summaries and performance trends in a polished academic view.",
    badge: "Results",
    accent: "from-emerald-500 to-lime-400",
  },
  {
    title: "Evaluation",
    description: "Browse moderation, revaluation and supplementary exam workflows in an easy-to-follow format.",
    badge: "Support",
    accent: "from-amber-500 to-orange-400",
  },
];

export default function Examination() {
  return (
    <PageShell
      eyebrow="Academic operations"
      title="Examination and result modules"
      subtitle="Provide students and faculties with a modern experience for schedules, hall tickets and result review."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 shadow-[0_16px_60px_rgba(2,6,23,0.35)] backdrop-blur-xl">
          <p className="text-sm text-slate-400">Upcoming assessments</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Semester exam dashboard</h2>
          <div className="mt-6 space-y-3">
            {[
              { subject: "Data Structures", date: "22 Jul 2026", slot: "09:30 AM" },
              { subject: "Business Analytics", date: "24 Jul 2026", slot: "11:00 AM" },
              { subject: "Research Methodology", date: "27 Jul 2026", slot: "01:30 PM" },
            ].map((item) => (
              <div key={item.subject} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3">
                <div>
                  <p className="font-medium text-white">{item.subject}</p>
                  <p className="text-sm text-slate-400">{item.date}</p>
                </div>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                  {item.slot}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((module) => (
            <ModuleCard
              key={module.title}
              title={module.title}
              description={module.description}
              badge={module.badge}
              accent={module.accent}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
