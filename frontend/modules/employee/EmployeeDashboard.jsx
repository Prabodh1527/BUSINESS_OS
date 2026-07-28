import { Link } from "react-router-dom";
import { CalendarDays, ClipboardList, Clock3, FileText, Megaphone, CheckCircle2, BadgeCheck, CalendarRange } from "lucide-react";
import { employeeAnnouncements, employeeTasks } from "./data/mockData";

const cards = [
  { title: "Today's Schedule", value: "4 appointments", icon: CalendarDays, color: "bg-indigo-500/10 text-indigo-400" },
  { title: "Assigned Tasks", value: "3 pending", icon: ClipboardList, color: "bg-emerald-500/10 text-emerald-400" },
  { title: "Attendance", value: "Present", icon: Clock3, color: "bg-sky-500/10 text-sky-400" },
  { title: "Leave Balance", value: "12 days", icon: FileText, color: "bg-amber-500/10 text-amber-400" },
];

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Employee Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">Stay on top of your tasks, shifts, and daily operations.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <div className={`inline-flex rounded-xl p-3 ${card.color}`}>
                <Icon size={20} />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-white">{card.value}</h2>
              <p className="mt-1 text-sm text-slate-400">{card.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Today's Tasks</h2>
            <Link to="/employee/tasks" className="text-sm text-indigo-400 hover:text-indigo-300">View all</Link>
          </div>
          <div className="mt-4 space-y-3">
            {employeeTasks.slice(0, 3).map((task) => (
              <div key={task.id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                <span>{task.title}</span>
                <span className="text-indigo-400">{task.priority}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-3">
            <Megaphone className="text-amber-400" size={18} />
            <h2 className="text-xl font-semibold text-white">Announcements</h2>
          </div>
          <div className="mt-4 space-y-3">
            {employeeAnnouncements.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-400">
                <p className="font-medium text-white">{item.title}</p>
                <p className="mt-1">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/employee/attendance" className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-indigo-500 hover:text-white">
            <CheckCircle2 size={16} />
            Mark Attendance
          </Link>
          <Link to="/employee/leaves" className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-indigo-500 hover:text-white">
            <CalendarRange size={16} />
            Apply Leave
          </Link>
          <Link to="/employee/schedule" className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-indigo-500 hover:text-white">
            <CalendarDays size={16} />
            View Schedule
          </Link>
          <Link to="/employee/payslips" className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-indigo-500 hover:text-white">
            <BadgeCheck size={16} />
            View Payslips
          </Link>
        </div>
      </div>
    </div>
  );
}
