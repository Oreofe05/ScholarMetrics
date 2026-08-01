import logo from "../../assets/logo.png";

function Logo() {
  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg bg-white">
        <img
          src={logo}
          alt="ScholarMetrics Logo"
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          ScholarMetrics
        </h1>

        <p className="text-slate-500 text-sm">
          Academic Intelligence
        </p>
      </div>
    </div>
  );
}

export default Logo;