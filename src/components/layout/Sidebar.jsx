import {
  LayoutDashboard,
  GraduationCap,
  ClipboardList,
  BookOpen,
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar() {
  const links = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },

    {
      name: "CGPA Tracker",
      icon: GraduationCap,
      path: "/cgpa",
    },

    {
      name: "Assignments",
      icon: ClipboardList,
      path: "/assignments",
    },

    {
      name: "Study Lab",
      icon: BookOpen,
      path: "/study-lab",
    },
  ];

  return (
    <aside
      className="
      w-64
      h-screen
      bg-slate-900
      text-white
      p-5
      hidden
      md:block
      sticky
      top-0
      "
    >
      <h1
        className="
        text-2xl
        font-bold
        mb-8
        "
      >
        Student Hub
      </h1>

      <div className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              to={link.path}
              className="
              flex
              items-center
              gap-3
              p-3
              rounded-lg
              hover:bg-slate-800
              transition
              "
            >
              <Icon size={20} />

              {link.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;