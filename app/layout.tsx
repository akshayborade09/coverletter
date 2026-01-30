import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Akshay\'s Cover Letter',
  description: 'Interactive cover letter showcasing technical expertise and experience',
  generator: 'v0.dev',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Ensure proper handling of safe areas and mobile browser UI
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-900 flex items-center justify-center p-0 sm:p-4">
        {/* iPhone 17 frame: 402×874px. transform creates containing block so fixed nav stays inside. */}
        <div
          className="mobile-frame w-full h-[100dvh] sm:h-[874px] mx-auto flex flex-col overflow-hidden sm:rounded-[2.75rem] sm:shadow-2xl sm:shadow-black/50"
          style={{
            maxWidth: 402,
            transform: 'translateZ(0)',
          }}
        >
          <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
