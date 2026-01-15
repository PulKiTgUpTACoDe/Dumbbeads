import { DashboardCardSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-9 bg-neutral-800 rounded w-48 mb-2" />
        <div className="h-5 bg-neutral-800 rounded w-96" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>

      {/* Quick actions skeleton */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-neutral-800 rounded w-32 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-neutral-800 rounded" />
          <div className="h-32 bg-neutral-800 rounded" />
        </div>
      </div>
    </div>
  );
}
