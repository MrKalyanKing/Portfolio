import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Sparkles,
  Contact,
  Settings,
  BarChart3,
  Users,
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();

  const mainNavItems = [
    { icon: FolderKanban, label: "Projects", path: "/projects" },
    { icon: Briefcase, label: "Experience", path: "/experience" },
    { icon: Sparkles, label: "Skills", path: "/skill" },
    { icon: Contact, label: "Contacts", path: "/contacts" },
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Settings, label: "Profile Settings", path: "/settings" },
  ];

  return (
    <aside className="hidden lg:block lg:col-span-3">
      <div className="liquid-glass-card ultra-rounded p-6 space-y-8 sticky top-24">
        <div>
          <h3 className="font-headline font-bold text-xl text-primary mb-4">Workspace</h3>
          <ul className="space-y-2.5">
            {mainNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-full font-label-sm text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "liquid-glass-btn-primary text-white shadow-md scale-[1.01]"
                        : "liquid-glass-btn text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="pt-6 border-t border-white/50">
          <div className="liquid-glass-card bg-secondary/10 border-secondary/30 p-4 rounded-2xl">
            <p className="font-label-xs text-xs text-secondary font-bold uppercase tracking-wider mb-2">
              Storage Usage
            </p>
            <div className="h-2.5 w-full bg-white/60 rounded-full overflow-hidden p-0.5 border border-white/80">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-3/4 rounded-full"></div>
            </div>
            <p className="mt-2 font-label-sm text-xs font-semibold text-on-surface-variant">
              7.5 GB / 10 GB
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}