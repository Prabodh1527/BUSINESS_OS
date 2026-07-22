import { Link } from "react-router-dom";
import {
  IndianRupee,
  TrendingUp,
  CreditCard,
  Download,
  CalendarDays,
} from "lucide-react";


const stats = [

{
title:"Total Revenue",
value:"₹12.8L",
icon:IndianRupee,
color:"bg-emerald-500/10 text-emerald-400"
},


{
title:"Monthly Growth",
value:"+18%",
icon:TrendingUp,
color:"bg-indigo-500/10 text-indigo-400"
},


{
title:"Transactions",
value:"512",
icon:CreditCard,
color:"bg-sky-500/10 text-sky-400"
},


];


const monthlyRevenue=[

{
month:"January",
amount:"₹2.4L"
},

{
month:"February",
amount:"₹3.1L"
},

{
month:"March",
amount:"₹3.8L"
},

{
month:"April",
amount:"₹4.2L"
},

{
month:"May",
amount:"₹5.1L"
},

{
month:"June",
amount:"₹6.4L"
},

];



const payments=[

{
method:"UPI",
amount:"₹5.4L",
percentage:"42%"
},


{
method:"Card",
amount:"₹3.2L",
percentage:"25%"
},


{
method:"Cash",
amount:"₹2.1L",
percentage:"16%"
},


{
method:"Bank Transfer",
amount:"₹2.1L",
percentage:"17%"
},


];




export default function RevenueReport(){


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

Revenue Report

</h1>



<p className="mt-1 text-slate-400">

Analyze income and financial performance.

</p>


</div>





<button

onClick={()=>alert("Revenue report exported")}

className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white"

>

<Download size={17}/>

Export

</button>


</div>









{/* Stats */}


<div className="grid gap-4 md:grid-cols-3">


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









{/* Monthly Revenue */}


<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="flex justify-between mb-5">


<h2 className="text-xl font-semibold text-white">

Monthly Revenue

</h2>



<div className="flex items-center gap-2 text-slate-400">

<CalendarDays size={17}/>

2026

</div>


</div>





<div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">


{

monthlyRevenue.map((item)=>(


<div

key={item.month}

className="rounded-xl bg-slate-800 p-4"

>


<p className="text-sm text-slate-400">

{item.month}

</p>



<h3 className="mt-2 font-bold text-white">

{item.amount}

</h3>



</div>


))


}



</div>


</div>









{/* Payment Breakdown */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<h2 className="mb-5 text-xl font-semibold text-white">

Payment Breakdown

</h2>




<div className="space-y-4">


{

payments.map((item)=>(


<div

key={item.method}

className="flex justify-between rounded-xl bg-slate-800 p-4"

>


<div>

<p className="text-white font-medium">

{item.method}

</p>


<p className="text-sm text-slate-400">

{item.percentage} of total revenue

</p>


</div>




<p className="font-semibold text-emerald-400">

{item.amount}

</p>


</div>


))


}



</div>


</div>





</div>


);


}