import '../globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/lib/provider"
import { Inter } from 'next/font/google'
import Sidebar from "@/components/elements/Sidebar"


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Seven Insights: Management',
  description: 'Explore seven wonder for every domain and learn intersting concepts.',
}


export default function AdminLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar/>
          <main className={"p-4 sm:ml-64"}>
            <div className="p-4 border-2 border-dashed rounded-lg mt-14">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
