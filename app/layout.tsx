import React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import FooterSection from '@/components/footer'
import { HeroHeader } from '@/components/header'
import { Toaster } from 'sonner'
import DitherBackground from '@/components/dither-background'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "A's Developer Portfolio — Quant & Data Science",
  description: "Full-stack developer portfolio showcasing projects in quantitative finance, data science, and software engineering.",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="font-sans antialiased">
        <div className='absolute w-full h-dvh max-h-155 sm:max-h-115 md:max-h-125 lg:max-h-190 xl:max-h-195'>
          <DitherBackground />
        </div>
        <HeroHeader />
        {children}
        <FooterSection />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  )
}
