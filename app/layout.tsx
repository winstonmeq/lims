import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LIMS - Legislative System",
  description: "Legislative Information Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        <nav className="bg-slate-900 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-xl font-bold tracking-wider">🏛️ LIMS</Link>
            <div className="space-x-6">
              <Link href="/bills" className="hover:text-blue-300 transition">View Bills</Link>
              <Link href="/admin/create" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">Admin: Add Bill</Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto p-6 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}