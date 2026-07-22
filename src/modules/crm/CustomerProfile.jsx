import { useState } from "react";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  BadgeCheck,
  Edit,
  Trash2,
  Clock3,
  IndianRupee,
  Trophy,
  FileText,
  NotebookPen,
  CalendarDays,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CustomerProfile() {
  const [activeTab, setActiveTab] = useState("overview");

  const customer = {
    id: "CUS-1001",
    name: "Rahul Kumar",
    phone: "+91 9876543210",
    email: "rahul@gmail.com",
    address: "12 MG Road, Bengaluru, Karnataka",
    joined: "18 Jan 2026",
    dob: "14 Feb 1998",
    membership: "Premium",
    preferredService: "Hair Spa",
    assignedStaff: "Akash",
    visits: 24,
    spent: "₹38,450",
    lastVisit: "18 Jul 2026",
    loyalty: 580,
  };

  const history = [
    {
      date: "18 Jul 2026",
      title: "Haircut Completed",
      description: "Appointment completed successfully.",
    },
    {
      date: "18 Jul 2026",
      title: "Invoice Generated",
      description: "Invoice #INV-1004 generated.",
    },
    {
      date: "18 Jul 2026",
      title: "Payment Received",
      description: "Paid ₹850 via UPI.",
    },
    {
      date: "02 Jul 2026",
      title: "Hair Spa Booked",
      description: "Appointment scheduled.",
    },
    {
      date: "18 Jan 2026",
      title: "Customer Created",
      description: "Customer profile added.",
    },
  ];

  const appointments = [
    {
      date: "18 Jul 2026",
      service: "Haircut",
      employee: "Akash",
      status: "Completed",
    },
    {
      date: "02 Jul 2026",
      service: "Hair Spa",
      employee: "Rahul",
      status: "Completed",
    },
    {
      date: "28 Jul 2026",
      service: "Facial",
      employee: "Priya",
      status: "Upcoming",
    },
  ];

  const bills = [
    {
      invoice: "INV-1004",
      amount: "₹850",
      status: "Paid",
    },
    {
      invoice: "INV-0981",
      amount: "₹1500",
      status: "Paid",
    },
    {
      invoice: "INV-0912",
      amount: "₹700",
      status: "Paid",
    },
  ];

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <Link
            to="/crm"
            className="mb-3 inline-flex items-center gap-2 text-slate-400 hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Customers
          </Link>

          <h1 className="text-3xl font-bold text-white">
            Customer Profile
          </h1>

          <p className="mt-1 text-slate-400">
            Complete customer information.
          </p>

        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 hover:border-indigo-500">
            <Trash2 size={18} />
            Delete
          </button>

          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">
            <Edit size={18} />
            Edit
          </button>

        </div>

      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-4xl font-bold text-white">
            R
          </div>

          <div className="flex-1">

            <div className="flex items-center gap-3">

              <h2 className="text-3xl font-bold text-white">
                {customer.name}
              </h2>

              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm text-emerald-400">
                <BadgeCheck size={14} className="mr-1 inline" />
                {customer.membership}
              </span>

            </div>

            <p className="mt-2 text-slate-400">
              Customer ID : {customer.id}
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-indigo-400" />
                {customer.phone}
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-indigo-400" />
                {customer.email}
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-indigo-400" />
                Joined {customer.joined}
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-indigo-400" />
                {customer.address}
              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-4">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <Clock3 className="text-indigo-400" />
          <h2 className="mt-4 text-3xl font-bold">
            {customer.visits}
          </h2>
          <p className="text-sm text-slate-400">
            Total Visits
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <IndianRupee className="text-emerald-400" />
          <h2 className="mt-4 text-3xl font-bold">
            {customer.spent}
          </h2>
          <p className="text-sm text-slate-400">
            Revenue
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <CalendarDays className="text-amber-400" />
          <h2 className="mt-4 text-2xl font-bold">
            {customer.lastVisit}
          </h2>
          <p className="text-sm text-slate-400">
            Last Visit
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <Trophy className="text-pink-400" />
          <h2 className="mt-4 text-3xl font-bold">
            {customer.loyalty}
          </h2>
          <p className="text-sm text-slate-400">
            Loyalty Points
          </p>
        </div>

      </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900">

        <div className="flex flex-wrap gap-2 border-b border-slate-800 p-4">

          <button
            onClick={() => setActiveTab("overview")}
            className={`rounded-xl px-4 py-2 transition ${
              activeTab === "overview"
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <User size={16} className="mr-2 inline" />
            Overview
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`rounded-xl px-4 py-2 transition ${
              activeTab === "history"
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <Clock3 size={16} className="mr-2 inline" />
            History
          </button>

          <button
            onClick={() => setActiveTab("appointments")}
            className={`rounded-xl px-4 py-2 transition ${
              activeTab === "appointments"
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <CalendarDays size={16} className="mr-2 inline" />
            Appointments
          </button>

          <button
            onClick={() => setActiveTab("billing")}
            className={`rounded-xl px-4 py-2 transition ${
              activeTab === "billing"
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <IndianRupee size={16} className="mr-2 inline" />
            Billing
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`rounded-xl px-4 py-2 transition ${
              activeTab === "notes"
                ? "bg-indigo-600 text-white"
                : "hover:bg-slate-800"
            }`}
          >
            <NotebookPen size={16} className="mr-2 inline" />
            Notes
          </button>

        </div>

        <div className="p-6">

          {activeTab === "overview" && (

            <div className="grid gap-6 md:grid-cols-2">

              <div className="rounded-xl border border-slate-800 p-5">

                <h3 className="mb-5 text-lg font-semibold">
                  Personal Information
                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span className="text-slate-400">Full Name</span>
                    <span>{customer.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone</span>
                    <span>{customer.phone}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Email</span>
                    <span>{customer.email}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Date of Birth</span>
                    <span>{customer.dob}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Joined</span>
                    <span>{customer.joined}</span>
                  </div>

                </div>

              </div>

              <div className="rounded-xl border border-slate-800 p-5">

                <h3 className="mb-5 text-lg font-semibold">
                  Customer Information
                </h3>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span className="text-slate-400">Membership</span>
                    <span>{customer.membership}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Preferred Service</span>
                    <span>{customer.preferredService}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Staff</span>
                    <span>{customer.assignedStaff}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Address</span>
                    <span>{customer.address}</span>
                  </div>

                </div>

              </div>

            </div>

          )}
                    {activeTab === "history" && (

            <div className="space-y-6">

              {history.map((item, index) => (

                <div
                  key={index}
                  className="flex gap-5 rounded-xl border border-slate-800 p-5"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600">
                    <Clock3 size={20} />
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <h3 className="text-lg font-semibold">
                        {item.title}
                      </h3>

                      <span className="text-sm text-slate-400">
                        {item.date}
                      </span>

                    </div>

                    <p className="mt-2 text-slate-400">
                      {item.description}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

          {activeTab === "appointments" && (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="border-b border-slate-800 text-left text-slate-400">

                  <tr>
                    <th className="p-4">Date</th>
                    <th>Service</th>
                    <th>Employee</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {appointments.map((item, index) => (

                    <tr
                      key={index}
                      className="border-b border-slate-800 hover:bg-slate-800/40"
                    >

                      <td className="p-4">{item.date}</td>

                      <td>{item.service}</td>

                      <td>{item.employee}</td>

                      <td>

                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            item.status === "Completed"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}
                    {activeTab === "billing" && (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="border-b border-slate-800 text-left text-slate-400">

                  <tr>
                    <th className="p-4">Invoice</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {bills.map((bill, index) => (

                    <tr
                      key={index}
                      className="border-b border-slate-800 hover:bg-slate-800/40"
                    >

                      <td className="p-4 font-medium">
                        {bill.invoice}
                      </td>

                      <td>{bill.amount}</td>

                      <td>

                        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                          {bill.status}
                        </span>

                      </td>

                      <td>

                        <button className="flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 hover:border-indigo-500">
                          <FileText size={16} />
                          View Invoice
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

          {activeTab === "notes" && (

            <div className="space-y-5">

              <div className="rounded-xl border border-slate-800 p-5">

                <h3 className="mb-3 text-lg font-semibold">
                  Staff Notes
                </h3>

                <textarea
                  rows={8}
                  placeholder="Write internal notes about this customer..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-4 outline-none focus:border-indigo-500"
                />

                <div className="mt-5 flex justify-end">

                  <button className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-500">
                    Save Notes
                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}