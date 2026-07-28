export const employeeProfile = {
  name: "Test User",
  email: "employee@businessos.com",
  phone: "+91 9876543210",
  role: "EMPLOYEE",
  joiningDate: "12 Apr 2024",
  skills: ["Customer service", "Appointment coordination", "Inventory support"],
};

export const employeeAnnouncements = [
  {
    id: 1,
    title: "New service launch",
    message: "Hair Spa and premium facial packages are now available for staff training.",
  },
  {
    id: 2,
    title: "Inventory reminder",
    message: "Please verify stock for Hair Serum and Shampoo before your shift.",
  },
];

export const employeeTasks = [
  {
    id: 1,
    title: "Complete customer appointment",
    priority: "High",
    status: "Pending",
    due: "Today",
  },
  {
    id: 2,
    title: "Update inventory count",
    priority: "High",
    status: "Pending",
    due: "Today",
  },
  {
    id: 3,
    title: "Follow up with customer",
    priority: "Medium",
    status: "Pending",
    due: "Tomorrow",
  },
  {
    id: 4,
    title: "Prepare check-in report",
    priority: "Low",
    status: "Completed",
    due: "Completed",
  },
];

export const employeeAppointments = [
  {
    id: 1,
    customer: "Rahul Sharma",
    service: "Haircut",
    time: "10:00 AM",
    status: "Assigned",
  },
  {
    id: 2,
    customer: "Priya Reddy",
    service: "Facial",
    time: "12:30 PM",
    status: "Assigned",
  },
  {
    id: 3,
    customer: "Aman Verma",
    service: "Hair Spa",
    time: "03:00 PM",
    status: "Accepted",
  },
];

export const attendanceHistory = [
  {
    date: "20 Jul 2026",
    status: "Present",
    hours: "9:30 AM - 6:00 PM",
  },
  {
    date: "21 Jul 2026",
    status: "Present",
    hours: "10:00 AM - 6:30 PM",
  },
];

export const leaveHistory = [
  {
    id: 1,
    type: "Sick Leave",
    range: "22 Jul - 23 Jul",
    reason: "Fever and rest needed",
    status: "Pending",
  },
  {
    id: 2,
    type: "Casual Leave",
    range: "10 Jul - 10 Jul",
    reason: "Family function",
    status: "Approved",
  },
];

export const payslips = [
  {
    id: 1,
    month: "June",
    year: "2026",
    salary: "₹35,000",
    status: "Available",
    url: "https://example.com/payslip-june.pdf",
  },
  {
    id: 2,
    month: "May",
    year: "2026",
    salary: "₹35,000",
    status: "Available",
    url: "https://example.com/payslip-may.pdf",
  },
];

export const employeeNotifications = [
  {
    id: 1,
    title: "Leave approved",
    message: "Your request for 10 Jul leave is approved.",
    time: "15 mins ago",
  },
  {
    id: 2,
    title: "New appointment assigned",
    message: "You have a new haircut appointment for Rahul Sharma.",
    time: "45 mins ago",
  },
  {
    id: 3,
    title: "Payslip uploaded",
    message: "Your payslip for June 2026 is now available.",
    time: "1 hr ago",
  },
];
