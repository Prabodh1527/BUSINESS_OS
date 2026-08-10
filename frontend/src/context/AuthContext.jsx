import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  clearAuthStorage,
  completeOnboardingForUser,
  getStoredUser,
} from "@/services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = getStoredUser();
      const storedToken = localStorage.getItem("token");

      if (storedUser) {
        setUser(storedUser);
      }
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Auth state initialization error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const persistAuth = (userData, rawToken) => {
    setUser(userData);
    setToken(rawToken);

    if (userData || rawToken) {
      const tokenToSave =
        rawToken ||
        userData?.token ||
        userData?.user?.token ||
        localStorage.getItem("token");

      if (tokenToSave) {
        localStorage.setItem("token", tokenToSave);
      }

      const fullAuthPayload = {
        ...(typeof userData === "object" ? userData : {}),
        token: tokenToSave || "",
      };
      localStorage.setItem("business-os-auth", JSON.stringify(fullAuthPayload));
    } else {
      localStorage.removeItem("business-os-auth");
      localStorage.removeItem("token");
    }
  };

  const signIn = async ({ email, password, role = "OWNER" }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Invalid credentials",
        };
      }

      const jwtToken = data.token || data.user?.token;
      const userObj = data.user || data;

      persistAuth(userObj, jwtToken);

      return {
        success: true,
        user: userObj,
        token: jwtToken,
        message: data.message,
      };
    } catch (error) {
      console.error("SignIn server connection error:", error);
      return {
        success: false,
        message: "Server connection failed. Please ensure your backend is running.",
      };
    }
  };

  const signUp = async ({ name, email, password, role = "OWNER" }) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Registration failed",
        };
      }

      const jwtToken = data.token || data.user?.token;
      const userObj = data.user || data;

      persistAuth(userObj, jwtToken);

      return {
        success: true,
        user: userObj,
        token: jwtToken,
        message: data.message,
      };
    } catch (error) {
      console.error("SignUp server connection error:", error);
      return {
        success: false,
        message: "Server connection failed. Please ensure your backend is running.",
      };
    }
  };

  const signOut = () => {
    clearAuthStorage();
    persistAuth(null, null);
  };

  const completeOnboarding = () => {
    if (!user) return;
    const nextUser = completeOnboardingForUser(user);
    if (nextUser) {
      persistAuth(nextUser, token);
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      signIn,
      signUp,
      signOut,
      completeOnboarding,
      isAuthenticated: Boolean(token || user),
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}