"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  Bug,
  ArrowLeft
} from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  const handleGoHome = () => {
    window.location.href = '/';
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="border-destructive/20">
          <CardContent className="p-8 text-center">
            {/* Error Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-destructive" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Something went wrong!
            </h1>

            {/* Description */}
            <p className="text-muted-foreground mb-6">
              We encountered an unexpected error. Don't worry, our team has been notified and is working on a fix.
            </p>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Bug className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-destructive">Error Details:</span>
                </div>
                <pre className="text-xs text-muted-foreground overflow-auto max-h-32">
                  {error?.message || 'Unknown error occurred'}
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
                Try Again
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
                  onClick={handleGoHome}
                  variant="outline" 
                  className="w-full"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                If this problem persists, please contact{" "}
                <a 
                  href="mailto:support@edutech.edu" 
                  className="text-primary hover:underline"
                >
                  technical support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
