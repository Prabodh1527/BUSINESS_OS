import { useState } from "react";
import { Clock3, ClipboardList } from "lucide-react";
import { attendanceHistory } from "./data/mockData";

export default function MyAttendance() {
  const [status, setStatus] = useState("Present");
  const [history] = useState(attendanceHistory);

  const markAttendance = (nextStatus) => setStatus(nextStatus);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">My Attendance</h1>
        <p className="mt-1 text-sm text-slate-400">Mark your status for today and review your attendance history.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center gap-3 text-emerald-400">
          <Clock3 size={18} />
          <h2 className="text-xl font-semibold text-white">Today's Status</h2>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <p className="text-sm text-slate-400">Current status</p>
            <p className="mt-2 text-2xl font-semibold text-white">{status}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={() => markAttendance("Present")} className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-emerald-500 hover:text-white">Mark Present</button>
              <button onClick={() => markAttendance("Half Day")} className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-amber-500 hover:text-white">Mark Half Day</button>
              <button onClick={() => markAttendance("Pending")} className="rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-indigo-500 hover:text-white">Request correction</button>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <p className="text-sm text-slate-400">Attendance summary</p>
            <div className="mt-3 space-y-3 text-sm text-slate-300">
              <div className="flex items-center justify-between rounded-xl border border-slate-800 px-3 py-2"><span>Attendance %</span><span>92%</span></div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800 px-3 py-2"><span>Check-in</span><span>09:10 AM</span></div>
              <div className="flex items-center justify-between rounded-xl border border-slate-800 px-3 py-2"><span>Check-out</span><span>06:15 PM</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center gap-3 text-slate-300">
          <ClipboardList size={18} />
          <h2 className="text-xl font-semibold text-white">Attendance History</h2>
        </div>
        <div className="mt-4 space-y-3">
          {history.map((item) => (
            <div key={item.date} className="flex flex-wrap items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
              <div>
                <p className="font-medium text-white">{item.date}</p>
                <p className="text-slate-400">{item.hours}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs ${item.status === "Present" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
