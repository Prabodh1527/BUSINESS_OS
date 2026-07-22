import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";

export default function ForgotPassword() {
  return (
    <AuthLayout title="Reset your password" subtitle="We’ll help you get back into your workspace quickly.">
      <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
        <div className="mb-4 flex items-center gap-3 text-slate-300">
          <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-400">
            <Mail size={18} />
          </div>
          <div>
            <p className="font-medium text-white">Email recovery</p>
            <p className="text-sm text-slate-400">Use owner@businessos.com or employee@businessos.com for demo access.</p>
          </div>
        </div>
        <input className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none focus:border-indigo-500" placeholder="Work email" />
      </div>
      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
        Send reset link
        <ArrowRight size={16} />
      </button>
      <p className="mt-5 text-sm text-slate-400">
        Remembered it? <Link to="/login" className="text-indigo-400 hover:text-indigo-300">Back to sign in</Link>
      </p>
    </AuthLayout>
  );
}
