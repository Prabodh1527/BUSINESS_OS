import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function ServicesSetup(){

const navigate=useNavigate();


const [services,setServices]=useState([

"Haircut",
"Hair Spa"

]);



const next=()=>{

localStorage.setItem(
"services",
JSON.stringify(services)
);


navigate("/onboarding/complete");

};



return(

<div className="min-h-screen bg-slate-950 flex justify-center items-center">


<div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">


<h1 className="text-3xl text-white font-bold">

Setup Services

</h1>


<p className="text-slate-400 mt-3">

Add your products/services.

</p>



<button

onClick={next}

className="mt-8 bg-indigo-600 rounded-xl px-8 py-3 text-white"

>

Continue

</button>


</div>


</div>

)

}