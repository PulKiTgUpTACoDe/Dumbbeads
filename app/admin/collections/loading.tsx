import { CollectionsListSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-9 bg-neutral-800 rounded w-48 mb-2 animate-pulse" />
          <div className="h-5 bg-neutral-800 rounded w-64 animate-pulse" />
        </div>
        <div className="h-10 w-40 bg-neutral-800 rounded animate-pulse" />
      </div>

      {/* Collections Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden animate-pulse"
          >
            {/* Image placeholder */}
            <div className="aspect-video bg-neutral-800" />

            {/* Content */}
            <div className="p-4 space-y-3">
              <div className="h-6 bg-neutral-800 rounded w-3/4" />
              <div className="h-4 bg-neutral-800 rounded w-full" />
              <div className="h-4 bg-neutral-800 rounded w-1/4" />

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <div className="h-9 flex-1 bg-neutral-800 rounded" />
                <div className="h-9 w-12 bg-neutral-800 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
