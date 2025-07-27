import { Loader2, GraduationCap } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
          <GraduationCap className="w-8 h-8 text-primary-foreground" />
        </div>
        
        {/* Loading Spinner */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-lg font-medium text-foreground">Loading...</span>
        </div>
        
        {/* Loading Text */}
        <p className="text-muted-foreground">Please wait while we prepare your content</p>
      </div>
    </div>
  );
}
