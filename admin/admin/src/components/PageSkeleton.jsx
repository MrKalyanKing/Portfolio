import React from "react";

export function DashboardSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      {/* Title Header Skeleton */}
      <div className="space-y-2">
        <div className="h-9 w-64 liquid-skeleton rounded-2xl" />
        <div className="h-5 w-96 liquid-skeleton rounded-xl" />
      </div>

      {/* Stats Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="liquid-glass-card ultra-rounded p-6 flex items-center justify-between">
            <div className="space-y-3 flex-1 pr-4">
              <div className="h-3 w-20 liquid-skeleton rounded-full" />
              <div className="h-8 w-12 liquid-skeleton rounded-xl" />
              <div className="h-3 w-24 liquid-skeleton rounded-full" />
            </div>
            <div className="w-14 h-14 rounded-2xl liquid-skeleton flex-shrink-0" />
          </div>
        ))}
      </div>

      {/* Banner Card Skeleton */}
      <div className="liquid-glass-card ultra-rounded p-8 space-y-4">
        <div className="h-6 w-48 liquid-skeleton rounded-full" />
        <div className="h-8 w-80 liquid-skeleton rounded-xl" />
        <div className="h-16 w-full liquid-skeleton rounded-2xl" />
      </div>
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <div className="space-y-8 md:space-y-10 animate-pulse">
      {/* Title Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="h-9 w-56 liquid-skeleton rounded-2xl" />
          <div className="h-5 w-80 liquid-skeleton rounded-xl" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-24 liquid-skeleton rounded-full" />
          <div className="h-9 w-24 liquid-skeleton rounded-full" />
        </div>
      </div>

      {/* Form Skeleton */}
      <div className="liquid-glass-card ultra-rounded p-5 sm:p-8 space-y-6">
        <div className="h-7 w-44 liquid-skeleton rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="h-12 w-full liquid-skeleton rounded-2xl" />
          <div className="h-12 w-full liquid-skeleton rounded-2xl" />
        </div>
        <div className="h-12 w-full liquid-skeleton rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="h-12 w-full liquid-skeleton rounded-2xl" />
          <div className="h-12 w-full liquid-skeleton rounded-2xl" />
        </div>
        <div className="h-28 w-full liquid-skeleton rounded-2xl" />
        <div className="h-28 w-full liquid-skeleton rounded-2xl" />
        <div className="h-14 w-full liquid-skeleton rounded-full" />
      </div>

      {/* Published Grid Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 liquid-skeleton rounded-xl" />
          <div className="h-6 w-24 liquid-skeleton rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="liquid-glass-card ultra-rounded overflow-hidden space-y-4 p-5">
              <div className="h-48 w-full liquid-skeleton rounded-2xl" />
              <div className="h-6 w-3/4 liquid-skeleton rounded-xl" />
              <div className="h-4 w-full liquid-skeleton rounded-lg" />
              <div className="flex gap-2">
                <div className="h-6 w-16 liquid-skeleton rounded-full" />
                <div className="h-6 w-16 liquid-skeleton rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ExperienceSkeleton() {
  return (
    <div className="space-y-8 md:space-y-10 animate-pulse">
      {/* Title Header Skeleton */}
      <div className="space-y-2">
        <div className="h-9 w-60 liquid-skeleton rounded-2xl" />
        <div className="h-5 w-96 liquid-skeleton rounded-xl" />
      </div>

      {/* Grid Layout Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-8 liquid-glass-card ultra-rounded p-6 space-y-5">
          <div className="h-7 w-44 liquid-skeleton rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-12 w-full liquid-skeleton rounded-2xl" />
            <div className="h-12 w-full liquid-skeleton rounded-2xl" />
            <div className="h-12 w-full liquid-skeleton rounded-2xl" />
            <div className="h-12 w-full liquid-skeleton rounded-2xl" />
          </div>
          <div className="h-28 w-full liquid-skeleton rounded-2xl" />
          <div className="h-12 w-full liquid-skeleton rounded-2xl" />
          <div className="h-20 w-full liquid-skeleton rounded-2xl" />
          <div className="h-12 w-36 liquid-skeleton rounded-full ml-auto" />
        </div>

        <div className="lg:col-span-4 liquid-glass-card ultra-rounded p-6 space-y-6">
          <div className="h-7 w-32 liquid-skeleton rounded-xl" />
          <div className="h-16 w-full liquid-skeleton rounded-2xl" />
          <div className="h-44 w-full liquid-skeleton rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function SettingsSkeleton() {
  return (
    <div className="space-y-8 md:space-y-10 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-9 w-64 liquid-skeleton rounded-2xl" />
          <div className="h-5 w-80 liquid-skeleton rounded-xl" />
        </div>
        <div className="h-10 w-28 liquid-skeleton rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-8 liquid-glass-card ultra-rounded p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full liquid-skeleton" />
            <div className="space-y-2">
              <div className="h-6 w-40 liquid-skeleton rounded-xl" />
              <div className="h-4 w-32 liquid-skeleton rounded-lg" />
            </div>
          </div>
          <div className="h-12 w-full liquid-skeleton rounded-2xl" />
          <div className="h-12 w-full liquid-skeleton rounded-2xl" />
          <div className="h-12 w-full liquid-skeleton rounded-2xl" />
          <div className="h-12 w-36 liquid-skeleton rounded-full" />
        </div>

        <div className="lg:col-span-4 liquid-glass-card ultra-rounded p-6 space-y-4">
          <div className="h-6 w-36 liquid-skeleton rounded-xl" />
          <div className="h-16 w-full liquid-skeleton rounded-2xl" />
          <div className="h-16 w-full liquid-skeleton rounded-2xl" />
          <div className="h-16 w-full liquid-skeleton rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function TechStackSkeleton() {
  return (
    <div className="space-y-10 max-w-2xl mx-auto animate-pulse">
      <div className="space-y-2 text-center">
        <div className="h-9 w-56 liquid-skeleton rounded-2xl mx-auto" />
        <div className="h-5 w-80 liquid-skeleton rounded-xl mx-auto" />
      </div>

      <div className="liquid-glass-card ultra-rounded p-8 space-y-6">
        <div className="w-36 h-36 rounded-3xl liquid-skeleton mx-auto" />
        <div className="h-32 w-full liquid-skeleton rounded-2xl" />
        <div className="h-14 w-full liquid-skeleton rounded-full" />
      </div>
    </div>
  );
}

export function ContactsSkeleton() {
  return (
    <div className="space-y-8 md:space-y-10 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-9 w-56 liquid-skeleton rounded-2xl" />
          <div className="h-5 w-80 liquid-skeleton rounded-xl" />
        </div>
        <div className="h-8 w-28 liquid-skeleton rounded-full" />
      </div>

      <div className="liquid-glass-card ultra-rounded p-6 space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 w-full liquid-skeleton rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function LoginSkeleton() {
  return (
    <div className="w-full max-w-md my-auto py-6 animate-pulse">
      <div className="liquid-glass-card-solid ultra-rounded p-8 space-y-6">
        <div className="w-16 h-16 rounded-2xl liquid-skeleton mx-auto" />
        <div className="h-8 w-48 liquid-skeleton rounded-xl mx-auto" />
        <div className="h-4 w-64 liquid-skeleton rounded-lg mx-auto" />
        <div className="h-12 w-full liquid-skeleton rounded-2xl" />
        <div className="h-12 w-full liquid-skeleton rounded-2xl" />
        <div className="h-14 w-full liquid-skeleton rounded-full" />
      </div>
    </div>
  );
}
