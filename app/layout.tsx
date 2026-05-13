import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Recommendation UI Prototype",
  description: "Next.js (App Router) prototype for course recommendations"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <div className="min-h-dvh">
            <Navigation />
            <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

