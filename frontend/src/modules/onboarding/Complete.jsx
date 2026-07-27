import {useNavigate} from "react-router-dom";
import {CheckCircle} from "lucide-react";


export default function Complete(){


const navigate=useNavigate();


return(

<div className="min-h-screen flex items-center justify-center bg-slate-950">


<div className="text-center bg-slate-900 p-10 rounded-3xl">


<CheckCircle

size={60}

className="mx-auto text-emerald-400"

/>


<h1 className="text-3xl text-white font-bold mt-6">

Your Business OS is Ready 🎉

</h1>


<button

onClick={()=>{

localStorage.setItem(
"onboardingCompleted",
"true"
);

localStorage.setItem(
"isAuthenticated",
"true"
);

navigate("/");

}}

className="mt-8 bg-indigo-600 px-8 py-3 rounded-xl text-white"

>
Go Dashboard
</button>


</div>


</div>

)

}