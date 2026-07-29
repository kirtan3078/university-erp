import { Sparkles } from "lucide-react";

export default function WelcomeBanner() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg opacity-90">{greeting}, Admin 👋</p>

          <h1 className="mt-2 text-4xl font-bold">
            University ERP Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Manage students, faculty, attendance, fees,
            notices and reports from one place.
          </p>
        </div>

        <div className="hidden rounded-full bg-white/20 p-6 lg:block">
          <Sparkles size={55} />
        </div>
      </div>
    </div>
  );
}