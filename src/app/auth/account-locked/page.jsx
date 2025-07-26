"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Clock, Mail, ArrowLeft, Send, Shield, HelpCircle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const AccountLockedPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const searchParams = useSearchParams();
  const lockedEmail = searchParams.get("email") || "";
  const reason = searchParams.get("reason") || "multiple_failed_attempts";

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getLockReason = () => {
    switch (reason) {
      case "multiple_failed_attempts":
        return {
          title: "Account Temporarily Locked",
          description: "Too many unsuccessful login attempts detected. Your account has been locked for security.",
          icon: <Shield className="h-6 w-6 text-red-600" />,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          details: "We detected 5 failed login attempts in the last 10 minutes."
        };
      case "suspicious_activity":
        return {
          title: "Unusual Activity Detected",
          description: "We've noticed suspicious activity and temporarily secured your account.",
          icon: <AlertTriangle className="h-6 w-6 text-orange-600" />,
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          details: "Login attempts from multiple locations or unusual patterns detected."
        };
      case "security_breach":
        return {
          title: "Security Alert",
          description: "Your account has been locked as a precautionary security measure.",
          icon: <Shield className="h-6 w-6 text-red-600" />,
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          details: "Potential security threat detected. Immediate password reset recommended."
        };
      default:
        return {
          title: "Account Secured",
          description: "Your account has been temporarily locked for security reasons.",
          icon: <Shield className="h-6 w-6 text-blue-600" />,
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          details: "This is a standard security measure to protect your account."
        };
    }
  };

  const handleUnlockRequest = async (e) => {
    e.preventDefault();

    const emailToUse = email || lockedEmail;
    if (!emailToUse.trim()) {
      setError("Email is required");
      toast.error("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(emailToUse)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement unlock request API call
      console.log("Unlock request for:", emailToUse);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsEmailSent(true);
      toast.success("Unlock request sent successfully! Check your email for instructions.");

    } catch (error) {
      console.error("Unlock request error:", error);
      setError("Failed to send unlock request. Please try again.");
      toast.error("Failed to send unlock request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const lockInfo = getLockReason();

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-md">
          <Card className="border shadow-sm">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-green-100 rounded-full animate-pulse">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-semibold text-green-600">
                Unlock Request Sent
              </CardTitle>
              <CardDescription>
                Check your email for unlock instructions
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium mb-2">
                  📧 Email sent to: {email || lockedEmail}
                </p>
                <p className="text-xs text-green-600">
                  The unlock link will be valid for 24 hours. Please check your spam folder if you don't see it.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setIsEmailSent(false);
                    toast.info("You can request another unlock email");
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Send Another Request
                </Button>

                <Link href="/auth/login">
                  <Button className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </Link>
              </div>

              <div className="text-center pt-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">Still having trouble?</p>
                <Link
                  href="/support"
                  className="text-sm underline underline-offset-4 hover:text-primary"
                >
                  Contact Support Team
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg">
        <Card className="border shadow-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className={`p-4 ${lockInfo.bgColor} ${lockInfo.borderColor} border rounded-full`}>
                {lockInfo.icon}
              </div>
            </div>
            <CardTitle className="text-2xl font-semibold">
              {lockInfo.title}
            </CardTitle>
            <CardDescription className="text-base">
              {lockInfo.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Alert Banner */}
            <div className={`p-4 ${lockInfo.bgColor} ${lockInfo.borderColor} border rounded-lg`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">
                    What happened?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {lockInfo.details}
                  </p>
                </div>
              </div>
            </div>

            {/* Lockout Timer */}
            {timeLeft > 0 && (
              <div className="text-center p-6 bg-gradient-to-br from-muted/30 to-muted/50 rounded-lg border">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-sm font-semibold">Automatic unlock in:</span>
                </div>
                <div className="text-3xl font-mono font-bold text-primary mb-2">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Your account will be automatically unlocked when this timer reaches zero
                </p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Wait for automatic unlock</p>
                    <p className="text-xs text-muted-foreground">Recommended and most secure option</p>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Mail className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Request immediate unlock</p>
                    <p className="text-xs text-muted-foreground">Get unlock instructions via email</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Unlock Request Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">Request Immediate Unlock</h3>
              </div>

              <form onSubmit={handleUnlockRequest} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Confirm your email address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={lockedEmail || "Enter your email address"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    className={error ? 'border-destructive focus:border-destructive' : ''}
                    disabled={isLoading}
                  />
                  {error && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {error}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Sending unlock request...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Unlock Request
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Support Section */}
            <div className="space-y-4 pt-6 border-t">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Need Additional Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our support team is available 24/7 to assist you
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Link href="/support">
                  <Button variant="outline" className="w-full h-auto p-3">
                    <div className="text-center">
                      <HelpCircle className="h-4 w-4 mx-auto mb-1" />
                      <div className="text-xs">Contact Support</div>
                    </div>
                  </Button>
                </Link>

                <Link href="/auth/login">
                  <Button variant="outline" className="w-full h-auto p-3">
                    <div className="text-center">
                      <ArrowLeft className="h-4 w-4 mx-auto mb-1" />
                      <div className="text-xs">Back to Login</div>
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountLockedPage;
