import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Briefcase,
  FileText,
} from "lucide-react";

export default function Booking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer: "",
    employee: "",
    service: "",
    date: "",
    time: "",
    duration: "30",
    status: "Scheduled",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Appointment booked successfully!");

    console.log(formData);

    navigate("/appointments");
  };

  return (
    <div className="space-y-6 p-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-white">
          Book Appointment
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Schedule a new appointment for your customer.
        </p>
      </div>


      {/* Form Card */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-2"
        >


          {/* Customer */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Customer
            </label>

            <div className="relative">

              <User
                size={18}
                className="absolute left-3 top-3.5 text-slate-500"
              />

              <input
                type="text"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                placeholder="Enter customer name"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500"
                required
              />

            </div>
          </div>



          {/* Employee */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Employee
            </label>

            <div className="relative">

              <Briefcase
                size={18}
                className="absolute left-3 top-3.5 text-slate-500"
              />

              <input
                type="text"
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                placeholder="Assigned employee"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500"
              />

            </div>
          </div>



          {/* Service */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Service
            </label>

            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              placeholder="Haircut, Consultation..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500"
              required
            />

          </div>



          {/* Duration */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Duration (mins)
            </label>

            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
            />

          </div>



          {/* Date */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Date
            </label>

            <div className="relative">

              <Calendar
                size={18}
                className="absolute left-3 top-3.5 text-slate-500"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
                required
              />

            </div>
          </div>



          {/* Time */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Time
            </label>

            <div className="relative">

              <Clock
                size={18}
                className="absolute left-3 top-3.5 text-slate-500"
              />

              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
                required
              />

            </div>
          </div>



          {/* Status */}

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
            >

              <option>Scheduled</option>
              <option>Confirmed</option>
              <option>Pending</option>

            </select>

          </div>



          {/* Notes */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm text-slate-300">
              Notes
            </label>

            <div className="relative">

              <FileText
                size={18}
                className="absolute left-3 top-3.5 text-slate-500"
              />

              <textarea
                rows="5"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional notes..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white placeholder:text-slate-500 outline-none focus:border-indigo-500"
              />

            </div>

          </div>



          {/* Buttons */}

          <div className="flex justify-end gap-4 md:col-span-2">

            <button
              type="button"
              onClick={() => navigate("/appointments")}
              className="rounded-xl border border-slate-700 px-6 py-3 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>


            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-500"
            >
              Book Appointment
            </button>

          </div>


        </form>

      </div>

    </div>
  );
}