import { useState } from "react";
import { Save, UserCircle2 } from "lucide-react";
import { employeeProfile } from "./data/mockData";

export default function EmployeeProfile() {
  const [profile, setProfile] = useState(employeeProfile);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <p className="mt-1 text-sm text-slate-400">Manage your personal information and keep your employee profile up to date.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-indigo-500/10 p-3 text-indigo-400">
            <UserCircle2 size={28} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{profile.name}</h2>
            <p className="text-sm text-slate-400">{profile.role}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-slate-400">Full Name</label>
            <input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-sm text-slate-400">Email</label>
            <input value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-sm text-slate-400">Phone</label>
            <input value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="text-sm text-slate-400">Role</label>
            <input value={profile.role} disabled className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-slate-500 outline-none" />
          </div>
          <div>
            <label className="text-sm text-slate-400">Joining Date</label>
            <input value={profile.joiningDate} disabled className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-slate-500 outline-none" />
          </div>
          <div>
            <label className="text-sm text-slate-400">Skills</label>
            <input value={profile.skills.join(", ")} onChange={(event) => setProfile({ ...profile, skills: event.target.value.split(",") })} className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-sm text-white outline-none focus:border-indigo-500" />
          </div>
        </div>

        <button onClick={handleSave} className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">
          <Save size={16} />
          {saved ? "Saved" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
