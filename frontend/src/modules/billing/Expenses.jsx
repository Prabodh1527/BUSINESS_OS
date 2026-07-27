import {
  Wallet,
  TrendingDown,
  Receipt,
  Search,
  Download,
  Plus,
} from "lucide-react";


const stats = [
  {
    title: "Total Expenses",
    value: "₹2,45,600",
    icon: Wallet,
    color: "bg-red-500/10 text-red-400",
  },
  {
    title: "This Month",
    value: "₹48,200",
    icon: TrendingDown,
    color: "bg-amber-500/10 text-amber-400",
  },
  {
    title: "Categories",
    value: "12",
    icon: Receipt,
    color: "bg-indigo-500/10 text-indigo-400",
  },
];


const expenses = [
  {
    id: "EXP-1001",
    title: "Employee Salary",
    category: "Staff",
    amount: "₹35,000",
    date: "21 Jul 2026",
    status: "Paid",
  },
  {
    id: "EXP-1002",
    title: "Electricity Bill",
    category: "Utilities",
    amount: "₹8,500",
    date: "20 Jul 2026",
    status: "Paid",
  },
  {
    id: "EXP-1003",
    title: "Product Purchase",
    category: "Inventory",
    amount: "₹15,600",
    date: "19 Jul 2026",
    status: "Pending",
  },
];


export default function Expenses() {

  return (

    <div className="space-y-6">


      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Expenses
          </h1>

          <p className="mt-1 text-slate-400">
            Track business expenses and spending.
          </p>

        </div>


        <button
          onClick={() => alert("Add expense page coming soon")}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-500"
        >
          <Plus size={18}/>
          Add Expense
        </button>


      </div>




      {/* Stats */}

      <div className="grid gap-4 md:grid-cols-3">


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
            placeholder="Search expenses..."
            className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
          />


        </div>



        <button
          onClick={() => alert("Expenses exported")}
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
                Expense ID
              </th>

              <th>
                Title
              </th>

              <th>
                Category
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

              <th>
                Action
              </th>

            </tr>

          </thead>




          <tbody>


            {expenses.map((expense)=>(

              <tr
                key={expense.id}
                className="border-b border-slate-800 hover:bg-slate-800/30"
              >


                <td className="p-4 font-medium text-white">
                  {expense.id}
                </td>


                <td>
                  {expense.title}
                </td>


                <td>
                  {expense.category}
                </td>


                <td className="font-medium text-white">
                  {expense.amount}
                </td>


                <td>
                  {expense.date}
                </td>


                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      expense.status === "Paid"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {expense.status}
                  </span>

                </td>


                <td>

                  <button
                    onClick={() => alert(`Viewing ${expense.id}`)}
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