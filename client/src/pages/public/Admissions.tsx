import ModuleCard from "../../components/common/ModuleCard";
import PageShell from "../../components/common/PageShell";

const modules = [
  {
    title: "Admission Process",
    description: "Track application stages, eligibility criteria and document requirements from a single interface.",
    badge: "Flow",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    title: "Eligibility Check",
    description: "Review program compatibility, cutoffs and academic prerequisites before submission.",
    badge: "Guidance",
    accent: "from-fuchsia-500 to-violet-500",
  },
  {
    title: "Required Documents",
    description: "Keep your certificates, identity proofs and admission forms organized and ready.",
    badge: "Docs",
    accent: "from-emerald-500 to-lime-400",
  },
  {
    title: "Scholarships",
    description: "Discover merit and need-based financial assistance opportunities for prospective students.",
    badge: "Support",
    accent: "from-amber-500 to-orange-400",
  },
];

export default function Admissions() {
  return (
    <PageShell
      eyebrow="Admissions and enrolment"
      title="Modern admissions experience"
      subtitle="Support prospective students with a streamlined enrollment journey, scholarship guidance and document readiness."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 shadow-[0_16px_60px_rgba(2,6,23,0.35)] backdrop-blur-xl">
          <p className="text-sm text-slate-400">Enrollment overview</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Admissions at a glance</h2>
          <div className="mt-6 space-y-4">
            {[
              ["Applications received", "1,284"],
              ["Offer letters issued", "812"],
              ["Seats confirmed", "628"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3">
                <span className="text-sm text-slate-400">{label}</span>
                <span className="text-lg font-semibold text-white">{value}</span>
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
