import React, { useState, useEffect } from "react";
import { Newspaper, FolderKanban, ShoppingBag, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { DashboardSkeleton } from "./PageSkeleton";

const StatsCard = ({ icon: Icon, title, value, gradient, subtitle }) => (
  <div className="glass-card ultra-rounded p-6 inner-glow hover:scale-[1.02] transition-all duration-300 flex items-center justify-between">
    <div>
      <p className="font-label-xs text-xs text-on-surface-variant font-semibold uppercase tracking-wider mb-1">
        {title}
      </p>
      <h3 className="font-headline text-3xl font-extrabold text-on-surface">{value}</h3>
      {subtitle && (
        <p className="text-xs text-primary font-medium mt-1 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" /> {subtitle}
        </p>
      )}
    </div>
    <div className={`w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center text-white shadow-lg`}>
      <Icon className="w-7 h-7" />
    </div>
  </div>
);

export function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-10">
      {/* Title Header */}
      <div>
        <h1 className="font-headline font-bold text-3xl md:text-4xl text-on-surface">
          Dashboard Overview
        </h1>
        <p className="font-body-md text-base text-on-surface-variant mt-1">
          Monitor key metrics and management activities in real time.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={Newspaper}
          title="Work Experience"
          value="2"
          subtitle="+1 this year"
          gradient="bg-gradient-to-tr from-primary to-primary-container shadow-primary/20"
        />
        <StatsCard
          icon={FolderKanban}
          title="Total Projects"
          value="12"
          subtitle="3 active live"
          gradient="bg-gradient-to-tr from-secondary to-secondary-container shadow-secondary/20"
        />
        <StatsCard
          icon={ShoppingBag}
          title="Tech Stack"
          value="16"
          subtitle="Updated recently"
          gradient="bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-blue-500/20"
        />
        <StatsCard
          icon={Sparkles}
          title="Skills"
          value="8"
          subtitle="Top tier ratings"
          gradient="bg-gradient-to-tr from-purple-500 to-pink-500 shadow-purple-500/20"
        />
      </div>

      {/* Overview Banner Card */}
      <div className="glass-card ultra-rounded p-8 inner-glow relative overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-xs text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> System Online & Synced
          </div>
          <h2 className="font-headline text-2xl font-bold text-on-surface">
            Portfolio Administration Portal
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            All services, APIs, and data models are running smoothly under Liquid Glass OS architecture. Navigate using the sidebar workspace to update entries.
          </p>
        </div>
      </div>
    </div>
  );
}
