import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ 
  size = "default", 
  text = "Loading...", 
  className = "" 
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      {text && (
        <span className="text-muted-foreground">{text}</span>
      )}
    </div>
  );
}

// Full page loading component
export function PageLoading({ text = "Loading page..." }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}

// Card loading skeleton
export function CardLoading() {
  return (
    <div className="animate-pulse">
      <div className="bg-muted rounded-lg p-6 space-y-4">
        <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
        <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
        <div className="h-4 bg-muted-foreground/20 rounded w-5/6"></div>
      </div>
    </div>
  );
}

// Table loading skeleton
export function TableLoading({ rows = 5, columns = 4 }) {
  return (
    <div className="animate-pulse space-y-4">
      {/* Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-muted-foreground/20 rounded"></div>
        ))}
      </div>
      
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="h-4 bg-muted-foreground/10 rounded"></div>
          ))}
        </div>
      ))}
    </div>
  );
}
