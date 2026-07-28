export const AUTH_STORAGE_KEY = "business-os-auth";
export const ONBOARDING_STORAGE_KEY = "business-os-onboarding";

export const demoAccounts = {
  OWNER: {
    id: "owner-1",
    name: "Prabodh",
    email: "owner@businessos.com",
    password: "password123",
    role: "OWNER",
    company: "Northstar Studio",
  },
  MANAGER: {
    id: "manager-1",
    name: "Asha Mehta",
    email: "manager@businessos.com",
    password: "password123",
    role: "MANAGER",
    company: "Northstar Studio",
  },
  RECEPTIONIST: {
    id: "receptionist-1",
    name: "Ravi Kumar",
    email: "receptionist@businessos.com",
    password: "password123",
    role: "RECEPTIONIST",
    company: "Northstar Studio",
  },
  EMPLOYEE: {
    id: "employee-1",
    name: "Neha Rao",
    email: "employee@businessos.com",
    password: "password123",
    role: "EMPLOYEE",
    company: "Northstar Studio",
  },
};

export function getStoredUser() {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to restore auth state", error);
    return null;
  }
}

export function persistUser(nextUser) {
  if (nextUser) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function clearAuthStorage() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(ONBOARDING_STORAGE_KEY);
  sessionStorage.clear();
}

export function signInWithCredentials(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const account = Object.values(demoAccounts).find(
    (entry) => entry.email === normalizedEmail && entry.password === password
  );

  if (!account) {
    return { success: false, message: "Invalid email or password." };
  }

  const nextUser = {
    ...account,
    onboardingCompleted: Boolean(localStorage.getItem(ONBOARDING_STORAGE_KEY)),
  };

  persistUser(nextUser);
  return { success: true, user: nextUser, message: "Signed in successfully." };
}

export function signUpWithRole(name, email, password, role = "OWNER") {
  const normalizedEmail = email.trim().toLowerCase();
  const nextUser = {
    id: `${role.toLowerCase()}-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    role,
    company: "New Business",
    onboardingCompleted: false,
  };

  persistUser(nextUser);
  return { success: true, user: nextUser, message: "Account created." };
}

export function completeOnboardingForUser(user) {
  if (!user) return null;
  const nextUser = { ...user, onboardingCompleted: true };
  localStorage.setItem(ONBOARDING_STORAGE_KEY, "completed");
  persistUser(nextUser);
  return nextUser;
}

export function getRoleHomePath(role) {
  if (role === "EMPLOYEE") return "/employee/dashboard";
  if (role === "MANAGER") return "/dashboard";
  if (role === "RECEPTIONIST") return "/dashboard";
  return "/dashboard";
}
