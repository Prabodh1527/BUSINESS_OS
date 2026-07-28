import { Link } from "react-router-dom";
import {
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  Users,
  Package,
  CalendarCheck,
} from "lucide-react";


const insights = [

{
type:"Opportunity",
title:"Customer Growth Opportunity",
description:
"Repeat customers increased by 15%. Consider loyalty programs to improve retention.",
icon:TrendingUp,
color:"text-emerald-400 bg-emerald-500/10",
},


{
type:"Warning",
title:"Inventory Risk Detected",
description:
"18 products have low stock levels. Restocking is recommended.",
icon:AlertTriangle,
color:"text-red-400 bg-red-500/10",
},


{
type:"Performance",
title:"Employee Performance",
description:
"Rahul Kumar is the highest performing employee this month.",
icon:Users,
color:"text-indigo-400 bg-indigo-500/10",
},


{
type:"Insight",
title:"Appointment Trend",
description:
"Weekend appointments are increasing. Consider increasing staff availability.",
icon:CalendarCheck,
color:"text-sky-400 bg-sky-500/10",
},


];



const metrics=[

{
title:"Revenue Pattern",
value:"+18%",
description:"Revenue growth compared to last month"
},


{
title:"Customer Retention",
value:"78%",
description:"Returning customers percentage"
},


{
title:"Inventory Efficiency",
value:"82%",
description:"Stock utilization score"
},

];



export default function Insights(){


return(

<div className="space-y-6">



{/* Header */}


<div>


<Link

to="/ai"

className="mb-3 block text-sm text-slate-400 hover:text-white"

>

← Back to AI Analyst

</Link>



<h1 className="text-3xl font-bold text-white">

AI Business Insights

</h1>



<p className="mt-1 text-slate-400">

AI detected patterns and important business signals.

</p>


</div>









{/* Metrics */}


<div className="grid gap-4 md:grid-cols-3">


{

metrics.map((item)=>(


<div

key={item.title}

className="rounded-2xl border border-slate-800 bg-slate-900 p-5"

>


<h2 className="text-3xl font-bold text-white">

{item.value}

</h2>


<p className="mt-2 font-medium text-white">

{item.title}

</p>


<p className="mt-1 text-sm text-slate-400">

{item.description}

</p>


</div>


))


}



</div>









{/* AI Findings */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="flex items-center gap-3 mb-6">


<div className="rounded-xl bg-amber-500/10 p-3 text-amber-400">

<Lightbulb size={22}/>

</div>


<h2 className="text-xl font-semibold text-white">

AI Findings

</h2>


</div>





<div className="space-y-4">


{

insights.map((item)=>(


<div

key={item.title}

className="flex gap-4 rounded-xl bg-slate-800 p-5"

>


<div className={`rounded-xl p-3 ${item.color}`}>

<item.icon size={22}/>

</div>



<div>


<p className="text-sm text-slate-400">

{item.type}

</p>


<h3 className="mt-1 font-semibold text-white">

{item.title}

</h3>


<p className="mt-2 text-sm text-slate-300">

{item.description}

</p>


</div>



</div>


))


}



</div>


</div>









{/* AI Summary */}


<div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6">


<h2 className="text-xl font-semibold text-white">

AI Summary

</h2>



<p className="mt-2 text-slate-300">

Business performance is healthy. Main focus areas should be inventory management and improving customer loyalty.

</p>


</div>





</div>


);


}