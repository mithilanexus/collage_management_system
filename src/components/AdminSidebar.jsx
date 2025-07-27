"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  Settings,
  Bell,
  BarChart3,
  UserCheck,
  Building,
  CreditCard,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  LogOut,
  Shield,
  Menu,
  X
} from "lucide-react";

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState({});

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
      href: "/admin",
      exact: true
    },
    {
      title: "Students",
      icon: Users,
      children: [
        { title: "All Students", href: "/admin/students" },
        { title: "Admissions", href: "/admin/students/admissions" },
        { title: "Enrollments", href: "/admin/students/enrollments" }
      ]
    },
    {
      title: "Faculty",
      icon: UserCheck,
      children: [
        { title: "All Faculty", href: "/admin/faculty" },
        { title: "Departments", href: "/admin/faculty/departments" },
        { title: "Schedules", href: "/admin/faculty/schedules" }
      ]
    },
    {
      title: "Courses",
      icon: BookOpen,
      children: [
        { title: "All Courses", href: "/admin/courses" },
        { title: "Programs", href: "/admin/courses/programs" },
        { title: "Curriculum", href: "/admin/courses/curriculum" }
      ]
    },
    {
      title: "Academic",
      icon: GraduationCap,
      children: [
        { title: "Grades", href: "/admin/academic/grades" },
        { title: "Transcripts", href: "/admin/academic/transcripts" },
        { title: "Attendance", href: "/admin/academic/attendance" }
      ]
    },
    {
      title: "Finance",
      icon: CreditCard,
      children: [
        { title: "Fee Management", href: "/admin/finance/fees" },
        { title: "Payments", href: "/admin/finance/payments" },
        { title: "Scholarships", href: "/admin/finance/scholarships" }
      ]
    },
    {
      title: "Campus",
      icon: Building,
      children: [
        { title: "Facilities", href: "/admin/campus/facilities" },
        { title: "Events", href: "/admin/campus/events" },
        { title: "Resources", href: "/admin/campus/resources" }
      ]
    },
    {
      title: "Communications",
      icon: MessageSquare,
      children: [
        { title: "Announcements", href: "/admin/communications/announcements" },
        { title: "Messages", href: "/admin/communications/messages" },
        { title: "Notifications", href: "/admin/communications/notifications" }
      ]
    },
    {
      title: "Reports",
      icon: BarChart3,
      children: [
        { title: "Academic Reports", href: "/admin/reports/academic" },
        { title: "Financial Reports", href: "/admin/reports/financial" },
        { title: "Analytics", href: "/admin/reports/analytics" }
      ]
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/admin/settings"
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
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
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
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      expandedItems[item.title] || item.children.some(child => isActive(child.href))
                        ? "bg-primary/10 text-primary"
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
                              ? "bg-primary/10 text-primary font-medium"
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
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    (item.exact ? pathname === item.href : isActive(item.href))
                      ? "bg-primary/10 text-primary"
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
          <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@edutech.edu</p>
          </div>
        </div>
        <button className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200">
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
        </div>
      </div>
    </>
  );
}
