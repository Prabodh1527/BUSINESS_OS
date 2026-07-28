import { Link } from "react-router-dom";
import {
  FileText,
  Plus,
  Search,
  Download,
  Filter,
  IndianRupee,
  Receipt,
  CircleDollarSign,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Invoices",
    value: "328",
    icon: FileText,
    color: "bg-indigo-500/10 text-indigo-400",
  },
  {
    title: "Revenue",
    value: "₹8,42,560",
    icon: IndianRupee,
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    title: "Paid",
    value: "289",
    icon: CircleDollarSign,
    color: "bg-sky-500/10 text-sky-400",
  },
  {
    title: "Growth",
    value: "+18%",
    icon: TrendingUp,
    color: "bg-amber-500/10 text-amber-400",
  },
];

const invoices = [
  {
    id: "INV-1001",
    customer: "Rahul Sharma",
    date: "21 Jul 2026",
    amount: "₹2,450",
    payment: "UPI",
    status: "Paid",
  },
  {
    id: "INV-1002",
    customer: "Sneha Patel",
    date: "21 Jul 2026",
    amount: "₹1,850",
    payment: "Card",
    status: "Paid",
  },
  {
    id: "INV-1003",
    customer: "Aman Verma",
    date: "20 Jul 2026",
    amount: "₹950",
    payment: "Cash",
    status: "Pending",
  },
  {
    id: "INV-1004",
    customer: "Priya Reddy",
    date: "20 Jul 2026",
    amount: "₹3,200",
    payment: "UPI",
    status: "Paid",
  },
];

export default function Invoices() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <p className="mt-1 text-slate-400">
            Manage customer invoices and billing.
          </p>
        </div>

        <Link
          to="/billing/invoice/create"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500"
        >
          <Plus size={18} />
          New Invoice
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

                <Receipt className="text-slate-600" size={18} />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-white">
                {item.value}
              </h2>

              <p className="text-sm text-slate-400">{item.title}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 hover:border-indigo-500">
            <Filter size={16} />
            Filter
          </button>

          <button
            onClick={() => alert("Invoices exported successfully")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 hover:border-indigo-500"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="border-b border-slate-800 bg-slate-800/40">
            <tr className="text-left text-sm text-slate-400">
              <th className="p-4">Invoice</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-slate-800 hover:bg-slate-800/30"
              >
                <td className="p-4 font-medium text-white">
                  {invoice.id}
                </td>

                <td>{invoice.customer}</td>

                <td>{invoice.date}</td>

                <td className="font-medium text-white">
                  {invoice.amount}
                </td>

                <td>{invoice.payment}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      invoice.status === "Paid"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {invoice.status}
                  </span>
                  <td>
                    <Link
                      to="/billing/invoice-details"
                      className="rounded-lg bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-500"
                    >
                      View
                    </Link>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}