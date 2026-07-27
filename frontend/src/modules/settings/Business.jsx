import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Save,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";


export default function Business(){


const [business,setBusiness]=useState({

name:"Glow Studio",
industry:"Salon",
email:"contact@glowstudio.com",
phone:"+91 9876543210",
address:"Chennai, Tamil Nadu",
openTime:"09:00 AM",
closeTime:"09:00 PM",

});


const [saved,setSaved]=useState(false);



const handleChange=(e)=>{

setBusiness({

...business,

[e.target.name]:e.target.value

});

};



const saveBusiness=(e)=>{

e.preventDefault();

setSaved(true);

setTimeout(()=>{

setSaved(false);

},2000);

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

Business Settings

</h1>


<p className="mt-1 text-slate-400">

Manage your business profile and operating details.

</p>


</div>









{/* Business Form */}



<form

onSubmit={saveBusiness}

className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-6"

>



<div className="flex items-center gap-3">


<div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

<Building2 size={22}/>

</div>



<div>

<h2 className="text-xl font-semibold text-white">

Business Profile

</h2>


<p className="text-sm text-slate-400">

Basic information about your business.

</p>


</div>


</div>







<div className="grid gap-5 md:grid-cols-2">



<div>


<label className="text-sm text-slate-400">

Business Name

</label>


<input

name="name"

value={business.name}

onChange={handleChange}

className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-indigo-500"

/>


</div>






<div>


<label className="text-sm text-slate-400">

Industry

</label>


<select

name="industry"

value={business.industry}

onChange={handleChange}

className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

>


<option>Salon</option>

<option>Clinic</option>

<option>Restaurant</option>

<option>Retail</option>

<option>Construction</option>


</select>


</div>







<div>


<label className="flex items-center gap-2 text-sm text-slate-400">

<Mail size={15}/>

Email

</label>


<input

name="email"

value={business.email}

onChange={handleChange}

className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

/>


</div>







<div>


<label className="flex items-center gap-2 text-sm text-slate-400">

<Phone size={15}/>

Phone

</label>


<input

name="phone"

value={business.phone}

onChange={handleChange}

className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

/>


</div>







<div className="md:col-span-2">


<label className="flex items-center gap-2 text-sm text-slate-400">

<MapPin size={15}/>

Address

</label>


<textarea

name="address"

value={business.address}

onChange={handleChange}

rows="3"

className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

/>


</div>



</div>










{/* Working Hours */}



<div className="border-t border-slate-800 pt-6">


<div className="flex items-center gap-3 mb-5">


<div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">

<Clock size={20}/>

</div>


<h2 className="text-xl font-semibold text-white">

Working Hours

</h2>


</div>




<div className="grid gap-5 md:grid-cols-2">



<div>


<label className="text-sm text-slate-400">

Opening Time

</label>


<input

name="openTime"

value={business.openTime}

onChange={handleChange}

className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

/>


</div>





<div>


<label className="text-sm text-slate-400">

Closing Time

</label>


<input

name="closeTime"

value={business.closeTime}

onChange={handleChange}

className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

/>


</div>



</div>


</div>










{/* Save */}



<div className="flex items-center justify-between border-t border-slate-800 pt-6">


<button

className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-500"

>


<Save size={18}/>

Save Changes

</button>




{

saved &&

<p className="text-sm text-emerald-400">

Changes saved successfully

</p>

}



</div>





</form>





</div>

);


}