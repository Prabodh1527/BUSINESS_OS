import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">Loading your workspace…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === "EMPLOYEE" ? "/employee/dashboard" : "/dashboard"} replace />;
  }

  return children;
}
