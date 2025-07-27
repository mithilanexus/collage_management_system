import { Loader2, GraduationCap } from "lucide-react";

export default function StudentLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Student Logo */}
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        
        {/* Loading Spinner */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-lg font-medium text-foreground">Loading Student Portal...</span>
        </div>
        
        {/* Loading Text */}
        <p className="text-muted-foreground">Preparing your academic dashboard</p>
        
        {/* Loading Steps */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span>Loading courses...</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-150"></div>
            <span>Fetching grades...</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-300"></div>
            <span>Preparing dashboard...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
