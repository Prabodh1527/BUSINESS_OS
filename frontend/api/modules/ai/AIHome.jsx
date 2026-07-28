import { Link } from "react-router-dom";
import {
  Brain,
  Activity,
  Lightbulb,
  TrendingUp,
  MessageSquare,
  ArrowRight,
} from "lucide-react";


const stats = [
  {
    title:"Business Health Score",
    value:"86/100",
    icon:Activity,
    color:"bg-emerald-500/10 text-emerald-400",
  },

  {
    title:"AI Insights",
    value:"24",
    icon:Lightbulb,
    color:"bg-amber-500/10 text-amber-400",
  },

  {
    title:"Predictions",
    value:"12",
    icon:TrendingUp,
    color:"bg-indigo-500/10 text-indigo-400",
  },

  {
    title:"AI Queries",
    value:"156",
    icon:MessageSquare,
    color:"bg-sky-500/10 text-sky-400",
  },
];



const modules = [

{
title:"AI Chat",
description:"Ask AI anything about your business.",
path:"/ai/chat",
icon:MessageSquare,
},


{
title:"Business Health",
description:"View overall business performance score.",
path:"/ai/health",
icon:Activity,
},


{
title:"Insights",
description:"Discover hidden business patterns.",
path:"/ai/insights",
icon:Lightbulb,
},


{
title:"Predictions",
description:"Forecast future business trends.",
path:"/ai/predictions",
icon:TrendingUp,
},


{
title:"Recommendations",
description:"Get AI powered suggestions.",
path:"/ai/recommendations",
icon:Brain,
},


];



export default function AIHome(){


return(

<div className="space-y-6">



{/* Header */}

<div>

<h1 className="text-3xl font-bold text-white">

AI Business Analyst

</h1>


<p className="mt-1 text-slate-400">

Your intelligent assistant for business decisions.

</p>


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










{/* AI Modules */}



<div>


<h2 className="mb-4 text-xl font-semibold text-white">

AI Tools

</h2>



<div className="grid gap-5 md:grid-cols-2">


{

modules.map((item)=>{


const Icon=item.icon;


return(

<Link

key={item.title}

to={item.path}

className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-indigo-500"

>


<div className="flex justify-between">


<div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

<Icon size={22}/>

</div>


<ArrowRight

size={20}

className="text-slate-500 group-hover:text-white"

/>


</div>



<h3 className="mt-5 text-xl font-semibold text-white">

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








{/* AI Summary */}



<div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6">


<h2 className="text-xl font-semibold text-white">

AI Summary

</h2>


<p className="mt-2 text-slate-300">

Your business is performing well. Revenue growth is positive, but inventory optimization and customer retention can improve.

</p>



</div>






</div>


);


}