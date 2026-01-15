export function CollectionCardSkeleton() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 animate-pulse">
      <div className="flex gap-4">
        {/* Image placeholder */}
        <div className="w-24 h-24 bg-neutral-800 rounded-lg" />

        <div className="flex-1">
          {/* Title */}
          <div className="h-6 bg-neutral-800 rounded w-1/2 mb-2" />

          {/* Description */}
          <div className="h-4 bg-neutral-800 rounded w-3/4 mb-3" />

          {/* Products count */}
          <div className="h-4 bg-neutral-800 rounded w-1/4 mb-4" />

          {/* Buttons */}
          <div className="flex gap-2">
            <div className="h-9 w-20 bg-neutral-800 rounded" />
            <div className="h-9 w-20 bg-neutral-800 rounded" />
          </div>
        </div>

        {/* Status badge */}
        <div className="h-6 w-20 bg-neutral-800 rounded-full" />
      </div>
    </div>
  );
}

export function CollectionsListSkeleton() {
  return (
    <div className="space-y-4">
      <CollectionCardSkeleton />
      <CollectionCardSkeleton />
      <CollectionCardSkeleton />
    </div>
  );
}

export function DashboardCardSkeleton() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 bg-neutral-800 rounded w-1/3" />
        <div className="w-10 h-10 bg-neutral-800 rounded-lg" />
      </div>
      <div className="h-8 bg-neutral-800 rounded w-1/4 mb-2" />
      <div className="h-4 bg-neutral-800 rounded w-1/2" />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="max-w-4xl space-y-6 animate-pulse">
      {/* Basic Info Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <div className="h-6 bg-neutral-800 rounded w-1/4 mb-4" />

        <div className="space-y-4">
          {/* Name field */}
          <div>
            <div className="h-4 bg-neutral-800 rounded w-1/6 mb-2" />
            <div className="h-10 bg-neutral-800 rounded" />
          </div>

          {/* Slug field */}
          <div>
            <div className="h-4 bg-neutral-800 rounded w-1/6 mb-2" />
            <div className="h-10 bg-neutral-800 rounded" />
          </div>

          {/* Description field */}
          <div>
            <div className="h-4 bg-neutral-800 rounded w-1/6 mb-2" />
            <div className="h-24 bg-neutral-800 rounded" />
          </div>

          {/* Price field */}
          <div>
            <div className="h-4 bg-neutral-800 rounded w-1/6 mb-2" />
            <div className="h-10 bg-neutral-800 rounded" />
          </div>

          {/* Status field */}
          <div>
            <div className="h-4 bg-neutral-800 rounded w-1/6 mb-2" />
            <div className="h-10 bg-neutral-800 rounded" />
          </div>
        </div>
      </div>

      {/* Images Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
        <div className="h-6 bg-neutral-800 rounded w-1/6 mb-4" />
        <div className="h-48 bg-neutral-800 rounded" />
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <div className="h-10 w-32 bg-neutral-800 rounded" />
        <div className="h-10 w-24 bg-neutral-800 rounded" />
      </div>
    </div>
  );
}
