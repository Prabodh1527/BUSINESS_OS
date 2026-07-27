import { useNavigate } from "react-router-dom";
import { useState } from "react";


const industries = [

"Salon & Beauty",
"Clinic & Healthcare",
"Dental Clinic",
"Hospital",
"Restaurant",
"Cafe & Bakery",
"Hotel & Hospitality",
"Retail Store",
"Supermarket",
"Fashion & Apparel",
"Jewellery Store",
"Electronics Store",
"Real Estate",
"Construction",
"Interior Design",
"Architecture Firm",
"Education & Training",
"Coaching Institute",
"Consulting",
"Finance & Accounting",
"Legal Services",
"Marketing Agency",
"IT Services",
"Software Company",
"Manufacturing",
"Wholesale Distribution",
"Automobile Services",
"Gym & Fitness Center",
"Travel & Tourism",
"Event Management",
"Logistics & Transportation",
"Agriculture",
"Pharmacy",
"Veterinary Services",
"Repair & Maintenance",
"Freelance Services",
"Other"

];



export default function IndustrySelection(){


const navigate = useNavigate();


const [industry,setIndustry] = useState("");

const [otherIndustry,setOtherIndustry] = useState("");





const next = () => {


const selectedIndustry =

industry === "Other"

?

otherIndustry

:

industry;



localStorage.setItem(

"industry",

selectedIndustry

);



navigate("/onboarding/services");


};





return(


<div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">


<div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8">





<h1 className="text-3xl font-bold text-white">

Choose Your Industry

</h1>


<p className="mt-2 text-slate-400">

Select your business type to personalize your Business OS workspace.

</p>







<div className="grid gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3">



{

industries.map((item)=>(


<button


key={item}


onClick={()=>setIndustry(item)}



className={`rounded-xl p-4 text-sm text-white border transition ${
industry===item

?

"border-indigo-500 bg-indigo-500/20"

:

"border-slate-700 bg-slate-800 hover:border-indigo-400"

}`}


>


{item}


</button>



))


}



</div>







{

industry==="Other" &&


<div className="mt-6">


<label className="text-sm text-slate-400">

Mention your industry

</label>


<input


value={otherIndustry}


onChange={(e)=>setOtherIndustry(e.target.value)}


placeholder="Example: Pet Grooming, Photography Studio"


className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-indigo-500"


/>


</div>


}







<button


disabled={

!industry ||

(industry==="Other" && !otherIndustry)

}



onClick={next}



className={`mt-8 w-full rounded-xl p-3 font-semibold text-white transition ${
!industry ||

(industry==="Other" && !otherIndustry)

?

"cursor-not-allowed bg-slate-700"

:

"bg-indigo-600 hover:bg-indigo-500"

}`}



>


Continue


</button>






</div>


</div>


);


}