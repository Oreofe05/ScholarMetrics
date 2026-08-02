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
import logo from "../../assets/logo.png";

function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "CGPA Tracker", icon: GraduationCap, path: "/cgpa" },
    { name: "Assignments", icon: ClipboardList, path: "/assignments" },
    { name: "Study Lab", icon: BookOpen, path: "/study-lab" },

  ];

  return (
    <aside className="w-64 h-screen bg-white text-slate-600 p-6 hidden md:flex flex-col justify-between sticky top-0 border-r border-slate-100">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <logo/>
          
        </div>

        

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

      
    </aside>
  );
}

export default Sidebar;