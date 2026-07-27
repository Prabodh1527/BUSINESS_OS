import { useState } from "react";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { employeeAppointments } from "./data/mockData";

export default function MySchedule() {
  const [appointments, setAppointments] = useState(employeeAppointments);

  const updateAppointment = (id, nextStatus) => {
    setAppointments((prev) => prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">My Schedule</h1>
        <p className="mt-1 text-sm text-slate-400">View your assigned appointments and update them as you progress.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center gap-3 text-indigo-400">
          <CalendarDays size={18} />
          <h2 className="text-xl font-semibold text-white">Today’s appointments</h2>
        </div>
        <div className="mt-4 space-y-3">
          {appointments.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
              <div>
                <p className="font-medium text-white">{item.customer}</p>
                <p className="text-slate-400">{item.service} • {item.time}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs ${item.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-sky-500/10 text-sky-400"}`}>{item.status}</span>
                {item.status !== "Completed" ? (
                  <button onClick={() => updateAppointment(item.id, "Accepted")} className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-indigo-500 hover:text-white">Accept</button>
                ) : null}
                {item.status !== "Completed" ? (
                  <button onClick={() => updateAppointment(item.id, "Completed")} className="flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-emerald-500 hover:text-white">
                    <CheckCircle2 size={16} />
                    Mark completed
                  </button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
