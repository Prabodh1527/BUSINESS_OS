import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Palette,
  Save,
  Image,
  LayoutDashboard,
} from "lucide-react";


export default function Appearance(){


const [settings,setSettings]=useState({

theme:"Dark",
brandColor:"Indigo",
compact:false,
showAnimations:true,

});


const [saved,setSaved]=useState(false);



const handleChange=(e)=>{

setSettings({

...settings,

[e.target.name]:e.target.value

});

};



const toggle=(key)=>{

setSettings({

...settings,

[key]:!settings[key]

});

};



const saveSettings=()=>{

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

Appearance

</h1>



<p className="mt-1 text-slate-400">

Customize the look and feel of your Business OS workspace.

</p>


</div>









{/* Branding */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="flex items-center gap-3 mb-6">


<div className="rounded-xl bg-indigo-500/10 p-3 text-indigo-400">

<Image size={22}/>

</div>


<div>

<h2 className="text-xl font-semibold text-white">

Branding

</h2>


<p className="text-sm text-slate-400">

Customize your business identity.

</p>


</div>


</div>







<div className="flex items-center gap-5">


<div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-2xl font-bold text-white">

G

</div>



<div>


<h3 className="text-white font-medium">

Glow Studio

</h3>


<p className="text-sm text-slate-400">

Business Logo

</p>



<button className="mt-3 rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-indigo-500">

Change Logo

</button>


</div>


</div>



</div>









{/* Theme Settings */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="flex items-center gap-3 mb-6">


<div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">

<Palette size={22}/>

</div>


<h2 className="text-xl font-semibold text-white">

Theme Preferences

</h2>


</div>





<div className="grid gap-5 md:grid-cols-2">



<div>


<label className="text-sm text-slate-400">

Theme

</label>


<select

name="theme"

value={settings.theme}

onChange={handleChange}

className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

>


<option>

Dark

</option>


<option>

Light

</option>


<option>

System

</option>


</select>


</div>








<div>


<label className="text-sm text-slate-400">

Brand Color

</label>


<select

name="brandColor"

value={settings.brandColor}

onChange={handleChange}

className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"

>


<option>

Indigo

</option>


<option>

Blue

</option>


<option>

Purple

</option>


<option>

Emerald

</option>


</select>


</div>




</div>


</div>









{/* Dashboard Preferences */}



<div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">


<div className="flex items-center gap-3 mb-5">


<div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">

<LayoutDashboard size={22}/>

</div>



<h2 className="text-xl font-semibold text-white">

Dashboard Preferences

</h2>


</div>






<div className="space-y-4">



<div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">


<div>


<p className="text-white font-medium">

Compact Layout

</p>


<p className="text-sm text-slate-400">

Reduce spacing in dashboard cards.

</p>


</div>




<button

onClick={()=>toggle("compact")}

className={`rounded-full px-4 py-2 text-sm ${
settings.compact

?

"bg-indigo-600 text-white"

:

"bg-slate-700 text-slate-300"

}`}

>

{settings.compact ? "ON":"OFF"}

</button>



</div>







<div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">


<div>


<p className="text-white font-medium">

Animations

</p>


<p className="text-sm text-slate-400">

Enable smooth UI transitions.

</p>


</div>




<button

onClick={()=>toggle("showAnimations")}

className={`rounded-full px-4 py-2 text-sm ${
settings.showAnimations

?

"bg-indigo-600 text-white"

:

"bg-slate-700 text-slate-300"

}`}

>

{settings.showAnimations ? "ON":"OFF"}

</button>



</div>



</div>


</div>









{/* Save */}



<button

onClick={saveSettings}

className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-500"

>


<Save size={18}/>

Save Appearance

</button>




{

saved &&

<p className="text-sm text-emerald-400">

Appearance updated successfully

</p>

}



</div>

);


}