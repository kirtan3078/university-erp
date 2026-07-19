import type { ReactNode } from "react";
import BackButton from "./BackButton";

type PageShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function PageShell({ eyebrow, title, subtitle, children }: PageShellProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.14),_transparent_26%),linear-gradient(135deg,_rgba(2,6,23,0.97),_rgba(2,8,23,1))]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6%] top-10 h-72 w-72 rounded-full bg-sky-500/15 blur-[120px]" />
        <div className="absolute bottom-[-6%] right-[-4%] h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-2 text-sm text-sky-200 backdrop-blur-sm">
            <span className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-400" />
            {eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">{subtitle}</p>
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
