import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import GoogleButton from "../components/auth/GoogleButton";
import Logo from "../components/auth/Logo";
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = () => {
    navigate("/Dashboard");
  };

  return (
        <AuthLayout title="Sign In" isSignUp={false}>
      

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        
        {/* Email Input */}
        <div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition text-sm"
            required
          />
        </div>

        {/* Password Input with Visibility Toggle */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition text-sm pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <div className="flex items-center justify-between text-xs text-blue-600 font-medium pt-1">
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
          <a href="#" className="flex items-center hover:underline">
            Help
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition shadow-sm mt-2"
        >
          Sign In
        </button>

        {/* Terms */}
        <p className="text-xs text-slate-500 text-left pt-2 leading-relaxed">
          By signing in, I agree to the{" "}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Scholar Metrics Privacy Statement
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Terms of Service
          </a>
          .
        </p>

        {/* Stay signed in checkbox */}
        <div className="flex items-center space-x-2 pt-1">
          <input
            type="checkbox"
            id="stay-signed-in"
            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="stay-signed-in" className="text-xs text-slate-600 flex items-center">
            Stay signed in
            <svg className="w-3.5 h-3.5 ml-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </label>
        </div>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <span className="relative bg-white px-3 text-xs text-slate-400">
            Or sign in with
          </span>
        </div>

        
          {/* Google Button */}
          <div className="flex flex-col items-center">
            <button 
              onClick={handleGoogleLogin} 
              className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition mb-1"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </button>
            <span className="text-xs text-slate-600">Google</span>
          </div>

          
        {/* Footer Notice */}
        <p className="text-[11px] text-slate-400 text-center pt-8 leading-normal">
          Scholar Metrics is protected by reCAPTCHA and the{" "}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{" "}
          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> apply.
        </p>

      </form>
    </AuthLayout>
  );
}

export default Login;

