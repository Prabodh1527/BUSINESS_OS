import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";

export default function ServicesSetup() {
  const navigate = useNavigate();

  return (
    <AuthLayout title="Service catalog" subtitle="Organize your products and service menu for the team.">
      <div className="space-y-3">
        {[
          "Haircut",
          "Hair Spa",
          "Facial",
          "Manicure",
        ].map((service) => (
          <div key={service} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
            <span>{service}</span>
            <span className="text-slate-500">Active</span>
          </div>
        ))}
      </div>
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-indigo-500 hover:text-white">
        <Plus size={16} />
        Add another service
      </button>
      <button onClick={() => navigate("/onboarding/employees")} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
        Continue
        <ArrowRight size={16} />
      </button>
    </AuthLayout>
  );
}
