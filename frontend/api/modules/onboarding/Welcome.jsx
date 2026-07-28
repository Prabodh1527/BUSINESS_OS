import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <AuthLayout title="Let’s set up your business" subtitle="Create the foundation for your Business OS workspace.">
      <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
        <div className="flex items-center gap-3 rounded-2xl bg-indigo-500/10 p-3 text-indigo-300">
          <Sparkles size={18} />
          <p className="text-sm">Your onboarding journey will take less than 3 minutes.</p>
        </div>
        <div className="mt-5 space-y-3 text-sm text-slate-400">
          <div className="rounded-2xl border border-slate-800 p-3">1. Add your business profile</div>
          <div className="rounded-2xl border border-slate-800 p-3">2. Choose your industry and services</div>
          <div className="rounded-2xl border border-slate-800 p-3">3. Invite your first employees</div>
        </div>
      </div>
      <button onClick={() => navigate("/onboarding/business") } className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
        Start onboarding
        <ArrowRight size={16} />
      </button>
    </AuthLayout>
  );
}
