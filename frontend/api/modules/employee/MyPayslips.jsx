import { BadgeCheck, Download } from "lucide-react";
import { payslips } from "./data/mockData";

export default function MyPayslips() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">My Payslips</h1>
        <p className="mt-1 text-sm text-slate-400">View and download payslips uploaded by the owner.</p>
      </div>

      <div className="space-y-3">
        {payslips.map((payslip) => (
          <div key={payslip.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-white">{payslip.month} {payslip.year}</h3>
                <p className="mt-1 text-sm text-slate-400">Salary: {payslip.salary}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">{payslip.status}</span>
                <a href={payslip.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm text-slate-300 hover:border-indigo-500 hover:text-white">
                  <Download size={16} />
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
