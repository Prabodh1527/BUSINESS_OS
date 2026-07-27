import { Link } from "react-router-dom";
import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  XCircle,
  DollarSign,
  Plus,
  Search,
  Filter,
  Calendar,
  Download,
} from "lucide-react";

const stats = [
  {
    title: "Today's Appointments",
    value: "42",
    icon: CalendarDays,
    color: "bg-indigo-500/10 text-indigo-400",
    growth: "+8%",
  },
  {
    title: "Upcoming",
    value: "18",
    icon: Clock3,
    color: "bg-amber-500/10 text-amber-400",
    growth: "+4%",
  },
  {
    title: "Completed",
    value: "31",
    icon: CheckCircle2,
    color: "bg-emerald-500/10 text-emerald-400",
    growth: "+11%",
  },
  {
    title: "Today's Revenue",
    value: "₹28,600",
    icon: DollarSign,
    color: "bg-cyan-500/10 text-cyan-400",
    growth: "+16%",
  },
];

const appointmentsData = [
  {
    id: 1,
    customer: "Rahul Sharma",
    service: "Hair Spa",
    employee: "Anjali",
    date: "21 Jul 2026",
    time: "10:00 AM",
    payment: "Paid",
    status: "Completed",
  },
  {
    id: 2,
    customer: "Priya Reddy",
    service: "Facial",
    employee: "Sneha",
    date: "21 Jul 2026",
    time: "11:30 AM",
    payment: "Pending",
    status: "Upcoming",
  },
  {
    id: 3,
    customer: "Aman Verma",
    service: "Hair Cut",
    employee: "Rohit",
    date: "21 Jul 2026",
    time: "1:00 PM",
    payment: "Paid",
    status: "Upcoming",
  },
  {
    id: 4,
    customer: "Sneha Patel",
    service: "Manicure",
    employee: "Priya",
    date: "21 Jul 2026",
    time: "3:00 PM",
    payment: "Refunded",
    status: "Cancelled",
  },
];

export default function Appointments() {
  const [search, setSearch] = useState("");

  const appointments = appointmentsData.filter((item) =>
    item.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-white">
            Appointments
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage bookings, schedules and customer appointments.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <Link
            to="/appointments/calendar"
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500"
          >
            <Calendar size={17} />
            Calendar
          </Link>

          <button
            onClick={() => alert("Appointments exported successfully!")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500"
          >
            <Download size={17} />
            Export
          </button>

          <Link
            to="/appointments/booking"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            <Plus size={18} />
            New Booking
          </Link>

        </div>

      </div>

      {/* KPI Cards */}

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
                  <Icon size={22} />
                </div>

                <span className="text-xs text-emerald-400">
                  {item.growth}
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

      {/* Search & Toolbar */}

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div className="relative w-full max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
            />

          </div>

          <div className="flex gap-3">

            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500">
              All
            </button>

            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500">
              Today
            </button>

            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500">
              Upcoming
            </button>

            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500">
              Completed
            </button>

            <button className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500">
              <Filter size={16} />
              Filters
            </button>

          </div>

        </div>

      </div>
            {/* Appointments Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

        <table className="w-full">

          <thead className="border-b border-slate-800 bg-slate-800/40">

            <tr className="text-left text-sm text-slate-400">

              <th className="p-4">Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Employee</th>
              <th>Payment</th>
              <th>Status</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {appointments.map((item) => (

              <tr
                key={item.id}
                className="border-b border-slate-800 hover:bg-slate-800/30 transition"
              >

                <td className="p-4">

                  <div>

                    <p className="font-medium text-white">
                      {item.customer}
                    </p>

                    <p className="text-xs text-slate-500">
                      Customer #{item.id}
                    </p>

                  </div>

                </td>

                <td>{item.service}</td>

                <td>{item.date}</td>

                <td>{item.time}</td>

                <td>{item.employee}</td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.payment === "Paid"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : item.payment === "Pending"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {item.payment}
                  </span>

                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      item.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : item.status === "Cancelled"
                        ? "bg-red-500/10 text-red-400"
                        : "bg-indigo-500/10 text-indigo-400"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <Link
                      to="/appointments/details"
                      className="rounded-lg bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-500"
                    >
                      View
                    </Link>

                  <button
                    onClick={() => alert("Edit appointment")}
                    className="rounded-lg border border-slate-600 px-3 py-1 text-xs hover:border-indigo-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => alert("Appointment cancelled")}
                    className="rounded-lg border border-red-700 px-3 py-1 text-xs text-red-400 hover:bg-red-600/10"
                  >
                    Cancel
                  </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
            {/* Pagination */}

      <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-4">

        <p className="text-sm text-slate-400">
          Showing {appointments.length} appointments
        </p>


        <div className="flex gap-2">

          <button
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500"
          >
            Previous
          </button>


          <button
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm text-white"
          >
            1
          </button>


          <button
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500"
          >
            2
          </button>


          <button
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}