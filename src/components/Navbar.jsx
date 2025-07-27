"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simplified navigation - moved less important items to footer
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Contact", href: "/contact" }
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-background/95 backdrop-blur-xl border-b border-border/20 shadow-sm"
        : "bg-background/90 backdrop-blur-md"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-all duration-200">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-foreground">
                EduTech
              </h1>
              <p className="text-xs text-muted-foreground -mt-0.5">College</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="rounded-lg text-sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="rounded-lg text-sm">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 transition-all duration-200 ${isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`} />
                <X className={`absolute inset-0 transition-all duration-200 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 pb-4"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}>
          <div className="pt-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-border/50 space-y-2">
              <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start rounded-lg">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-start rounded-lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
