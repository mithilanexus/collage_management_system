"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { usePathname } from "next/navigation"

export function ThemeProvider({
  children,
  ...props
}) {
  const pathname = usePathname()

  // Check if current path is a public page (should only use light mode)
  const isPublicPage = React.useMemo(() => {
    const publicPaths = [
      '/',
      '/login',
      '/register',
      '/forgot-password',
      '/reset-password',
      '/verify-email',
      '/about',
      '/contact',
      '/privacy',
      '/terms',
      '/unauthorized'
    ]

    return publicPaths.includes(pathname) ||
           pathname.startsWith('/auth') ||
           pathname.startsWith('/public') ||
           (!pathname.startsWith('/admin') && !pathname.startsWith('/student'))
  }, [pathname])

  // For public pages, force light theme and disable theme switching
  if (isPublicPage) {
    return (
      <div className="light">
        {children}
      </div>
    )
  }

  // For admin/authenticated pages, enable full theme functionality
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="edutech-admin-theme"
      themes={["light", "dark", "system"]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
