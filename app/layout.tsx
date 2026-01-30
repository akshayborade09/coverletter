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
    <html lang="en" className="h-full">
      <body className="h-full min-h-0 bg-neutral-900 flex flex-col sm:items-center sm:justify-center sm:p-4 p-0">
        {/* Mobile: fixed full viewport. Desktop: centered 402×874 frame. */}
        <div
          className="mobile-frame w-full flex-1 flex flex-col overflow-hidden box-border
            max-sm:fixed max-sm:inset-0 max-sm:flex-none max-sm:h-full
            sm:h-[874px] sm:max-w-[402px] sm:rounded-[2.75rem] sm:shadow-2xl sm:shadow-black/50 sm:mx-auto"
          style={{
            paddingTop: 'env(safe-area-inset-top, 0px)',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
          }}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
