import React from "react";
import { Newspaper, FolderKanban, ShoppingBag, Image, Sparkles } from "lucide-react";
const StatsCard = ({ icon: Icon, title, value, color }) => (
  <div className={`${color} rounded-xl p-6 text-white shadow-lg mb-10`}>
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-4xl font-bold mt-2">{value}</p>
      </div>
      <Icon className="w-12 h-12 opacity-80" />
    </div>
  </div>
);
export function Dashboard() {
  return (
    <div>
      <div className="mb-10 mt-9 mx-3">
        <h1 className="text-2xl font-bold text-purple-600 mb-10">Admin Dashboard</h1>
        <p className="text-gray-600">ADMIN PANEL</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        <StatsCard
          icon={Newspaper}
          title=" Total Work Experience"
          value="2"
          color="bg-purple-500"
        />
        <StatsCard
          icon={FolderKanban}
          title="Total Projects"
          value="6"
          color="bg-pink-500"
        />
        <StatsCard
          icon={ShoppingBag}
          title="Total Tech Stack"
          value="6"
          color="bg-yellow-500"
        />
        <StatsCard
          icon={Sparkles}
          title="Skills"
          value="2"
          color="bg-cyan-500"
        />
      </div>
    </div>
  );
}
