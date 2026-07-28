import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="ml-64 flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}