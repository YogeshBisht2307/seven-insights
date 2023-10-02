import "../globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/provider";
import { Inter } from "next/font/google";
import Navbar from "@/components/elements/Navbar";


const inter = Inter({ subsets: ["latin"] })


export const metadata: Metadata = {
  title: "Seven Insights: Auth",
  description: "Explore seven wonder for every domain and learn intersting concepts.",
}


export default function AuthLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar/>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
