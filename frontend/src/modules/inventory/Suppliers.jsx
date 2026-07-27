import {
  Users,
  Plus,
  Search,
  Download,
  Phone,
  Mail,
  Package,
} from "lucide-react";


const suppliers = [
  {
    id: "SUP-1001",
    name: "Beauty Supplies",
    category: "Hair Products",
    phone: "+91 9876543210",
    email: "beauty@gmail.com",
    products: 45,
    status: "Active",
  },
  {
    id: "SUP-1002",
    name: "Glow Traders",
    category: "Skin Care",
    phone: "+91 9988776655",
    email: "glow@gmail.com",
    products: 28,
    status: "Active",
  },
  {
    id: "SUP-1003",
    name: "Care Products",
    category: "Beauty Items",
    phone: "+91 9123456780",
    email: "care@gmail.com",
    products: 15,
    status: "Inactive",
  },
];


export default function Suppliers() {

  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex items-center justify-between">


        <div>

          <h1 className="text-3xl font-bold text-white">
            Suppliers
          </h1>

          <p className="mt-1 text-slate-400">
            Manage supplier information and products.
          </p>

        </div>



        <button
          onClick={() => alert("Add supplier page")}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500"
        >

          <Plus size={18}/>

          Add Supplier

        </button>


      </div>






      {/* Stats */}


      <div className="grid gap-4 md:grid-cols-3">


        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <Users className="text-indigo-400"/>

          <h2 className="mt-4 text-2xl font-bold text-white">
            86
          </h2>

          <p className="text-sm text-slate-400">
            Total Suppliers
          </p>

        </div>




        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <Package className="text-emerald-400"/>

          <h2 className="mt-4 text-2xl font-bold text-white">
            420
          </h2>

          <p className="text-sm text-slate-400">
            Products Supplied
          </p>

        </div>




        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <Users className="text-amber-400"/>

          <h2 className="mt-4 text-2xl font-bold text-white">
            72
          </h2>

          <p className="text-sm text-slate-400">
            Active Suppliers
          </p>

        </div>


      </div>







      {/* Search */}


      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">


        <div className="relative w-full max-w-md">


          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-500"
          />


          <input
            placeholder="Search suppliers..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
          />


        </div>



        <button
          onClick={() => alert("Suppliers exported")}
          className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 hover:border-indigo-500"
        >

          <Download size={16}/>

          Export

        </button>


      </div>







      {/* Table */}


      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">


        <table className="w-full">


          <thead className="border-b border-slate-800 bg-slate-800/40">


            <tr className="text-left text-sm text-slate-400">

              <th className="p-4">
                Supplier
              </th>

              <th>
                Category
              </th>

              <th>
                Contact
              </th>

              <th>
                Products
              </th>

              <th>
                Status
              </th>


            </tr>


          </thead>





          <tbody>


            {suppliers.map((supplier)=>(


              <tr
                key={supplier.id}
                className="border-b border-slate-800 hover:bg-slate-800/30"
              >


                <td className="p-4">


                  <p className="font-medium text-white">
                    {supplier.name}
                  </p>


                  <p className="text-xs text-slate-500">
                    {supplier.id}
                  </p>


                </td>



                <td>
                  {supplier.category}
                </td>




                <td>


                  <div className="space-y-1 text-sm">


                    <div className="flex items-center gap-2">

                      <Phone size={14}/>

                      {supplier.phone}

                    </div>


                    <div className="flex items-center gap-2">

                      <Mail size={14}/>

                      {supplier.email}

                    </div>


                  </div>


                </td>





                <td>
                  {supplier.products}
                </td>





                <td>


                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      supplier.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                    }`}
                  >

                    {supplier.status}

                  </span>


                </td>



              </tr>


            ))}


          </tbody>


        </table>


      </div>



    </div>

  );

}