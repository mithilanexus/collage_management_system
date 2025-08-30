"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Menu } from "lucide-react";
import { useLoginUserData } from "@/hooks/LoginedUserData";
import { useRouter } from "next/navigation";
import UnauthorizedPage from "../unauthorized/page";
import { AdminThemeToggle } from "@/components/theme-toggle";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userData, loading, error } = useLoginUserData();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  // if (error || !userData || userData.role !== "admin") {
  //   return <UnauthorizedPage />;
  // }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} className="hidden lg:flex" />
      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? "lg:ml-64" : "lg:ml-16"
          }`}
      >
        <div className="lg:hidden bg-background border-b border-border p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <AdminThemeToggle />
        </div>
        {!sidebarOpen && (
          <div className="hidden lg:flex bg-background border-b border-border p-4 items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Open sidebar"
              title="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Admin Panel</h1>
            <AdminThemeToggle />
          </div>
        )}
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}