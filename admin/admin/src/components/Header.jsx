import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import dp from "../assets/kalyanprofile.jpg";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Dash", path: "/" },
    { label: "Projects", path: "/projects" },
    { label: "Experience", path: "/experience" },
    { label: "Skills", path: "/skill" },
    { label: "Contacts", path: "/contacts" },
    { label: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/30 backdrop-blur-2xl border-b border-white/60 h-16 flex justify-between items-center px-3 sm:px-6 md:px-8 shadow-sm">
      <div className="flex items-center gap-3 sm:gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-headline font-bold text-base shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            K
          </div>
          <span className="font-headline font-extrabold text-lg sm:text-xl text-primary tracking-tight">
            Admin
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex ml-4 items-center space-x-2.5 lg:space-x-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`font-label-sm text-xs lg:text-sm transition-all duration-200 px-3.5 py-1.5 rounded-full ${
                  isActive
                    ? "liquid-glass-btn-primary text-white font-semibold shadow-md active-nav-glow"
                    : "liquid-glass-btn text-on-surface-variant hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-full liquid-glass-btn text-primary transition-colors"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary animate-ping"></span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary"></span>
        </button>

        {/* Profile Pill */}
        <Link
          to="/settings"
          className="flex items-center gap-2 p-1 pr-3 rounded-full liquid-glass-btn hover:scale-[1.02] transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden border border-white/90 shadow-sm flex-shrink-0">
            <img
              src={dp}
              alt="Kalyan Nayak Profile"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80";
              }}
            />
          </div>
          <span className="hidden sm:inline font-label-sm text-xs font-semibold text-on-surface whitespace-nowrap">
            Kalyan Nayak
          </span>
        </Link>

        {/* Quick Logout */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="hidden sm:flex p-2 rounded-full liquid-glass-btn-danger transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}


