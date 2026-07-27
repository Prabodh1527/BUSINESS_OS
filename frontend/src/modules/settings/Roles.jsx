import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Save,
  Check,
} from "lucide-react";


const initialRoles = [

{
name:"Owner",
description:"Complete business control",
permissions:{
customers:true,
appointments:true,
billing:true,
inventory:true,
employees:true,
reports:true,
ai:true,
}
},


{
name:"Manager",
description:"Manage daily operations",
permissions:{
customers:true,
appointments:true,
billing:true,
inventory:true,
employees:true,
reports:true,
ai:false,
}
},


{
name:"Employee",
description:"Limited operational access",
permissions:{
customers:false,
appointments:true,
billing:false,
inventory:false,
employees:false,
reports:false,
ai:false,
}
},


];



const permissionList=[

{
key:"customers",
label:"Customers"
},

{
key:"appointments",
label:"Appointments"
},

{
key:"billing",
label:"Billing"
},

{
key:"inventory",
label:"Inventory"
},

{
key:"employees",
label:"Employees"
},

{
key:"reports",
label:"Reports"
},

{
key:"ai",
label:"AI Assistant"
},

];





export default function Roles(){


const [roles,setRoles]=useState(initialRoles);

const [saved,setSaved]=useState(false);




const togglePermission=(roleIndex,permission)=>{


const updated=[...roles];


updated[roleIndex].permissions[permission]=
!updated[roleIndex].permissions[permission];


setRoles(updated);


};





const saveChanges=()=>{

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

Roles & Permissions

</h1>


<p className="mt-1 text-slate-400">

Control what each user role can access.

</p>


</div>









{/* Permission Cards */}


<div className="space-y-5">


{

roles.map((role,index)=>(


<div

key={role.name}

className="rounded-2xl border border-slate-800 bg-slate-900 p-6"

>



<div className="flex items-center gap-3 mb-5">


<div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

<ShieldCheck size={22}/>

</div>



<div>


<h2 className="text-xl font-semibold text-white">

{role.name}

</h2>



<p className="text-sm text-slate-400">

{role.description}

</p>


</div>


</div>








<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">


{

permissionList.map((permission)=>(


<button

key={permission.key}

onClick={()=>togglePermission(index,permission.key)}

className={`flex items-center justify-between rounded-xl border p-4 transition ${
role.permissions[permission.key]

?

"border-emerald-500/40 bg-emerald-500/10"

:

"border-slate-700 bg-slate-800"

}`}

>


<span className="text-sm text-white">

{permission.label}

</span>




{

role.permissions[permission.key]

&&

<Check

size={17}

className="text-emerald-400"

/>


}



</button>


))


}


</div>





</div>


))


}


</div>









{/* Save */}


<div className="flex items-center gap-4">


<button

onClick={saveChanges}

className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-500"

>


<Save size={18}/>

Save Permissions

</button>



{

saved &&

<p className="text-sm text-emerald-400">

Permissions updated successfully

</p>


}



</div>






</div>


);


}