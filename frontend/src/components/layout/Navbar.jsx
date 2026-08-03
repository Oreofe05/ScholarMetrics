import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, ChevronDown, LogOut, User } from "lucide-react";
import { useApp } from "../../context/AppContext";
// Adjust this path if your AuthContext resides elsewhere
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { studentProfile = {} } = useApp();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    if (logout) logout();
    navigate("/");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    studentProfile.fullName || "Student"
  )}&background=6366f1&color=fff`;

  return (
    <header className="bg-[#F8F9FD] border-b border-slate-200/60 py-3.5 px-4 sm:px-6 md:px-8 flex items-center justify-between sticky top-0 z-30">
      
      {/* Search Input Bar */}
      <div className="relative w-full max-w-xs sm:max-w-md">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search courses, assignments..."
          className="w-full pl-10 pr-4 py-2 bg-white rounded-xl text-sm border border-slate-200/80 shadow-2xs focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-700 placeholder:text-slate-400 transition-all"
        />
      </div>

      {/* Right Navbar Controls */}
      <div className="flex items-center gap-3 sm:gap-5">
        
        {/* Notifications Icon Button */}
        <button 
          className="relative text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 p-2 rounded-xl transition cursor-pointer"
          title="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
        </button>

        {/* User Profile & Dropdown Container */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-200/50 transition cursor-pointer outline-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-slate-200/80 bg-slate-100 shrink-0">
              <img
                src={studentProfile.photo || fallbackAvatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="hidden sm:block text-left leading-tight">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 truncate max-w-[140px]">
                {studentProfile.fullName || "Student"}
              </h3>
              <p className="text-[11px] font-medium text-slate-400 truncate max-w-[140px]">
                {studentProfile.department || "Department"}
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform duration-200 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Interactive Profile Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200/80 rounded-2xl shadow-lg p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-100 sm:hidden">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {studentProfile.fullName || "Student"}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {studentProfile.department || "Department"}
                </p>
              </div>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/profile");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition cursor-pointer"
              >
                <User size={15} />
                <span>Profile Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
}

export default Navbar;