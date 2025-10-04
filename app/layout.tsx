import type { Metadata } from 'next'
import './globals.css'
import { TranslationProvider } from '@/lib/TranslationContext'

export const metadata: Metadata = {
  title: 'HarzStorage - Self-Storage in Langelsheim',
  description: 'Flexible, sichere Lagerboxen ab 5m² in Langelsheim im Harz. Monatlich kündbar, ab 25€/Monat. 24/7 Zugang, videoüberwacht.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="antialiased">
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  )
}
