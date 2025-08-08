export const WorkspaceCardSkeleton = () => {
  return (
    <div className="bg-card border border-card-border rounded-lg p-6 animate-pulse">
      <div className="space-y-4">
        {/* Title skeleton */}
        <div className="h-6 bg-muted rounded w-3/4"></div>
        
        {/* Instance count skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-20"></div>
        </div>
        
        {/* Created date skeleton */}
        <div className="pt-2 border-t border-border">
          <div className="h-3 bg-muted rounded w-32"></div>
        </div>
      </div>
      
      {/* Shimmer overlay */}
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div className="shimmer h-full w-full"></div>
      </div>
    </div>
  );
};