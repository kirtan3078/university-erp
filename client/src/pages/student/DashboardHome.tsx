import { CalendarDays, Clock3, FileText, GraduationCap, Landmark, Megaphone, Sparkles, Wallet } from "lucide-react";

const stats = [
  { label: "Attendance", value: "92%", detail: "Consistent this semester", icon: GraduationCap },
  { label: "Semester", value: "6th", detail: "Current active term", icon: Landmark },
  { label: "CGPA", value: "8.7", detail: "Top 15% of batch", icon: Sparkles },
  { label: "Pending Fees", value: "₹18,500", detail: "Due by 25 Jul", icon: Wallet },
];

const actions = [
  { label: "View Results", icon: FileText },
  { label: "Pay Fees", icon: Wallet },
  { label: "Download Hall Ticket", icon: FileText },
  { label: "View Timetable", icon: CalendarDays },
];

const notices = [
  "Mid-semester results will be published on 22 July.",
  "Library access extended for evening scholars.",
  "Campus transport update for semester exams.",
];

const events = [
  { title: "Data Structures Mid Exam", date: "21 Jul 2026" },
  { title: "Faculty Feedback Round", date: "24 Jul 2026" },
  { title: "Fee Deadline", date: "25 Jul 2026" },
];

const activities = [
  { title: "Attendance submitted", time: "09:20 AM" },
  { title: "Assignment uploaded", time: "11:45 AM" },
  { title: "Fee reminder viewed", time: "02:10 PM" },
];

function DashboardCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_10px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {children}
    </div>
  );
}

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <DashboardCard title="Welcome back, Aarav Vyas">
        <div className="mt-4 rounded-[1.25rem] border border-cyan-400/20 bg-gradient-to-r from-sky-500/15 via-cyan-400/10 to-fuchsia-500/15 p-5">
          <p className="text-slate-300">Your academic dashboard is up to date. Track attendance, fees, exams and notices in one place.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">Active semester</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">4 new notices</span>
          </div>
        </div>
      </DashboardCard>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, detail, icon: Icon }) => (
          <div key={label} className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-4 shadow-[0_10px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
              </div>
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-3 text-cyan-300">
                <Icon size={18} />
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500">{detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <DashboardCard title="Quick Actions">
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {actions.map(({ label, icon: Icon }) => (
                <button key={label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-cyan-400/40 hover:bg-slate-700/70">
                  <span>{label}</span>
                  <Icon size={16} className="text-cyan-300" />
                </button>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Latest Notices">
            <ul className="mt-4 space-y-3">
              {notices.map((notice) => (
                <li key={notice} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-slate-300">
                  <Megaphone size={16} className="mt-0.5 text-cyan-300" />
                  <span>{notice}</span>
                </li>
              ))}
            </ul>
          </DashboardCard>
        </div>

        <div className="space-y-6">
          <DashboardCard title="Upcoming Events">
            <div className="mt-4 space-y-3">
              {events.map((event) => (
                <div key={event.title} className="rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3">
                  <p className="font-medium text-white">{event.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{event.date}</p>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Recent Activity">
            <div className="mt-4 space-y-3">
              {activities.map((activity) => (
                <div key={activity.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-800/70 px-4 py-3">
                  <div>
                    <p className="font-medium text-white">{activity.title}</p>
                    <p className="text-sm text-slate-400">{activity.time}</p>
                  </div>
                  <Clock3 size={16} className="text-cyan-300" />
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <DashboardCard title="Calendar">
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
        </DashboardCard>

        <DashboardCard title="Support Contact">
          <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-slate-800/70 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">Student Help Desk</p>
            <p className="mt-2">Email: support@unierp.edu</p>
            <p className="mt-1">Phone: +91 98765 43210</p>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
