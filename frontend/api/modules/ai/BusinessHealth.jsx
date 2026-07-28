import { Link } from "react-router-dom";
import {
  Activity,
  IndianRupee,
  Users,
  Package,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";


const healthData = [

{
title:"Revenue Health",
score:"90%",
icon:IndianRupee,
color:"text-emerald-400",
description:"Revenue growth is strong compared to previous months."
},


{
title:"Customer Health",
score:"85%",
icon:Users,
color:"text-indigo-400",
description:"Customer retention and repeat bookings are performing well."
},


{
title:"Inventory Health",
score:"75%",
icon:Package,
color:"text-amber-400",
description:"Some products require restocking."
},


{
title:"Appointment Health",
score:"92%",
icon:CalendarCheck,
color:"text-sky-400",
description:"Appointment completion rate is excellent."
},


];



export default function BusinessHealth(){


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

Business Health Score

</h1>


<p className="mt-1 text-slate-400">

AI generated overview of your business performance.

</p>


</div>









{/* Main Score */}


<div className="rounded-3xl border border-indigo-500/30 bg-indigo-500/10 p-8">


<div className="flex items-center gap-4">


<div className="rounded-2xl bg-indigo-600 p-4 text-white">

<Activity size={30}/>

</div>



<div>

<p className="text-slate-300">

Overall Business Health

</p>


<h2 className="text-5xl font-bold text-white">

86/100

</h2>


</div>


</div>



<p className="mt-5 text-slate-300">

Your business is performing well. Focus areas include inventory optimization and improving customer retention.

</p>


</div>









{/* Health Cards */}


<div className="grid gap-5 md:grid-cols-2">



{

healthData.map((item)=>{


const Icon=item.icon;


return(


<div

key={item.title}

className="rounded-2xl border border-slate-800 bg-slate-900 p-6"

>


<div className="flex justify-between">


<div className={`rounded-xl bg-slate-800 p-3 ${item.color}`}>

<Icon size={22}/>

</div>


<h3 className="text-2xl font-bold text-white">

{item.score}

</h3>


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









{/* Growth Trend */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="flex items-center gap-3">


<TrendingUp className="text-emerald-400"/>


<h2 className="text-xl font-semibold text-white">

AI Health Analysis

</h2>


</div>




<div className="mt-5 grid gap-4 md:grid-cols-3">


<div className="rounded-xl bg-slate-800 p-4">

<p className="text-sm text-slate-400">

Current Trend

</p>

<p className="mt-2 text-white">

Positive Growth

</p>


</div>



<div className="rounded-xl bg-slate-800 p-4">

<p className="text-sm text-slate-400">

Risk Level

</p>

<p className="mt-2 text-white">

Low

</p>


</div>




<div className="rounded-xl bg-slate-800 p-4">

<p className="text-sm text-slate-400">

Next Action

</p>

<p className="mt-2 text-white">

Optimize Inventory

</p>


</div>


</div>


</div>





</div>


);


}