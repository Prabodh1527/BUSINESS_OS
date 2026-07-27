import { useState } from "react";
import {
  Bell,
  Package,
  CalendarDays,
  Users,
  Sparkles,
  TrendingUp,
  Check,
  Trash2,
  Filter,
} from "lucide-react";


const initialNotifications = [
  {
    id: 1,
    title: "Low Stock Alert",
    message: "Hair Serum stock is below the minimum level.",
    type: "Inventory",
    time: "10 minutes ago",
    read: false,
    icon: Package,
  },
  {
    id: 2,
    title: "New Appointment",
    message: "5 appointments are scheduled for tomorrow.",
    type: "Appointment",
    time: "30 minutes ago",
    read: false,
    icon: CalendarDays,
  },
  {
    id: 3,
    title: "Leave Request",
    message: "Sneha Patel requested a leave.",
    type: "Employee",
    time: "1 hour ago",
    read: true,
    icon: Users,
  },
  {
    id: 4,
    title: "AI Business Insight",
    message: "Customer retention decreased by 8%.",
    type: "AI",
    time: "Today",
    read: false,
    icon: Sparkles,
  },
  {
    id: 5,
    title: "Revenue Milestone",
    message: "Monthly revenue crossed ₹10 Lakhs.",
    type: "Revenue",
    time: "Yesterday",
    read: true,
    icon: TrendingUp,
  },
  {
    id: 6,
    title: "Appointment assigned",
    message: "You have been assigned a haircut booking for Rahul Sharma.",
    type: "Employee",
    time: "Just now",
    read: false,
    icon: CalendarDays,
  },
  {
    id: 7,
    title: "Payslip uploaded",
    message: "Your payslip for June 2026 is now available to view.",
    type: "Employee",
    time: "2 hours ago",
    read: false,
    icon: TrendingUp,
  },
];





const categories=[
  "All",
  "Inventory",
  "Appointment",
  "Employee",
  "AI",
  "Revenue",
];






export default function Notifications(){


const [notifications,setNotifications]=useState(
initialNotifications
);


const [activeFilter,setActiveFilter]=useState("All");





const markRead=(id)=>{


setNotifications(

notifications.map((item)=>

item.id===id

?

{
...item,
read:true
}

:

item

)

);


};







const removeNotification=(id)=>{


setNotifications(

notifications.filter(

(item)=>item.id!==id

)

);


};






const filteredNotifications =

activeFilter==="All"

?

notifications

:

notifications.filter(

(item)=>item.type===activeFilter

);







return(


<div className="space-y-6">





{/* Header */}


<div>


<h1 className="text-3xl font-bold text-white">

Notifications

</h1>


<p className="mt-1 text-slate-400">

Stay updated with important business activities.

</p>


</div>









{/* Filters */}



<div className="flex flex-wrap gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">


<div className="flex items-center gap-2 text-slate-400 mr-2">

<Filter size={18}/>

Filter

</div>



{

categories.map((category)=>(


<button

key={category}

onClick={()=>setActiveFilter(category)}

className={`rounded-xl px-4 py-2 text-sm transition ${
activeFilter===category

?

"bg-indigo-600 text-white"

:

"bg-slate-800 text-slate-300 hover:bg-slate-700"

}`}

>


{category}


</button>


))


}



</div>









{/* Notification List */}



<div className="space-y-4">


{

filteredNotifications.length===0

?

<div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">

No notifications found.

</div>


:

filteredNotifications.map((notification)=>{


const Icon=notification.icon;


return(


<div

key={notification.id}

className={`rounded-2xl border p-5 transition ${
notification.read

?

"border-slate-800 bg-slate-900"

:

"border-indigo-500/40 bg-indigo-500/10"

}`}

>


<div className="flex items-start justify-between gap-4">



<div className="flex gap-4">


<div className="rounded-xl bg-slate-800 p-3 text-indigo-400">

<Icon size={22}/>

</div>



<div>


<div className="flex items-center gap-3">


<h2 className="font-semibold text-white">

{notification.title}

</h2>



{

!notification.read &&

<span className="rounded-full bg-indigo-600 px-2 py-1 text-xs text-white">

New

</span>

}


</div>





<p className="mt-2 text-sm text-slate-400">

{notification.message}

</p>




<p className="mt-3 text-xs text-slate-500">

{notification.type} • {notification.time}

</p>



</div>


</div>








<div className="flex gap-2">


{

!notification.read &&

<button

onClick={()=>markRead(notification.id)}

className="rounded-lg border border-slate-700 p-2 hover:border-emerald-500"

title="Mark as read"

>

<Check size={16}/>

</button>

}



<button

onClick={()=>removeNotification(notification.id)}

className="rounded-lg border border-slate-700 p-2 text-red-400 hover:border-red-500"

title="Delete"

>

<Trash2 size={16}/>

</button>



</div>





</div>


</div>


)


})


}



</div>







</div>


);


}