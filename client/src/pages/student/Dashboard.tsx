import QuickActions from "../../components/dashboard/QuickActions";
import QuickStats from "../../components/dashboard/QuickStats";
import NoticeBoard from "../../components/dashboard/NoticeBoard";
import EventCard from "../../components/dashboard/EventCard";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";
import CalendarCard from "../../components/dashboard/CalendarCard";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_10px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl">
        <h1 className="text-2xl font-semibold text-white">Welcome back, Aarav Vyas</h1>
        <div className="mt-4 rounded-[1.25rem] border border-cyan-400/20 bg-gradient-to-r from-sky-500/15 via-cyan-400/10 to-fuchsia-500/15 p-5">
          <p className="text-slate-300">Your academic dashboard is up to date. Track attendance, fees, exams and notices in one place.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">Active semester</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">4 new notices</span>
          </div>
        </div>
      </div>

      <QuickStats />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <QuickActions />
          <NoticeBoard />
        </div>

        <div className="space-y-6">
          <EventCard />
          <ActivityTimeline />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <CalendarCard />
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_10px_45px_rgba(2,6,23,0.35)] backdrop-blur-xl">
          <h2 className="text-lg font-semibold text-white">Support Contact</h2>
          <div className="mt-4 rounded-[1.25rem] border border-white/10 bg-slate-800/70 p-4 text-sm text-slate-300">
            <p className="font-medium text-white">Student Help Desk</p>
            <p className="mt-2">Email: support@unierp.edu</p>
            <p className="mt-1">Phone: +91 98765 43210</p>
          </div>
        </div>
      </div>
    </div>
  );
}
