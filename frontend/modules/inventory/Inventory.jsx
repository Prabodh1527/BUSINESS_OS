import { Link } from "react-router-dom";
import {
  Package,
  Boxes,
  AlertTriangle,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
} from "lucide-react";


const stats = [
  {
    title: "Total Products",
    value: "486",
    icon: Package,
    color: "bg-indigo-500/10 text-indigo-400",
  },
  {
    title: "Categories",
    value: "24",
    icon: Boxes,
    color: "bg-sky-500/10 text-sky-400",
  },
  {
    title: "Low Stock",
    value: "18",
    icon: AlertTriangle,
    color: "bg-red-500/10 text-red-400",
  },
  {
    title: "Stock Value",
    value: "₹9.8L",
    icon: TrendingUp,
    color: "bg-emerald-500/10 text-emerald-400",
  },
];


const inventory = [
  {
    product: "Shampoo",
    category: "Hair Care",
    stock: 48,
    price: "₹450",
    status: "In Stock",
  },
  {
    product: "Hair Serum",
    category: "Hair Care",
    stock: 8,
    price: "₹650",
    status: "Low Stock",
  },
  {
    product: "Face Wash",
    category: "Skin Care",
    stock: 31,
    price: "₹320",
    status: "In Stock",
  },
  {
    product: "Body Lotion",
    category: "Skin Care",
    stock: 0,
    price: "₹550",
    status: "Out of Stock",
  },
];


export default function Inventory() {

  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Inventory
          </h1>

          <p className="mt-1 text-slate-400">
            Manage inventory and stock levels.
          </p>

        </div>


        <Link
          to="/inventory/create"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500"
        >

          <Plus size={18}/>

          Add Product

        </Link>


      </div>





      {/* Stats */}


      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item)=>{

          const Icon = item.icon;


          return (

            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >

              <div className={`inline-flex rounded-xl p-3 ${item.color}`}>

                <Icon size={20}/>

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





      {/* Inventory Sections */}


      <div className="grid gap-4 md:grid-cols-3">


        <Link
          to="/inventory/products"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-indigo-500 transition"
        >

          <h2 className="text-xl font-semibold text-white">
            Products
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Manage products, pricing and stock.
          </p>


          <div className="mt-4 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm text-white">
            Open Products
          </div>


        </Link>





        <Link
          to="/inventory/purchase-orders"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-indigo-500 transition"
        >

          <h2 className="text-xl font-semibold text-white">
            Purchase Orders
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Track supplier orders and stock arrivals.
          </p>


          <div className="mt-4 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm text-white">
            Open Orders
          </div>


        </Link>





        <Link
          to="/inventory/suppliers"
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-indigo-500 transition"
        >

          <h2 className="text-xl font-semibold text-white">
            Suppliers
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Manage supplier information.
          </p>


          <div className="mt-4 inline-block rounded-xl bg-indigo-600 px-4 py-2 text-sm text-white">
            Open Suppliers
          </div>


        </Link>


      </div>







      {/* Search */}


      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">


        <div className="relative w-full max-w-md">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-500"
          />


          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 outline-none focus:border-indigo-500"
          />


        </div>



        <div className="flex gap-3">


          <button
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 hover:border-indigo-500"
          >

            <Filter size={16}/>

            Filter

          </button>



          <button
            onClick={() => alert("Inventory exported successfully")}
            className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 hover:border-indigo-500"
          >

            <Download size={16}/>

            Export

          </button>


        </div>


      </div>







      {/* Table */}


      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">


        <table className="w-full">


          <thead className="border-b border-slate-800 bg-slate-800/40">

            <tr className="text-left text-sm text-slate-400">

              <th className="p-4">
                Product
              </th>

              <th>
                Category
              </th>

              <th>
                Stock
              </th>

              <th>
                Price
              </th>

              <th>
                Status
              </th>

              <th>
                Actions
              </th>

            </tr>

          </thead>




          <tbody>

            {inventory.map((item)=>(

              <tr
                key={item.product}
                className="border-b border-slate-800 hover:bg-slate-800/30"
              >


                <td className="p-4 font-medium text-white">
                  {item.product}
                </td>


                <td>
                  {item.category}
                </td>


                <td>
                  {item.stock}
                </td>


                <td className="font-medium text-white">
                  {item.price}
                </td>


                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      item.status === "In Stock"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : item.status === "Low Stock"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-red-500/10 text-red-400"
                    }`}
                  >

                    {item.status}

                  </span>

                </td>



                <td>

                  <button
                    onClick={() => alert(`Viewing ${item.product}`)}
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