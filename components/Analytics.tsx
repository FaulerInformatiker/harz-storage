'use client'

import Script from 'next/script'

export default function Analytics() {
  if (process.env.NODE_ENV !== 'production') return null

  return (
    <Script
      src="https://analytics.eu.umami.is/script.js"
      data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      strategy="afterInteractive"
    />
  )
}
