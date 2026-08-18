import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const geistSans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: { default: 'CX Radar', template: '%s · CX Radar' },
  description: 'Turn customer conversations into evidence-backed product and operational decisions.',
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f8fafb' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased"><TooltipProvider>{children}</TooltipProvider></body>
    </html>
  )
}
