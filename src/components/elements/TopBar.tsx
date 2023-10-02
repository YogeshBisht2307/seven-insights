"use client"

import Link from "next/link";
import Image from "next/image";
import ProfileMenu from "./ProfileDropdown";

import { TopBarProps } from "@/types/props";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/elements/ModeToggle";


const TopBar = ({ session, isNavOpen, setIsNavOpen, supabase } : TopBarProps) => {

  return (
    <nav className={`fixed top-0 z-50 w-full border-b border-secondary bg-background`}>
      <div className="px-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Button 
              onClick={() => setIsNavOpen(!isNavOpen)}
              variant="outline"
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className={`inline-flex items-center p-2 text-sm rounded-lg ${isNavOpen ? "" : "sm:hidden"} focus:outline-none focus:ring-2`}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </Button>
            <Link href="/" className="flex ml-2 md:mr-24">
              <div>
                <Image src="/seven-insights.png" priority width={100} height={50} className="sm:ml-12" alt="Seven Insights" />
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            { session ? <ProfileMenu supabase={supabase} /> : null }
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopBar