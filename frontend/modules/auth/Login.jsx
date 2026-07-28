import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Building2, ShieldCheck } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { useAuth } from "@/context/AuthContext";

const presetRoles = [
  { id: "OWNER", label: "Owner Login", description: "Owners and admins" },
  { id: "EMPLOYEE", label: "Employee Login", description: "Staff and managers" },
];

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [mode, setMode] = useState("OWNER");
  const [form, setForm] = useState({
    email: "owner@businessos.com",
    password: "password123",
  });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = signIn(form);
    if (!result.success) {
      setError(result.message);
      return;
    }

    const roleRedirect = form.email.includes("employee") ? "/employee/dashboard" : "/dashboard";
    navigate(roleRedirect, { replace: true });
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to continue managing your business from one place.">
      <div className="mb-6 flex gap-2 rounded-2xl border border-slate-800 bg-slate-950/80 p-1">
        {presetRoles.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setMode(item.id);
              setForm({
                email: item.id === "OWNER" ? "owner@businessos.com" : "employee@businessos.com",
                password: "password123",
              });
            }}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition ${
              mode === item.id ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="font-medium text-white">{mode === "OWNER" ? "Owner workspace" : "Employee workspace"}</p>
              <p className="text-sm text-slate-400">{mode === "OWNER" ? "For owners and admins" : "For staff and managers"}</p>
            </div>
            {mode === "OWNER" ? <Building2 className="text-indigo-400" size={18} /> : <ShieldCheck className="text-emerald-400" size={18} />}
          </div>
          <div className="space-y-3">
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none focus:border-indigo-500"
              placeholder="Email address"
            />
            <input
              type="password"
              required
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none focus:border-indigo-500"
              placeholder="Password"
            />
          </div>
        </div>

        {error ? <p className="text-sm text-rose-400">{error}</p> : null}

        <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
          Continue to dashboard
          <ArrowRight size={16} />
        </button>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <Link to="/forgot-password" className="hover:text-white">Forgot password?</Link>
        <Link to="/register" className="hover:text-white">Create account</Link>
      </div>
    </AuthLayout>
  );
}
