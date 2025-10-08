import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { TranslationProvider } from "@/lib/TranslationContext";
import { ThemeProvider } from "@/lib/ThemeContext";

export const metadata: Metadata = {
  title: "HarzStorage - Self-Storage in Langelsheim",
  description:
    "Flexible, sichere Lagerboxen ab 5m² in Langelsheim im Harz. Monatlich kündbar, ab 25€/Monat. 24/7 Zugang, videoüberwacht.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="antialiased">
        {process.env.NODE_ENV === 'development' && (
          <Script
            src="http://localhost:3010/script.js"
            data-website-id="ce602d30-5a26-4371-a646-b2857b702dbc"
            strategy="afterInteractive"
          />
        )}
        <ThemeProvider>
          <TranslationProvider>{children}</TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
