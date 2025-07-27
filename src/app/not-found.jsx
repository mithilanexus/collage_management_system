"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileQuestion, 
  Home, 
  ArrowLeft, 
  Search,
  GraduationCap
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleSearch = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card>
          <CardContent className="p-8 text-center">
            {/* 404 Icon */}
            <div className="w-20 h-20 mx-auto mb-6 bg-muted/50 rounded-full flex items-center justify-center">
              <FileQuestion className="w-10 h-10 text-muted-foreground" />
            </div>

            {/* 404 Number */}
            <div className="text-6xl font-bold text-primary mb-2">404</div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Page Not Found
            </h1>

            {/* Description */}
            <p className="text-muted-foreground mb-6">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>

            {/* Suggestions */}
            <div className="bg-muted/30 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-sm mb-2">You might want to:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check the URL for typos</li>
                <li>• Go back to the previous page</li>
                <li>• Visit our homepage</li>
                <li>• Use the search function</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleGoHome}
                className="w-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
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
                  onClick={handleSearch}
                  variant="outline" 
                  className="w-full"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Popular Links */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm font-medium mb-3">Popular Pages:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => router.push('/about')}
                  className="text-xs"
                >
                  About Us
                </Button>
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => router.push('/courses')}
                  className="text-xs"
                >
                  Courses
                </Button>
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => router.push('/contact')}
                  className="text-xs"
                >
                  Contact
                </Button>
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={() => router.push('/student')}
                  className="text-xs"
                >
                  Student Portal
                </Button>
              </div>
            </div>

            {/* Logo */}
            <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm">EduTech College</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
