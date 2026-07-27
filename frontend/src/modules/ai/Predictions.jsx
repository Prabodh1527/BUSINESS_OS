import { Link } from "react-router-dom";
import {
  TrendingUp,
  Users,
  Package,
  IndianRupee,
  CalendarDays,
} from "lucide-react";


const predictions = [

{
title:"Expected Revenue",
value:"₹14.5L",
change:"+13%",
icon:IndianRupee,
color:"bg-emerald-500/10 text-emerald-400",
description:"Predicted revenue for next month based on current trends."
},


{
title:"Customer Growth",
value:"950",
change:"+11%",
icon:Users,
color:"bg-indigo-500/10 text-indigo-400",
description:"Expected number of active customers."
},


{
title:"Appointment Demand",
value:"1450",
change:"+16%",
icon:CalendarDays,
color:"bg-sky-500/10 text-sky-400",
description:"Predicted appointments next month."
},


{
title:"Stock Requirement",
value:"+20%",
change:"Increase",
icon:Package,
color:"bg-amber-500/10 text-amber-400",
description:"Recommended inventory increase for high demand products."
},


];



const forecast = [

{
month:"August",
revenue:"₹14.5L",
customers:"950",
appointments:"1450",
},


{
month:"September",
revenue:"₹15.8L",
customers:"1020",
appointments:"1520",
},


{
month:"October",
revenue:"₹17.2L",
customers:"1100",
appointments:"1650",
},


];



export default function Predictions(){


return(

<div className="space-y-6">



{/* Header */}

<div>


<Link

to="/ai"

className="mb-3 block text-sm text-slate-400 hover:text-white"

>

← Back to AI Analyst

</Link>



<h1 className="text-3xl font-bold text-white">

AI Predictions

</h1>


<p className="mt-1 text-slate-400">

Forecast future business performance using AI analysis.

</p>


</div>









{/* Prediction Cards */}


<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">


{

predictions.map((item)=>{


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



<div className="flex items-center gap-2">


<p className="text-sm text-emerald-400">

{item.change}

</p>


</div>



<p className="mt-2 text-sm text-slate-400">

{item.title}

</p>



</div>


)


})


}



</div>









{/* Forecast Table */}



<div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">


<h2 className="p-6 text-xl font-semibold text-white">

Future Forecast

</h2>




<table className="w-full">


<thead className="border-y border-slate-800 bg-slate-800/40">


<tr className="text-left text-sm text-slate-400">


<th className="p-4">

Month

</th>


<th>

Revenue

</th>


<th>

Customers

</th>


<th>

Appointments

</th>


</tr>


</thead>





<tbody>


{

forecast.map((item)=>(


<tr

key={item.month}

className="border-b border-slate-800"

>


<td className="p-4 text-white font-medium">

{item.month}

</td>


<td className="text-emerald-400">

{item.revenue}

</td>


<td>

{item.customers}

</td>


<td>

{item.appointments}

</td>


</tr>


))


}



</tbody>


</table>


</div>









{/* AI Explanation */}



<div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6">


<div className="flex items-center gap-3">


<TrendingUp className="text-indigo-400"/>


<h2 className="text-xl font-semibold text-white">

AI Forecast Explanation

</h2>


</div>




<p className="mt-3 text-slate-300">

Predictions are based on revenue trends, customer behavior, appointment history and inventory movement.

</p>


</div>







</div>


);


}