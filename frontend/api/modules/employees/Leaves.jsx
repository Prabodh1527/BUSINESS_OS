import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Download,
  Plus,
  X,
} from "lucide-react";


const initialLeaves = [

{
id:1,
employee:"Sneha Patel",
role:"Beautician",
type:"Medical Leave",
from:"22 Jul 2026",
to:"24 Jul 2026",
reason:"Health issue",
balance:5,
status:"Pending",
},


{
id:2,
employee:"Priya Sharma",
role:"Receptionist",
type:"Casual Leave",
from:"28 Jul 2026",
to:"29 Jul 2026",
reason:"Personal work",
balance:8,
status:"Approved",
},


{
id:3,
employee:"Rohit Verma",
role:"Hair Stylist",
type:"Personal Leave",
from:"30 Jul 2026",
to:"31 Jul 2026",
reason:"Family function",
balance:10,
status:"Rejected",
},


];





const stats=[

{
title:"Pending Requests",
value:"6",
icon:Clock,
color:"bg-amber-500/10 text-amber-400"
},


{
title:"Approved",
value:"42",
icon:CheckCircle,
color:"bg-emerald-500/10 text-emerald-400"
},


{
title:"Rejected",
value:"3",
icon:XCircle,
color:"bg-red-500/10 text-red-400"
},


{
title:"Employees",
value:"48",
icon:Users,
color:"bg-indigo-500/10 text-indigo-400"
},


];






export default function Leaves(){


const [leaves,setLeaves]=useState(initialLeaves);


const [search,setSearch]=useState("");


const [showForm,setShowForm]=useState(false);



const [form,setForm]=useState({

employee:"",
role:"",
type:"",
from:"",
to:"",
reason:"",

});





const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};






const addLeave=(e)=>{

e.preventDefault();


setLeaves([

...leaves,

{

...form,

id:Date.now(),

balance:12,

status:"Pending"

}

]);


setForm({

employee:"",
role:"",
type:"",
from:"",
to:"",
reason:"",

});


setShowForm(false);


};







const updateStatus=(id,status)=>{


setLeaves(

leaves.map((leave)=>

leave.id===id

?

{
...leave,
status:status
}

:

leave

)

);


};







const filteredLeaves = leaves.filter((leave)=>

leave.employee
.toLowerCase()
.includes(search.toLowerCase())

);







return (

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

Leave Management

</h1>



<p className="mt-1 text-slate-400">

Review and manage employee leave requests.

</p>


</div>





<div className="flex gap-3">



<button

onClick={()=>setShowForm(true)}

className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white"

>

<Plus size={17}/>

Add Leave

</button>





<button

onClick={()=>alert("Leave report exported")}

className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-white"

>

<Download size={17}/>

Export

</button>



</div>


</div>










{/* Add Leave Form */}



{showForm && (


<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="flex justify-between mb-5">


<h2 className="text-xl font-semibold text-white">

Create Leave Request

</h2>



<button

onClick={()=>setShowForm(false)}

>

<X/>

</button>


</div>






<form

onSubmit={addLeave}

className="grid gap-4 md:grid-cols-2"

>


<input
name="employee"
value={form.employee}
onChange={handleChange}
placeholder="Employee Name"
className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
/>



<input
name="role"
value={form.role}
onChange={handleChange}
placeholder="Role"
className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
/>



<input
name="type"
value={form.type}
onChange={handleChange}
placeholder="Leave Type"
className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
/>



<input
name="from"
value={form.from}
onChange={handleChange}
placeholder="From Date"
className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
/>



<input
name="to"
value={form.to}
onChange={handleChange}
placeholder="To Date"
className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
/>



<input
name="reason"
value={form.reason}
onChange={handleChange}
placeholder="Reason"
className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
/>



<button

className="rounded-xl bg-indigo-600 text-white"

>

Save Request

</button>


</form>



</div>


)}









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










{/* Search */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">


<div className="relative max-w-md">


<Search

size={18}

className="absolute left-3 top-3 text-slate-500"

/>



<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search employee..."

className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2.5 pl-10 text-white"

/>


</div>


</div>









{/* Table */}



<div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">


<table className="w-full">


<thead className="border-b border-slate-800 bg-slate-800/40">


<tr className="text-left text-sm text-slate-400">


<th className="p-4">
Employee
</th>


<th>
Leave
</th>


<th>
Dates
</th>


<th>
Reason
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


{

filteredLeaves.map((leave)=>(


<tr

key={leave.id}

className="border-b border-slate-800 hover:bg-slate-800/30"

>


<td className="p-4 text-white">


{leave.employee}

<p className="text-xs text-slate-400">

{leave.role}

</p>


</td>



<td>

{leave.type}

</td>



<td>

{leave.from}

<br/>

{leave.to}

</td>



<td>

{leave.reason}

</td>




<td>


<span

className={`rounded-full px-3 py-1 text-xs ${
leave.status==="Approved"

?
"bg-emerald-500/10 text-emerald-400"

:

leave.status==="Rejected"

?
"bg-red-500/10 text-red-400"

:

"bg-amber-500/10 text-amber-400"

}`}

>

{leave.status}

</span>


</td>





<td>


<div className="flex gap-2">


<button

onClick={()=>updateStatus(leave.id,"Approved")}

className="rounded-lg bg-emerald-600 px-3 py-1 text-xs text-white"

>

Approve

</button>




<button

onClick={()=>updateStatus(leave.id,"Rejected")}

className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white"

>

Reject

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