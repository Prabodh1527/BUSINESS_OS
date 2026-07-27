import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  FileText,
  IndianRupee,
} from "lucide-react";


export default function CreateInvoice() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    customer: "",
    service: "",
    amount: "",
    payment: "UPI",
    status: "Pending",
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

    alert("Invoice created successfully");

    console.log(formData);

    navigate("/billing/invoices");

  };


  return (

    <div className="space-y-6 p-8">


      <div>

        <Link
          to="/billing/invoices"
          className="mb-3 flex items-center gap-2 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft size={16}/>
          Back to Invoices
        </Link>


        <h1 className="text-3xl font-bold text-white">
          Create Invoice
        </h1>


        <p className="mt-1 text-slate-400">
          Create a new customer invoice.
        </p>


      </div>




      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">


        <form
          onSubmit={handleSubmit}
          className="grid gap-6 md:grid-cols-2"
        >


          {/* Customer */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Customer Name
            </label>


            <div className="relative">

              <User
                size={18}
                className="absolute left-3 top-3.5 text-slate-500"
              />


              <input
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                placeholder="Enter customer name"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
                required
              />

            </div>

          </div>





          {/* Service */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Service/Product
            </label>


            <div className="relative">

              <FileText
                size={18}
                className="absolute left-3 top-3.5 text-slate-500"
              />


              <input
                name="service"
                value={formData.service}
                onChange={handleChange}
                placeholder="Hair Spa, Product..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
                required
              />


            </div>

          </div>






          {/* Amount */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Amount
            </label>


            <div className="relative">

              <IndianRupee
                size={18}
                className="absolute left-3 top-3.5 text-slate-500"
              />


              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
                required
              />


            </div>

          </div>






          {/* Payment */}

          <div>

            <label className="mb-2 block text-sm text-slate-300">
              Payment Method
            </label>


            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
            >

              <option>UPI</option>
              <option>Cash</option>
              <option>Card</option>
              <option>Bank Transfer</option>

            </select>


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

              <option>Pending</option>
              <option>Paid</option>

            </select>


          </div>







          {/* Notes */}

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm text-slate-300">
              Notes
            </label>


            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Additional notes..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
            />


          </div>





          <div className="flex justify-end gap-4 md:col-span-2">


            <Link
              to="/billing/invoices"
              className="rounded-xl border border-slate-700 px-6 py-3 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Link>



            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-500"
            >
              Save Invoice
            </button>


          </div>



        </form>


      </div>


    </div>

  );

}