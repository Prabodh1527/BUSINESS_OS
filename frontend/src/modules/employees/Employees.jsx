import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  BadgeCheck,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  X,
} from "lucide-react";

const initialEmployees = [
  {
    id: 1,
    name: "Rahul Kumar",
    role: "Manager",
    phone: "+91 9876543210",
    email: "rahul@gmail.com",
    joining: "12 Jan 2025",
    salary: "₹55,000",
    attendance: "Present",
    leaveBalance: 12,
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Receptionist",
    phone: "+91 9988776655",
    email: "priya@gmail.com",
    joining: "05 Mar 2025",
    salary: "₹28,000",
    attendance: "Present",
    leaveBalance: 8,
    status: "Active",
  },
  {
    id: 3,
    name: "Sneha Patel",
    role: "Beautician",
    phone: "+91 9123456780",
    email: "sneha@gmail.com",
    joining: "20 Feb 2025",
    salary: "₹35,000",
    attendance: "Absent",
    leaveBalance: 5,
    status: "Active",
  },
  {
    id: 4,
    name: "Rohit Verma",
    role: "Hair Stylist",
    phone: "+91 9012345678",
    email: "rohit@gmail.com",
    joining: "10 Apr 2025",
    salary: "₹32,000",
    attendance: "Present",
    leaveBalance: 10,
    status: "Inactive",
  },
];

const stats = [
  {
    title: "Total Employees",
    value: "48",
    icon: Users,
    color: "bg-indigo-500/10 text-indigo-400",
  },
  {
    title: "Present Today",
    value: "44",
    icon: BadgeCheck,
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    title: "Pending Leaves",
    value: "6",
    icon: Clock,
    color: "bg-amber-500/10 text-amber-400",
  },
];

export default function Employees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState(initialEmployees);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    salary: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/create-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          designation: form.role,
          department: "General",
          salary: form.salary,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Employee created successfully! Credentials emailed to user.");

        // Add to local state list
        setEmployees([
          ...employees,
          {
            ...form,
            id: data.user?._id || Date.now(),
            attendance: "Not Marked",
            joining: "Today",
            leaveBalance: 12,
          },
        ]);

        setForm({
          name: "",
          role: "",
          phone: "",
          email: "",
          salary: "",
          status: "Active",
        });

        setShowForm(false);
      } else {
        alert(data.message || "Failed to create employee.");
      }
    } catch (error) {
      console.error("Add Employee Error:", error);
      alert("Error connecting to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Employees</h1>
          <p className="mt-1 text-slate-400">
            Manage your business workforce, attendance and payroll.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Employee Form */}
      {showForm && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Add New Employee</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={addEmployee} className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Employee Name"
              className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              required
            />

            <input
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="Role / Designation"
              className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              required
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              required
            />

            <input
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="Monthly Salary"
              className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-indigo-600 p-3 text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              {loading ? "Creating & Sending Email..." : "Save Employee"}
            </button>
          </form>
        </div>
      )}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className={`inline-flex rounded-xl p-3 ${item.color}`}>
                <Icon size={20} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white">{item.value}</h2>

              <p className="text-sm text-slate-400">{item.title}</p>
            </div>
          );
        })}
      </div>

      {/* Employee Management Modules */}
      <div className="grid gap-4 md:grid-cols-3">
        <button
          onClick={() => navigate("/employees/attendance")}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left hover:border-indigo-500"
        >
          <h2 className="text-xl font-semibold text-white">Attendance</h2>
          <p className="mt-2 text-sm text-slate-400">
            View daily employee check-in and attendance records.
          </p>
        </button>

        <button
          onClick={() => navigate("/employees/leaves")}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left hover:border-indigo-500"
        >
          <h2 className="text-xl font-semibold text-white">Leave Requests</h2>
          <p className="mt-2 text-sm text-slate-400">
            Approve or reject employee leave applications.
          </p>
        </button>

        <button
          onClick={() => navigate("/employees/payroll")}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left hover:border-indigo-500"
        >
          <h2 className="text-xl font-semibold text-white">Payroll</h2>
          <p className="mt-2 text-sm text-slate-400">
            Generate salaries and send payslips.
          </p>
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="relative w-full max-w-md">
          <Search size={18} className="absolute left-3 top-3 text-slate-500" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employees..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setEmployees(
                [...employees].sort((a, b) => a.name.localeCompare(b.name))
              );
            }}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-white hover:border-indigo-500"
          >
            <Filter size={16} />
            Sort
          </button>

          <button
            onClick={() => alert("Employee data exported")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-white hover:border-indigo-500"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Employee Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="border-b border-slate-800 bg-slate-800/40">
            <tr className="text-left text-sm text-slate-400">
              <th className="p-4">Employee</th>
              <th>Role</th>
              <th>Attendance</th>
              <th>Salary</th>
              <th>Leave Balance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees
              .filter((employee) =>
                employee.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-slate-800 hover:bg-slate-800/30"
                >
                  <td className="p-4">
                    <div className="font-medium text-white">{employee.name}</div>
                    <div className="text-xs text-slate-400">{employee.phone}</div>
                  </td>

                  <td>{employee.role}</td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        employee.attendance === "Present"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {employee.attendance}
                    </span>
                  </td>

                  <td className="text-white">{employee.salary}</td>

                  <td>{employee.leaveBalance} days</td>

                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        employee.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate("/employees/profile")}
                        className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-500"
                        title="View Profile"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        onClick={() => navigate("/employees/profile")}
                        className="rounded-lg border border-slate-700 p-2 text-white hover:border-indigo-500"
                        title="Edit Employee"
                      >
                        <Edit size={15} />
                      </button>

                      <button
                        onClick={() => {
                          setEmployees(
                            employees.filter((emp) => emp.id !== employee.id)
                          );
                        }}
                        className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-500"
                        title="Delete Employee"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
