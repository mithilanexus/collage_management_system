"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const PasswordResetSuccessPage = () => {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.push("/auth/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleLoginNow = () => {
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="border shadow-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold text-green-600">
              Password Reset Successful!
            </CardTitle>
            <CardDescription>
              Your password has been successfully updated
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Your password has been changed successfully. You can now sign in with your new password.
              </p>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium">
                  🔒 Security Tips:
                </p>
                <ul className="text-xs text-muted-foreground mt-2 space-y-1 text-left">
                  <li>• Keep your password secure and don't share it</li>
                  <li>• Use a unique password for this account</li>
                  <li>• Consider enabling two-factor authentication</li>
                  <li>• Sign out from shared or public devices</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleLoginNow}
                className="w-full"
              >
                Sign In Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <p className="text-xs text-muted-foreground">
                Redirecting to login in {countdown} seconds...
              </p>
            </div>

            {/* Additional Actions */}
            <div className="pt-4 border-t space-y-2">
              <p className="text-sm font-medium">Need help?</p>
              <div className="flex flex-col gap-2">
                <Link 
                  href="/support" 
                  className="text-sm underline underline-offset-4 hover:text-primary"
                >
                  Contact Support
                </Link>
                <Link 
                  href="/security" 
                  className="text-sm underline underline-offset-4 hover:text-primary"
                >
                  Security Settings
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PasswordResetSuccessPage;
