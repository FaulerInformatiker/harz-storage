'use client';

import Script from 'next/script';

export default function Analytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      src="https://analytics.example.com/script.js"
      data-website-id="your-website-id"
      strategy="afterInteractive"
    />
  );
}
