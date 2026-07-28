import { Link } from "react-router-dom";
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
} from "lucide-react";


const products = [
  {
    id: "PRD-1001",
    name: "Premium Shampoo",
    category: "Hair Care",
    stock: 48,
    price: "₹450",
    supplier: "Beauty Supplies",
    status: "In Stock",
  },
  {
    id: "PRD-1002",
    name: "Hair Serum",
    category: "Hair Care",
    stock: 8,
    price: "₹650",
    supplier: "Glow Traders",
    status: "Low Stock",
  },
  {
    id: "PRD-1003",
    name: "Face Wash",
    category: "Skin Care",
    stock: 31,
    price: "₹320",
    supplier: "Skin World",
    status: "In Stock",
  },
  {
    id: "PRD-1004",
    name: "Body Lotion",
    category: "Skin Care",
    stock: 0,
    price: "₹550",
    supplier: "Care Products",
    status: "Out of Stock",
  },
];


export default function Products() {

  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Products
          </h1>

          <p className="mt-1 text-slate-400">
            Manage products and stock availability.
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

      <div className="grid gap-4 md:grid-cols-3">


        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <Package className="text-indigo-400"/>

          <h2 className="mt-4 text-2xl font-bold text-white">
            486
          </h2>

          <p className="text-sm text-slate-400">
            Total Products
          </p>

        </div>


        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <Package className="text-amber-400"/>

          <h2 className="mt-4 text-2xl font-bold text-white">
            18
          </h2>

          <p className="text-sm text-slate-400">
            Low Stock
          </p>

        </div>


        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <Package className="text-emerald-400"/>

          <h2 className="mt-4 text-2xl font-bold text-white">
            ₹9.8L
          </h2>

          <p className="text-sm text-slate-400">
            Inventory Value
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
            placeholder="Search products..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
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
            onClick={() => alert("Products exported")}
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
                Supplier
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


            {products.map((product)=>(

              <tr
                key={product.id}
                className="border-b border-slate-800 hover:bg-slate-800/30"
              >


                <td className="p-4 font-medium text-white">
                  {product.name}
                </td>


                <td>
                  {product.category}
                </td>


                <td>
                  {product.stock}
                </td>


                <td className="text-white">
                  {product.price}
                </td>


                <td>
                  {product.supplier}
                </td>


                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      product.status === "In Stock"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : product.status === "Low Stock"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-red-500/10 text-red-400"
                    }`}
                  >

                    {product.status}

                  </span>


                </td>



                <td>

                  <div className="flex gap-2">


                    <button
                      onClick={() => alert(`Viewing ${product.name}`)}
                      className="rounded-lg bg-indigo-600 p-2 text-white hover:bg-indigo-500"
                    >

                      <Eye size={15}/>

                    </button>



                    <button
                      onClick={() => alert(`Editing ${product.name}`)}
                      className="rounded-lg border border-slate-700 p-2 hover:border-indigo-500"
                    >

                      <Edit size={15}/>

                    </button>


                  </div>


                </td>



              </tr>


            ))}


          </tbody>


        </table>


      </div>


    </div>

  );
}