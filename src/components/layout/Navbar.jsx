import { Search, Bell, ChevronDown } from "lucide-react";
import { useApp } from "../../context/AppContext";

function Navbar() {

  const { studentProfile } = useApp();

  return (
    <header className="bg-[#F8F9FD] py-4 px-6 md:px-8 flex items-center justify-between">

      {/* Search Bar */}

      <div className="relative w-full max-w-md">

        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-white rounded-xl text-sm border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-600 placeholder:text-slate-400"
        />

      </div>

      {/* User */}

      <div className="flex items-center gap-5">

        <button className="relative text-slate-400 hover:text-slate-600 transition">

          <Bell size={20} />

          <span className="absolute top-0 right-0 w-2 h-2 bg-purple-600 rounded-full" />

        </button>

        <div className="flex items-center gap-3 cursor-pointer">

          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-200">

            <img
              src={
                studentProfile.photo ||
                "https://ui-avatars.com/api/?name=Student"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />

          </div>

          <div className="hidden sm:block">

            <h3 className="text-sm font-semibold text-slate-700">

              {studentProfile.fullName || "Student"}

            </h3>

            <p className="text-xs text-slate-400">

              {studentProfile.department || "Department"}

            </p>

          </div>

          

        </div>

      </div>

    </header>
  );

}

export default Navbar;