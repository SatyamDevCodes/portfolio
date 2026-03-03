"use client"

import { Inter, Space_Grotesk } from 'next/font/google'
import '../App.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata = {
  title: 'Portfolio | Full Stack Developer',
  description: 'Personal portfolio showcasing projects, skills, and experience as a full stack developer.',
}

export const viewport = {
  themeColor: '#0d1117',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}