import {
  LayoutDashboard,
  GraduationCap,
  ClipboardList,
  BookOpen,
  Plus,
  Settings,
  Smartphone,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "CGPA Tracker", icon: GraduationCap, path: "/cgpa" },
    { name: "Assignments", icon: ClipboardList, path: "/assignments" },
    { name: "Study Lab", icon: BookOpen, path: "/study-lab" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-white text-slate-600 p-6 hidden md:flex flex-col justify-between sticky top-0 border-r border-slate-100">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Student Hub
          </h1>
        </div>

        {/* Call to Action Button */}
        <button className="w-full bg-[#6C2BD9] hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm shadow-purple-200 mb-8">
          <span>Add Course</span>
          <Plus size={18} />
        </button>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? "bg-purple-50 text-purple-600 font-semibold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                <Icon size={20} className={isActive ? "text-purple-600" : "text-slate-400"} />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo Widget */}
      <div className="bg-purple-50/70 rounded-2xl p-4 text-center border border-purple-100">
        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-600">
          <Smartphone size={20} />
        </div>
        <h4 className="font-semibold text-slate-800 text-sm">Get mobile app</h4>
        <p className="text-xs text-slate-400 mt-1">Track on the go</p>
      </div>
    </aside>
  );
}

export default Sidebar;