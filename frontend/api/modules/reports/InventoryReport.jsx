import { Link } from "react-router-dom";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  Boxes,
  Download,
} from "lucide-react";


const stats = [

{
title:"Total Products",
value:"486",
icon:Package,
color:"bg-indigo-500/10 text-indigo-400",
},


{
title:"Stock Value",
value:"₹9.8L",
icon:TrendingUp,
color:"bg-emerald-500/10 text-emerald-400",
},


{
title:"Low Stock Items",
value:"18",
icon:AlertTriangle,
color:"bg-red-500/10 text-red-400",
},


{
title:"Categories",
value:"24",
icon:Boxes,
color:"bg-sky-500/10 text-sky-400",
},


];




const products=[

{
name:"Premium Shampoo",
category:"Hair Care",
stock:8,
value:"₹36,000",
status:"Low Stock",
},


{
name:"Hair Serum",
category:"Hair Care",
stock:42,
value:"₹72,000",
status:"In Stock",
},


{
name:"Face Wash",
category:"Skin Care",
stock:31,
value:"₹28,000",
status:"In Stock",
},


{
name:"Body Lotion",
category:"Skin Care",
stock:0,
value:"₹0",
status:"Out of Stock",
},


];




const categories=[

{
name:"Hair Care",
products:120,
value:"₹4.5L",
},


{
name:"Skin Care",
products:95,
value:"₹2.8L",
},


{
name:"Beauty Products",
products:80,
value:"₹1.5L",
},


];





export default function InventoryReport(){


return(

<div className="space-y-6">



{/* Header */}


<div className="flex items-center justify-between">


<div>


<Link

to="/reports"

className="mb-3 block text-sm text-slate-400 hover:text-white"

>

← Back to Reports

</Link>



<h1 className="text-3xl font-bold text-white">

Inventory Report

</h1>



<p className="mt-1 text-slate-400">

Analyze stock levels, valuation and product movement.

</p>


</div>





<button

onClick={()=>alert("Inventory report exported")}

className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white"

>

<Download size={17}/>

Export

</button>


</div>









{/* Stats */}



<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">


{

stats.map((item)=>{


const Icon=item.icon;


return(


<div

key={item.title}

className="rounded-2xl border border-slate-800 bg-slate-900 p-5"

>


<div className={`inline-flex rounded-xl p-3 ${item.color}`}>

<Icon size={20}/>

</div>




<h2 className="mt-5 text-2xl font-bold text-white">

{item.value}

</h2>




<p className="text-sm text-slate-400">

{item.title}

</p>



</div>


)


})

}



</div>









{/* Product Stock Table */}



<div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">


<h2 className="p-6 text-xl font-semibold text-white">

Product Stock Analysis

</h2>




<table className="w-full">


<thead className="border-y border-slate-800 bg-slate-800/40">


<tr className="text-left text-sm text-slate-400">


<th className="p-4">
Product
</th>


<th>
Category
</th>


<th>
Stock
</th>


<th>
Value
</th>


<th>
Status
</th>


</tr>


</thead>





<tbody>


{

products.map((product)=>(


<tr

key={product.name}

className="border-b border-slate-800 hover:bg-slate-800/30"

>


<td className="p-4 font-medium text-white">

{product.name}

</td>



<td>

{product.category}

</td>



<td>

{product.stock}

</td>




<td className="text-emerald-400">

{product.value}

</td>





<td>


<span

className={`rounded-full px-3 py-1 text-xs ${
product.status==="In Stock"

?

"bg-emerald-500/10 text-emerald-400"

:

product.status==="Low Stock"

?

"bg-amber-500/10 text-amber-400"

:

"bg-red-500/10 text-red-400"

}`}

>

{product.status}

</span>


</td>



</tr>


))


}



</tbody>


</table>


</div>









{/* Category Analysis */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<h2 className="mb-5 text-xl font-semibold text-white">

Category Analysis

</h2>




<div className="grid gap-4 md:grid-cols-3">


{

categories.map((category)=>(


<div

key={category.name}

className="rounded-xl bg-slate-800 p-4"

>


<p className="font-medium text-white">

{category.name}

</p>



<p className="mt-2 text-sm text-slate-400">

{category.products} products

</p>



<p className="mt-2 font-semibold text-emerald-400">

{category.value}

</p>



</div>


))


}



</div>


</div>









{/* AI Inventory Insight */}



<div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-6">


<h2 className="text-xl font-semibold text-white">

Inventory Insights

</h2>



<p className="mt-2 text-slate-300">

AI will predict stock requirements and recommend restocking.

</p>



<div className="mt-4 grid gap-4 md:grid-cols-3">


<div className="rounded-xl bg-slate-900 p-4">

<p className="text-sm text-slate-400">

Alert

</p>

<p className="mt-2 text-white">

18 products need restocking.

</p>

</div>




<div className="rounded-xl bg-slate-900 p-4">

<p className="text-sm text-slate-400">

Best Category

</p>

<p className="mt-2 text-white">

Hair Care

</p>

</div>




<div className="rounded-xl bg-slate-900 p-4">

<p className="text-sm text-slate-400">

Stock Health

</p>

<p className="mt-2 text-white">

Good

</p>

</div>



</div>


</div>





</div>

);


}