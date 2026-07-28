export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent_45%),linear-gradient(140deg,_#020617,_#0f172a)] px-4 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-8 lg:flex-row">
        <div className="max-w-xl rounded-3xl border border-slate-800/80 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl lg:w-[420px]">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">Business OS</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
          </div>
          {children}
        </div>

        <div className="hidden max-w-xl flex-1 rounded-3xl border border-indigo-500/20 bg-slate-900/50 p-8 lg:block">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-400">Unified operations</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">One AI-powered operating system for modern teams.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Coordinate customers, appointments, billing, inventory, staff, and smart insights from a single elegant workspace.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Customer CRM",
              "Automated billing",
              "Live inventory",
              "AI analyst",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
