import React, { useState, useEffect } from "react";
import { User, LogOut, Camera, Check, Loader2 } from "lucide-react";
import dp from "../assets/kalyanprofile.jpg";
import { useNavigate } from "react-router-dom";
import { SettingsSkeleton } from "./PageSkeleton";

export function Settings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Kalyan Nayak",
    role: "Full Stack Web Developer",
    phone: "+91-9392491012",
    email: "badhavathkalyan08@gmail.com",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Profile updated successfully!");
    }, 600);
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="space-y-8 md:space-y-10">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b sm:border-b-0 border-white/30">
        <div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl md:text-4xl text-on-surface">
            Admin Profile & Settings
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-1">
            Manage your personal credentials and account settings.
          </p>
        </div>
        <button
          onClick={handleLogout}
          type="button"
          className="bg-error-container/80 text-on-error-container hover:bg-error-container font-label-sm text-xs font-bold px-5 py-2.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-sm whitespace-nowrap self-start sm:self-auto flex-shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Profile Edit Card */}
        <div className="lg:col-span-8">
          <div className="glass-card ultra-rounded p-5 sm:p-8 inner-glow">
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-on-surface mb-6">
              My Profile
            </h2>
            <form onSubmit={handleSave} className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-white/40 text-center sm:text-left">
                <div className="relative group flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                    <img
                      src={dp}
                      alt="Profile Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80";
                      }}
                    />
                  </div>
                  <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <input type="file" className="hidden" accept="image/*" />
                    <Camera className="w-4 h-4" />
                  </label>
                </div>
                <div>
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface">
                    {profileData.name}
                  </h3>
                  <p className="text-xs text-secondary font-semibold uppercase tracking-wider mt-0.5">
                    {profileData.role}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={profileData.role}
                    onChange={(e) =>
                      setProfileData({ ...profileData, role: e.target.value })
                    }
                    className="w-full bg-white/50 border border-white/70 rounded-2xl px-5 py-3.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="w-full bg-white/50 border border-white/70 rounded-2xl px-5 py-3.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs font-semibold text-on-surface-variant ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="w-full bg-white/50 border border-white/70 rounded-2xl px-5 py-3.5 text-sm text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto liquid-glass-btn-primary text-white font-label-sm text-xs font-bold px-8 py-3.5 rounded-full shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Saving Profile...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Save Profile</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>


        {/* Account Info Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card ultra-rounded p-5 sm:p-6 inner-glow space-y-4">
            <h3 className="font-headline text-lg font-bold text-on-surface">
              Account Overview
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white/40 border border-white/60">
                <p className="text-outline uppercase text-[10px] font-bold">Status</p>
                <p className="font-semibold text-primary mt-0.5">Active Administrator</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/40 border border-white/60">
                <p className="text-outline uppercase text-[10px] font-bold">Primary Email</p>
                <p className="font-semibold text-on-surface truncate mt-0.5">{profileData.email}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/40 border border-white/60">
                <p className="text-outline uppercase text-[10px] font-bold">Security</p>
                <p className="font-semibold text-on-surface mt-0.5">Kalyan Portfolio Security v2.4</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

