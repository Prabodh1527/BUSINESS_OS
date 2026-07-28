import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plug,
  MessageCircle,
  CreditCard,
  Mail,
  CalendarDays,
  Globe,
  CheckCircle,
} from "lucide-react";


const initialIntegrations = [

{
id:1,
name:"WhatsApp Business",
description:"Send booking updates and customer notifications.",
icon:MessageCircle,
connected:true,
},


{
id:2,
name:"Payment Gateway",
description:"Accept online payments from customers.",
icon:CreditCard,
connected:false,
},


{
id:3,
name:"Email Service",
description:"Send invoices and business updates.",
icon:Mail,
connected:true,
},


{
id:4,
name:"Google Calendar",
description:"Sync appointments automatically.",
icon:CalendarDays,
connected:false,
},


{
id:5,
name:"Business Website",
description:"Connect your booking website.",
icon:Globe,
connected:true,
},

];



export default function Integrations(){


const [integrations,setIntegrations]=useState(initialIntegrations);



const toggleConnection=(id)=>{


setIntegrations(

integrations.map((item)=>

item.id===id

?

{
...item,
connected:!item.connected
}

:

item

)

);


};





return(

<div className="space-y-6">



{/* Header */}

<div>


<Link

to="/settings"

className="mb-3 block text-sm text-slate-400 hover:text-white"

>

← Back to Settings

</Link>



<h1 className="text-3xl font-bold text-white">

Integrations

</h1>



<p className="mt-1 text-slate-400">

Connect external services with your Business OS workspace.

</p>


</div>









{/* Integration Cards */}



<div className="grid gap-5 md:grid-cols-2">



{

integrations.map((item)=>{


const Icon=item.icon;



return(


<div

key={item.id}

className="rounded-2xl border border-slate-800 bg-slate-900 p-6"

>


<div className="flex items-start justify-between">


<div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

<Icon size={24}/>

</div>



{

item.connected &&

<div className="flex items-center gap-1 text-sm text-emerald-400">

<CheckCircle size={16}/>

Connected

</div>

}


</div>






<h2 className="mt-5 text-xl font-semibold text-white">

{item.name}

</h2>



<p className="mt-2 text-sm text-slate-400">

{item.description}

</p>







<button

onClick={()=>toggleConnection(item.id)}

className={`mt-5 rounded-xl px-5 py-2 text-sm text-white ${
item.connected

?

"bg-red-500/80 hover:bg-red-500"

:

"bg-indigo-600 hover:bg-indigo-500"

}`}

>


{

item.connected

?

"Disconnect"

:

"Connect"

}


</button>





</div>


)


})


}



</div>









{/* API Section */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="flex items-center gap-3">


<div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

<Plug size={22}/>

</div>



<div>


<h2 className="text-xl font-semibold text-white">

Developer Integrations

</h2>


<p className="text-sm text-slate-400">

Manage API connections and webhooks.

</p>


</div>


</div>





<div className="mt-5 rounded-xl bg-slate-800 p-4">


<p className="text-sm text-slate-400">

API Status

</p>


<p className="mt-2 text-emerald-400">

All systems operational

</p>


</div>



</div>






</div>


);


}