"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Settings, Building,
  CreditCard, MessageSquare, ChevronDown, BarChart3, LogOut, Shield, X,
  ChevronLeft, ChevronRight
} from "lucide-react";
import useLogout from "@/utils/useLogout";
import { AdminThemeToggle } from "@/components/theme-toggle";

export default function AdminSidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const handleLogout = useLogout();
  const [expandedItems, setExpandedItems] = useState({});

  const handleNavClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const toggleExpanded = (key) => {
    if (isOpen) {
      setExpandedItems((prev) => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const isActive = (href, exact = false) => {
    return exact ? pathname === href : pathname.startsWith(href);
  };

  const menuItems = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/admin", exact: true },
    {
      title: "Management", icon: Users,
      children: [
        { title: "Students", href: "/admin/management/students" },
        { title: "Parents", href: "/admin/management/parents" },
        { title: "Teachers", href: "/admin/management/teachers" },
        { title: "Staff", href: "/admin/management/staff" },
      ],
    },
    {
      title: "Courses", icon: BookOpen,
      children: [
        { title: "Course Management", href: "/admin/courses" },
        { title: "Primary Level", href: "/admin/courses/primary" },
        { title: "Secondary Level", href: "/admin/courses/secondary" },
        { title: "Bachelor Level", href: "/admin/courses/bachelor" },
        { title: "Subject Management", href: "/admin/courses/subjects" },
        { title: "Course Structure", href: "/admin/courses/structure" },
      ],
    },
    {
      title: "Academic", icon: GraduationCap,
      children: [
        { title: "Grades", href: "/admin/academic/grades" },
        { title: "Transcripts", href: "/admin/academic/transcripts" },
        { title: "Attendance", href: "/admin/academic/attendance" },
      ],
    },
    {
      title: "Finance", icon: CreditCard,
      children: [
        { title: "Fee Management", href: "/admin/finance/fees" },
        { title: "Payments", href: "/admin/finance/payments" },
        { title: "Scholarships", href: "/admin/finance/scholarships" },
      ],
    },
    {
      title: "Campus", icon: Building,
      children: [
        { title: "Facilities", href: "/admin/campus" },
        { title: "Events", href: "/admin/campus/events" },
        { title: "Resources", href: "/admin/campus/resources" },
      ],
    },
    {
      title: "Communications", icon: MessageSquare,
      children: [
        { title: "Announcements", href: "/admin/communications/announcements" },
        { title: "Messages", href: "/admin/communications/messages" },
        { title: "Notifications", href: "/admin/communications/notifications" },
      ],
    },
    {
      title: "Reports", icon: BarChart3,
      children: [
        { title: "Academic Reports", href: "/admin/reports/academic" },
        { title: "Financial Reports", href: "/admin/reports/financial" },
        { title: "Analytics", href: "/admin/reports/analytics" },
      ],
    },
    { title: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        className={`fixed left-0 top-0 h-screen bg-background border-r border-border shadow-lg z-50 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-0 lg:w-16"
          } ${!isOpen && "hidden lg:flex"}`}
      >
        <div
          className={`p-4 border-b border-border flex-shrink-0 flex items-center justify-between ${!isOpen && "justify-center"
            }`}
        >
          {isOpen ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
                  <p className="text-xs text-muted-foreground">EduTech College</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AdminThemeToggle />
                <button
                  onClick={() => setIsOpen(false)}
                  className="lg:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
          )}
        </div>

        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="hidden lg:flex items-center justify-center absolute -right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-background border border-border shadow-md hover:bg-muted transition"
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin">
          <div className="px-3 space-y-0.5">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.title)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${expandedItems[item.title] || item.children.some((child) => isActive(child.href))
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        } ${!isOpen && "justify-center"}`}
                    >
                      <div className={`flex items-center ${isOpen ? "space-x-3" : ""}`}>
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {isOpen && <span className="truncate">{item.title}</span>}
                      </div>
                      {isOpen && (expandedItems[item.title] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
                    </button>
                    {isOpen && expandedItems[item.title] && (
                      <div className="mt-1 ml-6 space-y-0.5">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.href}
                            onClick={handleNavClick}
                            className={`block px-3 py-1.5 rounded-lg text-xs transition-all duration-200 ${isActive(child.href)
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
                    onClick={handleNavClick}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.href, item.exact)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      } ${!isOpen && "justify-center"}`}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {isOpen && <span className="truncate ml-3">{item.title}</span>}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </nav>

        <div
          className={`p-4 border-t border-border ${!isOpen && "flex justify-center"}`}
        >
          {isOpen ? (
            <>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Admin User</p>
                  <p className="text-xs text-muted-foreground truncate">admin@edutech.edu</p>
                </div>
              </div>
              <button
                className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </>
          ) : (
            <button
              className="flex items-center justify-center p-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="hidden lg:flex items-center justify-center fixed top-1/2 -translate-y-1/2 left-16 w-7 h-7 rounded-full bg-background border border-border shadow-md hover:bg-muted transition z-[60]"
          aria-label="Expand sidebar"
          title="Expand sidebar"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </>
  );
}