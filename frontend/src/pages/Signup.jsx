import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const result = await register(formData);

      // If your backend returns a token and user on registration
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
      }

      navigate("/profile-setup");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  ;

  const handleGoogleSignup = () => {
    navigate("/profile-setup");
  };
}
  return (
  <AuthLayout title="Sign Up Free" isSignUp={true}>
    <form onSubmit={handleSubmit} className="space-y-4">

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-600 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      {/* Full Name */}
      <div>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition text-sm"
          required
        />
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Work or Student Email Address"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition text-sm"
          required
        />
      </div>

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create Password (8+ characters)"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition text-sm pr-10"
          required
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl text-sm transition shadow-sm mt-2"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* Terms */}
      <p className="text-xs text-slate-500 text-left pt-2 leading-relaxed">
        By clicking "Create Account", I agree to the{" "}
        <a href="#" className="text-blue-600 font-medium hover:underline">
          Scholar Metrics Terms of Service
        </a>{" "}
        and acknowledge the{" "}
        <a href="#" className="text-blue-600 font-medium hover:underline">
          Privacy Statement
        </a>.
      </p>

      {/* Divider */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>

        <span className="relative bg-white px-3 text-xs text-slate-400">
          Or sign up with
        </span>
      </div>

      {/* Social Buttons */}
      
        {/* Google */}
        
      <div className="flex justify-center">
          <button
            type="button"
            onClick={() => alert("Google Sign-In coming soon")}
            className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200"
          >
            G
          </button>
        </div>
      {/* Footer */}
      <p className="text-[11px] text-slate-400 text-center pt-8 leading-normal">
        Scholar Metrics is protected by reCAPTCHA and the{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Terms of Service
        </a>{" "}
        apply.
      </p>

    </form>
  </AuthLayout>
);
}



export default Signup;