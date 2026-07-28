import {
  Brain,
  TrendingUp,
  Users,
  Wallet,
  ArrowRight,
} from "lucide-react";

const insights = [
  {
    title: "Increase Marketing Budget",
    description:
      "Boost marketing this week to potentially increase customer acquisition by 22%.",
    icon: TrendingUp,
    color: "text-emerald-400",
  },
  {
    title: "Customer Retention",
    description:
      "68% of this month's revenue comes from returning customers.",
    icon: Users,
    color: "text-sky-400",
  },
  {
    title: "Cash Flow",
    description:
      "Cash flow is healthy and stable for the next 60 days.",
    icon: Wallet,
    color: "text-indigo-400",
  },
];

export default function AIInsights() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-600 p-2.5">
            <Brain size={18} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              AI Insights
            </h2>

            <p className="text-xs text-slate-400">
              Smart recommendations
            </p>
          </div>
        </div>

        <button className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium transition hover:bg-indigo-500">
          Open AI
        </button>
      </div>

      <div className="space-y-3">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-slate-800/40 p-3 transition hover:border-indigo-500"
            >
              <div className="flex gap-3">
                <div className="rounded-lg bg-slate-800 p-2">
                  <Icon
                    size={16}
                    className={item.color}
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {item.description}
                  </p>

                  <button className="mt-2 flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300">
                    View Recommendation
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}