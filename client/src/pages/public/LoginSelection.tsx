import { Link, useNavigate } from "react-router-dom";

type PortalCardProps = {
  title: string;
  description: string;
  icon: string;
  to: string;
  accent: string;
};

function PortalCard({ title, description, icon, to, accent }: PortalCardProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="group rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-6 text-left shadow-[0_12px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-800/75 hover:shadow-[0_16px_55px_rgba(34,211,238,0.16)]"
    >
      <div className={`inline-flex rounded-2xl bg-gradient-to-r ${accent} p-3 text-2xl shadow-lg`}>
        {icon}
      </div>
      <h2 className="mt-5 text-xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
      <div className="mt-6 flex items-center justify-between text-sm font-medium text-sky-300">
        <span>Open portal</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </div>
    </button>
  );
}

export default function LoginSelection() {
  const portals = [
    {
      title: "Student Portal",
      description: "Access attendance, results, fees, notices and profile.",
      icon: "🎓",
      to: "/login/student",
      accent: "from-sky-500 to-cyan-400",
    },
    {
      title: "Faculty Portal",
      description: "Manage attendance, marks, timetable and students.",
      icon: "🧑‍🏫",
      to: "/login/faculty",
      accent: "from-fuchsia-500 to-violet-500",
    },
    {
      title: "Administrator Portal",
      description: "Manage the complete University ERP.",
      icon: "🛡️",
      to: "/login/admin",
      accent: "from-emerald-500 to-lime-400",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.14),_transparent_26%),linear-gradient(135deg,_rgba(2,6,23,0.97),_rgba(2,8,23,1))]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6%] top-10 h-72 w-72 rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="absolute bottom-[-6%] right-[-4%] h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:p-8">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6 sm:p-8 lg:p-10">
            <div className="max-w-2xl text-center sm:mx-auto">
              <span className="inline-flex items-center rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-sm text-sky-200 backdrop-blur-sm">
                <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Secure access
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Choose Your Portal
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-400">
                Select the portal you want to access.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {portals.map((portal) => (
                <PortalCard key={portal.title} {...portal} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
              <Link to="/" className="transition hover:text-white">
                Back to Home
              </Link>
              <Link to="/contact" className="transition hover:text-white">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
