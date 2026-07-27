import { Link } from "react-router-dom";
import {
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Package,
  Sparkles,
} from "lucide-react";


const recommendations = [

{
title:"Improve Customer Retention",
priority:"High",
description:
"Launch loyalty programs and personalized offers for repeat customers.",
icon:Users,
color:"text-indigo-400 bg-indigo-500/10",
},


{
title:"Restock Inventory",
priority:"High",
description:
"18 products are running low. Restock popular items before demand increases.",
icon:Package,
color:"text-red-400 bg-red-500/10",
},


{
title:"Increase Weekend Staff",
priority:"Medium",
description:
"Weekend appointment demand is increasing. Consider adding more staff availability.",
icon:TrendingUp,
color:"text-emerald-400 bg-emerald-500/10",
},


{
title:"Optimize Services",
priority:"Medium",
description:
"Promote high-performing services like Hair Spa and Hair Styling.",
icon:Sparkles,
color:"text-amber-400 bg-amber-500/10",
},


];



const actions=[

{
action:"Restock Hair Serum",
status:"Recommended",
},

{
action:"Create Customer Loyalty Program",
status:"Suggested",
},

{
action:"Increase Weekend Slots",
status:"Suggested",
},

];




export default function Recommendations(){


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

AI Recommendations

</h1>


<p className="mt-1 text-slate-400">

AI generated actions to improve your business performance.

</p>


</div>









{/* Recommendation Cards */}


<div className="grid gap-5 md:grid-cols-2">


{

recommendations.map((item)=>{


const Icon=item.icon;


return(


<div

key={item.title}

className="rounded-2xl border border-slate-800 bg-slate-900 p-6"

>


<div className="flex justify-between">


<div className={`rounded-xl p-3 ${item.color}`}>

<Icon size={22}/>

</div>



<span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">

{item.priority}

</span>



</div>




<h2 className="mt-5 text-lg font-semibold text-white">

{item.title}

</h2>



<p className="mt-2 text-sm text-slate-400">

{item.description}

</p>



</div>


)


})


}



</div>









{/* Action Plan */}


<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="flex items-center gap-3 mb-5">


<div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">

<CheckCircle size={22}/>

</div>


<h2 className="text-xl font-semibold text-white">

Recommended Action Plan

</h2>


</div>





<div className="space-y-4">


{

actions.map((item,index)=>(


<div

key={index}

className="flex items-center justify-between rounded-xl bg-slate-800 p-4"

>


<div>


<p className="font-medium text-white">

{item.action}

</p>


<p className="text-sm text-slate-400">

AI Recommendation

</p>


</div>




<span className="text-sm text-emerald-400">

{item.status}

</span>



</div>


))


}



</div>


</div>









{/* AI Warning */}



<div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6">


<div className="flex gap-3">


<AlertTriangle className="text-amber-400"/>


<div>


<h2 className="font-semibold text-white">

Important

</h2>


<p className="mt-1 text-sm text-slate-300">

These recommendations are generated from business patterns. Final decisions should be reviewed by the owner.

</p>


</div>


</div>


</div>






</div>

);


}