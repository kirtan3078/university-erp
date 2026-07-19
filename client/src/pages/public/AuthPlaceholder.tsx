import { Link } from "react-router-dom";
import AuthPageShell from "../../components/common/AuthPageShell";

type AuthPlaceholderProps = {
  title: string;
  subtitle: string;
  actionLabel?: string;
};

export default function AuthPlaceholder({ title, subtitle, actionLabel = "Go to login selection" }: AuthPlaceholderProps) {
  return (
    <AuthPageShell eyebrow="Authentication module" title={title} subtitle={subtitle}>
      <div className="mx-auto flex max-w-2xl flex-col items-center rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-8 text-center shadow-[0_12px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl">
        <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          Coming soon
        </div>
        <p className="mt-6 text-lg leading-8 text-slate-400">
          This authentication experience is now scaffolded and ready for your backend integration.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:-translate-y-1"
        >
          {actionLabel}
        </Link>
      </div>
    </AuthPageShell>
  );
}
