import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loading } = useAuth();

  // 1. Show loading state while checking session
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300 font-medium">
        Loading your workspace…
      </div>
    );
  }

  // 2. Redirect unauthenticated users back to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Prevent unauthorized roles from entering restricted routes
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const defaultRolePath = user.role === "EMPLOYEE" ? "/employee/dashboard" : "/dashboard";
    return <Navigate to={defaultRolePath} replace />;
  }

  // 4. Support both children components and nested router <Outlet /> layout wrappers
  return children ? children : <Outlet />;
}
