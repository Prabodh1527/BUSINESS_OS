import { Link } from "react-router-dom";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  IndianRupee,
  Download,
} from "lucide-react";


const stats = [

{
title:"Total Sales",
value:"₹8.4L",
icon:IndianRupee,
color:"bg-emerald-500/10 text-emerald-400",
},

{
title:"Orders",
value:"1248",
icon:ShoppingBag,
color:"bg-indigo-500/10 text-indigo-400",
},

{
title:"Customers",
value:"856",
icon:Users,
color:"bg-sky-500/10 text-sky-400",
},

{
title:"Growth",
value:"+22%",
icon:TrendingUp,
color:"bg-purple-500/10 text-purple-400",
},

];



const services=[

{
name:"Hair Styling",
bookings:320,
sales:"₹2.4L",
growth:"+25%"
},

{
name:"Hair Spa",
bookings:210,
sales:"₹1.8L",
growth:"+18%"
},

{
name:"Facial",
bookings:180,
sales:"₹1.3L",
growth:"+12%"
},

{
name:"Manicure",
bookings:140,
sales:"₹90K",
growth:"+8%"
},

];




const customers=[

{
name:"Rahul Sharma",
orders:8,
spent:"₹18,500"
},

{
name:"Priya Reddy",
orders:6,
spent:"₹14,200"
},

{
name:"Aman Verma",
orders:5,
spent:"₹11,800"
},

];





export default function SalesReport(){


return(

<div className="space-y-6">



{/* Header */}

<div className="flex items-center justify-between">


<div>


<Link

to="/reports"

className="mb-3 block text-sm text-slate-400 hover:text-white"

>

← Back to Reports

</Link>



<h1 className="text-3xl font-bold text-white">

Sales Report

</h1>


<p className="mt-1 text-slate-400">

Analyze services, customers and sales performance.

</p>


</div>




<button

onClick={()=>alert("Sales report exported")}

className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white"

>

<Download size={17}/>

Export

</button>


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









{/* Top Services */}


<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<h2 className="mb-5 text-xl font-semibold text-white">

Top Performing Services

</h2>



<div className="space-y-4">


{

services.map((service)=>(


<div

key={service.name}

className="flex items-center justify-between rounded-xl bg-slate-800 p-4"

>


<div>

<p className="font-medium text-white">

{service.name}

</p>


<p className="text-sm text-slate-400">

{service.bookings} bookings

</p>


</div>




<div className="text-right">


<p className="font-semibold text-emerald-400">

{service.sales}

</p>


<p className="text-xs text-indigo-400">

{service.growth}

</p>


</div>



</div>


))

}



</div>


</div>









{/* Customer Sales */}


<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<h2 className="mb-5 text-xl font-semibold text-white">

Top Customers

</h2>



<table className="w-full">


<thead className="border-b border-slate-800">


<tr className="text-left text-sm text-slate-400">


<th className="p-3">

Customer

</th>


<th>

Orders

</th>


<th>

Total Spent

</th>


</tr>


</thead>





<tbody>


{

customers.map((customer)=>(


<tr

key={customer.name}

className="border-b border-slate-800"

>


<td className="p-3 text-white font-medium">

{customer.name}

</td>


<td>

{customer.orders}

</td>


<td className="text-emerald-400">

{customer.spent}

</td>


</tr>


))


}



</tbody>


</table>


</div>







</div>

);


}