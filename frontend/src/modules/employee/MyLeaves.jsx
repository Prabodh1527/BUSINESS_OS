import { useState } from "react";
import { FileText, PlusCircle } from "lucide-react";
import { leaveHistory } from "./data/mockData";

export default function MyLeaves() {
  const [form, setForm] = useState({ type: "Casual Leave", from: "2026-07-22", to: "2026-07-23", reason: "Personal work" });
  const [history, setHistory] = useState(leaveHistory);

  const submitLeave = (event) => {
    event.preventDefault();
    setHistory((prev) => [{ id: Date.now(), type: form.type, range: `${form.from} - ${form.to}`, reason: form.reason, status: "Pending" }, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">My Leaves</h1>
        <p className="mt-1 text-sm text-slate-400">Apply for leave and keep track of your request history.</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-3 text-amber-400">
            <FileText size={18} />
            <h2 className="text-xl font-semibold text-white">Apply Leave</h2>
          </div>
          <form onSubmit={submitLeave} className="mt-5 space-y-4">
            <select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none">
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Emergency Leave</option>
            </select>
            <div className="grid gap-4 md:grid-cols-2">
              <input type="date" value={form.from} onChange={(event) => setForm({ ...form, from: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none" />
              <input type="date" value={form.to} onChange={(event) => setForm({ ...form, to: event.target.value })} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none" />
            </div>
            <textarea value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} rows="4" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none" />
            <button type="submit" className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">
              <PlusCircle size={16} />
              Submit Leave
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Leave Balance</h2>
          <div className="mt-4 grid gap-3">
            {[
              { label: "Leave balance", value: "12 days" },
              { label: "Pending requests", value: "1" },
              { label: "Approved this month", value: "2" },
              { label: "Carry forward", value: "3 days" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-4">
                <p className="text-sm text-slate-400">{item.label}</p>
                <p className="mt-1 font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-xl font-semibold text-white">Leave History</h2>
        <div className="mt-4 space-y-3">
          {history.map((item) => (
            <div key={item.id} className="flex flex-wrap items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
              <div>
                <p className="font-medium text-white">{item.type}</p>
                <p className="text-slate-400">{item.range}</p>
                <p className="text-slate-500">{item.reason}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs ${item.status === "Approved" ? "bg-emerald-500/10 text-emerald-400" : item.status === "Rejected" ? "bg-rose-500/10 text-rose-400" : "bg-amber-500/10 text-amber-400"}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
