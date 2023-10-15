import '../globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/lib/provider"
import { Poppins } from 'next/font/google'
import Sidebar from "@/components/elements/Sidebar"


const poppins = Poppins({ weight: ["300", "400", "500", "600", "700", "800"],  subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Seven Insights: Management',
  description: 'Explore seven wonder for every domain and learn intersting concepts.',
}


export default function AdminLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar/>
          <main className={"p-4 sm:ml-64"}>
            <div className="p-4 rounded-lg mt-14">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
