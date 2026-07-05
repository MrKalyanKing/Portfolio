import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  FolderKanban,
  ShoppingBag,
  Image,
  Contact,
  Settings,
  Layers,
  Code,
  FileChartColumnIncreasing,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0">
      <div className="flex items-center p-4 border-b">
        <span className="text-xl font-bold">ADMIN</span>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {[
            {
              icon: LayoutDashboard,
              label: "Dashboard",
              path: "/",
            },
            // {
            //   icon: BookOpen,
            //   label: "Testimonials",
            //   path: "/blogs",
            // },
            {
              icon: FolderKanban,
              label: "Projects",
              path: "/projects",
            },
            {
              icon: Layers,
              label: "Expereince",
              path: "/experience",
            },
            // {
            //   icon: Code,
            //   label: "Technology",
            //   path: "/gallery",
            // },
            // {
            //     icons:FileChartColumnIncreasing,
            //     label:'Skills',
            //     path:'/skills',
            // },
            {
                icon: Sparkles,
                label: "Skills",
                path: "/skill",
              },
            {
              icon: Contact,
              label: "Contacts",
              path: "/contacts",
            },
            {
              icon: Settings,
              label: "Profile",
              path: "/settings",
            },
            // {
            //   icon:'',
            //   label:"LogOut",
            //   path:"/logout"
            // }
          ].map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
// 