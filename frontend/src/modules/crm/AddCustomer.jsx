import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddCustomer() {
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
            Add Customer
          </h1>

          <p className="mt-1 text-slate-400">
            Create a new customer profile.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Full Name
            </label>

            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Phone
            </label>

            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Date of Birth
            </label>

            <input
              type="date"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-slate-300">
              Address
            </label>

            <textarea
              rows={4}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
              placeholder="Customer address"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Link
            to="/crm"
            className="rounded-xl border border-slate-700 px-5 py-3 hover:border-indigo-500"
          >
            Cancel
          </Link>

          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-500">
            <Save size={18} />
            Save Customer
          </button>
        </div>
      </div>
    </div>
  );
}