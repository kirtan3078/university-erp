type EventItem = {
  title: string;
  date: string;
};

const events: EventItem[] = [
  { title: "Data Structures Mid Exam", date: "21 Jul 2026" },
  { title: "Faculty Feedback Round", date: "24 Jul 2026" },
  { title: "Fee Deadline", date: "25 Jul 2026" },
];

export default function EventCard() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_10px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">Upcoming Events</h2>
      <div className="mt-4 space-y-3">
        {events.map((event) => (
          <div key={event.title} className="rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3">
            <p className="font-medium text-white">{event.title}</p>
            <p className="mt-1 text-sm text-slate-400">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
