import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smile Dental',
  description: 'Your smile need experts care',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="Smile by Dr. Kareen offers expert dental care in Kathmandu including teeth whitening, braces, implants, and more. Book your appointment today!"/>
        <meta name="keywords" content="dentist in Kathmandu, dental clinic Nepal, teeth whitening Kathmandu, orthodontist Nepal"/>
        <meta property="og:title" content="Smile by Dr. Kareen | Dental Clinic in Kathmandu"/>
        <meta property="og:description" content="Trusted dental care in Kathmandu. Braces, whitening, implants & more by Dr. Kareen."/>
        <meta property="og:image" content="https://smilebydrkareen.com.np/images/clinic.jpg"/>
      <meta property="og:url" content="https://smilebydrkareen.com.np/"/>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
