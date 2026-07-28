import { Link } from "react-router-dom";
import {
  Users,
  TrendingUp,
  Clock,
  Award,
  Download,
} from "lucide-react";


const stats = [

{
title:"Total Employees",
value:"48",
icon:Users,
color:"bg-indigo-500/10 text-indigo-400",
},


{
title:"Average Attendance",
value:"92%",
icon:Clock,
color:"bg-emerald-500/10 text-emerald-400",
},


{
title:"Productivity",
value:"86%",
icon:TrendingUp,
color:"bg-sky-500/10 text-sky-400",
},


{
title:"Top Performer",
value:"Rahul",
icon:Award,
color:"bg-amber-500/10 text-amber-400",
},

];




const employees=[

{
name:"Rahul Kumar",
role:"Manager",
attendance:"96%",
revenue:"₹3.2L",
rating:"95%",
status:"Excellent",
},


{
name:"Priya Sharma",
role:"Receptionist",
attendance:"92%",
revenue:"₹1.8L",
rating:"90%",
status:"Good",
},


{
name:"Sneha Patel",
role:"Beautician",
attendance:"88%",
revenue:"₹2.1L",
rating:"88%",
status:"Good",
},


{
name:"Rohit Verma",
role:"Hair Stylist",
attendance:"94%",
revenue:"₹2.6L",
rating:"92%",
status:"Excellent",
},


];





export default function EmployeeReport(){


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

Employee Performance Report

</h1>



<p className="mt-1 text-slate-400">

Track staff productivity, attendance and performance.

</p>


</div>





<button

onClick={()=>alert("Employee report exported")}

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









{/* Performance Table */}



<div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">


<table className="w-full">


<thead className="border-b border-slate-800 bg-slate-800/40">


<tr className="text-left text-sm text-slate-400">


<th className="p-4">
Employee
</th>


<th>
Attendance
</th>


<th>
Revenue Generated
</th>


<th>
Performance
</th>


<th>
Status
</th>


</tr>


</thead>





<tbody>


{

employees.map((employee)=>(


<tr

key={employee.name}

className="border-b border-slate-800 hover:bg-slate-800/30"

>


<td className="p-4">


<p className="font-medium text-white">

{employee.name}

</p>


<p className="text-sm text-slate-400">

{employee.role}

</p>


</td>





<td>

{employee.attendance}

</td>




<td className="text-emerald-400 font-medium">

{employee.revenue}

</td>





<td>

{employee.rating}

</td>





<td>


<span

className={`rounded-full px-3 py-1 text-xs ${
employee.status==="Excellent"

?

"bg-emerald-500/10 text-emerald-400"

:

"bg-indigo-500/10 text-indigo-400"

}`}

>

{employee.status}

</span>


</td>



</tr>


))


}



</tbody>


</table>


</div>









{/* Insights */}



<div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6">


<h2 className="text-xl font-semibold text-white">

Performance Insights

</h2>



<div className="mt-4 grid gap-4 md:grid-cols-3">



<div className="rounded-xl bg-slate-900 p-4">

<p className="text-sm text-slate-400">

Best Performer

</p>


<p className="mt-2 text-white">

Rahul Kumar - 95%

</p>


</div>





<div className="rounded-xl bg-slate-900 p-4">

<p className="text-sm text-slate-400">

Highest Revenue

</p>


<p className="mt-2 text-white">

Rahul Kumar - ₹3.2L

</p>


</div>





<div className="rounded-xl bg-slate-900 p-4">

<p className="text-sm text-slate-400">

Improvement Area

</p>


<p className="mt-2 text-white">

Increase attendance tracking

</p>


</div>



</div>


</div>







</div>

);


}