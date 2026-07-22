import { Link } from "react-router-dom";
import {
  IndianRupee,
  TrendingUp,
  Users,
  Package,
  CalendarDays,
  ArrowRight,
} from "lucide-react";


const stats = [
  {
    title:"Revenue",
    value:"₹12.8L",
    icon:IndianRupee,
    color:"bg-emerald-500/10 text-emerald-400"
  },

  {
    title:"Growth",
    value:"+18%",
    icon:TrendingUp,
    color:"bg-indigo-500/10 text-indigo-400"
  },

  {
    title:"Customers",
    value:"856",
    icon:Users,
    color:"bg-sky-500/10 text-sky-400"
  },

  {
    title:"Products",
    value:"486",
    icon:Package,
    color:"bg-purple-500/10 text-purple-400"
  },
];



const reports=[

{
title:"Revenue Report",
description:"Analyze income, payments and monthly growth.",
path:"/reports/revenue",
icon:IndianRupee,
},


{
title:"Sales Report",
description:"View services, sales and customer trends.",
path:"/reports/sales",
icon:TrendingUp,
},


{
title:"Employee Report",
description:"Track employee performance and productivity.",
path:"/reports/employees",
icon:Users,
},


{
title:"Inventory Report",
description:"Analyze stock movement and valuation.",
path:"/reports/inventory",
icon:Package,
},


];


export default function Reports(){

return(
<div className="space-y-6">
        {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Business Reports
          </h1>

          <p className="mt-1 text-slate-400">
            Monitor your business performance and growth.
          </p>

        </div>


        <div className="flex items-center gap-2 text-slate-400">

          <CalendarDays size={18}/>

          July 2026

        </div>


      </div>





      {/* Stats */}


      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">


      {
        stats.map((item)=>{


          const Icon=item.icon;


          return(

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


          )


        })
      }


      </div>









      {/* Report Modules */}


      <div>


        <h2 className="mb-4 text-xl font-semibold text-white">

          Detailed Reports

        </h2>




        <div className="grid gap-5 md:grid-cols-2">



        {
          reports.map((report)=>{


            const Icon=report.icon;



            return(


            <Link

            key={report.title}

            to={report.path}

            className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-indigo-500"

            >


              <div className="flex items-start justify-between">


                <div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

                  <Icon size={22}/>

                </div>



                <ArrowRight

                size={20}

                className="text-slate-500 transition group-hover:text-white"

                />


              </div>




              <h3 className="mt-5 text-xl font-semibold text-white">

                {report.title}

              </h3>



              <p className="mt-2 text-sm text-slate-400">

                {report.description}

              </p>



            </Link>


            )


          })
        }



        </div>


      </div>
            {/* AI Business Insights */}


      <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6">


        <h2 className="text-xl font-semibold text-white">

          AI Business Insights

        </h2>



        <p className="mt-2 text-sm text-slate-300">

          AI Analyst will provide recommendations based on your business data.

        </p>




        <div className="mt-5 grid gap-4 md:grid-cols-3">


          <div className="rounded-xl bg-slate-900 p-4">


            <p className="text-xs text-slate-400">

              Revenue

            </p>


            <p className="mt-2 text-white">

              Revenue increased by 18% this month.

            </p>


          </div>





          <div className="rounded-xl bg-slate-900 p-4">


            <p className="text-xs text-slate-400">

              Customer Growth

            </p>


            <p className="mt-2 text-white">

              Repeat customers are increasing.

            </p>


          </div>






          <div className="rounded-xl bg-slate-900 p-4">


            <p className="text-xs text-slate-400">

              Inventory Alert

            </p>


            <p className="mt-2 text-white">

              18 products require restocking.

            </p>


          </div>



        </div>


      </div>



    </div>

  );

}