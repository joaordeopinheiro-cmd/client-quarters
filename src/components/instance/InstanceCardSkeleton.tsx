export const InstanceCardSkeleton = () => {
  return (
    <div className="bg-card border border-card-border rounded-lg p-6 animate-pulse relative">
      <div className="space-y-4">
        {/* Title and status skeleton */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-muted rounded-full"></div>
              <div className="h-5 bg-muted rounded w-20"></div>
            </div>
          </div>
        </div>
        
        {/* Phone number skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-32"></div>
        </div>
        
        {/* Dates skeleton */}
        <div className="space-y-1 pt-2 border-t border-border">
          <div className="h-3 bg-muted rounded w-28"></div>
          <div className="h-3 bg-muted rounded w-36"></div>
        </div>
      </div>
      
      {/* Shimmer overlay */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div className="shimmer h-full w-full"></div>
      </div>
    </div>
  );
};