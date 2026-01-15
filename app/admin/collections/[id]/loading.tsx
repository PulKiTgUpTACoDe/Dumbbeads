import { FormSkeleton } from "@/components/ui/skeletons";

export default function Loading() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="flex items-center gap-4 mb-8 animate-pulse">
        <div className="h-10 w-24 bg-neutral-800 rounded" />
        <div>
          <div className="h-8 bg-neutral-800 rounded w-48 mb-2" />
          <div className="h-5 bg-neutral-800 rounded w-32" />
        </div>
      </div>

      <FormSkeleton />
    </div>
  );
}
