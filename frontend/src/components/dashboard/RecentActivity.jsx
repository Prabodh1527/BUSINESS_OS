import {
  UserPlus,
  Receipt,
  CalendarCheck,
  PackageCheck,
} from "lucide-react";

const activities = [
  {
    title: "New customer registered",
    subtitle: "Rahul Sharma joined",
    time: "2 mins ago",
    icon: UserPlus,
    color: "text-indigo-400",
  },
  {
    title: "Invoice paid",
    subtitle: "INV-1025 • ₹18,500",
    time: "18 mins ago",
    icon: Receipt,
    color: "text-emerald-400",
  },
  {
    title: "Appointment completed",
    subtitle: "Hair Spa • Priya",
    time: "1 hour ago",
    icon: CalendarCheck,
    color: "text-sky-400",
  },
  {
    title: "Inventory updated",
    subtitle: "12 new products added",
    time: "Today",
    icon: PackageCheck,
    color: "text-amber-400",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Recent Activity
        </h2>

        <button className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/40 p-3 transition hover:border-indigo-500"
            >
              <div className="rounded-lg bg-slate-800 p-2">
                <Icon
                  size={16}
                  className={item.color}
                />
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium text-white">
                  {item.title}
                </h3>

                <p className="mt-0.5 text-xs text-slate-400">
                  {item.subtitle}
                </p>
              </div>

              <span className="text-[11px] whitespace-nowrap text-slate-500">
                {item.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}