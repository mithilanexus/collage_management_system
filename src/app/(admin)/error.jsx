"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  RefreshCw, 
  Shield, 
  Bug,
  ArrowLeft,
  Settings
} from "lucide-react";

export default function AdminError({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Admin Panel Error:', error);
  }, [error]);

  const handleGoToDashboard = () => {
    window.location.href = '/admin';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="border-destructive/20">
          <CardContent className="p-8 text-center">
            {/* Admin Error Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
              <div className="relative">
                <Shield className="w-10 h-10 text-destructive" />
                <AlertTriangle className="w-5 h-5 text-destructive absolute -top-1 -right-1" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Admin Panel Error
            </h1>

            {/* Description */}
            <p className="text-muted-foreground mb-6">
              An error occurred in the administrative system. This incident has been logged and the technical team has been notified.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Bug className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Debug Information:</span>
                </div>
                <pre className="text-xs text-muted-foreground overflow-auto max-h-32">
                  {error?.message || 'Unknown admin error occurred'}
                </pre>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={reset}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Operation
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={handleGoBack}
                  variant="outline" 
                  className="w-full"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
                
                <Button 
                  onClick={handleGoToDashboard}
                  variant="outline" 
                  className="w-full"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </div>
            </div>

            {/* Admin Help */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                For immediate assistance, contact the system administrator at{" "}
                <a 
                  href="mailto:admin@edutech.edu" 
                  className="text-primary hover:underline"
                >
                  admin@edutech.edu
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
