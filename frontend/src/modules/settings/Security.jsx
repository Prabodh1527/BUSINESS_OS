import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Smartphone,
  Monitor,
  Save,
  CheckCircle,
} from "lucide-react";


const sessions = [

{
device:"Windows Chrome",
location:"Chennai, India",
time:"Active now",
icon:Monitor,
},


{
device:"Android Mobile",
location:"Chennai, India",
time:"2 hours ago",
icon:Smartphone,
},


];



const activities=[

{
action:"Successful login",
time:"Today, 10:30 AM",
},


{
action:"Password updated",
time:"12 July 2026",
},


{
action:"New device connected",
time:"5 July 2026",
},


];



export default function Security(){


const [twoFactor,setTwoFactor]=useState(false);

const [saved,setSaved]=useState(false);


const [password,setPassword]=useState({

current:"",
new:"",
confirm:"",

});



const handleChange=(e)=>{

setPassword({

...password,

[e.target.name]:e.target.value

});

};




const saveSecurity=(e)=>{

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

Security

</h1>


<p className="mt-1 text-slate-400">

Protect your Business OS account and manage security preferences.

</p>


</div>









{/* Password */}



<form

onSubmit={saveSecurity}

className="rounded-2xl border border-slate-800 bg-slate-900 p-6"

>


<div className="flex items-center gap-3 mb-6">


<div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

<Lock size={22}/>

</div>


<h2 className="text-xl font-semibold text-white">

Change Password

</h2>


</div>





<div className="grid gap-5 md:grid-cols-3">



<input

type="password"

name="current"

value={password.current}

onChange={handleChange}

placeholder="Current Password"

className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

/>





<input

type="password"

name="new"

value={password.new}

onChange={handleChange}

placeholder="New Password"

className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

/>





<input

type="password"

name="confirm"

value={password.confirm}

onChange={handleChange}

placeholder="Confirm Password"

className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

/>



</div>






<button

className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white"

>

<Save size={18}/>

Update Password

</button>



{

saved &&

<p className="mt-3 text-sm text-emerald-400">

Security settings updated successfully

</p>

}



</form>









{/* Two Factor */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="flex items-center justify-between">


<div className="flex items-center gap-3">


<div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">

<ShieldCheck size={22}/>

</div>



<div>


<h2 className="text-xl font-semibold text-white">

Two Factor Authentication

</h2>


<p className="text-sm text-slate-400">

Add an extra layer of account security.

</p>


</div>


</div>






<button

onClick={()=>setTwoFactor(!twoFactor)}

className={`rounded-full px-5 py-2 text-sm ${
twoFactor

?

"bg-emerald-500 text-white"

:

"bg-slate-700 text-slate-300"

}`}

>

{

twoFactor

?

"Enabled"

:

"Disabled"

}

</button>



</div>


</div>









{/* Sessions */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<h2 className="mb-5 text-xl font-semibold text-white">

Active Sessions

</h2>



<div className="space-y-4">


{

sessions.map((session)=>

{

const Icon=session.icon;


return(

<div

key={session.device}

className="flex items-center justify-between rounded-xl bg-slate-800 p-4"

>


<div className="flex items-center gap-3">


<div className="rounded-xl bg-slate-700 p-3 text-indigo-400">

<Icon size={20}/>

</div>


<div>

<p className="text-white font-medium">

{session.device}

</p>


<p className="text-sm text-slate-400">

{session.location}

</p>


</div>


</div>



<p className="text-sm text-emerald-400">

{session.time}

</p>



</div>

)

}

)

}



</div>


</div>









{/* Activity */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<h2 className="mb-5 text-xl font-semibold text-white">

Login Activity

</h2>



<div className="space-y-3">


{

activities.map((item)=>(


<div

key={item.action}

className="flex items-center justify-between rounded-xl bg-slate-800 p-4"

>


<div className="flex items-center gap-3">


<CheckCircle

size={18}

className="text-emerald-400"

/>


<p className="text-white">

{item.action}

</p>


</div>



<p className="text-sm text-slate-400">

{item.time}

</p>



</div>


))


}



</div>


</div>





</div>

);


}