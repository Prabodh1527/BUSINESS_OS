import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function BusinessInfo(){

const navigate=useNavigate();


const [data,setData]=useState({

businessName:"",
ownerName:"",
phone:"",
address:""

});



const update=(e)=>{

setData({

...data,

[e.target.name]:e.target.value

});

};



const next=()=>{

localStorage.setItem(
"businessInfo",
JSON.stringify(data)
);


navigate("/onboarding/industry");

};



return (

<div className="min-h-screen flex items-center justify-center bg-slate-950">


<div className="w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 p-8">


<h1 className="text-3xl font-bold text-white">

Business Information

</h1>



<div className="mt-6 space-y-4">


{
["businessName","ownerName","phone","address"].map(item=>(


<input

key={item}

name={item}

placeholder={item}

value={data[item]}

onChange={update}

className="w-full rounded-xl bg-slate-800 p-3 text-white"

/>


))

}



<button

onClick={next}

className="w-full rounded-xl bg-indigo-600 p-3 text-white"

>

Continue

</button>


</div>


</div>


</div>

);

}