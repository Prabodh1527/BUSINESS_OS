import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";


export default function Welcome(){

const navigate = useNavigate();


return (

<div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">

<div className="max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">


<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">

<Sparkles size={40}/>

</div>


<h1 className="mt-8 text-4xl font-bold text-white">

Welcome to Business OS

</h1>


<p className="mt-4 text-slate-400">

Your AI powered operating system to manage customers,
employees, billing, inventory and business growth.

</p>



<button

onClick={()=>navigate("/onboarding/business")}

className="mt-8 flex mx-auto items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 text-white"

>

Start Setup

<ArrowRight size={18}/>

</button>


</div>

</div>

);

}