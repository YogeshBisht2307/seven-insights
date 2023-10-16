import "../globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/provider";
import { Poppins } from "next/font/google"
import Navbar from "@/components/elements/Navbar";


const poppins = Poppins({ weight: ["300", "400", "500", "600", "700", "800"],  subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Seven Insights",
  description: "Explore seven wonder for every domain and learn intersting concepts.",
}


export default function RootLayout({ children }: {
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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
