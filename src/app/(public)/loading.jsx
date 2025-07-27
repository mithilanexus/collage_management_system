import { Loader2, GraduationCap } from "lucide-react";

export default function PublicLoading() {
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
          <span className="text-lg font-medium text-foreground">Loading EduTech...</span>
        </div>
        
        {/* Loading Text */}
        <p className="text-muted-foreground">Preparing your educational experience</p>
        
        {/* Animated Dots */}
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}
