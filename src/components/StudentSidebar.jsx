"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard,
  BookOpen,
  Calendar,
  GraduationCap,
  CreditCard,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  User,
  BarChart3,
  Clock,
  Award,
  Library,
  Users,
  ChevronDown,
  ChevronRight,
  LogOut,
  Home,
  Menu,
  X
} from "lucide-react";
import useLogout from "@/utils/useLogout";

export default function StudentSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState({});
  const handleLogout = useLogout();

  const toggleExpanded = (key) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isActive = (href) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/student",
      exact: true
    },
    {
      title: "Academics",
      icon: GraduationCap,
      children: [
        { title: "My Courses", href: "/student/courses" },
        { title: "Grades", href: "/student/grades" },
        { title: "Transcripts", href: "/student/transcripts" },
        { title: "Class Schedule", href: "/student/schedule" }
      ]
    },
    {
      title: "Enrollment",
      icon: BookOpen,
      children: [
        { title: "Course Registration", href: "/student/registration" },
        { title: "Add/Drop Courses", href: "/student/enrollment/modify" },
        { title: "Waitlist Status", href: "/student/enrollment/waitlist" }
      ]
    },
    {
      title: "Financial",
      icon: CreditCard,
      children: [
        { title: "Account Summary", href: "/student/billing" },
        { title: "Payment History", href: "/student/billing/history" },
        { title: "Financial Aid", href: "/student/financial-aid" },
        { title: "Scholarships", href: "/student/scholarships" }
      ]
    },
    {
      title: "Academic Records",
      icon: FileText,
      children: [
        { title: "Degree Audit", href: "/student/degree-audit" },
        { title: "Academic Progress", href: "/student/progress" },
        { title: "Graduation Status", href: "/student/graduation" }
      ]
    },
    {
      title: "Campus Life",
      icon: Users,
      children: [
        { title: "Events", href: "/student/events" },
        { title: "Organizations", href: "/student/organizations" },
        { title: "Housing", href: "/student/housing" },
        { title: "Dining", href: "/student/dining" }
      ]
    },
    {
      title: "Resources",
      icon: Library,
      children: [
        { title: "Library Services", href: "/student/library" },
        { title: "Career Services", href: "/student/career" },
        { title: "Academic Support", href: "/student/support" },
        { title: "Health Services", href: "/student/health" }
      ]
    },
    {
      title: "Communications",
      icon: MessageSquare,
      children: [
        { title: "Messages", href: "/student/messages" },
        { title: "Announcements", href: "/student/announcements" },
        { title: "Faculty Contact", href: "/student/faculty-contact" }
      ]
    },
    {
      title: "Profile",
      icon: User,
      href: "/student/profile"
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/student/settings"
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-background border-r border-border shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Student Portal</h2>
                <p className="text-xs text-muted-foreground">EduTech College</p>
              </div>
            </div>
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.title)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      expandedItems[item.title] || item.children.some(child => isActive(child.href))
                        ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </div>
                    {expandedItems[item.title] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {expandedItems[item.title] && (
                    <div className="mt-1 ml-6 space-y-1">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            isActive(child.href)
                              ? "bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          }`}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    (item.exact ? pathname === item.href : isActive(item.href))
                      ? "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600 dark:text-blue-300" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">STU2024001 • CS Major</p>
          </div>
        </div>
        <div className="space-y-1">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Back to Website</span>
          </Link>
          <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
        </div>
      </div>
    </>
  );
}
