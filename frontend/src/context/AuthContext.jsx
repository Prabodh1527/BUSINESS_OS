import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  clearAuthStorage,
  completeOnboardingForUser,
  getStoredUser,
  signInWithCredentials,
  signUpWithRole,
} from "@/services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const persistUser = (nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem("business-os-auth", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("business-os-auth");
    }
  };

  const signIn = async ({ email, password }) => {
    const result = await signInWithCredentials(email, password);
    if (!result.success) {
      return result;
    }
    persistUser(result.user);
    return { success: true, user: result.user, message: result.message };
  };

  const signUp = async ({ name, email, password, role = "OWNER" }) => {
    const result = await signUpWithRole(name, email, password, role);
    if (!result.success) {
      return result;
    }
    persistUser(result.user);
    return { success: true, user: result.user, message: result.message };
  };

  const signOut = () => {
    clearAuthStorage();
    persistUser(null);
  };

  const completeOnboarding = () => {
    const nextUser = completeOnboardingForUser(user);
    if (nextUser) {
      persistUser(nextUser);
    }
  };

  const value = useMemo(
    () => ({ user, loading, signIn, signUp, signOut, completeOnboarding }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}