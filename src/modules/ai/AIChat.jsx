import { Link } from "react-router-dom";
import {
  Send,
  Bot,
  User,
} from "lucide-react";


const messages = [

{
type:"ai",
text:"Hello! I am your AI Business Analyst. Ask me anything about your business."
},


{
type:"user",
text:"Why did my revenue increase this month?"
},


{
type:"ai",
text:"Revenue increased by 18% due to higher appointment bookings, repeat customers and better performing services."
},


{
type:"user",
text:"Which area needs improvement?"
},


{
type:"ai",
text:"Inventory optimization is recommended. 18 products are currently running low."
},


];



export default function AIChat(){


return(

<div className="space-y-6">



{/* Header */}

<div>


<Link

to="/ai"

className="mb-3 block text-sm text-slate-400 hover:text-white"

>

← Back to AI Analyst

</Link>



<h1 className="text-3xl font-bold text-white">

AI Business Chat

</h1>


<p className="mt-1 text-slate-400">

Chat with your AI assistant about business decisions.

</p>


</div>









{/* Chat Window */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="space-y-5">



{

messages.map((message,index)=>(


<div

key={index}

className={`flex gap-3 ${
message.type==="user"
?
"justify-end"
:
"justify-start"
}`}

>


{

message.type==="ai"

?

<div className="flex gap-3 max-w-xl">


<div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

<Bot size={20}/>

</div>



<div className="rounded-xl bg-slate-800 p-4 text-slate-200">

{message.text}

</div>



</div>


:


<div className="flex gap-3 max-w-xl">


<div className="rounded-xl bg-slate-800 p-4 text-white">

{message.text}

</div>



<div className="rounded-xl bg-indigo-600 p-3 text-white">

<User size={20}/>

</div>


</div>



}



</div>


))


}



</div>





{/* Input */}


<div className="mt-6 flex gap-3">


<input

placeholder="Ask AI about revenue, customers, employees..."

className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"

/>



<button

className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 text-white hover:bg-indigo-500"

>

<Send size={18}/>

Send

</button>



</div>



</div>





</div>

);


}