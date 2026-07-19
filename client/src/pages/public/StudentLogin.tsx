import ModuleCard from "../../components/common/ModuleCard";
import PageShell from "../../components/common/PageShell";

const services = [
  {
    title: "Student Login",
    description: "Secure academic access for students to view schedules, records and institutional updates.",
    badge: "Portal",
    accent: "from-sky-500 to-cyan-400",
  },
  {
    title: "Student Activation",
    description: "Activate your student account and connect your profile to the campus ERP ecosystem.",
    badge: "Setup",
    accent: "from-fuchsia-500 to-violet-500",
  },
  {
    title: "Fee Payment",
    description: "Pay tuition and hostel charges through a guided and transparent digital billing flow.",
    badge: "Finance",
    accent: "from-emerald-500 to-lime-400",
  },
  {
    title: "Student Corner",
    description: "Discover announcements, support links and personalized academic resources in one place.",
    badge: "Support",
    accent: "from-amber-500 to-orange-400",
  },
];

export default function StudentLogin() {
  return (
    <PageShell
      eyebrow="Student service hub"
      title="Student access and activation"
      subtitle="A dedicated portal experience for secure sign-in, profile activation, finance updates and support resources."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6 shadow-[0_16px_60px_rgba(2,6,23,0.35)] backdrop-blur-xl">
          <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/70 p-5">
            <p className="text-sm text-slate-400">Student login preview</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Access your university dashboard</h2>
            <div className="mt-6 space-y-3">
              {[
                { label: "Enrollment number", value: "STU-2048" },
                { label: "Password", value: "••••••••" },
                { label: "Security code", value: "7A4Q" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3">
                  <p className="text-sm text-slate-400">{item.label}</p>
                  <p className="mt-1 font-medium text-slate-100">{item.value}</p>
                </div>
              ))}
            </div>
            <button className="mt-6 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-400 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1">
              Continue to portal
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <ModuleCard
              key={service.title}
              title={service.title}
              description={service.description}
              badge={service.badge}
              accent={service.accent}
            />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
