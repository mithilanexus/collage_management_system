import { Loader2, Shield } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        {/* Admin Logo */}
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
          <Shield className="w-8 h-8 text-primary-foreground" />
        </div>
        
        {/* Loading Spinner */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-lg font-medium text-foreground">Loading Admin Panel...</span>
        </div>
        
        {/* Loading Text */}
        <p className="text-muted-foreground">Preparing your administrative dashboard</p>
        
        {/* Loading Progress Simulation */}
        <div className="mt-6 w-64 mx-auto">
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
