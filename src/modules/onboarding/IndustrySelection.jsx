import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";

const services = {
  Salon: ["Haircut", "Hair Spa", "Facial"],
  Clinic: ["Consultation", "Therapy", "Diagnostics"],
  Restaurant: ["Dining", "Delivery", "Takeaway"],
  Construction: ["Site Visit", "Planning", "Maintenance"],
};

export default function IndustrySelection() {
  const navigate = useNavigate();
  const industry = "Salon";

  return (
    <AuthLayout title="Choose services" subtitle="Add the core services your business offers.">
      <div className="space-y-3">
        {services[industry].map((service) => (
          <label key={service} className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-300">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-700 bg-slate-900" />
            {service}
          </label>
        ))}
      </div>
      <button onClick={() => navigate("/onboarding/employees")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
        Continue
        <ArrowRight size={16} />
      </button>
    </AuthLayout>
  );
}
