import {
  CreditCard,
  Wallet,
  Landmark,
  IndianRupee,
  Search,
  Download,
} from "lucide-react";

const stats = [
  {
    title: "Total Payments",
    value: "512",
    icon: CreditCard,
    color: "bg-indigo-500/10 text-indigo-400",
  },
  {
    title: "Collected",
    value: "₹12.8L",
    icon: IndianRupee,
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    title: "UPI",
    value: "₹5.4L",
    icon: Wallet,
    color: "bg-sky-500/10 text-sky-400",
  },
  {
    title: "Bank",
    value: "₹3.1L",
    icon: Landmark,
    color: "bg-amber-500/10 text-amber-400",
  },
];

const payments = [
  {
    id: "PAY-1001",
    customer: "Rahul Sharma",
    method: "UPI",
    amount: "₹2,450",
    date: "21 Jul 2026",
  },
  {
    id: "PAY-1002",
    customer: "Sneha Patel",
    method: "Card",
    amount: "₹1,850",
    date: "21 Jul 2026",
  },
  {
    id: "PAY-1003",
    customer: "Aman Verma",
    method: "Cash",
    amount: "₹950",
    date: "20 Jul 2026",
  },
  {
    id: "PAY-1004",
    customer: "Priya Reddy",
    method: "Net Banking",
    amount: "₹3,200",
    date: "20 Jul 2026",
  },
];

export default function Payments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Payments</h1>
        <p className="mt-1 text-slate-400">
          Track all customer payments.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

              <h2 className="mt-5 text-2xl font-bold text-white">
                {item.value}
              </h2>

              <p className="text-sm text-slate-400">
                {item.title}
              </p>
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
            placeholder="Search payments..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
          />
        </div>

        <button
          onClick={() => alert("Payments exported successfully")}
          className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 hover:border-indigo-500"
        >
          <Download size={16} />
          Export
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="border-b border-slate-800 bg-slate-800/40">
            <tr className="text-left text-sm text-slate-400">
              <th className="p-4">Payment ID</th>
              <th>Customer</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-slate-800 hover:bg-slate-800/30"
              >
                <td className="p-4 font-medium text-white">
                  {payment.id}
                </td>

                <td>{payment.customer}</td>

                <td>{payment.method}</td>

                <td className="font-medium text-white">
                  {payment.amount}
                </td>

                <td>{payment.date}</td>
                <td>
                  <button
                    onClick={() => alert(`Viewing ${payment.id}`)}
                    className="rounded-lg bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-500"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}