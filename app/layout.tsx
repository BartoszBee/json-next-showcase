import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Next.js 15 Showcase (JSONPlaceholder)",
    template: "%s | Next.js 15 Showcase",
  },
  description:
    "Przekrojowy projekt Next.js 15 (App Router) na danych JSONPlaceholder: Server Actions, cache tags, streaming, parallel routes, Edge i więcej.",
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`min-h-dvh bg-slate-50 text-slate-900 antialiased`}>
        {/* pasek górny z nawigacją */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-semibold">
              Next.js 15 Showcase
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/posts" className="hover:underline">
                Posts
              </Link>
              <Link href="/users" className="hover:underline">
                Users
              </Link>
              <Link href="/albums" className="hover:underline">
                Albums
              </Link>
              <Link href="/todos" className="hover:underline">
                Todos
              </Link>
              <Link href="/edge-time" className="hover:underline">
                Edge
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">
          {children}
        </main>
        {/* stopka */}
        <footer className="mx-auto max-w-6xl px-4 py-10 text-xs text-slate-500">
          <p>
            Demo oparte o JSONPlaceholder. Pokaz: App Router, Server Actions,
            cache tags, streaming, parallel routes, Edge, middleware, metadata.
          </p>
        </footer>
      </body>
    </html>
  );
}
