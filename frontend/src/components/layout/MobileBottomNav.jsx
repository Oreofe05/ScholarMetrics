import {
  LayoutDashboard,
  GraduationCap,
  ClipboardList,
  BookOpen,
} from "lucide-react";

import { Link } from "react-router-dom";

function MobileBottomNav() {
  const links = [
    {
      name: "Home",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      name: "CGPA",
      icon: GraduationCap,
      path: "/cgpa",
    },
    {
      name: "Assignment",
      icon: ClipboardList,
      path: "/assignments",
    },
    {
      name: "StudyLab",
      icon: BookOpen,
      path: "/study-lab",
    },
  ];

  return (
    <div
      className="
        md:hidden
        fixed
        bottom-0
        left-0
        right-0
        bg-slate-900
        text-white
        flex
        justify-around
        py-3
        shadow-lg
        z-50
      "
    >
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <Link
            key={link.name}
            to={link.path}
            className="flex flex-col items-center"
          >
            <Icon size={20} />
            <span className="text-xs">
              {link.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default MobileBottomNav;