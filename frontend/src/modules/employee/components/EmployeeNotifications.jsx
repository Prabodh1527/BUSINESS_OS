import { BellRing } from "lucide-react";
import { employeeNotifications } from "../data/mockData";

export default function EmployeeNotifications() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-white">Employee Notifications</h1>
        <p className="mt-1 text-sm text-slate-400">You’ll see updates about approvals, assignments, and payslips here.</p>
      </div>

      <div className="space-y-3">
        {employeeNotifications.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-400">
                <BellRing size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{item.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
