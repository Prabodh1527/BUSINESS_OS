import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Trash2,
  X,
  Save,
  Settings2,
} from "lucide-react";


const initialMasters = [

{
id:1,
type:"Services",
name:"Haircut",
details:"₹800 • 45 mins",
},


{
id:2,
type:"Services",
name:"Hair Spa",
details:"₹1500 • 90 mins",
},


{
id:3,
type:"Product Category",
name:"Hair Care",
details:"Inventory Category",
},


{
id:4,
type:"Payment Method",
name:"UPI",
details:"Billing Method",
},


{
id:5,
type:"Appointment Status",
name:"Completed",
details:"Booking Status",
},


{
id:6,
type:"Leave Type",
name:"Sick Leave",
details:"Employee Leave",
},


];




const masterTypes=[

"All",
"Services",
"Product Category",
"Employee Role",
"Payment Method",
"Appointment Status",
"Leave Type",
"Tax",

];






function Masters(){


const [masters,setMasters]=useState(initialMasters);


const [search,setSearch]=useState("");

const [filter,setFilter]=useState("All");


const [showForm,setShowForm]=useState(false);



const [form,setForm]=useState({

type:"Services",
name:"",
details:"",

});






const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const addMaster=(e)=>{


e.preventDefault();


setMasters([

...masters,

{
id:Date.now(),
...form
}

]);


setForm({

type:"Services",
name:"",
details:"",

});


setShowForm(false);


};








const deleteMaster=(id)=>{


setMasters(

masters.filter(

(item)=>item.id!==id

)

);


};








const filteredMasters=masters.filter((item)=>{


const searchMatch=

item.name

.toLowerCase()

.includes(search.toLowerCase());



const typeMatch=

filter==="All"

||

item.type===filter;



return searchMatch && typeMatch;


});







return(

<div className="space-y-6">





{/* Header */}

<div className="flex items-center justify-between">


<div>


<Link

to="/settings"

className="mb-3 block text-sm text-slate-400 hover:text-white"

>

← Back to Settings

</Link>




<h1 className="text-3xl font-bold text-white">

Masters

</h1>



<p className="mt-1 text-slate-400">

Manage business configuration data used across modules.

</p>


</div>







<button

onClick={()=>setShowForm(true)}

className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"

>


<Plus size={18}/>

Add Master

</button>



</div>









{/* Add Form */}


{

showForm &&

<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="mb-5 flex justify-between">


<h2 className="text-xl font-semibold text-white">

Add Master Entry

</h2>


<button

onClick={()=>setShowForm(false)}

>

<X/>

</button>


</div>






<form

onSubmit={addMaster}

className="grid gap-4 md:grid-cols-2"

>




<select

name="type"

value={form.type}

onChange={handleChange}

className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

>


{

masterTypes

.slice(1)

.map((item)=>(

<option key={item}>

{item}

</option>

))

}


</select>







<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Master Name"

className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

/>







<input

name="details"

value={form.details}

onChange={handleChange}

placeholder="Details"

className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

/>







<button

className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 p-3 text-white"

>

<Save size={18}/>

Save

</button>




</form>


</div>


}









{/* Filters */}

<div className="flex flex-wrap gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4">


<div className="relative flex-1 max-w-md">


<Search

size={18}

className="absolute left-3 top-3 text-slate-500"

/>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search masters..."

className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2 pl-10 text-white"

/>


</div>





{

masterTypes.map((item)=>(


<button

key={item}

onClick={()=>setFilter(item)}

className={`rounded-xl px-4 py-2 text-sm ${
filter===item

?

"bg-indigo-600 text-white"

:

"bg-slate-800 text-slate-300"

}`}

>

{item}

</button>


))

}



</div>









{/* Master Cards */}



<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">



{

filteredMasters.map((item)=>(


<div

key={item.id}

className="rounded-2xl border border-slate-800 bg-slate-900 p-5"

>



<div className="flex items-center justify-between">


<div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

<Settings2 size={22}/>

</div>



<button

onClick={()=>deleteMaster(item.id)}

className="rounded-lg bg-red-500/20 p-2 text-red-400"

>

<Trash2 size={16}/>

</button>


</div>





<h2 className="mt-5 text-lg font-semibold text-white">

{item.name}

</h2>




<p className="mt-2 text-sm text-indigo-400">

{item.type}

</p>




<p className="mt-2 text-sm text-slate-400">

{item.details}

</p>




</div>


))


}



</div>







</div>

);


}
export default Masters;