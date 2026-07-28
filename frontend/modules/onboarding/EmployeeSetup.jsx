import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";

export default function EmployeeSetup() {
  const navigate = useNavigate();

  return (
    <AuthLayout title="Add your first team" subtitle="Create a few starter employee profiles for your operations.">
      <div className="space-y-3">
        {[
          { name: "Anjali", role: "Stylist" },
          { name: "Sneha", role: "Receptionist" },
          { name: "Rohit", role: "Manager" },
        ].map((employee) => (
          <div key={employee.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
            <div>
              <p className="font-medium text-white">{employee.name}</p>
              <p className="text-slate-400">{employee.role}</p>
            </div>
            <span className="text-slate-500">Ready</span>
          </div>
        ))}
      </div>
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-indigo-500 hover:text-white">
        <Plus size={16} />
        Add employee
      </button>
      <button onClick={() => navigate("/onboarding/complete")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
        Continue
        <ArrowRight size={16} />
      </button>
    </AuthLayout>
  );
}
