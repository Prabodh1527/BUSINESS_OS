import { useState } from "react";
import { CheckCircle2, Clock3 } from "lucide-react";
import { employeeTasks } from "./data/mockData";

export default function MyTasks() {
  const [tasks, setTasks] = useState(employeeTasks);

  const markCompleted = (id) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status: "Completed" } : task)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">My Tasks</h1>
        <p className="mt-1 text-sm text-slate-400">Track your assigned work and update progress in real time.</p>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-white">{task.title}</h3>
                <p className="mt-1 text-sm text-slate-400">Due: {task.due}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs ${task.priority === "High" ? "bg-rose-500/10 text-rose-400" : task.priority === "Medium" ? "bg-amber-500/10 text-amber-400" : "bg-emerald-500/10 text-emerald-400"}`}>
                  {task.priority}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs ${task.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-sky-500/10 text-sky-400"}`}>
                  {task.status}
                </span>
                {task.status !== "Completed" ? (
                  <button onClick={() => markCompleted(task.id)} className="flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-emerald-500 hover:text-white">
                    <CheckCircle2 size={16} />
                    Mark completed
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
