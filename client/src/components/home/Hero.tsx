import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

type HeroButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

type DashboardCardProps = {
  title: string;
  value: string;
  detail: string;
  accent: string;
};

type BubblePoint = {
  id: number;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  hue: number;
  glow: number;
};

type LinePoint = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
};

function HeroButton({ children, variant = "primary" }: HeroButtonProps) {
  const baseClass =
    "group inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg";

  if (variant === "secondary") {
    return (
      <button
        type="button"
        className={`${baseClass} border border-white/15 bg-white/5 text-slate-200 hover:border-cyan-400/50 hover:bg-white/10`}
      >
        <span className="transition-transform duration-300 group-hover:translate-x-0.5">{children}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`${baseClass} bg-gradient-to-r from-sky-500 via-cyan-400 to-fuchsia-500 text-slate-950 shadow-[0_10px_40px_rgba(34,211,238,0.25)] hover:shadow-[0_12px_50px_rgba(34,211,238,0.35)]`}
    >
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">{children}</span>
    </button>
  );
}

function DashboardCard({ title, value, detail, accent }: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-800/80">
      <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${accent}`} />
      <p className="mt-4 text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{detail}</p>
    </div>
  );
}

const BUBBLE_COUNT = 40;
const LINE_THRESHOLD = 0.18;
const REPULSE_RADIUS = 0.16;

function createBubble(index: number): BubblePoint {
  const hue = [190, 210, 230, 270, 315, 30][index % 6] + Math.random() * 25;

  return {
    id: index + 1,
    x: Math.random(),
    y: Math.random(),
    size: 6 + Math.random() * 18,
    vx: (Math.random() - 0.5) * 0.02,
    vy: (Math.random() - 0.5) * 0.02,
    hue,
    glow: 0.9 + Math.random() * 0.25,
  };
}

export default function Hero() {
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
  const [bubbles, setBubbles] = useState<BubblePoint[]>([]);
  const bubbleRef = useRef<BubblePoint[]>([]);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  const initialBubbles = useMemo(() => Array.from({ length: BUBBLE_COUNT }, (_, index) => createBubble(index)), []);

  useEffect(() => {
    bubbleRef.current = initialBubbles;
    setBubbles(initialBubbles);
  }, [initialBubbles]);

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const delta = Math.min(0.032, (time - lastTimeRef.current) / 1000 || 0.016);
      lastTimeRef.current = time;

      const nextBubbles = bubbleRef.current.map((bubble) => {
        let nextX = bubble.x + bubble.vx * delta;
        let nextY = bubble.y + bubble.vy * delta;
        let nextVx = bubble.vx;
        let nextVy = bubble.vy;
        let nextGlow = bubble.glow;

        if (nextX <= 0.02 || nextX >= 0.98) {
          nextVx *= -1;
          nextX = Math.max(0.02, Math.min(0.98, nextX));
        }

        if (nextY <= 0.02 || nextY >= 0.98) {
          nextVy *= -1;
          nextY = Math.max(0.02, Math.min(0.98, nextY));
        }

        const dx = bubble.x - pointerRef.current.x;
        const dy = bubble.y - pointerRef.current.y;
        const distance = Math.hypot(dx, dy);

        if (distance < REPULSE_RADIUS) {
          const force = (REPULSE_RADIUS - distance) * 0.018;
          const pushX = (dx / (distance || 1)) * force;
          const pushY = (dy / (distance || 1)) * force;

          nextVx += pushX;
          nextVy += pushY;
          nextGlow = Math.min(1.8, bubble.glow + 0.06);
        } else {
          nextGlow = Math.max(0.9, bubble.glow - 0.008);
        }

        nextVx *= 0.992;
        nextVy *= 0.992;

        return {
          ...bubble,
          x: nextX,
          y: nextY,
          vx: nextVx,
          vy: nextVy,
          glow: nextGlow,
        };
      });

      bubbleRef.current = nextBubbles;
      setBubbles(nextBubbles);
      animationFrameRef.current = window.requestAnimationFrame(animate);
    };

    animationFrameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    pointerRef.current = { x, y };
    setPointer({ x, y });
  };

  const networkLines = useMemo<LinePoint[]>(() => {
    const lines: LinePoint[] = [];

    for (let i = 0; i < bubbles.length; i += 1) {
      for (let j = i + 1; j < bubbles.length; j += 1) {
        const first = bubbles[i];
        const second = bubbles[j];
        const dx = first.x - second.x;
        const dy = first.y - second.y;
        const distance = Math.hypot(dx, dy);

        if (distance < LINE_THRESHOLD) {
          lines.push({
            x1: first.x * 100,
            y1: first.y * 100,
            x2: second.x * 100,
            y2: second.y * 100,
            opacity: 1 - distance / LINE_THRESHOLD,
          });
        }
      }
    }

    return lines;
  }, [bubbles]);

  const orbOffsetX = (pointer.x - 0.5) * 18;
  const orbOffsetY = (pointer.y - 0.5) * 18;

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative isolate overflow-hidden bg-[#020617] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.20),_transparent_36%),radial-gradient(circle_at_80%_20%,_rgba(168,85,247,0.18),_transparent_30%),linear-gradient(135deg,_rgba(2,6,23,0.96),_rgba(2,8,23,1))]" />

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[600px] max-h-[70vw] max-w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.45)_0%,_rgba(20,184,166,0.2)_28%,_rgba(168,85,247,0.16)_60%,_transparent_74%)] blur-[120px] md:blur-[140px]"
          style={{ transform: `translate(-50%, -50%) translate(${orbOffsetX}px, ${orbOffsetY}px)` }}
        />

        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] max-h-[50vw] max-w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20 bg-[radial-gradient(circle,_rgba(14,165,233,0.28)_0%,_rgba(34,211,238,0.12)_45%,_transparent_72%)] opacity-90 blur-[40px]" />

        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] max-h-[70vw] max-w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 animate-[spin_28s_linear_infinite] bg-[conic-gradient(from_180deg,_rgba(56,189,248,0.38),_rgba(129,140,248,0.2),_rgba(168,85,247,0.4),_rgba(34,211,238,0.28),_rgba(56,189,248,0.38))] opacity-60 blur-[2px]" />

        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {networkLines.map((line) => (
            <line
              key={`${line.x1}-${line.y1}-${line.x2}-${line.y2}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="rgba(125, 211, 252, 0.25)"
              strokeWidth="0.08"
              strokeOpacity={line.opacity}
            />
          ))}
        </svg>

        {bubbles.map((bubble) => (
          <span
            key={bubble.id}
            className="absolute rounded-full shadow-[0_0_20px_rgba(34,211,238,0.25)]"
            style={{
              left: `${bubble.x * 100}%`,
              top: `${bubble.y * 100}%`,
              width: bubble.size,
              height: bubble.size,
              transform: `translate(-50%, -50%) scale(${bubble.glow})`,
              background: `hsla(${bubble.hue}, 90%, 70%, 0.95)`,
              boxShadow: `0 0 ${Math.max(10, bubble.size * 1.2)}px hsla(${bubble.hue}, 90%, 70%, 0.3)`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-24 sm:px-6 lg:flex-row lg:px-8 lg:py-0">
        <div className="relative z-10 max-w-2xl text-center lg:mr-12 lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-sm text-sky-200 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            Next Generation University ERP
          </div>

          <h1 className="mt-8 text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Manage Your University{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
              Smarter
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400 sm:text-xl">
            A modern ERP platform to manage admissions, attendance, fees, examinations, notices and faculty.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-start">
            <HeroButton variant="primary">Get Started</HeroButton>
            <HeroButton variant="secondary">Explore</HeroButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Admissions</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Attendance</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Exams</span>
          </div>
        </div>

        <div className="relative z-10 mt-16 w-full max-w-lg lg:mt-0">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/50 p-3 shadow-[0_0_120px_rgba(56,189,248,0.15)] backdrop-blur-xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Campus dashboard</p>
                  <h2 className="text-xl font-semibold text-white">Live overview</h2>
                </div>
                <div className="rounded-full border border-emerald-400/25 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
                  Synced
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <DashboardCard title="Attendance" value="92%" detail="Avg. this week" accent="from-sky-500 to-cyan-400" />
                <DashboardCard title="Fees" value="$24.8K" detail="Collected today" accent="from-fuchsia-500 to-violet-500" />
                <DashboardCard title="CGPA" value="8.7" detail="Top 10% batch" accent="from-emerald-500 to-lime-400" />
                <DashboardCard title="Today's Classes" value="12" detail="Across 4 faculties" accent="from-amber-500 to-orange-400" />
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Faculty schedule</p>
                    <p className="text-base font-medium text-white">4 classes in progress</p>
                  </div>
                  <div className="rounded-full bg-sky-500/10 px-3 py-1 text-sm text-sky-300">Live</div>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    { name: "Computer Science", time: "09:30" },
                    { name: "Business Analytics", time: "11:00" },
                    { name: "Research Lab", time: "01:30" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2"
                    >
                      <span className="text-sm text-slate-200">{item.name}</span>
                      <span className="text-sm text-slate-400">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}