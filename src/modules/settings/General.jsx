import { Link } from "react-router-dom";
import {
  Building2,
  Users,
  ShieldCheck,
  Sparkles,
  Plug,
  CreditCard,
  Palette,
  Settings,
  ArrowRight,
  Database,
} from "lucide-react";


const settingsCards = [

{
title:"Business",
description:"Manage business information, contact details and working hours.",
path:"/settings/business",
icon:Building2,
},


{
title:"Users",
description:"Manage owners, managers and employee accounts.",
path:"/settings/users",
icon:Users,
},


{
title:"Roles & Permissions",
description:"Control access levels and permissions.",
path:"/settings/roles",
icon:ShieldCheck,
},


{
title:"Security",
description:"Manage passwords, sessions and security preferences.",
path:"/settings/security",
icon:ShieldCheck,
},


{
title:"AI Settings",
description:"Configure AI assistant and insights preferences.",
path:"/settings/ai",
icon:Sparkles,
},


{
title:"Integrations",
description:"Connect WhatsApp, payments and external services.",
path:"/settings/integrations",
icon:Plug,
},


{
title:"Subscription",
description:"Manage your plan and billing information.",
path:"/settings/subscription",
icon:CreditCard,
},


{
title:"Appearance",
description:"Customize theme and interface preferences.",
path:"/settings/appearance",
icon:Palette,
},


{
title:"Masters",
description:"Manage services, categories, roles and business configurations.",
path:"/settings/masters",
icon:Database,
},


];



export default function General(){


return(

<div className="space-y-6">



{/* Header */}

<div>

<h1 className="text-3xl font-bold text-white">

Settings

</h1>


<p className="mt-1 text-slate-400">

Manage your Business OS configuration.

</p>


</div>







{/* Quick Settings */}


<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="flex items-center gap-3 mb-6">


<div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

<Settings size={22}/>

</div>


<div>

<h2 className="text-xl font-semibold text-white">

System Settings

</h2>


<p className="text-sm text-slate-400">

Configure your business workspace.

</p>


</div>


</div>







<div className="grid gap-5 md:grid-cols-2">



{

settingsCards.map((item)=>{


const Icon=item.icon;


return(


<Link

key={item.title}

to={item.path}

className="group rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:border-indigo-500"

>


<div className="flex items-start justify-between">


<div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

<Icon size={22}/>

</div>



<ArrowRight

size={20}

className="text-slate-500 group-hover:text-white"

/>


</div>





<h3 className="mt-5 text-lg font-semibold text-white">

{item.title}

</h3>



<p className="mt-2 text-sm text-slate-400">

{item.description}

</p>



</Link>


)


})


}



</div>


</div>







{/* Account Summary */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<h2 className="text-xl font-semibold text-white">

Current Workspace

</h2>



<div className="mt-5 grid gap-4 md:grid-cols-3">


<div className="rounded-xl bg-slate-800 p-4">


<p className="text-sm text-slate-400">

Business

</p>


<p className="mt-2 font-semibold text-white">

Glow Studio

</p>


</div>





<div className="rounded-xl bg-slate-800 p-4">


<p className="text-sm text-slate-400">

Plan

</p>


<p className="mt-2 font-semibold text-white">

Professional

</p>


</div>





<div className="rounded-xl bg-slate-800 p-4">


<p className="text-sm text-slate-400">

Users

</p>


<p className="mt-2 font-semibold text-white">

24 Members

</p>


</div>



</div>


</div>






</div>


);


}