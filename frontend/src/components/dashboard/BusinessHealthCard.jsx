import {
  Activity,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  CircleDollarSign,
} from "lucide-react";

const metrics = [
  {
    title: "Revenue",
    value: "+18%",
    icon: TrendingUp,
    color: "text-emerald-400",
  },
  {
    title: "Customers",
    value: "Excellent",
    icon: ShieldCheck,
    color: "text-sky-400",
  },
  {
    title: "Cash Flow",
    value: "Healthy",
    icon: CircleDollarSign,
    color: "text-indigo-400",
  },
];

export default function BusinessHealthCard() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">
            Business Health
          </p>

          <h2 className="mt-1 text-lg font-semibold text-white">
            Overall Score
          </h2>
        </div>

        <div className="rounded-xl bg-indigo-600/20 p-2.5">
          <Activity
            size={20}
            className="text-indigo-400"
          />
        </div>
      </div>

      <div className="my-6 flex justify-center">
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-indigo-500">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white">
              94
            </h1>

            <p className="text-xs text-slate-400">
              /100
            </p>
          </div>

          <div className="absolute -right-1 -top-1 rounded-full bg-emerald-500 p-1.5">
            <ArrowUpRight
              size={14}
              className="text-white"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {metrics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/40 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-800 p-2">
                  <Icon
                    size={16}
                    className={item.color}
                  />
                </div>

                <span className="text-sm text-slate-300">
                  {item.title}
                </span>
              </div>

              <span className="text-sm font-semibold text-white">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>

      <button className="mt-5 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500">
        View Full Report
      </button>
    </div>
  );
}