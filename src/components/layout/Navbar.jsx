import { Search, Bell, ChevronDown } from "lucide-react";

function Navbar() {
  return (
    <header className="bg-[#F8F9FD] py-4 px-6 md:px-8 flex items-center justify-between">
      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 bg-white rounded-xl text-sm border-none shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-600 placeholder:text-slate-400"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-5">
        <button className="relative text-slate-400 hover:text-slate-600 transition">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-purple-600 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-slate-700 hidden sm:inline-block">
            Ore
          </span>
          <ChevronDown size={16} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;