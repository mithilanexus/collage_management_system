"use client"

import * as React from "react"

export function PublicLayout({ children }) {
  return (
    <div className="light min-h-screen bg-background text-foreground">
      {children}
    </div>
  )
}

// Force light mode styles for public pages
export function PublicPageWrapper({ children, className = "" }) {
  return (
    <div className={`light ${className}`}>
      <style jsx global>{`
        .light {
          color-scheme: light;
        }
        .light * {
          color-scheme: light;
        }
      `}</style>
      {children}
    </div>
  )
}
