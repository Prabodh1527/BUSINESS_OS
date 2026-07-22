import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Receipt,
  Package,
  UserCog,
  BarChart3,
  Bot,
  Settings,
  Clock3,
  BadgeCheck,
  FileText,
  CalendarRange,
} from "lucide-react";

const ownerNavigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "CRM",
    path: "/crm",
    icon: Users,
  },
  {
    label: "Appointments",
    path: "/appointments",
    icon: CalendarDays,
  },
  {
    label: "Billing",
    path: "/billing/invoices",
    icon: Receipt,
  },
  {
    label: "Inventory",
    path: "/inventory",
    icon: Package,
  },
  {
    label: "Employees",
    path: "/employees",
    icon: UserCog,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
  {
    label: "AI Analyst",
    path: "/ai",
    icon: Bot,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const employeeNavigation = [
  {
    label: "Dashboard",
    path: "/employee/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Schedule",
    path: "/employee/schedule",
    icon: CalendarRange,
  },
  {
    label: "My Tasks",
    path: "/employee/tasks",
    icon: FileText,
  },
  {
    label: "My Attendance",
    path: "/employee/attendance",
    icon: Clock3,
  },
  {
    label: "My Leaves",
    path: "/employee/leaves",
    icon: FileText,
  },
  {
    label: "My Payslips",
    path: "/employee/payslips",
    icon: BadgeCheck,
  },
  {
    label: "My Profile",
    path: "/employee/profile",
    icon: UserCog,
  },
];

export function getNavigationForRole(role) {
  if (role === "EMPLOYEE") return employeeNavigation;
  if (role === "MANAGER") return ownerNavigation.filter((item) => ["/dashboard", "/appointments", "/inventory", "/employees", "/reports"].includes(item.path));
  if (role === "RECEPTIONIST") return ownerNavigation.filter((item) => ["/dashboard", "/crm", "/appointments", "/billing/invoices"].includes(item.path));
  return ownerNavigation;
}

export default ownerNavigation;