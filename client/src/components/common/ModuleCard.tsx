import type { ReactNode } from "react";

type ModuleCardProps = {
  title: string;
  description: string;
  badge: string;
  accent: string;
  children?: ReactNode;
};

export default function ModuleCard({ title, description, badge, accent, children }: ModuleCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-slate-900/55 p-5 shadow-[0_10px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-800/75">
      <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${accent}`} />
      <div className="mt-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">
          {badge}
        </span>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
      {children}
    </article>
  );
}
