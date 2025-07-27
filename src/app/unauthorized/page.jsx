"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShieldX, 
  ArrowLeft, 
  Home, 
  AlertTriangle,
  Lock
} from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="border-destructive/20">
          <CardContent className="p-8 text-center">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
              <ShieldX className="w-10 h-10 text-destructive" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Access Denied
            </h1>

            {/* Description */}
            <p className="text-muted-foreground mb-6">
              You don't have permission to access this page. Please contact your administrator if you believe this is an error.
            </p>

            {/* Error Details */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>Error Code: 403 - Forbidden</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
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
                Go to Homepage
              </Button>

              <Button 
                onClick={handleLogin}
                className="w-full"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Login with Different Account
              </Button>
            </div>

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Need help? Contact support at{" "}
                <a 
                  href="mailto:support@edutech.edu" 
                  className="text-primary hover:underline"
                >
                  support@edutech.edu
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
