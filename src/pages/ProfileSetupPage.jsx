import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Camera, 
  User, 
  GraduationCap, 
  Building2, 
  Layers, 
  SlidersHorizontal,
  ArrowRight,
  Plus
} from "lucide-react";
import Logo from "../components/auth/Logo"; 
import { useApp } from "../context/AppContext";

function ProfileSetupPage() {
  const navigate = useNavigate();
  const { studentProfile, setStudentProfile } = useApp();

  const [form, setForm] = useState({
    fullName: "",
    university: "",
    department: "",
    level: "",
    cgpaScale: 5,
    photo: null,
    ...studentProfile,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (error) setError(""); // Clear error on change
    setForm((prev) => ({
      ...prev,
      [name]: name === "cgpaScale" ? Number(value) : value,
    }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = (e) => {
    e.preventDefault();

    if (
      !form.fullName.trim() ||
      !form.university.trim() ||
      !form.department.trim() ||
      !form.level
    ) {
      setError("Please fill in all required academic details.");
      return;
    }

    setStudentProfile(form);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs w-full max-w-xl p-6 sm:p-10">
        
        {/* Header Section */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-1">
            <Logo/>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome to StudentHub 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xs mx-auto">
            Set up your academic profile to customize your GPA tracking and course dashboard.
          </p>
        </div>

        {/* Validation Error Banner */}
        {error && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={saveProfile} className="space-y-6">
          
          {/* Profile Photo Uploader */}
          <div className="flex flex-col items-center justify-center">
            <label className="relative group cursor-pointer">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 group-hover:border-indigo-500 flex items-center justify-center transition-all shadow-2xs">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <Camera size={28} />
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Upload</span>
                  </div>
                )}
              </div>

              {/* Badge Overlay */}
              <div className="absolute bottom-0 right-0 p-2 bg-indigo-600 group-hover:bg-indigo-700 text-white rounded-full shadow-xs transition-colors border-2 border-white">
                <Plus size={14} />
              </div>

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhoto}
              />
            </label>
            <span className="text-[11px] text-slate-400 mt-2 font-medium">
              Click photo to select profile image
            </span>
          </div>

          {/* Form Fields Container */}
          <div className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <User size={14} className="text-slate-400" />
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="e.g. Alex Johnson"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>

            {/* University */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Building2 size={14} className="text-slate-400" />
                University / Institution
              </label>
              <input
                type="text"
                name="university"
                value={form.university}
                onChange={handleChange}
                placeholder="e.g. University of Lagos"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <GraduationCap size={14} className="text-slate-400" />
                Department / Program
              </label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              />
            </div>

            {/* Grid layout for Level & Scale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Level Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Layers size={14} className="text-slate-400" />
                  Academic Level
                </label>
                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-pointer"
                >
                  <option value="">Select Level</option>
                  <option value="100">100 Level</option>
                  <option value="200">200 Level</option>
                  <option value="300">300 Level</option>
                  <option value="400">400 Level</option>
                  <option value="500">500 Level</option>
                </select>
              </div>

              {/* CGPA Scale Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <SlidersHorizontal size={14} className="text-slate-400" />
                  GPA System
                </label>
                <select
                  name="cgpaScale"
                  value={form.cgpaScale}
                  onChange={handleChange}
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-pointer"
                >
                  <option value={5}>5.0 Point Scale</option>
                  <option value={4}>4.0 Point Scale</option>
                </select>
              </div>

            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl px-4 py-3 text-sm shadow-xs transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight size={16} />
          </button>

        </form>

      </div>
    </div>
  );
}

export default ProfileSetupPage;