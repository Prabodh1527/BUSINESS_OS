import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

export default function EditCustomer() {
  const [customer, setCustomer] = useState({
    name: "Rahul Kumar",
    phone: "+91 9876543210",
    email: "rahul@gmail.com",
    dob: "1998-02-14",
    address: "12 MG Road, Bengaluru, Karnataka",
    membership: "Premium",
    preferredService: "Hair Spa",
    assignedStaff: "Akash",
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">

        <div>

          <Link
            to="/crm/profile"
            className="mb-3 inline-flex items-center gap-2 text-slate-400 hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Profile
          </Link>

          <h1 className="text-3xl font-bold text-white">
            Edit Customer
          </h1>

          <p className="mt-1 text-slate-400">
            Update customer information.
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
              name="name"
              value={customer.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Phone
            </label>

            <input
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              name="email"
              value={customer.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Date of Birth
            </label>

            <input
              type="date"
              name="dob"
              value={customer.dob}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Membership
            </label>

            <select
              name="membership"
              value={customer.membership}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
            >
              <option>Regular</option>
              <option>Silver</option>
              <option>Gold</option>
              <option>Premium</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Preferred Service
            </label>

            <input
              name="preferredService"
              value={customer.preferredService}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-slate-300">
              Assigned Staff
            </label>

            <input
              name="assignedStaff"
              value={customer.assignedStaff}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-slate-300">
              Address
            </label>

            <textarea
              rows={4}
              name="address"
              value={customer.address}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-indigo-500"
            />
          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <Link
            to="/crm/profile"
            className="rounded-xl border border-slate-700 px-5 py-3 hover:border-indigo-500"
          >
            Cancel
          </Link>

          <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-500">
            <Save size={18} />
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}