import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import AuthLayout from "@/layouts/AuthLayout";
import { useAuth } from "@/context/AuthContext";

export default function Register() {

  const navigate = useNavigate();
  const { signUp } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "OWNER",
  });


  const handleSubmit = (event) => {

    event.preventDefault();

    signUp({
      ...form,
      role: "OWNER",
    });

    localStorage.setItem(
      "business-os-onboarding",
      "pending"
    );

    navigate("/onboarding", {
      replace: true,
    });

  };


  return (

    <AuthLayout
      title="Create your workspace"
      subtitle="Set up Business OS for your team in just a few steps."
    >


      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >


        <input
          required
          value={form.name}
          onChange={(event)=>
            setForm({
              ...form,
              name:event.target.value
            })
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none focus:border-indigo-500"
          placeholder="Full name"
        />



        <input
          required
          type="email"
          value={form.email}
          onChange={(event)=>
            setForm({
              ...form,
              email:event.target.value
            })
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none focus:border-indigo-500"
          placeholder="Work email"
        />



        <input
          required
          type="password"
          value={form.password}
          onChange={(event)=>
            setForm({
              ...form,
              password:event.target.value
            })
          }
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none focus:border-indigo-500"
          placeholder="Create password"
        />



        {/* Default role - Owner only */}

        <div
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-slate-300"
        >

          Owner

        </div>



        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >

          <Sparkles size={16}/>

          Start onboarding

          <ArrowRight size={16}/>

        </button>


      </form>




      <p className="mt-6 text-sm text-slate-400">

        Already have an account?

        <Link
          to="/login"
          className="ml-1 text-indigo-400 hover:text-indigo-300"
        >
          Sign in
        </Link>

      </p>


    </AuthLayout>

  );

}