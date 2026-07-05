import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Sparkles,
  Settings,
} from "lucide-react";

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dash", path: "/" },
    { icon: FolderKanban, label: "Projects", path: "/projects" },
    { icon: Briefcase, label: "Experience", path: "/experience" },
    { icon: Sparkles, label: "Skills", path: "/skill" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <nav className="md:hidden fixed bottom-3 left-3 right-3 sm:left-6 sm:right-6 z-40 rounded-full liquid-glass-nav h-16 flex justify-around items-center max-w-md mx-auto px-3">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center justify-center transition-all duration-300 ${
              isActive
                ? "liquid-glass-btn-primary text-white shadow-lg shadow-primary/30 scale-105 px-3.5 py-2 rounded-full border border-white/70"
                : "liquid-glass-btn text-on-surface-variant hover:text-primary p-2 rounded-full"
            }`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {isActive && (
              <span className="text-xs font-label-sm font-semibold ml-1.5 whitespace-nowrap">
                {item.label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}


