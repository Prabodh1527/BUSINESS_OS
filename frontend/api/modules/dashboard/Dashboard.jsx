import {
  ArrowUpRight,
  Brain,
  CalendarDays,
  DollarSign,
  Users,
} from "lucide-react";

import RevenueChart from "@/components/charts/RevenueChart";

import NotificationPanel from "@/components/dashboard/NotificationPanel";
import RecentActivity from "@/components/dashboard/RecentActivity";
import BusinessHealthCard from "@/components/dashboard/BusinessHealthCard";
import AIInsights from "@/components/dashboard/AIInsights";
import InventoryAlerts from "@/components/dashboard/InventoryAlerts";

const stats = [
  {
    title: "Revenue",
    value: "₹12.8L",
    change: "+18%",
    icon: DollarSign,
  },
  {
    title: "Customers",
    value: "2,486",
    change: "+8%",
    icon: Users,
  },
  {
    title: "Appointments",
    value: "324",
    change: "+12%",
    icon: CalendarDays,
  },
  {
    title: "Profit",
    value: "₹3.2L",
    change: "+21%",
    icon: ArrowUpRight,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-5">
      {/* HERO */}

      <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="max-w-3xl">
            <p className="text-sm text-slate-400">
              Welcome back 👋
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              Business Dashboard
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Revenue increased by 18% this month. AI recommends following up with
              8 customers and restocking 3 inventory items.
            </p>
          </div>

          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 px-8 py-5 text-center">
            <Brain
              size={28}
              className="mx-auto text-indigo-400"
            />

            <h2 className="mt-3 text-4xl font-bold text-white">
              94
            </h2>

            <p className="text-xs text-slate-400">
              Health Score
            </p>
          </div>
        </div>
      </section>

      {/* KPI */}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-indigo-500"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-slate-800 p-2.5">
                  <Icon size={20} />
                </div>

                <span className="text-sm font-medium text-emerald-400">
                  {item.change}
                </span>
              </div>

              <h2 className="mt-6 text-2xl font-bold text-white">
                {item.value}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {item.title}
              </p>
            </div>
          );
        })}
      </section>

      {/* CHART */}

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <NotificationPanel />
      </section>

      {/* AI */}

      <section className="grid gap-4 xl:grid-cols-2">
        <BusinessHealthCard />

        <AIInsights />
      </section>

      {/* BOTTOM */}

      <section className="grid gap-4 xl:grid-cols-2">
        <RecentActivity />

        <InventoryAlerts />
      </section>
    </div>
  );
}