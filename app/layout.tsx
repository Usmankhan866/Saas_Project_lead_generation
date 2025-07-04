import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { AppProvider } from "@/contexts/AppContext"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Growvy - AI-Powered Lead Generation",
  description: "Transform your business with intelligent lead generation and automation",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  )
}
