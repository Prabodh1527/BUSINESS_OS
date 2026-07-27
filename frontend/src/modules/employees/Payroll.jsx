import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IndianRupee,
  Users,
  CheckCircle,
  Clock,
  FileText,
  Download,
  Plus,
} from "lucide-react";


const initialPayroll = [

{
id:1,
employee:"Rahul Kumar",
role:"Manager",
month:"July 2026",
salary:"₹55,000",
bonus:"₹5,000",
deduction:"₹0",
net:"₹60,000",
status:"Paid",
},


{
id:2,
employee:"Priya Sharma",
role:"Receptionist",
month:"July 2026",
salary:"₹28,000",
bonus:"₹2,000",
deduction:"₹0",
net:"₹30,000",
status:"Pending",
},


{
id:3,
employee:"Sneha Patel",
role:"Beautician",
month:"July 2026",
salary:"₹35,000",
bonus:"₹3,000",
deduction:"₹500",
net:"₹37,500",
status:"Pending",
},


{
id:4,
employee:"Rohit Verma",
role:"Hair Stylist",
month:"July 2026",
salary:"₹32,000",
bonus:"₹1,000",
deduction:"₹0",
net:"₹33,000",
status:"Paid",
},


];





const stats=[

{
title:"Total Payroll",
value:"₹1.6L",
icon:IndianRupee,
color:"bg-indigo-500/10 text-indigo-400"
},


{
title:"Employees",
value:"48",
icon:Users,
color:"bg-sky-500/10 text-sky-400"
},


{
title:"Paid",
value:"42",
icon:CheckCircle,
color:"bg-emerald-500/10 text-emerald-400"
},


{
title:"Pending",
value:"6",
icon:Clock,
color:"bg-amber-500/10 text-amber-400"
},


];





export default function Payroll(){


const [payroll,setPayroll]=useState(initialPayroll);


const [month,setMonth]=useState("July 2026");





const markPaid=(id)=>{


setPayroll(

payroll.map((item)=>

item.id===id

?

{
...item,
status:"Paid"
}

:

item

)

);


};






return(


<div className="space-y-6">





{/* Header */}



<div className="flex items-center justify-between">


<div>


<Link

to="/employees"

className="mb-3 block text-sm text-slate-400 hover:text-white"

>

← Back to Employees

</Link>




<h1 className="text-3xl font-bold text-white">

Payroll Management

</h1>



<p className="mt-1 text-slate-400">

Generate salaries and manage employee payslips.

</p>


</div>






<div className="flex gap-3">


<button

className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white"

>

<Plus size={17}/>

Generate Payroll

</button>



<button

className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-white"

>

<Download size={17}/>

Export

</button>


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










{/* Month Selector */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">


<label className="text-sm text-slate-400">

Payroll Month

</label>


<select

value={month}

onChange={(e)=>setMonth(e.target.value)}

className="ml-4 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-white"

>


<option>

July 2026

</option>


<option>

June 2026

</option>


<option>

May 2026

</option>


</select>


</div>









{/* Payroll Table */}



<div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">


<table className="w-full">


<thead className="border-b border-slate-800 bg-slate-800/40">


<tr className="text-left text-sm text-slate-400">


<th className="p-4">
Employee
</th>


<th>
Salary
</th>


<th>
Bonus
</th>


<th>
Deduction
</th>


<th>
Net Pay
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


{

payroll.map((item)=>(


<tr

key={item.id}

className="border-b border-slate-800 hover:bg-slate-800/30"

>



<td className="p-4">


<p className="font-medium text-white">

{item.employee}

</p>


<p className="text-xs text-slate-400">

{item.role}

</p>


</td>





<td>

{item.salary}

</td>




<td className="text-emerald-400">

{item.bonus}

</td>





<td className="text-red-400">

{item.deduction}

</td>





<td className="font-semibold text-white">

{item.net}

</td>





<td>


<span

className={`rounded-full px-3 py-1 text-xs ${
item.status==="Paid"

?

"bg-emerald-500/10 text-emerald-400"

:

"bg-amber-500/10 text-amber-400"

}`}

>


{item.status}


</span>


</td>








<td>


<div className="flex gap-2">


<button

onClick={()=>markPaid(item.id)}

className="rounded-lg bg-emerald-600 px-3 py-1 text-xs text-white"

>

Mark Paid

</button>





<button

className="flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-1 text-xs text-white"

>

<FileText size={14}/>

Payslip

</button>



</div>


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