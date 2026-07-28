import {
  ShoppingCart,
  Clock,
  CheckCircle,
  Package,
  Search,
  Download,
  Plus,
} from "lucide-react";


const orders = [
  {
    id: "PO-1001",
    supplier: "Beauty Supplies",
    items: "Shampoo, Serum",
    amount: "₹24,500",
    date: "21 Jul 2026",
    status: "Received",
  },
  {
    id: "PO-1002",
    supplier: "Glow Traders",
    items: "Hair Products",
    amount: "₹18,200",
    date: "20 Jul 2026",
    status: "Pending",
  },
  {
    id: "PO-1003",
    supplier: "Skin World",
    items: "Face Care Products",
    amount: "₹12,800",
    date: "18 Jul 2026",
    status: "Processing",
  },
];


const stats = [
  {
    title: "Total Orders",
    value: "126",
    icon: ShoppingCart,
    color: "bg-indigo-500/10 text-indigo-400",
  },
  {
    title: "Pending",
    value: "14",
    icon: Clock,
    color: "bg-amber-500/10 text-amber-400",
  },
  {
    title: "Received",
    value: "98",
    icon: CheckCircle,
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    title: "Items Ordered",
    value: "850",
    icon: Package,
    color: "bg-sky-500/10 text-sky-400",
  },
];


export default function PurchaseOrders() {

  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex items-center justify-between">


        <div>

          <h1 className="text-3xl font-bold text-white">
            Purchase Orders
          </h1>


          <p className="mt-1 text-slate-400">
            Manage supplier purchases and incoming stock.
          </p>


        </div>



        <button
          onClick={() => alert("Create purchase order page")}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500"
        >

          <Plus size={18}/>

          New Order

        </button>


      </div>





      {/* Stats */}


      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">


        {stats.map((item)=>{

          const Icon=item.icon;


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







      {/* Search */}


      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">


        <div className="relative w-full max-w-md">


          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-500"
          />


          <input
            placeholder="Search purchase orders..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
          />


        </div>




        <button
          onClick={() => alert("Purchase orders exported")}
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
                Order ID
              </th>

              <th>
                Supplier
              </th>

              <th>
                Items
              </th>

              <th>
                Amount
              </th>

              <th>
                Date
              </th>

              <th>
                Status
              </th>

            </tr>


          </thead>





          <tbody>


            {orders.map((order)=>(


              <tr
                key={order.id}
                className="border-b border-slate-800 hover:bg-slate-800/30"
              >


                <td className="p-4 font-medium text-white">
                  {order.id}
                </td>


                <td>
                  {order.supplier}
                </td>


                <td>
                  {order.items}
                </td>


                <td className="font-medium text-white">
                  {order.amount}
                </td>


                <td>
                  {order.date}
                </td>


                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      order.status === "Received"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : order.status === "Pending"
                      ? "bg-amber-500/10 text-amber-400"
                      : "bg-indigo-500/10 text-indigo-400"
                    }`}
                  >

                    {order.status}

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