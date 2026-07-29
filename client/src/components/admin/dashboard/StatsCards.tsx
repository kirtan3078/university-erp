import {
  Users,
  GraduationCap,
  Building2,
  Activity,
} from "lucide-react";

const cards = [
  {
    title: "Students",
    value: "0",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Faculty",
    value: "0",
    icon: GraduationCap,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Departments",
    value: "0",
    icon: Building2,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Active Users",
    value: "0",
    icon: Activity,
    color: "from-orange-500 to-red-500",
  },
];

export default function StatsCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-2xl bg-gradient-to-r ${card.color} p-4 text-white`}
              >
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}