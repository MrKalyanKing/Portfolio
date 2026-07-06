import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import axios from "axios";
import { LoginSkeleton } from "../PageSkeleton";
import { getErrorMessage, getResponseMessage } from "../../utils/errorMessage";

const LoginPopUp = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    const url = `${baseUrl}/login`;
    try {
      const response = await axios.post(url, data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 600);
      } else {
        toast.error(getResponseMessage(response.data, "Login failed — check your email and password."));
        setIsLoggingIn(false);
      }
    } catch (err) {
      console.error(err);
      toast.error(getErrorMessage(err, "Login failed."));
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#edf0f7] text-[#1a1b1f] flex flex-col items-center justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Background Ambient Glowing Mesh Blobs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[65%] h-[65%] bg-gradient-to-br from-[#005bc1]/30 to-[#8d2ebc]/25 blur-[140px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[55%] h-[55%] bg-gradient-to-tr from-[#8d2ebc]/30 to-[#0070eb]/25 blur-[130px] rounded-full"></div>
        <div className="absolute top-[30%] left-[20%] w-[45%] h-[45%] bg-[#0070eb]/20 blur-[110px] rounded-full"></div>
      </div>

      {/* Top Brand Logo */}
      <div className="pt-6 sm:pt-8 flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0058bc] to-[#8d2ebc] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <span className="font-headline font-bold text-2xl text-[#0058bc] tracking-tight">
          Kalyan Nayak <span className="text-[#8d2ebc] font-semibold text-lg">Admin</span>
        </span>
      </div>

      {/* Centered Glass Card Container */}
      <div className="w-full max-w-md my-auto py-6">
        <div className="liquid-glass-card-solid ultra-rounded p-6 sm:p-10 shadow-2xl space-y-6 sm:space-y-8 inner-glow">
          <div className="text-center space-y-2">
            <h1 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#1a1b1f]">
              Welcome Back
            </h1>
            <p className="font-body-md text-xs sm:text-sm text-[#414755]">
              Secure access to your personal portfolio control panel.
            </p>
          </div>

          <form onSubmit={onLogin} className="space-y-5">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="font-label-sm text-xs font-semibold text-[#414755] ml-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-[#717786] absolute left-4 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={onChangeHandler}
                  placeholder="badhavathkalyan08@gmail.com"
                  className="w-full liquid-glass-input rounded-2xl pl-11 pr-4 py-3.5 text-sm text-[#1a1b1f] placeholder:text-[#717786]/60 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="font-label-sm text-xs font-semibold text-[#414755]">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs font-semibold text-[#0058bc] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-[#717786] absolute left-4 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={onChangeHandler}
                  placeholder="••••••••"
                  className="w-full liquid-glass-input rounded-2xl pl-11 pr-11 py-3.5 text-sm text-[#1a1b1f] placeholder:text-[#717786]/60 outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-[#717786] hover:text-[#1a1b1f] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full liquid-glass-btn-primary text-white font-headline font-bold py-3.5 sm:py-4 rounded-full shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>


      {/* Footer Branding */}
      <footer className="pb-4 text-center">
        <p className="text-[10px] sm:text-[11px] font-label-xs font-semibold text-[#717786] tracking-widest uppercase">
          KALYAN NAYAK PORTFOLIO MANAGEMENT SYSTEM • V2.4
        </p>
      </footer>

    </div>
  );
};

export default LoginPopUp;


