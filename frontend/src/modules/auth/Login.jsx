import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Building2, ShieldCheck, Eye, EyeOff } from "lucide-react";
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
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn({
        email: form.email,
        password: form.password,
      });

      if (!result || !result.success) {
        setError(result?.message || "Invalid email or password. Please create an account first.");
        setLoading(false);
        return;
      }

      const userRole = result.user?.role || mode;
      const targetPath = userRole === "EMPLOYEE" ? "/employee/dashboard" : "/dashboard";
      navigate(targetPath, { replace: true });
    } catch (err) {
      console.error("Login authentication error:", err);
      setError("Server connection error. Please try again.");
    } finally {
      setLoading(false);
    }
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
              setError("");
              setForm({ email: "", password: "" });
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
              placeholder="Enter your registered email"
            />
            
            {/* Password input with corrected show/hide icon logic */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-3 pr-10 text-sm text-white outline-none focus:border-indigo-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>
        </div>

        {error ? <p className="text-sm text-rose-400">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Continue to dashboard"}
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