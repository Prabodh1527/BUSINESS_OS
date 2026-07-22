import {
  Bell,
  Clock3,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const notifications = [
  {
    title: "5 new appointments booked",
    time: "5 mins ago",
    icon: Bell,
    color: "text-indigo-400",
  },
  {
    title: "Inventory running low",
    time: "18 mins ago",
    icon: AlertTriangle,
    color: "text-amber-400",
  },
  {
    title: "Payroll completed",
    time: "Today",
    icon: CheckCircle2,
    color: "text-emerald-400",
  },
  {
    title: "GST filing due tomorrow",
    time: "Tomorrow",
    icon: Clock3,
    color: "text-rose-400",
  },
];

export default function NotificationPanel() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Notifications
        </h2>

        <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-400">
          4 New
        </span>
      </div>

      <div className="space-y-3">
        {notifications.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-800/40 p-3 transition hover:border-indigo-500"
            >
              <div className="rounded-lg bg-slate-800 p-2.5">
                <Icon
                  size={16}
                  className={item.color}
                />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-white">
                  {item.title}
                </p>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}