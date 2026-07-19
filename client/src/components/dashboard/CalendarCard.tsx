export default function CalendarCard() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_10px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Calendar</h2>
      <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-slate-800/70 p-4 text-sm text-slate-300">
        <p className="font-medium text-white">July 2026</p>
        <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs text-slate-400">
          {['S','M','T','W','T','F','S'].map((day) => (
            <span key={day}>{day}</span>
          ))}
          {Array.from({ length: 31 }, (_, index) => (
            <span key={index + 1} className={`rounded-full px-2 py-1 ${index + 1 === 21 ? "bg-cyan-500/20 text-cyan-300" : ""}`}>
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
