import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar"
import MobileBottomNav from "./MobileBottomNav";

function DashboardLayout() {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col min-h-screen">

        <Navbar />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>

        <MobileBottomNav />

      </div>

    </div>
  );
}

export default DashboardLayout;