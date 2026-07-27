import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Download,
  CalendarDays,
} from "lucide-react";


const attendanceData = [

  {
    name:"Rahul Kumar",
    role:"Manager",
    date:"22 Jul 2026",
    checkIn:"09:02 AM",
    checkOut:"06:10 PM",
    status:"Present",
  },


  {
    name:"Priya Sharma",
    role:"Receptionist",
    date:"22 Jul 2026",
    checkIn:"09:15 AM",
    checkOut:"06:00 PM",
    status:"Late",
  },


  {
    name:"Sneha Patel",
    role:"Beautician",
    date:"22 Jul 2026",
    checkIn:"-",
    checkOut:"-",
    status:"Absent",
  },


  {
    name:"Rohit Verma",
    role:"Hair Stylist",
    date:"22 Jul 2026",
    checkIn:"08:55 AM",
    checkOut:"06:20 PM",
    status:"Present",
  },


];



const stats=[

{
title:"Total Employees",
value:"48",
icon:Users,
color:"bg-indigo-500/10 text-indigo-400"
},


{
title:"Present Today",
value:"44",
icon:CheckCircle,
color:"bg-emerald-500/10 text-emerald-400"
},


{
title:"Late Today",
value:"3",
icon:Clock,
color:"bg-amber-500/10 text-amber-400"
},


{
title:"Absent",
value:"1",
icon:XCircle,
color:"bg-red-500/10 text-red-400"
},


];



export default function Attendance(){


const [attendance,setAttendance]=useState(attendanceData);

const [search,setSearch]=useState("");



const filteredAttendance =
attendance.filter((employee)=>

employee.name
.toLowerCase()
.includes(search.toLowerCase())

);



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

Attendance Management

</h1>


<p className="mt-1 text-slate-400">

Monitor employee check-ins and daily attendance.

</p>


</div>




<button

onClick={()=>alert("Attendance report exported")}

className="flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-white hover:border-indigo-500"

>

<Download size={17}/>

Export Report

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







{/* Filters */}


<div className="flex flex-wrap justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">



<div className="relative max-w-md w-full">


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





<div className="flex items-center gap-2 text-slate-300">


<CalendarDays size={18}/>


22 July 2026


</div>



</div>








{/* Attendance Table */}



<div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">


<table className="w-full">


<thead className="border-b border-slate-800 bg-slate-800/40">


<tr className="text-left text-sm text-slate-400">


<th className="p-4">
Employee
</th>


<th>
Role
</th>


<th>
Check In
</th>


<th>
Check Out
</th>


<th>
Status
</th>


</tr>


</thead>





<tbody>


{
filteredAttendance.map((employee)=>(


<tr

key={employee.name}

className="border-b border-slate-800 hover:bg-slate-800/30"

>


<td className="p-4 text-white font-medium">

{employee.name}

</td>



<td>

{employee.role}

</td>




<td>

{employee.checkIn}

</td>




<td>

{employee.checkOut}

</td>





<td>


<span

className={`
rounded-full px-3 py-1 text-xs

${
employee.status==="Present"

?
"bg-emerald-500/10 text-emerald-400"

:

employee.status==="Late"

?
"bg-amber-500/10 text-amber-400"

:

"bg-red-500/10 text-red-400"

}

`}

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




</div>

);


}