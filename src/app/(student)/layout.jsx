"use client";

import { useState } from "react";
import StudentSidebar from "@/components/StudentSidebar";
import { Menu, GraduationCap } from "lucide-react";
import { AdminThemeToggle } from "@/components/theme-toggle";

export default function StudentLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <StudentSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="flex-1 lg:ml-64 transition-all duration-300">
        {/* Mobile Header */}
        <div className="lg:hidden bg-background border-b border-border p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <h1 className="text-lg font-semibold">Student Portal</h1>
          </div>
          <AdminThemeToggle />
        </div>

        <div className="p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
