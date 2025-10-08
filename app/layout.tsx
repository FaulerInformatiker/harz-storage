import type { Metadata } from "next";
import "./globals.css";
import { TranslationProvider } from "@/lib/TranslationContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import Analytics from "@/components/Analytics";

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
        <ThemeProvider>
          <TranslationProvider>{children}</TranslationProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
