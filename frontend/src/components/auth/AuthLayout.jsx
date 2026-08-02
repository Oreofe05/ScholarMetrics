import Logo from "./Logo";
import illustration from "../../assets/illustration.jpg";

function AuthLayout({ title, children, isSignUp = false }) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 antialiased">

      {/* ================= TOP NAVBAR ================= */}
      <header className="w-full border-b border-slate-200 px-8 py-4 flex items-center justify-between bg-white z-10">

        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex items-center space-x-6 text-sm text-slate-600">

          <div>
            {isSignUp ? (
              <>
                Already have an account?{" "}
                <a
                  href="/"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign In
                </a>
              </>
            ) : (
              <>
                New to Scholar Metrics?{" "}
                <a
                  href="/signup"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign Up Free
                </a>
              </>
            )}
          </div>


          <a href="#" className="hover:text-blue-600 transition">
            Support
          </a>


          <div className="flex items-center cursor-pointer hover:text-blue-600">
            <span>English</span>

            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>

          </div>

        </div>

      </header>



      {/* ================= MAIN SPLIT CONTENT ================= */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[45%_55%]">

        {/* ================= LEFT IMAGE PANEL ================= */}
            <div className="hidden lg:flex items-center justify-center bg-[#F7F9FA] border-r border-slate-200 p-8 overflow-hidden">

            <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm">
                <img
                src={illustration}
                alt="Scholar Metrics Illustration"
                className="w-full h-full object-cover object-center"
                />
            </div>

            </div>



        {/* ================= RIGHT FORM PANEL ================= */}
        <div className="flex justify-center items-center p-8 lg:p-16 bg-white">


          <div className="w-full max-w-[420px]">


            <h1 className="text-3xl font-semibold text-center text-slate-900 mb-8">
              {title}
            </h1>


            {children}


          </div>


        </div>


      </div>


    </div>
  );
}


export default AuthLayout;