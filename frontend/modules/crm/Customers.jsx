import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Filter,
  Download,
  Users,
  UserPlus,
  Crown,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Customers",
    value: "2,486",
    icon: Users,
    color: "bg-indigo-500/10 text-indigo-400",
  },
  {
    title: "New This Month",
    value: "164",
    icon: UserPlus,
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    title: "Premium Members",
    value: "382",
    icon: Crown,
    color: "bg-amber-500/10 text-amber-400",
  },
  {
    title: "Retention Rate",
    value: "92%",
    icon: TrendingUp,
    color: "bg-sky-500/10 text-sky-400",
  },
];

const customers = [
  {
    name: "Rahul Sharma",
    phone: "+91 9876543210",
    email: "rahul@gmail.com",
    visits: 18,
    spent: "₹24,500",
    status: "Active",
  },
  {
    name: "Priya Reddy",
    phone: "+91 9988776655",
    email: "priya@gmail.com",
    visits: 12,
    spent: "₹18,200",
    status: "Active",
  },
  {
    name: "Aman Verma",
    phone: "+91 9123456780",
    email: "aman@gmail.com",
    visits: 6,
    spent: "₹8,900",
    status: "Inactive",
  },
  {
    name: "Sneha Patel",
    phone: "+91 9012345678",
    email: "sneha@gmail.com",
    visits: 24,
    spent: "₹36,400",
    status: "VIP",
  },
];

export default function Customers() {
  return (
    <div className="space-y-5">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Customer CRM</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage customers and relationships.
          </p>
        </div>

        <Link
          to="/crm/add"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          <Plus size={18} />
          Add Customer
        </Link>
      </div>

      {/* Stats */}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-3 ${item.color}`}>
                  <Icon size={20} />
                </div>

                <span className="text-xs text-emerald-400">
                  +12%
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white">
                {item.value}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {item.title}
              </p>
            </div>
          );
        })}
      </section>

      {/* Toolbar */}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-500"
          />

          <input
            placeholder="Search customers..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500">
            <Filter size={16} />
            Filters
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="border-b border-slate-800 bg-slate-800/40">
            <tr className="text-left text-sm text-slate-400">
              <th className="p-4">Customer</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Visits</th>
              <th>Total Spent</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.email}
                className="border-b border-slate-800 hover:bg-slate-800/30"
              >
                <td className="p-4 font-medium text-white">
                  {customer.name}
                </td>

                <td>{customer.phone}</td>

                <td>{customer.email}</td>

                <td>{customer.visits}</td>

                <td className="font-medium text-white">
                  {customer.spent}
                </td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      customer.status === "VIP"
                        ? "bg-amber-500/10 text-amber-400"
                        : customer.status === "Inactive"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>

                <td>
                  <div className="flex justify-center gap-2">

                    <Link
                      to="/crm/profile"
                      className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm hover:border-indigo-500"
                    >
                      View
                    </Link>

                    <Link
                      to="/crm/edit"
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-500"
                    >
                      Edit
                    </Link>

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