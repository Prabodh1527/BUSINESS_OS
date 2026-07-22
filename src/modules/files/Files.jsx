import { useState } from "react";
import {
  FileText,
  Upload,
  Search,
  Download,
  Trash2,
  Eye,
  Folder,
} from "lucide-react";


const initialFiles = [

{
id:1,
name:"Invoice_July_2026.pdf",
category:"Invoices",
type:"PDF",
size:"245 KB",
date:"22 July 2026",
},


{
id:2,
name:"Rahul_Payslip_July.pdf",
category:"Payslips",
type:"PDF",
size:"180 KB",
date:"21 July 2026",
},


{
id:3,
name:"Customer_Report.xlsx",
category:"Reports",
type:"Excel",
size:"420 KB",
date:"20 July 2026",
},


{
id:4,
name:"Business_License.pdf",
category:"Business Documents",
type:"PDF",
size:"310 KB",
date:"15 July 2026",
},


];



const categories=[

"All",
"Invoices",
"Payslips",
"Reports",
"Employee Documents",
"Business Documents",

];




export default function Files(){


const [files,setFiles]=useState(initialFiles);

const [search,setSearch]=useState("");

const [category,setCategory]=useState("All");

const [showUpload,setShowUpload]=useState(false);



const [form,setForm]=useState({

name:"",
category:"Invoices",
type:"PDF",
size:"100 KB",

});




const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};





const uploadFile=(e)=>{

e.preventDefault();


setFiles([

...files,

{
...form,
id:Date.now(),
date:"22 July 2026",
}

]);


setForm({

name:"",
category:"Invoices",
type:"PDF",
size:"100 KB",

});


setShowUpload(false);

};






const deleteFile=(id)=>{


setFiles(

files.filter(

(file)=>file.id!==id

)

);


};






const filteredFiles=files.filter((file)=>{


const matchesSearch=file.name
.toLowerCase()
.includes(search.toLowerCase());


const matchesCategory=

category==="All" ||

file.category===category;


return matchesSearch && matchesCategory;


});






return(

<div className="space-y-6">





{/* Header */}


<div className="flex items-center justify-between">


<div>


<h1 className="text-3xl font-bold text-white">

Files

</h1>


<p className="mt-1 text-slate-400">

Manage business documents and files.

</p>


</div>




<button

onClick={()=>setShowUpload(true)}

className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"

>


<Upload size={18}/>

Upload File

</button>



</div>








{/* Upload Form */}


{

showUpload &&

<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<h2 className="mb-5 text-xl font-semibold text-white">

Upload New File

</h2>



<form

onSubmit={uploadFile}

className="grid gap-4 md:grid-cols-2"

>



<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="File Name"

className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

/>





<select

name="category"

value={form.category}

onChange={handleChange}

className="rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

>


{

categories.slice(1).map((item)=>(

<option key={item}>

{item}

</option>

))

}


</select>





<button

className="rounded-xl bg-indigo-600 p-3 text-white"

>

Upload

</button>



</form>


</div>

}









{/* Search + Filter */}



<div className="flex flex-wrap gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-4">



<div className="relative max-w-md flex-1">


<Search

size={18}

className="absolute left-3 top-3 text-slate-500"

/>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search files..."

className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2 pl-10 text-white"

/>


</div>







{

categories.map((item)=>(


<button

key={item}

onClick={()=>setCategory(item)}

className={`rounded-xl px-4 py-2 text-sm ${
category===item

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









{/* Files */}



<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">



{

filteredFiles.map((file)=>(


<div

key={file.id}

className="rounded-2xl border border-slate-800 bg-slate-900 p-5"

>



<div className="flex justify-between">


<div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

<FileText size={22}/>

</div>


<Folder size={20} className="text-slate-500"/>


</div>




<h3 className="mt-5 font-semibold text-white">

{file.name}

</h3>


<p className="mt-2 text-sm text-slate-400">

{file.category}

</p>


<p className="text-xs text-slate-500">

{file.size} • {file.date}

</p>







<div className="mt-5 flex gap-2">


<button

className="rounded-lg border border-slate-700 p-2 hover:border-indigo-500"

>

<Eye size={16}/>

</button>




<button

className="rounded-lg border border-slate-700 p-2 hover:border-indigo-500"

>

<Download size={16}/>

</button>




<button

onClick={()=>deleteFile(file.id)}

className="rounded-lg bg-red-500/20 p-2 text-red-400"

>

<Trash2 size={16}/>

</button>



</div>




</div>


))


}



</div>







</div>

);


}