import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Providers } from './provider'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Pexels Gallery',
  description: 'A responsive image gallery using Pexels API',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.variable} font-sans antialiased bg-background`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

