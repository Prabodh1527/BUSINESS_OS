import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { useAuth } from "@/context/AuthContext";

export default function Complete() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();

  const finish = () => {
    completeOnboarding();
    navigate("/dashboard", { replace: true });
  };

  return (
    <AuthLayout title="You’re all set" subtitle="Your Business OS workspace is ready.">
      <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
          <CheckCircle2 size={30} />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">Onboarding complete</h3>
        <p className="mt-2 text-sm text-slate-300">Your team can now explore CRM, billing, appointments, inventory, and AI insights.</p>
      </div>
      <button onClick={finish} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
        Open dashboard
        <ArrowRight size={16} />
      </button>
    </AuthLayout>
  );
}
