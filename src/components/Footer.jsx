"use client"
import Link from "next/link";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Bell,
  HelpCircle,
  FileText,
  Calendar
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    "Quick Links": [
      { name: "About Us", href: "/about" },
      { name: "Courses", href: "/courses" },
      { name: "Faculty", href: "/faculty" },
      { name: "Alumni", href: "/alumni" },
      { name: "Gallery", href: "/gallery" },
      { name: "News", href: "/news" }
    ],
    "Student Resources": [
      { name: "Notice Board", href: "/notice", icon: Bell },
      { name: "FAQ", href: "/faq", icon: HelpCircle },
      { name: "Academic Calendar", href: "/calendar", icon: Calendar },
      { name: "Library", href: "/library", icon: FileText }
    ],
    "Support": [
      { name: "Contact Us", href: "/contact" },
      { name: "Help Center", href: "/help" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", href: "#", color: "hover:text-sky-500" },
    { name: "Instagram", href: "#", color: "hover:text-pink-600" },
    { name: "LinkedIn", href: "#", color: "hover:text-blue-700" }
  ];

  return (
    <footer className="bg-muted/30 border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">EduTech</h3>
                  <p className="text-sm text-muted-foreground">Excellence in Education</p>
                </div>
              </Link>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Empowering minds and shaping futures through quality education, 
                innovation, and community engagement since 1985.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">info@edutech.edu</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">123 Education Street, Knowledge City</span>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerSections).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold text-foreground mb-6">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-2 group"
                      >
                        {link.icon && <link.icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />}
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} EduTech College. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className={`px-3 py-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-sm font-medium ${social.color}`}
                  aria-label={social.name}
                >
                  {social.name}
                </Link>
              ))}
            </div>

            {/* Back to Top */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
            >
              <span>Back to Top</span>
              <div className="w-6 h-6 rounded-full bg-muted group-hover:bg-primary transition-colors flex items-center justify-center">
                <svg className="w-3 h-3 group-hover:text-primary-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
