import React from "react"
import type { Metadata } from "next"
import "./styles.css"

const defaultTitle = "ExportDriveTech Agro Trading"
const defaultDescription =
  "Premium, traceable agricultural products sourced in West Africa and exported worldwide."

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: defaultTitle,
  description: defaultDescription,
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-white text-zinc-950 antialiased">
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}
